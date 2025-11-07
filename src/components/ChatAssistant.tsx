import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type VisitorInfo = {
  name: string;
  email: string;
  phone: string;
};

// Input validation schemas
const visitorInfoSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  // Honeypot field to detect bots
  website: z.string().max(0).optional()
});

const messageSchema = z.string().trim().min(1, 'Message cannot be empty').max(2000, 'Message must be less than 2000 characters');

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !conversationId && !showInfoForm) {
      setShowInfoForm(true);
    }
  }, [isOpen, conversationId, showInfoForm]);

  const startConversation = async () => {
    try {
      // Validate input data
      const validation = visitorInfoSchema.safeParse(formData);
      
      if (!validation.success) {
        const errors: Record<string, string> = {};
        validation.error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
        return;
      }

      // Honeypot check - if website field is filled, it's likely a bot
      if (formData.website) {
        console.warn('Bot detected via honeypot field');
        // Silently fail for bots
        return;
      }

      setFormErrors({});

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          visitor_name: validation.data.name,
          visitor_email: validation.data.email,
          visitor_phone: validation.data.phone || null,
        })
        .select()
        .single();

      if (error) throw error;

      setConversationId(data.id);
      setVisitorInfo({ name: validation.data.name, email: validation.data.email, phone: validation.data.phone || '' });
      setShowInfoForm(false);

      const welcomeMessage: Message = {
        role: 'assistant',
        content: `Hi ${validation.data.name}! I'm here to help you plan the perfect grilled cheese catering for your event. How can I assist you today?`,
      };
      setMessages([welcomeMessage]);

      await supabase.from('chat_messages').insert({
        conversation_id: data.id,
        role: 'assistant',
        content: welcomeMessage.content,
      });

      toast({
        title: 'Welcome!',
        description: "Your conversation has started. Feel free to ask me anything!",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to start conversation. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const saveMessage = async (role: string, content: string) => {
    if (!conversationId) return;

    try {
      await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        role,
        content,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const endConversation = async () => {
    if (!conversationId || !visitorInfo) return;

    try {
      // Send transcript via edge function
      // The edge function handles updating the conversation and retrieving messages using service role
      await supabase.functions.invoke('send-transcript', {
        body: {
          conversationId,
          visitorName: visitorInfo.name,
          visitorEmail: visitorInfo.email,
          visitorPhone: visitorInfo.phone,
        }
      });

      toast({
        title: "Chat ended",
        description: "A transcript has been sent to your email.",
      });
    } catch (error) {
      console.error('Error ending conversation:', error);
      toast({
        title: "Error",
        description: "Failed to end conversation. Please try again.",
        variant: "destructive"
      });
    }
  };

  const streamChat = async (userMessage: Message) => {
    try {
      // Check if user is asking for contact information
      const contactKeywords = ['contact', 'phone', 'email', 'reach', 'call', 'write', 'number'];
      const isAskingForContact = contactKeywords.some(keyword =>
        userMessage.content.toLowerCase().includes(keyword)
      );

      if (isAskingForContact) {
        const contactResponse =
          "You can reach us at:\n\n📞 Phone: 844-474-5591\n📧 Email: grillycheese@grillycheese.net\n\nWe're available to answer your questions and provide quotes!";

        const assistantMessage: Message = {
          role: 'assistant',
          content: contactResponse,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        await saveMessage('assistant', contactResponse);
        setIsLoading(false);
        return;
      }

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok) {
        if (resp.status === 429 || resp.status === 402) {
          const error = await resp.json();
          throw new Error(error.error || 'Service temporarily unavailable');
        }
        throw new Error('Failed to get response');
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      let assistantContent = '';

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save the final assistant message
      if (assistantContent) {
        await saveMessage('assistant', assistantContent);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Validate message length
    const messageValidation = messageSchema.safeParse(input);
    if (!messageValidation.success) {
      toast({
        title: 'Invalid message',
        description: messageValidation.error.errors[0]?.message || 'Message is invalid',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = { role: 'user', content: messageValidation.data };
    setMessages((prev) => [...prev, userMessage]);
    await saveMessage('user', messageValidation.data);
    setInput('');
    setIsLoading(true);

    // Track in GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_message_sent',
        chat_message: messageValidation.data,
      });
    }

    await streamChat(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => {
            setIsOpen(true);
            if (window.dataLayer) {
              window.dataLayer.push({ event: 'chat_opened' });
            }
          }}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-20 md:bottom-6 md:inset-x-auto md:right-6 md:w-96 h-[500px] md:h-[600px] bg-background border-2 border-primary rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <div>
                <h3 className="font-bold">Grilly Cheese Assistant</h3>
                <p className="text-xs opacity-90">Event Planning Help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                endConversation();
                setIsOpen(false);
              }}
              className="hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {showInfoForm ? (
            <div className="flex-1 p-6 flex flex-col justify-center overflow-y-auto">
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold text-lg mb-2">Welcome to Grilly Cheese!</h4>
                  <p className="text-sm text-muted-foreground">
                    Let's get started. Please share your contact information so we can help you plan
                    the perfect event.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setFormErrors({ ...formErrors, name: '' });
                      }}
                      placeholder="Your name"
                      required
                      maxLength={100}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setFormErrors({ ...formErrors, email: '' });
                      }}
                      placeholder="your@email.com"
                      required
                      maxLength={255}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setFormErrors({ ...formErrors, phone: '' });
                      }}
                      placeholder="(555) 123-4567"
                      maxLength={20}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Button
                    onClick={startConversation}
                    disabled={!formData.name || !formData.email}
                    className="w-full"
                  >
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about our catering packages..."
                    disabled={isLoading}
                    className="flex-1"
                    maxLength={2000}
                  />
                  <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { DropoffOrderFormData } from "@/types/cateringOrder";
import { cn } from "@/lib/utils";

interface EventInfoStepProps {
  formData: DropoffOrderFormData;
  onUpdate: (data: Partial<DropoffOrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM',
];

export const EventInfoStep = ({ formData, onUpdate, onBack, onNext }: EventInfoStepProps) => {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about your event</h2>
        <p className="text-muted-foreground">
          Just a few details so we can prepare your order
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Information</CardTitle>
          <CardDescription>What's the occasion?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              placeholder="e.g., Company Holiday Party, Sarah's Birthday"
              value={formData.eventName}
              onChange={(e) => onUpdate({ eventName: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1",
                      !formData.eventDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.eventDate ? format(formData.eventDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.eventDate || undefined}
                    onSelect={(date) => onUpdate({ eventDate: date || null })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Event Time</Label>
              <Select value={formData.eventTime} onValueChange={(value) => onUpdate({ eventTime: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail } from "lucide-react";
import { DropoffOrderFormData } from "@/types/cateringOrder";

interface ContactInfoStepProps {
  formData: DropoffOrderFormData;
  onUpdate: (data: Partial<DropoffOrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactInfoStep = ({ formData, onUpdate, onBack, onNext }: ContactInfoStepProps) => {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <User className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">How can we reach you?</h2>
        <p className="text-muted-foreground">
          We'll send order updates to this contact info
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
          <CardDescription>Who should we contact about this order?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="contactName">Your Name</Label>
            <Input
              id="contactName"
              placeholder="Full name"
              value={formData.contactName}
              onChange={(e) => onUpdate({ contactName: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactEmail"
                type="email"
                placeholder="you@example.com"
                value={formData.contactEmail}
                onChange={(e) => onUpdate({ contactEmail: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.contactPhone}
                onChange={(e) => onUpdate({ contactPhone: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Requests</CardTitle>
          <CardDescription>Any dietary restrictions or special instructions?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Let us know about any allergies, dietary needs, or special requests..."
            value={formData.specialNotes}
            onChange={(e) => onUpdate({ specialNotes: e.target.value })}
            rows={3}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} size="lg">
          Review Order
        </Button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrderStepper } from "@/components/order/OrderStepper";
import { MenuCart } from "@/components/order/MenuCart";
import { EventInfoStep } from "@/components/order/EventInfoStep";
import { DeliveryAddressStep } from "@/components/order/DeliveryAddressStep";
import { ContactInfoStep } from "@/components/order/ContactInfoStep";
import { OrderSummary } from "@/components/order/OrderSummary";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { DropoffOrderFormData, initialDropoffFormData, OrderStep } from "@/types/cateringOrder";
import { supabase } from "@/integrations/supabase/client";

const DropOffOrder = () => {
  const [currentStep, setCurrentStep] = useState<OrderStep>(1);
  const [completedSteps, setCompletedSteps] = useState<OrderStep[]>([]);
  const [formData, setFormData] = useState<DropoffOrderFormData>(initialDropoffFormData);
  const [userId, setUserId] = useState<string | undefined>();
  const [orderId, setOrderId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Pre-fill from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, phone, company_name')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setFormData(prev => ({
            ...prev,
            contactName: profile.full_name || '',
            contactPhone: profile.phone || '',
            contactEmail: user.email || '',
          }));
        }
      }
    };
    checkAuth();
  }, []);

  const updateFormData = (data: Partial<DropoffOrderFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: OrderStep) => {
    setCurrentStep(step);
  };

  const completeStep = (step: OrderStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };

  const handleNext = (fromStep: OrderStep) => {
    completeStep(fromStep);
    const nextStep = (fromStep + 1) as OrderStep;
    if (nextStep <= 5) {
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = (currentStep - 1) as OrderStep;
    if (prevStep >= 1) {
      setCurrentStep(prevStep);
    }
  };

  const handleOrderSuccess = (id: string) => {
    setOrderId(id);
    completeStep(5);
  };

  const renderStep = () => {
    if (orderId) {
      return <OrderConfirmation formData={formData} orderId={orderId} isLoggedIn={!!userId} />;
    }

    switch (currentStep) {
      case 1:
        return <MenuCart formData={formData} onUpdate={updateFormData} onNext={() => handleNext(1)} />;
      case 2:
        return <EventInfoStep formData={formData} onUpdate={updateFormData} onNext={() => handleNext(2)} onBack={handleBack} />;
      case 3:
        return <DeliveryAddressStep formData={formData} onUpdate={updateFormData} onNext={() => handleNext(3)} onBack={handleBack} />;
      case 4:
        return <ContactInfoStep formData={formData} onUpdate={updateFormData} onNext={() => handleNext(4)} onBack={handleBack} />;
      case 5:
        return <OrderSummary formData={formData} onSuccess={handleOrderSuccess} onBack={handleBack} userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Order Drop-Off Catering | Grilly Cheese"
        description="Order delicious grilled cheese catering delivered to your event. Choose your items, customize your order, and complete your order online."
      />
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Drop-Off Catering Order</h1>
            <p className="text-muted-foreground">Delicious grilled cheese delivered to your event</p>
          </div>
          
          {!orderId && <OrderStepper currentStep={currentStep} completedSteps={completedSteps} onStepClick={goToStep} />}
          
          <div className="mt-8">{renderStep()}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DropOffOrder;

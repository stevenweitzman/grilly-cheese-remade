import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrderStepper } from "@/components/order/OrderStepper";
import { PackageSelection } from "@/components/order/PackageSelection";
import { EventDetails } from "@/components/order/EventDetails";
import { MenuOptions } from "@/components/order/MenuOptions";
import { OrderSummary } from "@/components/order/OrderSummary";
import { PaymentStep } from "@/components/order/PaymentStep";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";
import { CateringOrderFormData, initialFormData, OrderStep } from "@/types/cateringOrder";
import { supabase } from "@/integrations/supabase/client";

const DropOffOrder = () => {
  const [currentStep, setCurrentStep] = useState<OrderStep>(1);
  const [completedSteps, setCompletedSteps] = useState<OrderStep[]>([]);
  const [formData, setFormData] = useState<CateringOrderFormData>(initialFormData);
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

  const updateFormData = (data: Partial<CateringOrderFormData>) => {
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
    setCurrentStep((fromStep + 1) as OrderStep);
  };

  const handleBack = () => {
    setCurrentStep((currentStep - 1) as OrderStep);
  };

  const handlePaymentSuccess = (id: string) => {
    setOrderId(id);
    completeStep(5);
    setCurrentStep(5);
  };

  const renderStep = () => {
    if (orderId) {
      return <OrderConfirmation formData={formData} orderId={orderId} isLoggedIn={!!userId} />;
    }

    switch (currentStep) {
      case 1:
        return <PackageSelection formData={formData} onUpdate={updateFormData} onNext={() => handleNext(1)} />;
      case 2:
        return <EventDetails formData={formData} onUpdate={updateFormData} onNext={() => handleNext(2)} onBack={handleBack} />;
      case 3:
        return <MenuOptions formData={formData} onUpdate={updateFormData} onNext={() => handleNext(3)} onBack={handleBack} />;
      case 4:
        return <OrderSummary formData={formData} onNext={() => handleNext(4)} onBack={handleBack} />;
      case 5:
        return <PaymentStep formData={formData} onSuccess={handlePaymentSuccess} onBack={handleBack} userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Order Drop-Off Catering | Grilly Cheese"
        description="Order delicious grilled cheese catering delivered to your event. Choose your package, customize your menu, and complete your order online."
        canonicalUrl="https://grillycheese.com/order/drop-off"
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

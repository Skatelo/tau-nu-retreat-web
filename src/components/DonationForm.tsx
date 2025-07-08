import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Square: any;
  }
}

const DonationForm = () => {
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cardInstance, setCardInstance] = useState<any>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmountSelect = (amount: string) => {
    setFormData(prev => ({
      ...prev,
      amount
    }));
  };

  // Initialize Square when form shows, not on submit
  useEffect(() => {
    if (showForm && window.Square) {
      initializePayment();
    }
  }, [showForm]);

  const initializePayment = async () => {
    const payments = window.Square.payments(
      'sq0idp-eaN3yV3kJGh_350z0j3t-g',
      'LWV90YJ6MHHK7'
    );
    const card = await payments.card();
    await card.attach('#card-container');
    setCardInstance(card); // Store for later tokenization
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.donor_name || !formData.donor_email || !formData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error", 
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (!cardInstance) {
        throw new Error('Payment card not initialized');
      }

      const result = await cardInstance.tokenize();
      
      if (result.status === 'OK') {
        console.log('Payment token received:', result.token);
        
        const { data, error } = await supabase.functions.invoke('process-donation', {
          body: {
            amount,
            donor_name: formData.donor_name,
            donor_email: formData.donor_email,
            donor_phone: formData.donor_phone,
            nonce: result.token
          }
        });

        if (error) throw error;

        if (data.success) {
          toast({
            title: "Thank you!",
            description: `Your donation of $${amount} has been processed successfully.`,
          });
          
          setFormData({
            donor_name: "",
            donor_email: "",
            donor_phone: "",
            amount: ""
          });
          setShowForm(false);
        } else {
          throw new Error(data.error);
        }
      } else {
        console.error('Tokenization failed:', result.errors);
        throw new Error(result.errors?.[0]?.message || 'Payment tokenization failed');
      }
    } catch (error: any) {
      console.error('Donation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <Button 
        variant="gold" 
        size="xl" 
        onClick={() => setShowForm(true)}
        className="hover-lift"
      >
        Donate Now
      </Button>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-background border-2 border-primary rounded-lg p-6">
      <h3 className="text-xl font-bold text-primary mb-4 text-center">Make a Donation</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="donor_name" className="text-foreground">Full Name *</Label>
          <Input
            id="donor_name"
            name="donor_name"
            type="text"
            value={formData.donor_name}
            onChange={handleInputChange}
            required
            className="mt-1 bg-background text-foreground border-muted"
          />
        </div>

        <div>
          <Label htmlFor="donor_email" className="text-foreground">Email Address *</Label>
          <Input
            id="donor_email"
            name="donor_email"
            type="email"
            value={formData.donor_email}
            onChange={handleInputChange}
            required
            className="mt-1 bg-background text-foreground border-muted"
          />
        </div>

        <div>
          <Label htmlFor="donor_phone" className="text-foreground">Phone Number</Label>
          <Input
            id="donor_phone"
            name="donor_phone"
            type="tel"
            value={formData.donor_phone}
            onChange={handleInputChange}
            className="mt-1 bg-background text-foreground border-muted"
          />
        </div>

        <div>
          <Label className="text-foreground">Donation Amount *</Label>
          <div className="grid grid-cols-3 gap-2 mt-2 mb-3">
            {['25', '50', '100'].map((amount) => (
              <Button
                key={amount}
                type="button"
                variant={formData.amount === amount ? "default" : "outline"}
                onClick={() => handleAmountSelect(amount)}
                className="text-sm"
              >
                ${amount}
              </Button>
            ))}
          </div>
          <Input
            name="amount"
            type="number"
            placeholder="Enter custom amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="1"
            step="0.01"
            className="mt-1 bg-background text-foreground border-muted"
          />
        </div>

        <div>
          <Label className="text-foreground">Payment Information</Label>
          <div id="card-container" className="mt-2 p-3 border border-muted rounded-md bg-background"></div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowForm(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gold"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : "Donate"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;

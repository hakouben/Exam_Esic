
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface VoucherFormProps {
  onSubmit: (code: string, discount: number) => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error("Please enter a voucher code");
      return;
    }
    
    if (discount <= 0 || discount > 100) {
      toast.error("Discount must be between 1 and 100");
      return;
    }
    
    onSubmit(code, discount);
    setCode("");
    setDiscount(10);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="voucher-code">Voucher Code</Label>
        <Input
          id="voucher-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g., SUMMER20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="discount">Discount (%)</Label>
        <Input
          id="discount"
          type="number"
          min="1"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(parseInt(e.target.value))}
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Create Voucher</Button>
      </div>
    </form>
  );
};

export default VoucherForm;
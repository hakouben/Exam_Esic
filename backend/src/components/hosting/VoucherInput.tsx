
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { mockValidateVoucher } from "@/lib/data";

interface VoucherInputProps {
  onApply: (discount: number) => void;
}

const VoucherInput: React.FC<VoucherInputProps> = ({ onApply }) => {
  const [voucherCode, setVoucherCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleValidateVoucher = () => {
    if (!voucherCode) {
      toast.error("Please enter a voucher code");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      const voucher = mockValidateVoucher(voucherCode);
      
      if (voucher) {
        toast.success(`Voucher applied! ${voucher.discount}% discount`);
        onApply(voucher.discount);
        setIsApplied(true);
      } else {
        toast.error("Invalid or expired voucher code");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="voucher-code" className="text-sm font-medium">
        Voucher Code
      </label>
      <div className="flex space-x-2">
        <Input
          id="voucher-code"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          disabled={isLoading || isApplied}
        />
        <Button
          onClick={handleValidateVoucher}
          disabled={isLoading || isApplied}
          variant={isApplied ? "outline" : "default"}
        >
          {isLoading ? "Validating..." : isApplied ? "Applied" : "Apply"}
        </Button>
      </div>
      {isApplied && (
        <p className="text-sm text-green-600">Voucher applied successfully!</p>
      )}
    </div>
  );
};

export default VoucherInput;

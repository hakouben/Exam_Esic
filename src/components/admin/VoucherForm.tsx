import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

interface VoucherFormProps {
  onSubmit: (code: string, discount: number, expiresAt: Date, isActive: boolean) => void;
  onClose?: () => void;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ onSubmit, onClose }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<number>(10);
  const [expiresAt, setExpiresAt] = useState<Date>(new Date());
  const [isActive, setIsActive] = useState(true);

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

    onSubmit(code, discount, expiresAt, isActive);
    
    // Reset form
    setCode("");
    setDiscount(10);
    setExpiresAt(new Date());
    setIsActive(true);
    
    // Close the form
    if (onClose) onClose();
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

      <div className="space-y-2">
        <Label>Expires At</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiresAt ? format(expiresAt, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={expiresAt}
              onSelect={setExpiresAt}
              fromDate={new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="active-status" 
          checked={isActive} 
          onCheckedChange={(checked) => setIsActive(checked as boolean)}
        />
        <Label htmlFor="active-status">Active Voucher</Label>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Create Voucher</Button>
      </div>
    </form>
  );
};

export default VoucherForm;
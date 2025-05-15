import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface VoucherUpdateFormProps {
  initialVoucher?: {
    code: string;
    discount: number;
    expirationDate: string | Date;
    used: boolean;
    serviceId?: number;
  };
  onSubmit: (
    code: string,
    discount: number,
    expirationDate: Date,
    serviceId: number,
    used: boolean
  ) => void;
}

interface ServiceOffer {
  id: number;
  name: string;
}

const VoucherUpdateForm: React.FC<VoucherUpdateFormProps> = ({
  initialVoucher,
  onSubmit,
}) => {
  const [code, setCode] = useState(initialVoucher?.code || "");
  const [discount, setDiscount] = useState<number>(
    initialVoucher?.discount || 10
  );
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(
    initialVoucher?.expirationDate
      ? new Date(initialVoucher.expirationDate)
      : new Date()
  );
  const [used, setUsed] = useState(initialVoucher?.used || false);
  const [serviceId, setServiceId] = useState<number | null>(
    initialVoucher?.serviceId ?? null
  );
  const [services, setServices] = useState<ServiceOffer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/services")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || !expiresAt || !serviceId || discount <= 0 || discount > 100) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    onSubmit(code, discount, expiresAt, serviceId, used);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Voucher Code</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          disabled={!!initialVoucher?.code}
        />
      </div>

      <div className="space-y-2">
        <Label>Discount (%)</Label>
        <Input
          type="number"
          min="1"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label>Expires At</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiresAt ? format(expiresAt, "PPP") : "Pick a date"}
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

      <div className="space-y-2">
        <Label>Associated Service</Label>
        <select
          value={serviceId ?? ""}
          onChange={(e) => setServiceId(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select a service --</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="used"
          checked={used}
          onChange={() => setUsed(!used)}
        />
        <Label htmlFor="used">Used?</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialVoucher ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default VoucherUpdateForm;

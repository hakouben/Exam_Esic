// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon } from "lucide-react";
// import { format } from "date-fns";

// interface VoucherFormProps {
//   onSubmit: (code: string, discount: number, expiresAt: Date) => void;
// }

// const VoucherForm: React.FC<VoucherFormProps> = ({ onSubmit }) => {
//   const [code, setCode] = useState("");
//   const [discount, setDiscount] = useState<number>(10);
//   const [expiresAt, setExpiresAt] = useState<Date | undefined>(new Date());

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!code) {
//       toast.error("Please enter a voucher code");
//       return;
//     }

//     if (discount <= 0 || discount > 100) {
//       toast.error("Discount must be between 1 and 100");
//       return;
//     }

//     if (!expiresAt) {
//       toast.error("Please select an expiry date");
//       return;
//     }

//     onSubmit(code, discount, expiresAt);
//     setCode("");
//     setDiscount(10);
//     setExpiresAt(new Date());
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="voucher-code">Voucher Code</Label>
//         <Input
//           id="voucher-code"
//           value={code}
//           onChange={(e) => setCode(e.target.value.toUpperCase())}
//           placeholder="e.g., SUMMER20"
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="discount">Discount (%)</Label>
//         <Input
//           id="discount"
//           type="number"
//           min="1"
//           max="100"
//           value={discount}
//           onChange={(e) => setDiscount(parseInt(e.target.value))}
//         />
//       </div>

//       <div className="space-y-2">
//         <Label>Expires At</Label>
//         <Popover>
//           <PopoverTrigger asChild>
//             <Button
//               variant={"outline"}
//               className="w-full justify-start text-left font-normal"
//             >
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               {expiresAt ? format(expiresAt, "PPP") : <span>Pick a date</span>}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-auto p-0">
//             <Calendar
//               mode="single"
//               selected={expiresAt}
//               onSelect={setExpiresAt}
//               fromDate={new Date()}
//               initialFocus
//             />
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div className="flex justify-end">
//         <Button type="submit">Create Voucher</Button>
//       </div>
//     </form>
//   );
// };

// export default VoucherForm;

import React, { useState, useEffect } from "react";
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

interface VoucherFormProps {
  onSuccess?: () => void;
}

interface ServiceOffer {
  id: number;
  name: string;
}

const VoucherForm: React.FC<VoucherFormProps> = ({ onSuccess }) => {
  console.log("dkhalll fl voucher form");

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<number>(10);
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(new Date());
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceOffer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/services")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Failed to load services"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || discount <= 0 || !expiresAt || !serviceId) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8082/admin/voucher", {
        code,
        discount,
        expirationDate: expiresAt,
        used: false,
        service: { id: serviceId },
      });
      toast.success("Voucher created");
      setCode("");
      setDiscount(10);
      setExpiresAt(new Date());
      setServiceId(null);
      onSuccess?.();
      setTimeout(() => {
        window.location.reload(); // Rafraîchit la page après 2s
      }, 2000);
    } catch (err) {
      toast.error("Failed to create voucher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="code">Voucher Code</Label>
        <Input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount">Discount (%)</Label>
        <Input
          id="discount"
          type="number"
          value={discount}
          min={1}
          max={100}
          onChange={(e) => setDiscount(Number(e.target.value))}
          required
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

      <div className="space-y-2">
        <Label htmlFor="service">Service</Label>
        <select
          id="service"
          name="service"
          value={serviceId ?? ""}
          onChange={(e) => setServiceId(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
          required
        >
          <option value="">-- Select Service --</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Voucher"}
        </Button>
      </div>
    </form>
  );
};

export default VoucherForm;

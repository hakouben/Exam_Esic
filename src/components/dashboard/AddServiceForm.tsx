import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ServiceOffer } from "@/lib/types";

const defaultForm: ServiceOffer = {
  name: "",
  type: "MUTUALIZED",
  price: 0,
  cpuCores: 1,
  ramGb: 1,
  ssdStorageGb: 10,
  websiteCount: 1,
  emailAccounts: 1,
  sslIncluded: false,
  bandwidthUnlimited: false,
  supportLevel: "BASIC",
  domainIncluded: false,
  cdnIncluded: false,
};

const AddServiceForm = () => {
  const [form, setForm] = useState<ServiceOffer>(defaultForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8082/services", form);
      toast.success("Service added successfully");
      setForm(defaultForm);
      window.location.reload();
    } catch (err) {
      toast.error("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="MUTUALIZED">Mutualized</option>
          <option value="VPS">VPS</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>CPU Cores</Label>
          <Input
            type="number"
            name="cpuCores"
            value={form.cpuCores}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>RAM (GB)</Label>
          <Input
            type="number"
            name="ramGb"
            value={form.ramGb}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>SSD Storage (GB)</Label>
          <Input
            type="number"
            name="ssdStorageGb"
            value={form.ssdStorageGb}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Website Count</Label>
          <Input
            type="number"
            name="websiteCount"
            value={form.websiteCount}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Email Accounts</Label>
          <Input
            type="number"
            name="emailAccounts"
            value={form.emailAccounts}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sslIncluded"
            checked={form.sslIncluded}
            onChange={handleChange}
          />
          <Label>SSL Included</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="bandwidthUnlimited"
            checked={form.bandwidthUnlimited}
            onChange={handleChange}
          />
          <Label>Unlimited Bandwidth</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="domainIncluded"
            checked={form.domainIncluded}
            onChange={handleChange}
          />
          <Label>Domain Included</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="cdnIncluded"
            checked={form.cdnIncluded}
            onChange={handleChange}
          />
          <Label>CDN Included</Label>
        </div>
      </div>

      <div>
        <Label>Support Level</Label>
        <select
          name="supportLevel"
          value={form.supportLevel}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="BASIC">Basic</option>
          <option value="PRIORITY">Priority</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Add Service"}
      </Button>
    </form>
  );
};

export default AddServiceForm;

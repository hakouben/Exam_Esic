
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { HostingPlan } from "@/lib/types";

interface PlanFormProps {
  onSubmit: (plan: Omit<HostingPlan, "id">) => void;
  initialPlan?: HostingPlan;
}

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, initialPlan }) => {
  const [name, setName] = useState(initialPlan?.name || "");
  const [type, setType] = useState<"MUTUALIZED" | "VPS">(initialPlan?.type || "MUTUALIZED");
  const [cpuCores, setCpuCores] = useState(initialPlan?.cpuCores || 1);
  const [ramMb, setRamMb] = useState(initialPlan?.ramMb || 1024);
  const [storageGb, setStorageGb] = useState(initialPlan?.storageGb || 10);
  const [bandwidth, setBandwidth] = useState(initialPlan?.bandwidth || "1 TB");
  const [price, setPrice] = useState(initialPlan?.price || 5.99);
  const [features, setFeatures] = useState<string[]>(initialPlan?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [popular, setPopular] = useState(initialPlan?.popular || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast.error("Please enter a plan name");
      return;
    }
    
    if (features.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }
    
    onSubmit({
      name,
      type,
      cpuCores,
      ramMb,
      storageGb,
      bandwidth,
      price,
      features,
      popular,
    });
  };

  const addFeature = () => {
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="plan-name">Plan Name</Label>
          <Input
            id="plan-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Basic VPS"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="plan-type">Type</Label>
          <Select value={type} onValueChange={(value) => setType(value as "MUTUALIZED" | "VPS")}>
            <SelectTrigger id="plan-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MUTUALIZED">Shared Hosting</SelectItem>
              <SelectItem value="VPS">VPS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cpu-cores">CPU Cores</Label>
          <Input
            id="cpu-cores"
            type="number"
            min="1"
            value={cpuCores}
            onChange={(e) => setCpuCores(parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ram">RAM (MB)</Label>
          <Input
            id="ram"
            type="number"
            min="512"
            step="512"
            value={ramMb}
            onChange={(e) => setRamMb(parseInt(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="storage">Storage (GB)</Label>
          <Input
            id="storage"
            type="number"
            min="1"
            value={storageGb}
            onChange={(e) => setStorageGb(parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bandwidth">Bandwidth</Label>
          <Input
            id="bandwidth"
            value={bandwidth}
            onChange={(e) => setBandwidth(e.target.value)}
            placeholder="e.g., 1 TB or Unlimited"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price ($/month)</Label>
          <Input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="popular"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-hosting-blue focus:ring-hosting-blue"
          />
          <Label htmlFor="popular">Mark as Popular</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Features</Label>
        <div className="flex space-x-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="e.g., Free SSL Certificate"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature}>
            Add
          </Button>
        </div>
        
        <ul className="mt-3 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span>{feature}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(index)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">
          {initialPlan ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { HostingPlan } from "@/lib/types";

interface PricingCardProps {
  plan: HostingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div className={`relative rounded-lg border bg-card text-card-foreground shadow-sm ${plan.popular ? "border-hosting-blue" : ""}`}>
      {plan.popular && (
        <div className="absolute -top-3 inset-x-0 flex justify-center">
          <span className="inline-block bg-hosting-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-extrabold">${plan.price}</span>
          <span className="ml-1 text-sm font-medium text-muted-foreground">/mo</span>
        </div>
        <ul className="mt-6 space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-muted/60 px-6 py-4">
        <div className="flex flex-col space-y-2">
          <Link to={`/order/${plan.id}`}>
            <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;

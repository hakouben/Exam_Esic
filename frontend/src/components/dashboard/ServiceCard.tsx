
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HostingPlan, Order } from "@/lib/types";
import { Server, Calendar, Database, Globe } from "lucide-react";

interface ServiceCardProps {
  order: Order;
  plan: HostingPlan;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ order, plan }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            order.status === "ACTIVE" 
              ? "bg-green-100 text-green-800" 
              : order.status === "PENDING" 
              ? "bg-yellow-100 text-yellow-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          <span>Activated on {formatDate(order.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">Type</div>
            <div className="flex items-center text-sm">
              <Server className="mr-1 h-4 w-4 text-hosting-blue" />
              {plan.type === "MUTUALIZED" ? "Shared Hosting" : "VPS"}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-medium">Storage</div>
            <div className="flex items-center text-sm">
              <Database className="mr-1 h-4 w-4 text-hosting-blue" />
              {plan.storageGb} GB SSD
            </div>
          </div>
          {order.ipAddress && (
            <div className="flex flex-col space-y-1 col-span-2">
              <div className="text-sm font-medium">IP Address</div>
              <div className="flex items-center text-sm">
                <Globe className="mr-1 h-4 w-4 text-hosting-blue" />
                {order.ipAddress}
              </div>
            </div>
          )}
          {order.sshCredentials && (
            <div className="col-span-2 mt-2 p-3 bg-gray-50 rounded-md">
              <div className="text-sm font-medium mb-2">SSH Credentials</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-gray-500">Host</div>
                  <div className="text-sm font-mono">{order.sshCredentials.host}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Username</div>
                  <div className="text-sm font-mono">{order.sshCredentials.username}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500">Password</div>
                  <div className="text-sm font-mono">{order.sshCredentials.password}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm">
          Manage
        </Button>
        <Button size="sm">Control Panel</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

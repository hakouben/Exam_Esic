
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import VoucherInput from "@/components/hosting/VoucherInput";
import FeatureList from "@/components/ui/FeatureList";
import { hostingPlans } from "@/lib/data";
import { isAuthenticated, getAuthenticatedUser } from "@/lib/authUtils";
import { toast } from "sonner";
import { mockCreateOrder } from "@/lib/data";
import { AlertTriangle, Check } from "lucide-react";

const OrderPage = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(hostingPlans.find(p => p.id === planId));
  const [discount, setDiscount] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const isLoggedIn = isAuthenticated();
  const user = getAuthenticatedUser();

  useEffect(() => {
    if (!plan) {
      toast.error("Plan not found");
      navigate("/");
    }
  }, [plan, navigate]);

  if (!plan) {
    return null;
  }

  const handleApplyVoucher = (discountPercent: number) => {
    setDiscount(discountPercent);
    toast.success(`${discountPercent}% discount applied!`);
  };

  const calculateTotal = () => {
    if (discount > 0) {
      const discountAmount = (plan.price * discount) / 100;
      return (plan.price - discountAmount).toFixed(2);
    }
    return plan.price.toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      toast.error("Please login to continue");
      navigate("/auth");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms of service");
      return;
    }

    setIsProcessing(true);
    
    // Simulate order creation
    setTimeout(() => {
      if (user) {
        mockCreateOrder(user.id, plan.id);
        setOrderComplete(true);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Complete Your Order</h1>
            <p className="text-gray-600">
              You're just a few steps away from your new hosting service
            </p>
          </div>
          
          {orderComplete ? (
            <Card className="mb-8">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-center">Order Completed Successfully!</CardTitle>
                <CardDescription className="text-center">
                  Your hosting service is being set up and will be ready shortly.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="mb-6">
                  Thank you for choosing HostPro! You can view and manage your services in your dashboard.
                </p>
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                      Reviewing your selected plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <p className="text-sm text-gray-500">
                          {plan.type === "MUTUALIZED" ? "Shared Hosting Plan" : "Virtual Private Server"}
                        </p>
                      </div>
                      <div className="text-lg font-bold">
                        ${plan.price.toFixed(2)}/mo
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 pb-2">
                      <h4 className="font-medium mb-3">Plan Specifications</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">CPU</p>
                          <p>{plan.cpuCores} {plan.cpuCores === 1 ? "Core" : "Cores"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">RAM</p>
                          <p>{plan.ramMb / 1024} GB</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Storage</p>
                          <p>{plan.storageGb} GB SSD</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bandwidth</p>
                          <p>{plan.bandwidth}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 pb-2">
                      <h4 className="font-medium mb-3">Included Features</h4>
                      <FeatureList features={plan.features} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Discount</CardTitle>
                    <CardDescription>
                      Have a voucher code? Apply it here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VoucherInput onApply={handleApplyVoucher} />
                  </CardContent>
                </Card>
                
                {!isLoggedIn && (
                  <Card className="mb-8 border-yellow-200">
                    <CardHeader className="bg-yellow-50 border-b border-yellow-200">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <CardTitle className="text-lg">Not Logged In</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="mb-4">
                        You need to be logged in to complete your purchase.
                      </p>
                      <div className="flex gap-4">
                        <Link to="/auth">
                          <Button>Login</Button>
                        </Link>
                        <Link to="/auth?register=true">
                          <Button variant="outline">Create Account</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Price</span>
                          <span>${plan.price.toFixed(2)}/mo</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%)</span>
                            <span>-${((plan.price * discount) / 100).toFixed(2)}/mo</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 mt-2"></div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${calculateTotal()}/mo</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={agreedToTerms}
                          onChange={() => setAgreedToTerms(!agreedToTerms)}
                          className="mt-1"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                          I agree to the{" "}
                          <a href="#" className="text-hosting-blue hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-hosting-blue hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={!agreedToTerms || isProcessing || !isLoggedIn}
                        className="w-full"
                      >
                        {isProcessing ? "Processing..." : "Complete Order"}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PlanForm from "@/components/admin/PlanForm";
import VoucherForm from "@/components/admin/VoucherForm";
import { isAuthenticated, isAdmin } from "@/lib/authUtils";
import { hostingPlans, vouchers, orders, createAdmin } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";
import { HostingPlan } from "@/lib/types";
import { Plus, Edit, Trash2, CircleOff, ShieldPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState(hostingPlans);
  const [voucherList, setVoucherList] = useState(vouchers);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [createAdminDialogOpen, setCreateAdminDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<HostingPlan | undefined>(undefined);
  
  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [navigate]);

  // Admin creation form schema
  const adminFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." })
  });

  type AdminFormValues = z.infer<typeof adminFormSchema>;

  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const handleCreateAdmin = (values: AdminFormValues) => {
    try {
      const newAdmin = createAdmin(values.name, values.email, values.password);
      toast({
        title: "Admin Created",
        description: `${newAdmin.name} has been added as an admin.`
      });
      setCreateAdminDialogOpen(false);
      adminForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create admin. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCreatePlan = (plan: Omit<HostingPlan, "id">) => {
    const newPlan: HostingPlan = {
      ...plan,
      id: `plan-${Date.now()}`
    };
    
    setPlans([...plans, newPlan]);
    toast.success("Plan created successfully!");
    setPlanDialogOpen(false);
  };

  const handleUpdatePlan = (plan: Omit<HostingPlan, "id">) => {
    if (!editingPlan) return;
    
    const updatedPlan: HostingPlan = {
      ...plan,
      id: editingPlan.id
    };
    
    setPlans(plans.map(p => p.id === editingPlan.id ? updatedPlan : p));
    toast.success("Plan updated successfully!");
    setPlanDialogOpen(false);
    setEditingPlan(undefined);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== planId));
      toast.success("Plan deleted successfully!");
    }
  };

  const handleEditPlan = (plan: HostingPlan) => {
    setEditingPlan(plan);
    setPlanDialogOpen(true);
  };

const handleCreateVoucher = (code: string, discount: number, expiresAt: Date, isActive: boolean) => {
  const newVoucher = {
    id: `voucher-${Date.now()}`,
    code,
    discount,
    status: isActive, // Use the isActive parameter directly
    expiresAt: expiresAt.toISOString() // Convert Date to string
  };
  
  setVoucherList([...voucherList, newVoucher]);
  toast.success("Voucher created successfully!");
  setVoucherDialogOpen(false); // This will close the dialog
};
  const handleDeleteVoucher = (voucherId: string) => {
    if (confirm("Are you sure you want to delete this voucher?")) {
      setVoucherList(voucherList.filter(v => v.id !== voucherId));
      toast.success("Voucher deleted successfully!");
    }
  };
  const updateVoucherStatus = (voucherId: string) => {
    setVoucherList(voucherList.map(v => 
      v.id === voucherId ? { ...v, status: !v.status } : v
    ));
    toast.success(`Voucher marked as ${voucherList.find(v => v.id === voucherId)?.status ? "Invalid" : "Active"}!`);
  };

  if (!isAuthenticated() || !isAdmin()) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            <Dialog open={createAdminDialogOpen} onOpenChange={setCreateAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <ShieldPlus className="mr-2 h-4 w-4" />
                  Create New Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Admin User</DialogTitle>
                </DialogHeader>
                <Form {...adminForm}>
                  <form onSubmit={adminForm.handleSubmit(handleCreateAdmin)} className="space-y-4 pt-4">
                    <FormField
                      control={adminForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="admin@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={adminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end pt-2">
                      <Button type="submit">Create Admin</Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="plans">
            <TabsList className="mb-6">
              <TabsTrigger value="plans">Hosting Plans</TabsTrigger>
              <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Hosting Plans</h2>
                <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingPlan(undefined)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingPlan ? "Edit Hosting Plan" : "Create New Hosting Plan"}</DialogTitle>
                    </DialogHeader>
                    <PlanForm 
                      onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}
                      initialPlan={editingPlan}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {plans.map(plan => (
                  <Card key={plan.id}>
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {plan.type === "MUTUALIZED" ? "Shared Hosting" : "VPS"} - ${plan.price}/mo
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 mt-4">
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
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Features</p>
                        <ul className="text-sm">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="mb-1">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="vouchers">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Voucher Codes</CardTitle>
                    <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Generate Voucher
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Create New Voucher</DialogTitle>
                        </DialogHeader>
                        <VoucherForm onSubmit={handleCreateVoucher} onClose={() => setVoucherDialogOpen(false)} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-5 gap-4 px-4 py-3 font-medium bg-gray-50">
                      <div>Code</div>
                      <div>Discount (%)</div>
                      <div>Status</div>
                      <div>Actions</div>
                      <div>Expiry Date</div>
                    </div>
                    {voucherList.map((voucher, index) => (
                      <div key={index} className="grid grid-cols-5 gap-4 px-4 py-3 items-center">
                        <div className="font-mono">{voucher.code}</div>
                        <div>{voucher.discount}%</div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            voucher.status ? "bg-green-100 text-green-800": "bg-gray-100 text-gray-800"
                          }`}>
                            {voucher.status ? "Active" : "Invalid"}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8" 
                            onClick={() => updateVoucherStatus(voucher.id)}
                          >
                            <CircleOff className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" size="sm" className="h-8" onClick={() => handleDeleteVoucher(voucher.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600">
                          {voucher.expiresAt ? new Date(voucher.expiresAt).toLocaleDateString() : 'No expiry'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-5 gap-4 px-4 py-3 font-medium bg-gray-50">
                      <div>Order ID</div>
                      <div>User</div>
                      <div>Plan</div>
                      <div>Date</div>
                      <div>Status</div>
                    </div>
                    {orders.map((order, index) => {
                      const plan = hostingPlans.find(p => p.id === order.planId);
                      return (
                        <div key={index} className="grid grid-cols-5 gap-4 px-4 py-3">
                          <div className="font-mono text-sm">{order.id}</div>
                          <div>{order.userId}</div>
                          <div>{plan?.name}</div>
                          <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                          <div>
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
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import PlanForm from "@/components/admin/PlanForm";
// import VoucherForm from "@/components/admin/VoucherForm";
// import { isAuthenticated, isAdmin } from "@/lib/authUtils";
// import { hostingPlans, vouchers, orders } from "@/lib/data";
// import { toast } from "sonner";
// import { HostingPlan } from "@/lib/types";
// import { Plus, Edit, Trash2, CircleOff } from "lucide-react";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [plans, setPlans] = useState(hostingPlans);
//   const [voucherList, setVoucherList] = useState(vouchers);
//   const [planDialogOpen, setPlanDialogOpen] = useState(false);
//   const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState<HostingPlan | undefined>(undefined);

//   useEffect(() => {
//     if (!isAuthenticated() || !isAdmin()) {
//       toast.error("You don't have permission to access this page");
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleCreatePlan = (plan: Omit<HostingPlan, "id">) => {
//     const newPlan: HostingPlan = {
//       ...plan,
//       id: `plan-${Date.now()}`
//     };

//     setPlans([...plans, newPlan]);
//     toast.success("Plan created successfully!");
//     setPlanDialogOpen(false);
//   };

//   const handleUpdatePlan = (plan: Omit<HostingPlan, "id">) => {
//     if (!editingPlan) return;

//     const updatedPlan: HostingPlan = {
//       ...plan,
//       id: editingPlan.id
//     };

//     setPlans(plans.map(p => p.id === editingPlan.id ? updatedPlan : p));
//     toast.success("Plan updated successfully!");
//     setPlanDialogOpen(false);
//     setEditingPlan(undefined);
//   };

//   const handleDeletePlan = (planId: string) => {
//     if (confirm("Are you sure you want to delete this plan?")) {
//       setPlans(plans.filter(p => p.id !== planId));
//       toast.success("Plan deleted successfully!");
//     }
//   };

//   const handleEditPlan = (plan: HostingPlan) => {
//     setEditingPlan(plan);
//     setPlanDialogOpen(true);
//   };

//   const handleCreateVoucher = (code: string, discount: number, expiresAt: string) => {
//     const newVoucher = {
//       id: `voucher-${Date.now()}`,
//       code,
//       discount,
//       isUsed: false,
//       expiresAt
//     };

//     setVoucherList([...voucherList, newVoucher]);
//     toast.success("Voucher created successfully!");
//     setVoucherDialogOpen(false);
//   };

//   const handleDeleteVoucher = (voucherId: number) => {
//     if (confirm("Are you sure you want to delete this voucher?")) {
//       setVoucherList(voucherList.filter(v => v.id !== voucherId));
//       toast.success("Voucher deleted successfully!");
//     }
//   };
//   const updateVoucherStatus = (voucherId: number) => {
//     setVoucherList(voucherList.map(v =>
//       v.id === voucherId ? { ...v, isUsed: !v.isUsed } : v
//     ));
//     toast.success(`Voucher marked as ${voucherList.find(v => v.id === voucherId)?.isUsed ? "Active" : "Invalid"}!`);
//   };

//   if (!isAuthenticated() || !isAdmin()) {
//     return null; // Will redirect via useEffect
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-grow bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//             <p className="text-gray-600">
//               Manage hosting plans, vouchers, and view orders
//             </p>
//           </div>

//           <Tabs defaultValue="plans">
//             <TabsList className="mb-6">
//               <TabsTrigger value="plans">Hosting Plans</TabsTrigger>
//               <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
//               <TabsTrigger value="orders">Orders</TabsTrigger>
//             </TabsList>

//             <TabsContent value="plans">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Manage Hosting Plans</h2>
//                 <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
//                   <DialogTrigger asChild>
//                     <Button onClick={() => setEditingPlan(undefined)}>
//                       <Plus className="mr-2 h-4 w-4" />
//                       Add New Plan
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
//                     <DialogHeader>
//                       <DialogTitle>{editingPlan ? "Edit Hosting Plan" : "Create New Hosting Plan"}</DialogTitle>
//                     </DialogHeader>
//                     <PlanForm
//                       onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}
//                       initialPlan={editingPlan}
//                     />
//                   </DialogContent>
//                 </Dialog>
//               </div>

//               <div className="grid grid-cols-1 gap-6">
//                 {plans.map(plan => (
//                   <Card key={plan.id}>
//                     <CardHeader className="pb-0">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <CardTitle>{plan.name}</CardTitle>
//                           <CardDescription>
//                             {plan.type === "MUTUALIZED" ? "Shared Hosting" : "VPS"} - ${plan.price}/mo
//                           </CardDescription>
//                         </div>
//                         <div className="flex space-x-2">
//                           <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-4 gap-4 mt-4">
//                         <div>
//                           <p className="text-sm text-gray-500">CPU</p>
//                           <p>{plan.cpuCores} {plan.cpuCores === 1 ? "Core" : "Cores"}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">RAM</p>
//                           <p>{plan.ramMb / 1024} GB</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Storage</p>
//                           <p>{plan.storageGb} GB SSD</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Bandwidth</p>
//                           <p>{plan.bandwidth}</p>
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         <p className="text-sm text-gray-500 mb-2">Features</p>
//                         <ul className="text-sm">
//                           {plan.features.map((feature, i) => (
//                             <li key={i} className="mb-1">• {feature}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="vouchers">
//               <Card>
//                 <CardHeader>
//                   <div className="flex justify-between items-center">
//                     <CardTitle>Voucher Codes</CardTitle>
//                     <Dialog open={voucherDialogOpen} onOpenChange={setVoucherDialogOpen}>
//                       <DialogTrigger asChild>
//                         <Button>
//                           <Plus className="mr-2 h-4 w-4" />
//                           Generate Voucher
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[500px]">
//                         <DialogHeader>
//                           <DialogTitle>Create New Voucher</DialogTitle>
//                         </DialogHeader>
//                         <VoucherForm onSubmit={handleCreateVoucher} />
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="border rounded-md divide-y">
//                     <div className="grid grid-cols-5 gap-4 px-4 py-3 font-medium bg-gray-50">
//                       <div>Code</div>
//                       <div>Discount (%)</div>
//                       <div>Status</div>
//                       <div>Actions</div>
//                       <div>Expiry Date</div>
//                     </div>
//                     {voucherList.map((voucher, index) => (
//                       <div key={index} className="grid grid-cols-5 gap-4 px-4 py-3 items-center">
//                         <div className="font-mono">{voucher.code}</div>
//                         <div>{voucher.discount}%</div>
//                         <div className="flex items-center gap-2">
//                           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                             voucher.isUsed ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
//                           }`}>
//                             {voucher.isUsed ? "Invalid" : "Active"}
//                           </span>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="h-8"
//                             onClick={() => updateVoucherStatus(voucher.id)}
//                           >
//                             <CircleOff className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <div>
//                           <Button variant="outline" size="sm" className="h-8" onClick={() => handleDeleteVoucher(voucher.id)}>
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {voucher.expiresAt ? new Date(voucher.expiresAt).toLocaleDateString() : 'No expiry'}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="orders">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Orders</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="border rounded-md divide-y">
//                     <div className="grid grid-cols-5 gap-4 px-4 py-3 font-medium bg-gray-50">
//                       <div>Order ID</div>
//                       <div>User</div>
//                       <div>Plan</div>
//                       <div>Date</div>
//                       <div>Status</div>
//                     </div>
//                     {orders.map((order, index) => {
//                       const plan = hostingPlans.find(p => p.id === order.planId);
//                       return (
//                         <div key={index} className="grid grid-cols-5 gap-4 px-4 py-3">
//                           <div className="font-mono text-sm">{order.id}</div>
//                           <div>{order.userId}</div>
//                           <div>{plan?.name}</div>
//                           <div>{new Date(order.createdAt).toLocaleDateString()}</div>
//                           <div>
//                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                               order.status === "ACTIVE"
//                                 ? "bg-green-100 text-green-800"
//                                 : order.status === "PENDING"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}>
//                               {order.status}
//                             </span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import PlanForm from "@/components/admin/PlanForm";
import VoucherForm from "@/components/admin/VoucherForm";
import { isAuthenticated, isAdmin } from "@/lib/authUtils";
import { vouchers, orders } from "@/lib/data";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  CircleOff,
  AlertTriangle,
  ArrowUp,
} from "lucide-react";
import { ServiceOffer } from "@/lib/types"; // Utilise ton interface du modèle API
import AddServiceForm from "@/components/dashboard/AddServiceForm";
import VoucherUpdateForm from "@/components/admin/VoucherUpdateForm";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { getAuthenticatedUser } from "@/lib/authUtils";

const AdminDashboard = () => {
  const user = getAuthenticatedUser(); // récupère user connecté
  const navigate = useNavigate();
  const [plans, setPlans] = useState<ServiceOffer[]>([]);
  const [voucherList, setVoucherList] = useState(vouchers);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ServiceOffer | undefined>(
    undefined
  );

  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [voucherToEdit, setVoucherToEdit] = useState<any | null>(null);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      toast.error("You don't have permission to access this page");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/services")
      .then((res) => setPlans(res.data))
      .catch(() => toast.error("Failed to fetch hosting plans"));
  }, []);

  // const handleDeletePlan = (planId: number) => {
  //   if (confirm("Are you sure you want to delete this plan?")) {
  //     setPlans(plans.filter((p) => p.id !== planId));
  //     toast.success("Plan deleted locally (not synced with backend).");
  //   }
  // };
  const handleDeletePlan = async (planId: number) => {
    try {
      await axios.delete(`http://localhost:8082/services/${planId}`);
      setPlans(plans.filter((p) => p.id !== planId));
      toast.success("Plan deleted successfully!");
    } catch (error) {
      toast.error(
        "This service offer is currently in use and cannot be deleted."
      );
      console.error(error);
    }
  };

  const updateVoucherStatus = (voucherId: number) => {
    setVoucherList(
      voucherList.map((v) =>
        v.id === voucherId ? { ...v, isUsed: !v.isUsed } : v
      )
    );
    toast.success("Voucher status updated!");
  };

  if (!isAuthenticated() || !isAdmin()) return null;

  const [voucherListFromApi, setVoucherListFromApi] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/admin/vouchers")
      .then((res) => setVoucherListFromApi(res.data))
      .catch((err) => {
        toast.error("Failed to load vouchers");
        console.error(err);
      });
  }, []);

  console.log("voucher list", voucherListFromApi);

  const deleteVoucher = async (code: string) => {
    try {
      await axios.delete(`http://localhost:8082/admin/vouchers/${code}`);
      toast.success("Voucher deleted");

      setTimeout(() => {
        window.location.reload(); // Rafraîchit la page après 2s
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete voucher");
    }
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8082/order/my");
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      }
    };

    fetchMyOrders();
  }, []); // [] = appel uniquement au chargement

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8082/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des utilisateurs:", err);
      });
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);
  const [userToPromote, setUserToPromote] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const openPromoteModal = (id: number) => {
    setUserToPromote(id);
    setIsPromoteModalOpen(true);
  };

  const closePromoteModal = () => {
    setIsPromoteModalOpen(false);
    setUserToPromote(null);
  };

  const handleDelete = async () => {
    if (userToDelete === null) return;
    try {
      await axios.delete(`http://localhost:8082/admin/users/${userToDelete}`);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
      closeDeleteModal();
    } catch (err) {
      console.error("Erreur suppression :", err);
      // Optionnel : afficher une erreur utilisateur
    }
  };

  const handleChangeRole = async () => {
    if (userToPromote === null) return;

    try {
      const res = await axios.put(
        `http://localhost:8082/admin/users/${userToPromote}/role`
      );

      const updatedUser = res.data;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToPromote ? updatedUser : user
        )
      );

      closePromoteModal();
    } catch (err) {
      console.error("Erreur changement de rôle :", err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openModal = () => {
    setPasswordError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAdmin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // éviter comportement par défaut qui ferme modal

    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return; // Ne ferme pas le modal
    }
    setPasswordError("");

    try {
      await axios.post("http://localhost:8082/auth/register", {
        username,
        password,
        role: "ADMIN",
      });

      setUsername("");
      setPassword("");
      setIsModalOpen(false); // fermer le modal uniquement ici

      const res = await axios.get("http://localhost:8082/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur création admin:", err);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setPasswordError("");
      setUsername("");
      setPassword("");
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* modal for update voucher */}
      {showVoucherModal && voucherToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Edit Voucher</h2>

            {/* <VoucherUpdateForm
              initialVoucher={{
                code: voucherToEdit.code,
                discount: voucherToEdit.discount,
                expirationDate: voucherToEdit.expirationDate,
                used: voucherToEdit.used,
                serviceId: voucherToEdit.service?.id,
              }}
              onSubmit={(code, discount, expirationDate, serviceId, used) => {
                axios
                  .put(`http://localhost:8082/voucher/${code}`, {
                    code,
                    discount,
                    expirationDate,
                    used,
                    service: { id: serviceId },
                  })
                  .then(() => {
                    toast.success("Voucher updated");
                    setShowVoucherModal(false);
                    setVoucherToEdit(null);
                    setTimeout(() => window.location.reload(), 1000);
                  })
                  .catch(() => toast.error("Failed to update voucher"));
              }}
            /> */}
            <VoucherUpdateForm
              initialVoucher={{
                code: voucherToEdit.code,
                discount: voucherToEdit.discount,
                expirationDate: voucherToEdit.expirationDate,
                used: voucherToEdit.used,
                serviceId: voucherToEdit.service?.id,
              }}
              onSubmit={(
                updatedCode,
                discount,
                expirationDate,
                serviceId,
                used
              ) => {
                const originalCode = voucherToEdit.code; // on garde l'ancien code ici

                axios
                  .put(`http://localhost:8082/voucher/${originalCode}`, {
                    code: updatedCode, // celui potentiellement modifié
                    discount,
                    expirationDate,
                    used,
                    service: { id: serviceId },
                  })
                  .then(() => {
                    toast.success("Voucher updated");
                    setShowVoucherModal(false);
                    setVoucherToEdit(null);
                    setTimeout(() => window.location.reload(), 1000);
                  })
                  .catch(() => toast.error("Failed to update voucher"));
              }}
            />

            <button
              onClick={() => setShowVoucherModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* List user Modals  */}

      {/* Create new admin modal */}
      {isModalOpen && (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Créer un nouvel admin</AlertDialogTitle>
              <AlertDialogDescription>
                Entrez les informations de l'administrateur à créer.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Mot de passe"
                type="password"
                value={password}
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
              />

              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError}</p>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault(); // Empêche fermeture auto par défaut
                  handleCreateAdmin(e);
                }}
              >
                Créer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Modal delete confirmation */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <AlertTriangle className="text-red-500" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
              est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDeleteModal}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal promouvoir confirmation */}

      {isPromoteModalOpen && (
        <AlertDialog
          open={isPromoteModalOpen}
          onOpenChange={setIsPromoteModalOpen}
        >
          <AlertDialogContent>
            <div className="flex items-center justify-center gap-2">
              <ArrowUp className="h-6 w-6 text-blue-500" />
              <AlertDialogTitle>Confirmer la promotion</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir promouvoir cet utilisateur en admin ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closePromoteModal}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleChangeRole}>
                Promouvoir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* End List user Modals  */}

      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Manage hosting plans, vouchers, and orders
          </p>
          <div className="w-full flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Service</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Hosting Plan</DialogTitle>
                </DialogHeader>
                <AddServiceForm />
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="plans">
            <TabsList className="mb-6">
              <TabsTrigger value="plans">Hosting Plans</TabsTrigger>
              <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="users">List users</TabsTrigger>
            </TabsList>

            {/* === USERS === */}
            <TabsContent value="users">
              <Card>
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <CardTitle>All Users</CardTitle>
                  </div>
                  <div>
                    <Button onClick={openModal}>Add new admin</Button>
                  </div>
                </div>
                <CardContent className="overflow-x-auto">
                  <div className="min-w-[800px] border rounded-md divide-y">
                    <div className="grid grid-cols-4 gap-4 px-4 py-3 font-medium bg-gray-50 text-sm">
                      <div>ID</div>
                      <div>Username</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>

                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="grid grid-cols-4 gap-4 px-4 py-3 text-sm items-center"
                      >
                        <div>{u.id}</div>
                        <div>
                          {u.username}{" "}
                          {u.username === user?.name && (
                            <span className="text-gray-500">(vous)</span>
                          )}
                        </div>
                        <div>{u.role}</div>
                        <div className="flex gap-2">
                          {/* On ne montre pas le bouton supprimer si c'est l'utilisateur connecté */}
                          {u.username !== user?.name && (
                            <button
                              className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
                              onClick={() => openDeleteModal(u.id)}
                            >
                              Supprimer
                            </button>
                          )}

                          {u.role === "USER" && (
                            <button
                              className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 text-xs"
                              onClick={() => openPromoteModal(u.id)} // ouverture modal promotion
                            >
                              Promouvoir
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* === PLANS === */}
            <TabsContent value="plans">
              <div className="grid grid-cols-1 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>
                            {plan.type} - ${plan.price}/mo
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          {/* <Button variant="outline" size="sm" disabled>
                            <Edit className="h-4 w-4" />
                          </Button> */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePlan(plan.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">CPU</p>
                          <p>{plan.cpuCores} cores</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">RAM</p>
                          <p>{plan.ramGb} GB</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Storage</p>
                          <p>{plan.ssdStorageGb} GB SSD</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Websites</p>
                          <p>
                            {plan.websiteCount === -1
                              ? "Unlimited"
                              : plan.websiteCount}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Emails</p>
                          <p>
                            {plan.emailAccounts === -1
                              ? "Unlimited"
                              : plan.emailAccounts}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Support</p>
                          <p>{plan.supportLevel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">SSL</p>
                          <p>{plan.sslIncluded ? "Yes" : "No"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">CDN</p>
                          <p>{plan.cdnIncluded ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* === VOUCHERS === */}
            <TabsContent value="vouchers">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Voucher Codes</CardTitle>
                    <Dialog
                      open={voucherDialogOpen}
                      onOpenChange={setVoucherDialogOpen}
                    >
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
                        <VoucherForm
                          onSubmit={(code, discount, date) => {
                            const newVoucher = {
                              id: Date.now(),
                              code,
                              discount,
                              isUsed: false,
                              expiresAt: date,
                            };
                            setVoucherList([...voucherList, newVoucher]);
                            setVoucherDialogOpen(false);
                            toast.success("Voucher created");
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-6 gap-4 px-4 py-3 font-medium bg-gray-50">
                      <div>Code</div>
                      <div>Discount</div>
                      <div>USED</div>
                      <div>SERVICE</div>
                      <div>Expiry Date</div>
                      <div>Actions</div>
                    </div>
                    {voucherListFromApi?.map((v, i) => (
                      <div key={i} className="grid grid-cols-6 gap-4 px-4 py-3">
                        <div className="font-mono">{v.code}</div>
                        <div>{v.discount}%</div>
                        <div>{v.used ? "Yes" : "No"}</div>
                        <div>{v?.service?.name}</div>
                        <div>{v.expirationDate}</div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setVoucherToEdit(v);
                              setShowVoucherModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteVoucher(v.code)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* === ORDERS === */}
            {/* <TabsContent value="orders">
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
                    {orders.map((o, i) => (
                      <div key={i} className="grid grid-cols-5 gap-4 px-4 py-3">
                        <div className="font-mono text-sm">{o.id}</div>
                        <div>{o.userId}</div>
                        <div>
                          {plans.find((p) => p.id === o.planId)?.name || "N/A"}
                        </div>
                        <div>{new Date(o.createdAt).toLocaleDateString()}</div>
                        <div>{o.status}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>All Order Details</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="min-w-[1000px] border rounded-md divide-y">
                    <div className="grid grid-cols-6 gap-4 px-4 py-3 font-medium bg-gray-50 text-sm">
                      <div>ID</div>
                      <div>User</div>
                      <div>Plan</div>
                      <div>CPU / RAM / SSD</div>
                      <div>Price</div>
                      <div>Voucher</div>
                    </div>

                    {orders.map((o, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-6 gap-4 px-4 py-3 text-sm"
                      >
                        <div>{o.id}</div>
                        <div>{o.user?.username || "Unknown"}</div>
                        <div>{o.service?.name || "N/A"}</div>
                        <div>
                          {o.service?.cpuCores}C / {o.service?.ramGb}GB /{" "}
                          {o.service?.ssdStorageGb}GB
                        </div>
                        <div>${o.service?.price}</div>
                        <div>{o.voucher?.code || "—"}</div>
                      </div>
                    ))}
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

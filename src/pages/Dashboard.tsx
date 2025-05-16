// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ServiceCard from "@/components/dashboard/ServiceCard";
// import { isAuthenticated, getAuthenticatedUser } from "@/lib/authUtils";
// import { hostingPlans, orders } from "@/lib/data";
// import { PlusCircle } from "lucide-react";
// import { Link } from "react-router-dom";
// // Import at the top of the file
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const user = getAuthenticatedUser();

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate("/auth");
//     }
//   }, [navigate]);

//   // Filter orders for the current user
//   const userOrders = orders.filter((order) => order.userId === user?.id);

//   // Get plans for each order
//   const orderWithPlans = userOrders.map((order) => {
//     const plan = hostingPlans.find((plan) => plan.id === order.planId);
//     return { order, plan: plan! };
//   });

//   // Separate active and pending orders
//   const activeOrders = orderWithPlans.filter(
//     ({ order }) => order.status === "ACTIVE"
//   );
//   const pendingOrders = orderWithPlans.filter(
//     ({ order }) => order.status === "PENDING"
//   );

//   if (!user) {
//     console.log("user", user);
//     return null; // Will redirect via useEffect
//   }

//   const userID = localStorage.getItem("userID");

//   useEffect(() => {
//     if (!user?.id) return;

//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8082/order/user/${userID}`
//         );
//         setOrders(res.data);
//       } catch (err: any) {
//         console.error(err);
//         // toast.error(
//         //   err.response?.data ||
//         //     "Une erreur est survenue lors du chargement des commandes"
//         // );
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p className="text-gray-600">
//               Manage your hosting services and account settings
//             </p>
//           </div>

//           {/* <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Your Services</h2>
//             <Link to="/">
//               <Button>
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Add New Service
//               </Button>
//             </Link>
//           </div> */}

//           {orderWithPlans.length === 0 ? (
//             <div className="bg-white rounded-lg shadow p-8 text-center">
//               <h3 className="text-lg font-medium mb-2">No services yet</h3>
//               <p className="text-gray-500 mb-6">
//                 You haven't purchased any hosting services yet. Browse our plans
//                 to get started.
//               </p>
//               <Link to="/">
//                 <Button>View Hosting Plans</Button>
//               </Link>
//             </div>
//           ) : (
//             <Tabs defaultValue="all">
//               <TabsList className="mb-6">
//                 <TabsTrigger value="all">All Services</TabsTrigger>
//                 <TabsTrigger value="active">Active</TabsTrigger>
//                 <TabsTrigger value="pending">Pending</TabsTrigger>
//                 <TabsTrigger value="receipts">Receipts</TabsTrigger>
//               </TabsList>

//               <TabsContent value="all">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {orderWithPlans.map(({ order, plan }) => (
//                     <ServiceCard key={order.id} order={order} plan={plan} />
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="active">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {activeOrders.length > 0 ? (
//                     activeOrders.map(({ order, plan }) => (
//                       <ServiceCard key={order.id} order={order} plan={plan} />
//                     ))
//                   ) : (
//                     <div className="col-span-2 bg-white rounded-lg shadow p-6 text-center">
//                       <p className="text-gray-500">No active services found.</p>
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>

//               <TabsContent value="pending">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {pendingOrders.length > 0 ? (
//                     pendingOrders.map(({ order, plan }) => (
//                       <ServiceCard key={order.id} order={order} plan={plan} />
//                     ))
//                   ) : (
//                     <div className="col-span-2 bg-white rounded-lg shadow p-6 text-center">
//                       <p className="text-gray-500">
//                         No pending services found.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </TabsContent>
//               <TabsContent value="receipts">
//                 <div className="col-span-2 bg-white rounded-lg shadow p-6 text-center">
//                   <p className="text-gray-500">No receipts found.</p>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           )}

//           {/* Account Settings Section */}
//           <div className="mt-12">
//             <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

//             <div className="bg-white rounded-lg shadow">
//               <div className="p-6">
//                 <h3 className="text-lg font-medium mb-4">
//                   Personal Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <Label htmlFor="account-name">Name</Label>
//                     <Input id="account-name" value={user.name} readOnly />
//                   </div>
//                   <div>
//                     <Label htmlFor="account-email">Email</Label>
//                     <Input id="account-email" value={user.email} readOnly />
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 p-6">
//                 <h3 className="text-lg font-medium mb-4">
//                   Billing Information
//                 </h3>
//                 <p className="text-gray-500">No payment methods added yet.</p>
//                 <Button variant="outline" className="mt-2">
//                   Add Payment Method
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "@/components/dashboard/ServiceCard";
import { isAuthenticated, getAuthenticatedUser } from "@/lib/authUtils";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getAuthenticatedUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userID = localStorage.getItem("userID");
        const res = await axios.get(
          `http://localhost:8082/order/user/${userID}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des commandes", err);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, []);

  if (!user) return null;

  // On convertit les données pour les classer
  const activeOrders = orders.filter((order) => order.active === true);
  const pendingOrders = orders.filter((order) => order.active === false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Manage your hosting services and account settings
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No services yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't purchased any hosting services yet.
              </p>
              <Link to="/">
                <Button>View Hosting Plans</Button>
              </Link>
            </div>
          ) : (
            <Tabs defaultValue="all">
              <TabsList>
                {/* <TabsTrigger value="all">All Services</TabsTrigger> */}
                {/* <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger> */}
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {orders.map((order) => (
                    <ServiceCard key={order.id} order={order} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeOrders.length > 0 ? (
                    activeOrders.map((order) => (
                      <ServiceCard key={order.id} order={order} />
                    ))
                  ) : (
                    <div className="col-span-2 bg-white rounded-lg shadow p-6 text-center">
                      <p className="text-gray-500">No active services found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingOrders.length > 0 ? (
                    pendingOrders.map((order) => (
                      <ServiceCard key={order.id} order={order} />
                    ))
                  ) : (
                    <div className="col-span-2 bg-white rounded-lg shadow p-6 text-center">
                      <p className="text-gray-500">
                        No pending services found.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Account Settings */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="account-name">Name</Label>
                    <Input id="account-name" value={user.name} readOnly />
                  </div>
                  <div>
                    <Label htmlFor="account-email">Email</Label>
                    <Input id="account-email" value={user.email} readOnly />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-medium mb-4">
                  Billing Information
                </h3>
                <p className="text-gray-500">No payment methods added yet.</p>
                <Button variant="outline" className="mt-2">
                  Add Payment Method
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

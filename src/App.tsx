import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import OrderPage from "./pages/OrderPage";
import NotFound from "./pages/NotFound";
import Loading from "./components/ui/Loading.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/order/:planId" element={<OrderPage />} />
              <Route path="/shared-hosting" element={<Index />} />
              <Route path="/vps" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:8082/services"; // Adapte au besoin

// const token = localStorage.getItem("token"); // Ou récupère d’un contexte/auth

// const headers = {
//   headers: { Authorization: `Bearer ${token}` },
// };

// const ServiceManager = () => {
//   const [services, setServices] = useState([]);
//   const [myServices, setMyServices] = useState([]);
//   const [newService, setNewService] = useState({
//     name: "",
//     type: "",
//     specs: "",
//     price: 0,
//   });

//   // 📦 Récupérer toutes les offres
//   const fetchAllServices = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setServices(res.data);
//     } catch (err) {
//       console.error("Erreur getAllServices", err);
//     }
//   };

//   // 👤 Récupérer mes services
//   const fetchMyServices = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/my`, headers);
//       setMyServices(res.data);
//     } catch (err) {
//       console.error("Erreur getMyServices", err);
//     }
//   };

//   // 🔁 Renouveler un service
//   const renew = async (id) => {
//     try {
//       const res = await axios.post(`${API_URL}/renew/${id}`, {}, headers);
//       alert(res.data);
//     } catch (err) {
//       console.error("Erreur renewService", err);
//     }
//   };

//   // 🔐 Changer mot de passe
//   const changePassword = async (id) => {
//     try {
//       const res = await axios.post(
//         `${API_URL}/change-password/${id}`,
//         {},
//         headers
//       );
//       alert(res.data);
//     } catch (err) {
//       console.error("Erreur changePassword", err);
//     }
//   };

//   // ❌ Résilier service
//   const cancel = async (id) => {
//     try {
//       const res = await axios.post(`${API_URL}/cancel/${id}`, {}, headers);
//       alert(res.data);
//     } catch (err) {
//       console.error("Erreur cancelService", err);
//     }
//   };

//   // 🛠️ ADMIN — Ajouter une offre
//   const create = async () => {
//     try {
//       const res = await axios.post(API_URL, newService, headers);
//       alert("Offre créée");
//       fetchAllServices();
//     } catch (err) {
//       console.error("Erreur createService", err);
//     }
//   };

//   // 🛠️ ADMIN — Supprimer une offre
//   const remove = async (id) => {
//     try {
//       const res = await axios.delete(`${API_URL}/${id}`, headers);
//       alert("Offre supprimée");
//       fetchAllServices();
//     } catch (err) {
//       console.error("Erreur deleteService", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllServices();
//     fetchMyServices();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">🎯 Toutes les offres</h2>
//       <ul>
//         {services.map((s) => (
//           <li key={s.id} className="mb-2">
//             {s.name} - {s.type}
//             <button
//               onClick={() => remove(s.id)}
//               className="ml-2 bg-red-500 text-white px-2"
//             >
//               Supprimer
//             </button>
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-xl font-bold mt-8 mb-4">👤 Mes services</h2>
//       <ul>
//         {myServices.map((vm) => (
//           <li key={vm.id} className="mb-2">
//             {vm.ip} - {vm.status}
//             <button
//               onClick={() => renew(vm.id)}
//               className="ml-2 bg-blue-500 text-white px-2"
//             >
//               Renouveler
//             </button>
//             <button
//               onClick={() => changePassword(vm.id)}
//               className="ml-2 bg-yellow-500 text-white px-2"
//             >
//               🔒 MDP
//             </button>
//             <button
//               onClick={() => cancel(vm.id)}
//               className="ml-2 bg-red-400 text-white px-2"
//             >
//               ❌ Résilier
//             </button>
//           </li>
//         ))}
//       </ul>

//       <h2 className="text-xl font-bold mt-8 mb-2">
//         ➕ Créer une nouvelle offre (ADMIN)
//       </h2>
//       <input
//         type="text"
//         placeholder="Nom"
//         className="border p-1 mr-2"
//         onChange={(e) => setNewService({ ...newService, name: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Type"
//         className="border p-1 mr-2"
//         onChange={(e) => setNewService({ ...newService, type: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Specs"
//         className="border p-1 mr-2"
//         onChange={(e) =>
//           setNewService({ ...newService, specs: e.target.value })
//         }
//       />
//       <input
//         type="number"
//         placeholder="Prix"
//         className="border p-1 mr-2"
//         onChange={(e) =>
//           setNewService({ ...newService, price: parseFloat(e.target.value) })
//         }
//       />
//       <button onClick={create} className="bg-green-600 text-white px-4 py-1">
//         Créer
//       </button>
//     </div>
//   );
// };

// export default ServiceManager;

// import React, { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8082/auth/login", form, {
//         headers: { "Content-Type": "application/json" },
//       });
//       setMessage("✅ Login successful: " + res.data);
//       localStorage.setItem("token", res.data);
//     } catch (err) {
//       setMessage("❌ Login failed: " + (err.response?.data || "Server error"));
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";

// const OrderForm = () => {
//   const [order, setOrder] = useState({
//     os: "Debian",
//     machineName: "vps-username",
//     ip: "192.168.0.150",
//     active: true,
//     date: new Date().toISOString().split("T")[0], // format YYYY-MM-DD
//     service: { id: 2 }, // Exemple : VPS S1
//     // voucher: { code: "houssem32" }, // facultatif
//   });

//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrder((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       const res = await axios.post("http://localhost:8082/order", order, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setMsg("✅ Commande passée avec succès !");
//       console.log(res.data);
//     } catch (err) {
//       setMsg("❌ Erreur : " + (err.response?.data || "Échec serveur"));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Nouvelle Commande</h2>

//       <input
//         name="os"
//         placeholder="OS"
//         value={order.os}
//         onChange={handleChange}
//       />
//       <input
//         name="machineName"
//         placeholder="Nom machine"
//         value={order.machineName}
//         onChange={handleChange}
//       />
//       <input
//         name="ip"
//         placeholder="Adresse IP"
//         value={order.ip}
//         onChange={handleChange}
//       />
//       <input
//         name="date"
//         type="date"
//         value={order.date}
//         onChange={handleChange}
//       />
//       <input
//         name="service.id"
//         placeholder="Service ID"
//         value={order.service.id}
//         onChange={(e) =>
//           setOrder((prev) => ({
//             ...prev,
//             service: { id: parseInt(e.target.value) },
//           }))
//         }
//       />
//       {/* <input
//         name="voucher.code"
//         placeholder="Code bon (facultatif)"
//         value={order.voucher.code}
//         onChange={(e) =>
//           setOrder((prev) => ({ ...prev, voucher: { code: e.target.value } }))
//         }
//       /> */}

//       <button type="submit">Passer la commande</button>
//       {msg && <p>{msg}</p>}
//     </form>
//   );
// };

// export default OrderForm;

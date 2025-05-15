import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [order, setOrder] = useState({
    os: "Debian",
    machineName: "vps-username",
    ip: "192.168.0.150",
    active: true,
    date: new Date().toISOString().split("T")[0], // format YYYY-MM-DD
    service: { id: 4 }, // Exemple : VPS S1
    // voucher: { code: "houssem32" }, // facultatif
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:8082/order", order, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMsg("✅ Commande passée avec succès !");
      console.log(res.data);
    } catch (err) {
      setMsg("❌ Erreur : " + (err.response?.data || "Échec serveur"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nouvelle Commande</h2>

      <input
        name="os"
        placeholder="OS"
        value={order.os}
        onChange={handleChange}
      />
      <input
        name="machineName"
        placeholder="Nom machine"
        value={order.machineName}
        onChange={handleChange}
      />
      <input
        name="ip"
        placeholder="Adresse IP"
        value={order.ip}
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        value={order.date}
        onChange={handleChange}
      />
      <input
        name="service.id"
        placeholder="Service ID"
        value={order.service.id}
        onChange={(e) =>
          setOrder((prev) => ({
            ...prev,
            service: { id: parseInt(e.target.value) },
          }))
        }
      />
      {/* <input
        name="voucher.code"
        placeholder="Code bon (facultatif)"
        value={order.voucher.code}
        onChange={(e) =>
          setOrder((prev) => ({ ...prev, voucher: { code: e.target.value } }))
        }
      /> */}

      <button type="submit">Passer la commande</button>
      {msg && <p>{msg}</p>}
    </form>
  );
};

export default OrderForm;

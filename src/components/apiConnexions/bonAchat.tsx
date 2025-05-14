import React, { useState } from "react";
import axios from "axios";

function CreateVoucherForm() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const result = await axios.post(
        "http://localhost:8082/admin/voucher",
        {
          code: code,
          discount: 20.0,
          expirationDate: "2025-12-31",
          used: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse(result.data);
    } catch (error) {
      console.error("Erreur lors de la création du voucher", error);
      setResponse(error.response?.data || "Erreur inconnue");
    }
  };

  return (
    <div>
      <h2>Créer un bon d&apos;achat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Code du bon"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <p>
          🎁 Réduction : <strong>20%</strong>
        </p>
        <p>
          📅 Expire le : <strong>2025-12-31</strong>
        </p>
        <p>
          ✅ Utilisé : <strong>false</strong>
        </p>
        <button type="submit">Créer le bon</button>
      </form>

      {response && (
        <div>
          <h4>Résultat :</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CreateVoucherForm;

import React, { useState } from "react";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");

  const register = async () => {
    const userData = {
      username,
      password,
      role, // peut être "USER" ou "ADMIN"
    };

    try {
      const response = await fetch("http://localhost:8082/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erreur d'enregistrement");
      }

      const data = await response.json();
      setMessage("Inscription réussie pour " + data.username);
    } catch (err) {
      setMessage("Erreur : " + err.message);
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">Utilisateur</option>
        <option value="ADMIN">Administrateur</option>
      </select>
      <br />
      <button onClick={register}>S'inscrire</button>
      <p>{message}</p>
    </div>
  );
}

export default RegisterForm;

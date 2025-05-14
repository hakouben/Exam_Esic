import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/auth/login", {
        username: email,
        password: password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      console.log(response)

      // Stocker le token et les infos utilisateur
      localStorage.setItem("token", response.data);
      localStorage.setItem("username", email);
      localStorage.setItem("role", role);

      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } catch (err: any) {
      setLoginError(err.response?.data || "Erreur lors de la connexion");
    }
  };

  // REGISTER
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (!email || !password || !name || !confirmPassword) {
      setRegisterError("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setRegisterError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      await axios.post("http://localhost:8082/auth/register", {
        username: email,
        password: password,
        name: name,
        role: role,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      toast.success("Compte créé avec succès !");
      setActiveTab("login");
      setEmail(""); setPassword(""); setName(""); setConfirmPassword("");
    } catch (err: any) {
      setRegisterError(err.response?.data || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          {/* LOGIN FORM */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <Button type="submit" className="w-full">Se connecter</Button>
            </form>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
              <Button type="submit" className="w-full">S'inscrire</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
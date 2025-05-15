// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner";
// import { login, isAuthenticated } from "@/lib/authUtils";
// import { Server } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const [registerError, setRegisterError] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const searchParams = new URLSearchParams(location.search);
//   const registerParam = searchParams.get("register");

//   const [activeTab, setActiveTab] = useState(
//     registerParam === "true" ? "register" : "login"
//   );

//   useEffect(() => {
//     // If user is already logged in, redirect to dashboard
//     if (isAuthenticated()) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoginError("");

//     if (!email || !password) {
//       setLoginError("Please fill in all fields");
//       return;
//     }

//     const user = login(email, password);

//     if (user) {
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } else {
//       setLoginError("Invalid email or password");
//     }
//   };

//   const handleRegister = (e: React.FormEvent) => {
//     e.preventDefault();
//     setRegisterError("");

//     if (!email || !password || !name || !confirmPassword) {
//       setRegisterError("Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setRegisterError("Passwords do not match");
//       return;
//     }

//     if (password.length < 8) {
//       setRegisterError("Password must be at least 8 characters long");
//       return;
//     }

//     // For demo purposes, just log the user in
//     const user = login(email, password);

//     if (user) {
//       toast.success("Registration successful!");
//       navigate("/dashboard");
//     } else {
//       // For demo, we'll simulate a successful registration
//       toast.success("Account created successfully! Please log in.");
//       setActiveTab("login");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <Card className="w-full max-w-md">
//           <CardHeader className="space-y-1">
//             <div className="flex justify-center mb-4">
//               <Server className="h-12 w-12 text-hosting-blue" />
//             </div>
//             <CardTitle className="text-2xl text-center">
//               Welcome to HostPro
//             </CardTitle>
//             <CardDescription className="text-center">
//               Enter your credentials to access your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-2 mb-6">
//                 <TabsTrigger value="login">Login</TabsTrigger>
//                 <TabsTrigger value="register">Register</TabsTrigger>
//               </TabsList>

//               <TabsContent value="login">
//                 <form onSubmit={handleLogin} className="space-y-4">
//                   {loginError && (
//                     <Alert
//                       variant="destructive"
//                       className="bg-red-50 border-red-200 text-red-800"
//                     >
//                       <AlertDescription>{loginError}</AlertDescription>
//                     </Alert>
//                   )}
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="name@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <Label htmlFor="password">Password</Label>
//                       <a
//                         href="#"
//                         className="text-xs text-hosting-blue hover:underline"
//                       >
//                         Forgot password?
//                       </a>
//                     </div>
//                     <Input
//                       id="password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   <Button type="submit" className="w-full">
//                     Sign In
//                   </Button>
//                   <div className="text-center text-xs text-gray-500">
//                     <p className="mb-1">Demo Login:</p>
//                     <p>Email: user@example.com</p>
//                     <p>Password: password</p>
//                     <p className="mt-1">Admin Login:</p>
//                     <p>Email: admin@example.com</p>
//                     <p>Password: admin</p>
//                   </div>
//                 </form>
//               </TabsContent>

//               <TabsContent value="register">
//                 <form onSubmit={handleRegister} className="space-y-4">
//                   {registerError && (
//                     <Alert
//                       variant="destructive"
//                       className="bg-red-50 border-red-200 text-red-800"
//                     >
//                       <AlertDescription>{registerError}</AlertDescription>
//                     </Alert>
//                   )}
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       placeholder="John Doe"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="register-email">Email</Label>
//                     <Input
//                       id="register-email"
//                       type="email"
//                       placeholder="name@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="register-password">Password</Label>
//                     <Input
//                       id="register-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="confirm-password">Confirm Password</Label>
//                     <Input
//                       id="confirm-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                   </div>
//                   <Button type="submit" className="w-full">
//                     Create Account
//                   </Button>
//                 </form>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//           <CardFooter className="flex flex-col">
//             <p className="text-center text-sm text-gray-600 mt-2">
//               By continuing, you agree to our{" "}
//               <a href="#" className="text-hosting-blue hover:underline">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="text-hosting-blue hover:underline">
//                 Privacy Policy
//               </a>
//               .
//             </p>
//           </CardFooter>
//         </Card>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Auth;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Server } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const registerParam = searchParams.get("register");

  const [activeTab, setActiveTab] = useState(
    registerParam === "true" ? "register" : "login"
  );

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8082/auth/login", {
        username: email,
        password,
      });
      localStorage.setItem("token", res.data.token); // or res.data.token
      localStorage.setItem("role", res.data.user.role); // or res.data.token
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("userID", res.data.user.id);
      const role = res.data?.user?.role;
      toast.success("Login successful!");
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setLoginError("Login failed: " + (err.response?.data || "Server error"));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (!email || !password || !name || !confirmPassword) {
      setRegisterError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setRegisterError("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("http://localhost:8082/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password,
          role: "USER",
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      toast.success("Account created for " + data.username);
      setActiveTab("login");
    } catch (err: any) {
      setRegisterError("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Server className="h-12 w-12 text-hosting-blue" />
            </div>
            <CardTitle className="text-2xl text-center">
              Welcome to HostPro
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* LOGIN */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* REGISTER */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-600 mt-2">
              By continuing, you agree to our{" "}
              <a href="#" className="text-hosting-blue hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-hosting-blue hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;

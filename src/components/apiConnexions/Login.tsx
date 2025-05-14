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

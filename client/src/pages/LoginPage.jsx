// import React, {useState} from "react";
// import "../styles/Login.scss"
// import { setLogin } from "../redux/state";
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch()

//   const navigate = useNavigate()


//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch ("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       })

//       /* Get data after fetching */
//       const loggedIn = await response.json()

//       if (loggedIn) {
//         dispatch (
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token
//           })
//         )
//         navigate("/")
//       }

//     } catch (err) {
//       console.log("Login failed", err.message)
//     }
//   }

   
//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//            />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>






//         </form>
//         <a href="/register">Don't have an account? Sign Up Here</a>
//       </div>
//     </div>
    
//   )
// }

// export default LoginPage


import React, { useState } from "react";
import "../styles/Login.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const dispatch = useDispatch(); // Redux dispatch hook
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear previous errors
    setLoading(true); // Show loading indicator

    try {
      // Send login request to backend
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json(); // Parse server response

      if (!response.ok) {
        throw new Error(data.message || "Login failed"); // Handle errors from server
      }

      console.log("Server response:", data); // Log server response for debugging

      // Dispatch Redux action to update global state with user and token
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );

      navigate("/"); // Redirect to homepage after successful login
    } catch (err) {
      console.error("Login error:", err.message); // Log error for debugging
      setError(err.message || "Something went wrong. Please try again."); // Show error message to user
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>

        {/* Link to Registration Page */}
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;

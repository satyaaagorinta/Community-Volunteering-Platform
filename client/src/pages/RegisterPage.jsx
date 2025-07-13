// import React, { useState, useEffect } from "react";
// import "../styles/Register.scss" 
// import { useNavigate } from 'react-router-dom';

// const RegisterPage = () => {
//     const [formData, setFormData] = useState({
//         fullname: "",
//         mobilenumber: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         profileImage: null,

//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData({
//           ...formData,
//           [name]: value,
//           [name]: name === "profileImage" ? files[0] : value,
//         });
//       };



//     console.log(formData)

//     const [passwordMatch, setPasswordMatch] = useState(true)

//     useEffect(() => {
//       setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
//     })

//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {
//       e.preventDefault()

      
//       try {
//         const register_form = new FormData()

//         for (var key in formData){
//           register_form.append(key, formData[key])
//         }

//         const response = await fetch("http://localhost:3001/auth/register",{
//           method: "POST",
//           body: register_form,

//         })
//         if (response.ok) {
//           navigate("/login")
//         }

//       } catch(err){
//         console.log("Registration Failed", err.message)
//       }
//     }


//   return (
//     <div className='register'>
//         <div className='register_content'>
//             <form className="register_content_form" onSubmit={handleSubmit}>
//              <input 
//                placeholder="Full Name" 
//                name="fullname"
//                value={formData.fullname}
//                onChange={handleChange}
//                required
//              />

//              <input  
//                placeholder="Mobile Number" 
//                name="mobilenumber"
//                type="text"
//                value={formData.mobilenumber}
//                onChange={handleChange}
//                required
//              />




//              <input  
//                placeholder="Email"
//                name="email"
//                type="email"
//                value={formData.email}
//                onChange={handleChange}
//                required
//              />

//              <input  placeholder="Password"
//                name="password"
//                type="password"
//                value={formData.password}
//                onChange={handleChange}
//                required 
             
             
//              />

//              <input  placeholder="Confirm Password"
//              name="confirmpassword"
//              type="password"
//              value={formData.confirmpassword}
//              onChange={handleChange}
//              required 
//              />

//             {!passwordMatch && (
//               <p style={{ color: "red" }}>Passwords are not matched!</p>
//             )}

//              <input  
//              id="image" 
//              type="file" 
//              name="profileImage" 
//              accept="image/*" 
//              style={{ display: 'none'}} 
//              onChange={handleChange} 
//              required
//              />

//              <label htmlFor="image">
//                 <img src="/assets/addImage.png" alt="add profile photo"/>
//                 <p>Upload Your Profile Photo </p>
//              </label>


//              {formData.profileImage && (
//                <img
//                 src={URL.createObjectURL(formData.profileImage)}
//                 alt="profile photo"
//                 style={{ maxWidth: "80px" }}
//                />
//              )}




//              <button type="submit" disabled={!passwordMatch} >Sign Up</button>

                
             



//             </form>
//             <a href='/login'>Already Have an account?Log In Here</a>
//         </div>

      
//     </div>
//   )
// }

// export default RegisterPage



import React, { useState, useEffect } from "react";
import "../styles/Register.scss";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        mobilenumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "profileImage" ? files[0] : value
        }));
    };

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch || loading) return;
        setLoading(true);

        try {
            const register_form = new FormData();
            register_form.append("fullname", formData.fullname);
            register_form.append("mobilenumber", formData.mobilenumber);
            register_form.append("email", formData.email);
            register_form.append("password", formData.password);
            register_form.append("confirmPassword", formData.confirmPassword);
            register_form.append("profileImage", formData.profileImage);

            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                body: register_form,
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            navigate("/login");
        } catch (err) {
            console.error("Registration Error:", err.message);
            alert(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='register'>
            <div className='register_content'>
                <form className="register_content_form" onSubmit={handleSubmit}>
                    <h3>Enter Your Details</h3>
                    
                    <input 
                        placeholder="Full Name" 
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />

                    <input  
                        placeholder="Mobile Number" 
                        name="mobilenumber"
                        value={formData.mobilenumber}
                        onChange={handleChange}
                        required
                    />

                    <input  
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input  
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />

                    <input  
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                    />

                    {!passwordMatch && (
                        <p style={{ color: "red" }}>Passwords do not match!</p>
                    )}

                    <input  
                        id="image" 
                        type="file" 
                        name="profileImage" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="image">
                        <img src="/assets/addImage.png" alt="add profile"/>
                        <p>Upload Profile Photo</p>
                    </label>

                    {formData.profileImage && (
                        <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="profile preview"
                            style={{ maxWidth: "80px" }}
                        />
                    )}

                    <button type="submit" disabled={!passwordMatch || loading}>
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>
                <a href='/login'>Already have an account? Log In Here</a>
            </div>
        </div>
    );
};

export default RegisterPage;


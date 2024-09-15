import React, { useState } from 'react';
import "./Loginpage.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const errors = {};

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password) errors.password = 'Password is required';

        return errors;
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        navigate('/chat');

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                alert('Login successful');
                setIsSubmitting(false);
                // Handle login logic here (e.g., send data to API)
                console.log(formData);
            }, 1000);
        } else {
            alert('Please fix the errors in the form.');
        }
    };

    const isFormInvalid = () => {
        const validationErrors = validate();
        return Object.keys(validationErrors).length > 0;
    };

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    {/* <Link to="/chat"> */}
                    <button
                        type="submit"
                        disabled={isFormInvalid() || isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    {/* </Link> */}
                </form>
                <Link to="/register">
                    <p className='Text'>
                        Don't have an account? Sign up
                    </p>
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;



// import React, { useState } from 'react';
// import "./Loginpage.css";
// import { Link } from 'react-router-dom';
// import Footer from '../Footer/Footer';


// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const validate = () => {
//         const errors = {};

//         if (!formData.email) {
//             errors.email = 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             errors.email = 'Email is invalid';
//         }
//         if (!formData.password) errors.password = 'Password is required';

//         return errors;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         setErrors(validationErrors);

//         if (Object.keys(validationErrors).length === 0) {
//             // Handle login logic here (e.g., send data to API)
//             console.log(formData);
//         }
//     };

//     return (
//       <>
//         <div className="login-container">
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                 />
//                 {errors.email && <p className="error">{errors.email}</p>}

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//                 {errors.password && <p className="error">{errors.password}</p>}

//                 <Link to="/chat">
//                     <button type="submit">Login</button>
//                 </Link>
//             </form>
//             <Link to="/register">
//               <p className='Text'>
//                 Don't have an account? Sign up
//               </p>
//             </Link>
//         </div>
//         <Footer />
//       </>
//     );
// };

// export default LoginPage;



// // import React from 'react';
// // import Footer from '../Footer/Footer';

// // function LoginPage() {

// //   return (
// //     <>
// //     <Footer />
// //     </>
// //   )
// // }

// // export default LoginPage;
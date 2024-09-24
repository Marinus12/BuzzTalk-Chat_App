import React, { useState, useEffect } from 'react';
import "./Loginpage.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import _ from 'lodash';

const LoginPage = () => {
    // Retrieve user from localStorage, or null if not logged in
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || null;
    });

    function handleSetUser(){
        if (!user) return
        localStorage.setItem("user", user)
        setUser(user)
        localStorage.setItem("avatar", `https://picsum.photos/id/${_.random(1, 100)}/200/300`)
    }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the chat page if the user is already logged in
        if (user) {
            navigate('/chat');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const errors = {};

        if (!formData.username) {
            errors.username = 'Username is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                const loggedInUser = {
                    username: formData.username,
                    // You can store other relevant details here
                };

                // Store the user in localStorage
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                setUser(loggedInUser);  // Update state to trigger redirect

                alert('Login successful');
                setIsSubmitting(false);
                console.log(formData);  // Handle login logic here (e.g., send data to API)
                navigate('/chat');  // Navigate after successful login
            }, 1000);
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
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <button
                        type="submit"
                        disabled={isFormInvalid() || isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
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

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

    // Function to set user and generate avatar upon login
    function handleSetUser(loggedInUser) {
        if (!loggedInUser) return;

        // Prevent overwriting existing user data
        const existingUser = JSON.parse(localStorage.getItem('user'));
        if (existingUser && existingUser.username !== loggedInUser.username) {
            localStorage.removeItem('user');  // Clear existing user before setting new user
        }

        localStorage.setItem("user", JSON.stringify(loggedInUser));  // Store new user
        const avatarUrl = `https://picsum.photos/id/${_.random(1, 100)}/200/300`;  // Generate random avatar
        localStorage.setItem("avatar", avatarUrl);  // Store avatar
        setUser(loggedInUser);  // Update state to trigger redirect
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
        if (user && user.username) {
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

    // Modified handleSubmit function to use fetch for API request
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);

            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    // Simulate the logged-in user data received from the server
                    const loggedInUser = {
                        username: formData.username,
                        // You can add more user details from result if needed
                    };

                    // Call handleSetUser to store user and avatar in localStorage
                    handleSetUser(loggedInUser);

                    alert('Login successful');
                    navigate('/chat');  // Navigate after successful login
                } else {
                    alert(result.message || 'Login failed');  // Show error from server response
                }
            } catch (error) {
                alert('An error occurred. Please try again later.');
            } finally {
                setIsSubmitting(false);
            }
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

                    {errors.api && <p className="error">{errors.api}</p>} {/* Show API error if any */}

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

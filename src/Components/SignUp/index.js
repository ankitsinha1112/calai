import React, { useState } from 'react';
import "./signup.css";
import logo from "../../Images/logo.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../Firebase"
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

       // Function to check email format
       const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSignin = () => {
        navigate('/sign-in')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const email = formData.email;
        const password = formData.password;
        const cnfpassword = formData.confirmPassword;
        // Check if any field is empty
        if (!name || !email || !password || !cnfpassword) {
            enqueueSnackbar('All fields are required!', { variant: 'error' });
            return;
        }

        // Check if email format is correct
        if (!isValidEmail(email)) {
            enqueueSnackbar('Invalid email format!', { variant: 'error' });
            return;
        }
        // password should have atleast 5 letters
        if (password.length < 5) {
            enqueueSnackbar('Password must be at least 5 characters long!', { variant: 'error' });
            return;
        }
        // password matches or not 
        if (password !== cnfpassword) {
            enqueueSnackbar('The confirmed password must match the entered password!', { variant: 'error' });
            return;
        }

        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((res) => {
                const user = res.user;
                updateProfile(user, {
                    displayName: formData.name,
                })
                enqueueSnackbar('Registration Complete successfully!', { variant: 'success' });
                navigate("/sign-in");
            })
            .catch((err) => {
                console.log("Error : ", err);
                enqueueSnackbar(err.message, { variant: 'error' });
            })
    };

    return (
        <div className="bg-cover min-h-screen flex items-center justify-center" style={{ backgroundImage: `url('https://source.unsplash.com/1600x900/?nature,water')` }}>
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Sign up</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                        <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" onChange={handleChange} />
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already a member? <span onClick={onSignin} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">Sign in</span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

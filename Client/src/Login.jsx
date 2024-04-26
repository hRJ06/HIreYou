// Login.js
import React, { useState } from 'react';

const Login = () => {
    const [tab, setTab] = useState('user');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningUp, setIsSigningUp] = useState(false);

    const toggleTab = (newTab) => {
        setTab(newTab);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        // Handle login logic here
        console.log('Logging in...');
    };

    const handleForgetPassword = () => {
        // Handle forget password logic here
        console.log('Forget password...');
    };

    const handleSignUp = () => {
        // Handle sign up logic here
        console.log('Signing up...');
    };

    const handleToggleSignUp = () => {
        setIsSigningUp(!isSigningUp);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 font-ubuntu">
            <div className="bg-white rounded shadow p-8 w-96 h-[500px]">
                <div className="flex mb-8">
                    <button
                        className={`flex-1 py-2 rounded-tl rounded-bl tracking-[1.5px] uppercase ${tab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => toggleTab('user')}
                    >
                        User
                    </button>
                    <button
                        className={`flex-1 py-2 tracking-[1.5px] uppercase rounded-tr rounded-br ${tab === 'organization' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => toggleTab('organization')}
                    >
                        Organization
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 placeholder:uppercase placeholder:tracking-[1.5px]"
                    value={email}
                    onChange={handleEmailChange}
                />
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 placeholder:uppercase placeholder:tracking-[1.5px] mt-4"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button
                        className="absolute top-5 right-0 mr-2 mt-2 p-1 rounded-md bg-gray-200 text-gray-700 uppercase text-xs tracking-wide"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <button className="text-xs text-blue-500 hover:underline uppercase tracking-[1.3px]" onClick={handleForgetPassword}>
                        Forgot password?
                    </button>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 uppercase tracking-[1.5px]"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
                <hr className="mb-4" />
                <div className="flex justify-between items-center">
                    <p className="text-xs uppercase tracking-[1.2px]">Don't have an account?</p>
                    <button className="text-xs text-blue-500 hover:underline uppercase tracking-[1.3px]" onClick={handleToggleSignUp}>
                        Sign Up
                    </button>
                </div>
                <div className='mt-8 flex items-center justify-center'>
                    <img
                        src="https://hireyu.com.au/wp-content/uploads/2023/06/hire5_logo-2.svg"
                        alt="HireYou Logo"
                        className="h-14"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;

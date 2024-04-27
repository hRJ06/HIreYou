// Home.js
import React from 'react';

const Home = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-gray-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4 font-ubuntu uppercase">
                    {/* Logo */}
                    <div>
                        <img
                            src="https://hireyu.com.au/wp-content/uploads/2023/06/hire5_logo-2.svg"
                            alt="HireYou Logo"
                            className="h-8"
                        />
                    </div>
                    {/* Navigation Links */}
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/about-us" className="hover:text-gray-400 hover:underline">About Us</a>
                        </li>
                        <li>
                            <a href="/login" className="hover:text-gray-400 hover:underline">Login</a>
                        </li>
                        <li>
                            <a href="/sign-up" className="hover:text-gray-400 hover:underline">Sign up</a>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </div>
            </nav>

            {/* Home Section */}
            <div className="bg-green-100 py-20 font-ubuntu">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8 uppercase first-letter:text-5xl tracking-[1.5px]">Welcome to HireYou</h1>
                    <p className="text-lg mb-8 uppercase tracking-[1.3px]">
                        HireYou is your ultimate hiring platform, connecting talented
                        individuals with top companies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;

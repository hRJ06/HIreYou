// Home.js
import React, { useState } from 'react';

const Home = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const generateInitials = () => {
        const name = sessionStorage.getItem('name');
        if (name) {
            const parts = name.split(' ');
            if (parts.length > 1) {
                return parts[0].charAt(0) + parts[1].charAt(0);
            } else {
                return parts[0].charAt(0) + parts[0].charAt(parts[0].length - 1);
            }
        }
        return '';
    };
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('role');
        window.location.reload();
    }
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
                    <ul className="flex space-x-4 items-baseline">
                        {sessionStorage.getItem('token') ? (
                            <li>
                                {/* Render avatar */}
                                <div className="relative">
                                    <button className="focus:outline-none" onClick={() => toggleDropdown()}>
                                        {/* Replace 'Your Name' with the name from sessionStorage */}
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-black font-bold">
                                                {/* Generate initials from sessionStorage.name */}
                                                {generateInitials()}
                                            </span>
                                        </div>
                                    </button>
                                    {/* Dropdown menu */}
                                    <div className={"absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg " + (dropdownVisible ? 'block' : 'hidden')}>
                                        <div className="py-1">
                                            <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 first-letter:text-lg tracking-[1.2px]">Settings</a>
                                            <a href={sessionStorage.getItem('role') === 'USER' ? '/applications' : 'listings'} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 first-letter:text-lg tracking-[1.2px]">{sessionStorage.getItem('role') === 'USER' ? 'Applications' : 'Listings'}</a>
                                            <div onClick={() => handleLogout()} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 first-letter:text-lg tracking-[1.2px]">Log Out</div>
                                            {/* Add more dropdown items as needed */}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li>
                                {/* Render Login link */}
                                <a href="/login" className="hover:text-gray-400 hover:underline">Login</a>
                            </li>
                            
                        )}
                        <li>
                            {/* Render Signup or Listings link */}
                            {
                                <a href={sessionStorage.getItem('token') ? "/listings" : "/sign-up"} className="hover:text-gray-400 hover:underline tracking-[1.1px]">
                                    {sessionStorage.getItem('token') ? "Explore" : "Sign up"}
                                </a>
                            }
                        </li>
                        <li>
                            {/* Render About Us link */}
                            <a href="/about-us" className="hover:text-gray-400 hover:underline tracking-[1.1px]">About Us</a>
                        </li>
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

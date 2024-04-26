// AboutUs.js
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return (
        <div className='flex flex-col justify-evenly'>
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
                            <a href="#" className="hover:text-gray-400 first-letter:text-xl hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400 hover:underline">Login</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400 hover:underline">Sign Up</a>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </div>
            </nav>

            {/* About Us Section */}
            <div className="container mx-auto px-4 py-10 font-ubuntu">
                <motion.section className="mb-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-bold mb-4 uppercase tracking-[1.5px] lg:text-left text-center">What We Provide ? </h2>
                    <ul className="list-disc pl-6 text-lg">
                        <li>Connection between talented individuals and top companies</li>
                        <li>Streamlined hiring process</li>
                        <li>Enhanced user experience for job seekers and employers</li>
                    </ul>
                </motion.section>

                <motion.section className="mb-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-bold mb-4 tracking-[1.5px] lg:text-left text-center uppercase">How We're Different ? </h2>
                    <ul className="list-disc pl-6 text-lg">
                        <li>Advanced technology and data-driven algorithms</li>
                        <li>Focus on compatibility and cultural fit</li>
                        <li>Higher satisfaction rates and long-term success</li>
                    </ul>
                </motion.section>

                <motion.section className="mb-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-bold mb-4 tracking-[1.5px] lg:text-left text-center uppercase">How We're Transforming ?</h2>
                    <ul className="list-disc pl-6 text-lg">
                        <li>Harnessing the power of AI and machine learning</li>
                        <li>Revolutionizing the recruitment process</li>
                        <li>Faster, more efficient, and rewarding experience</li>
                    </ul>
                </motion.section>
                <motion.section className="mb-10" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <h2 className="text-3xl font-bold mb-4 lg:text-left text-center tracking-[1.5px] lg:text-left text-center uppercase">Our Vision</h2>
                    <ul className="list-disc pl-6 text-lg">
                        <li>Create a world where talent meets opportunity seamlessly</li>
                        <li>Empower individuals to reach their full potential</li>
                        <li>Enable organizations to achieve their goals through meaningful connections</li>
                    </ul>
                </motion.section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 fixed bottom-0 left-0 w-full mt-2 font-ubuntu">
                <div className="container mx-auto px-4 text-center">
                    <p className='uppercase tracking-[1.1px]'>&copy; 2024 HireYou. All rights reserved.</p>
                    <p className='tracking-[1.2px]'><span className='uppercase'>Contact us - </span> contact@hireyou.com</p>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;

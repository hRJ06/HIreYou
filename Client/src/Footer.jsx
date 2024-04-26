// Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 fixed bottom-0 left-0 w-full mt-2 font-ubuntu">
            <div className="container mx-auto px-4 text-center">
                <p className='uppercase tracking-[1.1px]'>&copy; 2024 HireYou. All rights reserved.</p>
                <p className='tracking-[1.2px]'><span className='uppercase'>Contact us - </span> contact@hireyou.com</p>
            </div>
        </footer>
    );
};

export default Footer;

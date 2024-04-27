// SignUp.js
import React, { useState } from 'react';

const SignUp = () => {
    const [tab, setTab] = useState('user');
    const [userFormData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        collegeName: '',
        address: '',
        image: null,
    });

    const [organizationFormData, setOrganizationFormData] = useState({
        name: '',
        email: '',
        password: '',
        website: '',
        location: '',
        image: null,
    });

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    const handleUserFormChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: value,
        });
    };

    const handleOrganizationFormChange = (e) => {
        const { name, value } = e.target;
        setOrganizationFormData({
            ...organizationFormData,
            [name]: value,
        });
    };

    const handleUserProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserFormData({
                    ...userFormData,
                    image: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOrganizationProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOrganizationFormData({
                    ...organizationFormData,
                    image: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignUp = () => {
        // Handle sign-up logic here
        console.log('Signing up...');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-ubuntu">
            <div className="bg-white p-8 rounded shadow w-96">
                <div className="flex mb-4">
                    <button
                        className={`flex-1 py-2 rounded-tl rounded-bl uppercase tracking-[1.2px] ${tab === 'user' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => handleTabChange('user')}
                    >
                        User
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-tr rounded-br uppercase tracking-[1.2px] ${tab === 'organization' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => handleTabChange('organization')}
                    >
                        Organization
                    </button>
                </div>
                {tab === 'user' && (
                    <form>
                        <label className="block mb-2 uppercase tracking-[1.2px]">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="First Name"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.name}
                            onChange={handleUserFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.email}
                            onChange={handleUserFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.password}
                            onChange={handleUserFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">College</label>
                        <input
                            type="text"
                            name="collegeName"
                            placeholder="College"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={userFormData.collegeName}
                            onChange={handleUserFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Address</label>
                        <textarea
                            rows={5}
                            cols={8}
                            name="address"
                            placeholder="Address"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={userFormData.address}
                            onChange={handleUserFormChange}
                        />
                        {/* Add other user fields similarly */}
                        <div className="mb-2 flex flex-col justify-center items-center">
                            <label className="block mb-2 uppercase tracking-[1.2px]">Image</label>
                            <div
                                className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border border-gray-400 cursor-pointer"
                                onClick={() => document.getElementById('imageInputUser').click()}
                            >
                                {userFormData.image && (
                                    <img
                                        src={userFormData.image}
                                        alt="User"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>
                            <input
                                id="imageInputUser"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleUserProfilePictureChange}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500 uppercase tracking-[1.2px]"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                )}
                {tab === 'organization' && (
                    <form>
                        <form>
                        <label className="block mb-2 uppercase tracking-[1.2px]">First Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="First Name"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.name}
                            onChange={handleOrganizationFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.email}
                            onChange={handleOrganizationFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.password}
                            onChange={handleOrganizationFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Website</label>
                        <input
                            type="text"
                            name="website"
                            placeholder="Website"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.website}
                            onChange={handleOrganizationFormChange}
                        />
                        <label className="block mb-2 uppercase tracking-[1.2px]">Location</label>
                        <textarea
                            rows={5}
                            cols={8}
                            name="location"
                            placeholder="Location"
                            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-500 placeholder:text-sm placeholder:uppercase placeholder:tracking-[1.2px]"
                            value={organizationFormData.location}
                            onChange={handleOrganizationFormChange}
                        />
                        {/* Add other user fields similarly */}
                        <div className="mb-2 flex flex-col justify-center items-center">
                            <label className="block mb-2 uppercase tracking-[1.2px]">Image</label>
                            <div
                                className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border border-gray-400 cursor-pointer"
                                onClick={() => document.getElementById('imageInputOrganization').click()}
                            >
                                {organizationFormData.image && (
                                    <img
                                        src={organizationFormData.image}
                                        alt="Organization"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>
                            <input
                                id="imageInputOrganization"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleOrganizationProfilePictureChange}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type="button"
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500 uppercase tracking-[1.2px]"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
function Listings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        fetchListings();
    }, []);
    const token = sessionStorage.getItem('token');
    const fetchListings = async () => {
        try {
            toast.loading();
            const response = await axios.get('http://localhost:8080/api/v1/listing/all-listings', {
                headers: {
                    Authorization: `Bearer ` + token
                }
            });
            console.log(response);
            setListings(response?.data)
            toast.dismiss();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Job Listings</h1>
            {listings.map((listing, index) => (
                <div key={index} className="bg-white shadow-md rounded-md p-6 mb-4">
                    <h2 className="text-xl font-bold italic">{listing.position}</h2>
                    <p className="text-gray-600 mb-4"><span className="font-bold">About:</span> <i>{listing.about}</i></p>
                    <div className="mb-4">
                        <p className="font-bold">Roles and Responsibilities:</p>
                        <ul className="list-disc pl-8">
                            {listing.rolesResponsibility.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="font-bold">Skills:</p>
                        <ul className="list-disc pl-8">
                            {listing.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="font-bold">Salary: <i>{listing.salary}</i></p>
                </div>
            ))}
        </div>
    );
}

export default Listings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadModal from './UploadModal';
import { useNavigate } from 'react-router-dom';
import AddListingModal from './AddListingModal'; // Import the AddListingModal component

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedListingId, setSelectedListingId] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const fetchListings = async () => {
        const role = sessionStorage.getItem('role');
        if (!token) navigate('/login');
        console.log(token);
        try {
            toast.loading();
            let response;
            if (role === 'USER') {
                response = await axios({
                    method: 'GET',
                    url: 'http://localhost:8080/api/v1/listing/all-listings',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                response = await axios({
                    method: 'GET',
                    url: 'http://localhost:8080/api/v1/listing/my-detail',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            console.log(response);
            if (sessionStorage.getItem('role') === 'USER') {
                setListings(response?.data);
            } else {
                setListings(response?.data?.listingDTOS);
            }
            toast.dismiss();
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchListings();
    }, []);

    const handleApply = (listingId) => {
        setSelectedListingId(listingId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleViewApplications = async (listingId) => {
        navigate(`/applications/${listingId}`);
    };

    const handleOpenNewListingModal = () => {
        setModalOpen(true);
    };

    const handleCloseNewListingModal = () => {
        setModalOpen(false);
    };
    const handleSubmit = async (file) => {
        try {
            toast.loading("")
            const formData = new FormData();
            formData.append('file', file);

            if (selectedListingId) {
                const response = await axios({
                    method: 'POST',
                    url: `http://localhost:8080/api/v1/listing/add-application/${selectedListingId}`,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });


                console.log('Application submitted:', response.data);
            } else {
                console.error('No listing selected.');
            }
            setModalOpen(false);
            toast.dismiss();
            toast.success("Application Submitted")
        } catch (error) {
            console.error('Error submitting application:', error);
        }
        finally {
            setModalOpen(false);
        }
    };

    const handleAddNewListing = async (newListingData) => {
        try {
            toast.loading();
            const response = await axios.post('http://localhost:8080/api/v1/listing/create', newListingData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('New listing added:', response.data);
            fetchListings();
            setModalOpen(false);
            toast.dismiss();
            toast.success("New Listing Added");
        } catch (error) {
            console.error('Error adding new listing:', error);
        }
    };

    return (
        <div className="container mx-auto py-8 font-ubuntu">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center uppercase first-letter:text-4xl tracking-[1.2px]">Job Listings</h1>
            {listings.map((listing, index) => (
                <div key={index} className="border p-4 mb-4 bg-gray-100 rounded-md">
                    <h2 className="text-xl font-bold uppercase tracking-wider">{listing.position}</h2>
                    <p className="text-gray-600 mb-4"><span className="font-bold uppercase tracking-wider">About -</span> <i>{listing.about}</i></p>
                    <div className="mb-4">
                        <p className="font-bold uppercase tracking-wider">Roles & Responsibilities</p>
                        <ul className="list-disc pl-8">
                            {listing.rolesResponsibility.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="font-bold uppercase tracking-wider">Skills</p>
                        <ul className="list-disc pl-8">
                            {listing.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="font-bold uppercase tracking-wider">Salary: <i>{listing.salary}</i></p>
                    <div className='flex lg:justify-start justify-center'>
                        {sessionStorage.getItem('role') === 'USER' ? (
                            <button onClick={() => handleApply(listing.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 uppercase tracking-wider">Apply</button>
                        ) : (
                            <button onClick={() => handleViewApplications(listing.id)} className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 uppercase tracking-wider">View Applicants</button>
                        )}
                    </div>
                </div>
            ))}
            {!sessionStorage.getItem('role') !== 'USER' && (
                <div className='flex justify-end'>
                    <button onClick={handleOpenNewListingModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 uppercase tracking-wider">+</button>
                </div>
            )}
            <UploadModal isOpen={modalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
            <AddListingModal isOpen={modalOpen} onClose={handleCloseNewListingModal} onSubmit={handleAddNewListing} />
        </div>
    );

}

export default Listings;

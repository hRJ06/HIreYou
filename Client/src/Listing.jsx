import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import UploadModal from './UploadModal';
import { useNavigate } from 'react-router-dom';
import AddListingModal from './AddListingModal'; // Import the AddListingModal component
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from './DeleteModal';
import { CiSearch } from "react-icons/ci";

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedListingId, setSelectedListingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [editListing, setEditListing] = useState(null);
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
    const handleEditListing = (listing) => {
        setModalOpen(true);
        setEditListing(listing);
    }
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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/listing/delete/${selectedListingId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Listing deleted successfully");
            fetchListings();
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
        // Close the modal after deletion attempt
        setShowDeleteModal(false);
    };

    const handleSearch = async () => {
        const query = searchQuery.trim();
        toast.loading();
        if (query) {
            const response = await axios.get(`http://localhost:8080/api/v1/listing/search?search=${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setListings(response?.data);
            toast.dismiss();
        }
        else {
            toast.error("Query cannot be empty")
        }
    };
    const handleListing = async (newListingData) => {
        try {
            toast.loading();
            let response;
            if (editListing) {
                const listingId = editListing.id;
                response = await axios.put(`http://localhost:8080/api/v1/listing/update/${listingId}`, newListingData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.post('http://localhost:8080/api/v1/listing/create', newListingData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            fetchListings();
            setModalOpen(false);
            toast.dismiss();
            toast.success(editListing ? "Successfully Edited Listing" : "New Listing Added");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto py-8 font-ubuntu p-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center uppercase first-letter:text-4xl tracking-[1.2px]">Job Listings</h1>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search by position or organization"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value === '') {
                            fetchListings();
                        }
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full placeholder:uppercase lg:placeholder:text-sm placeholder:text-xs placeholder:tracking-wider"
                />
                <CiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={() => handleSearch()} />
            </div>
            {listings.map((listing, index) => (
                <div key={index} className="border p-4 mb-4 bg-gray-100 rounded-md">
                    <h2 className="text-xl font-bold uppercase tracking-wider">{listing.position} <span className='text-sm text-gray-500 font-normal underline underline-offset-2 cursor-pointer' onClick={() => navigate(`/organization/${listing?.organization?.id}`)}>{listing?.organization?.name}</span></h2>
                    <p className="text-gray-600 mb-4"><span className="font-bold uppercase tracking-wider">About -</span> <i>{listing.about}</i></p>
                    <div className="mb-4">
                        <p className="font-bold uppercase tracking-wider">Roles & Responsibilities</p>
                        <ul className="list-disc pl-8 text-justify">
                            {listing.rolesResponsibility.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-4">
                        <p className="font-bold uppercase tracking-wider">Skills</p>
                        <ul className="list-disc pl-8 text-justify">
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
                    {sessionStorage.getItem('role') !== 'USER' && (
                        <div className="flex justify-end mb-2">
                            <FaTrash
                                className="cursor-pointer mr-2 text-red-500"
                                size={20}
                                onClick={() => {
                                    setShowDeleteModal(true);
                                    setSelectedListingId(listing.id)
                                }}
                            />
                            <FaEdit
                                className="cursor-pointer text-blue-500"
                                size={20}
                                onClick={() => handleEditListing(listing)}
                            />
                        </div>
                    )}
                </div>
            ))}
            {sessionStorage.getItem('role') !== 'USER' && (
                <div className='flex justify-end'>
                    <button onClick={handleOpenNewListingModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 uppercase tracking-wider">+</button>
                </div>
            )}
            <UploadModal isOpen={modalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
            {
                sessionStorage.getItem('role') !== 'USER' &&
                <AddListingModal isOpen={modalOpen} onClose={handleCloseNewListingModal} onSubmit={handleListing} editListing={editListing} />
            }
            {
                showDeleteModal && (
                    <DeleteModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />
                )
            }
        </div>
    );

}

export default Listings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ApplicationsPage = () => {
    const { listingId } = useParams();
    const [applications, setApplications] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setToken(token);
    }, []);

    useEffect(() => {
        if (listingId && token) {
            fetchApplications();
        }
    }, [listingId, token]);

    const fetchApplications = async () => {
        try {
            toast.loading("");
            const response = await axios({
                method: 'GET',
                url: `http://localhost:8080/api/v1/listing/get-application/${listingId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setApplications(response.data.applicationList);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            toast.dismiss();
        }
    };

    const handleUpdateStatus = async (applicationId, newStatus) => {
        try {
            toast.loading("");
            const statusCode = newStatus === 'ACCEPTED' ? 0 : 1;
            const formData = new FormData();
            formData.append('status', statusCode);
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:8080/api/v1/application/update/${applicationId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            });
            toast.dismiss();
            toast.success("Updated Status");
            console.log('Application status updated:', response.data);
            fetchApplications();
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };

    return (
        <div className="container mx-auto py-8 font-ubuntu">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center uppercase first-letter:text-4xl tracking-[1.2px]">Applications</h1>
            {applications.length === 0 ? (
                <p className="text-center text-gray-600 uppercase tracking-wider underline underline-offset-2">No applications yet.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {applications.map(application => (
                        <div key={application.id} className="border p-4 bg-gray-100 rounded-md">
                            <h2 className="text-xl font-bold uppercase tracking-wider">{application.user.firstName} {application.user.lastName}</h2>
                            <p className="text-sm text-gray-600 tracking-wider">Name - {application.user.firstName} {application.user.lastName}</p>
                            <p className="text-sm text-gray-600 tracking-wider">Email - {application.user.email}</p>
                            <p className="text-sm text-gray-600 tracking-wider">Status: {application.status}</p>
                            <a href={application.application} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline uppercase tracking-wider">View Application</a>
                            <div className="mt-2">
                                {application.status === 'DUE' ? (
                                    <>
                                        <button onClick={() => handleUpdateStatus(application.id, 'ACCEPTED')} className="bg-green-500 text-white px-4 py-2 rounded-md uppercase tracking-wider mr-2">Accept</button>
                                        <button onClick={() => handleUpdateStatus(application.id, 'REJECTED')} className="bg-red-500 text-white px-4 py-2 rounded-md uppercase tracking-wider">Reject</button>
                                    </>
                                ) : (
                                    <>
                                        <button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md uppercase tracking-wider mr-2">Accept</button>
                                        <button disabled className="bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-md uppercase tracking-wider">Reject</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsPage;

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const YourApplications = () => {
    const [applications, setApplications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/application/get-application', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data.applicationList);
                } else {
                    console.error('Failed to fetch applications');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const withdrawApplication = async () => {
        try {
            console.log(selectedApplication);
            const response = await fetch(`http://localhost:8080/api/v1/application/withdraw-application/${selectedApplication.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                console.log(`Withdrawal successful for application with ID: ${selectedApplication.id}`);
                setShowModal(false);
                toast.success("Successfully Withdrawn Application")
            } else {
                console.error('Withdrawal failed');
                toast.error('Please try again');
            }
        } catch (error) {
            console.error('Error withdrawing application:', error);
        }
    };

    const openModal = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 uppercase text-center first-letter:text-4xl">Your Applications</h1>
            {applications.map(application => (
                <div key={application.id} className="bg-earthly rounded-lg shadow-md p-6 mb-4">
                    <h2 className="text-xl font-semibold mb-2 uppercase tracking-wider">{application.listing.position}</h2>
                    <p className="text-gray-700 mb-4 tracking-wider">{application.listing.about}</p>
                    <p className="mb-4">Salary: {application.listing.salary}</p>
                    <p className="mb-4">Status: {application.status}</p>
                    {application.status === 'DUE' && (
                        <button
                            onClick={() => openModal(application)}
                            className="bg-red-500 hover:bg-blue-600 text-white py-2 px-4 rounded uppercase text-sm tracking-wider"
                        >
                            Withdraw
                        </button>
                    )}
                    {application.status !== 'DUE' && (
                        <button
                            disabled
                            className="bg-gray-400 text-gray-600 py-2 px-4 rounded cursor-not-allowed uppercase text-sm tracking-wider"
                        >
                            Withdraw
                        </button>
                    )}
                    <a href={application.application} className="ml-2 text-blue-500 hover:underline text-sm uppercase tracking-wider underline underline-offset-2">View Application</a>

                </div>
            ))}
            {/* Modal */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 uppercase tracking-wider">Confirm Withdrawal</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 tracking-wider">Are you sure you want to withdraw your application for {selectedApplication && selectedApplication.listing.position}?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={withdrawApplication} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm uppercase tracking-wider">
                                    Withdraw
                                </button>
                                <button onClick={() => setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm uppercase tracking-wider">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YourApplications;

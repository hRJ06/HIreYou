import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Organization = () => {
    const [organization, setOrganization] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState('');
    const { organizationId } = useParams();
    const token = sessionStorage.getItem('token');
    const fetchOrganizationDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/organization/details/${organizationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('RESULT', response?.data)
            setOrganization(response?.data)
            setReviews(response?.data?.reviewList);
        } catch (error) {
            console.error('Error fetching organization details:', error);
        }
    };

    useEffect(() => {
        fetchOrganizationDetails();
    }, []);


    const handleAddReview = async () => {
        try {
            const trimmedReview = newReview.trim();
            if (trimmedReview) {
                const response = await axios.put(`http://localhost:8080/api/v1/organization/add-review/${organizationId}`, { content: trimmedReview }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                toast.success("Successfully Added Review");
                fetchOrganizationDetails();
            }
            else {
                toast.error("Please Add A Review")
            }

        }
        catch (error) {
            toast.error("Please Try Again");
            console.error('Error adding review:', error);
        }
        finally {
            setShowModal(false);
            setNewReview('');
        }
    };

    return (
        <div className="flex flex-wrap justify-center w-[100vw] h-[100vh]">
            {
                organization && <div className="w-full bg-white shadow-md rounded-lg overflow-clip m-4">
                    <div className="p-4">
                        <h1 className="text-3xl font-semibold text-gray-800 text-center underline underline-offset-2">{organization?.name}</h1>
                        <p className="text-gray-600 mt-2 tracking-wider"><span className='font-bold uppercase tracking-wider'>Email -</span> {organization?.email}</p>
                        <p className="text-gray-600 tracking-wider"><span className='font-bold uppercase tracking-wider'>Website -</span> {organization?.website}</p>
                        <p className="text-gray-600 tracking-wider"><span className='font-bold uppercase tracking-wider'>Location -</span> {organization?.location}</p>
                        <img src={organization?.image} alt={organization.name} className="mt-4 rounded-lg mx-auto" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 uppercase tracking-wider mb-4 underline underline-offset-2">Reviews</h2>
                        {reviews.length === 0 ? (
                            <p className="text-gray-600 uppercase tracking-wider text-sm">No reviews yet</p>
                        ) : (
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-3 gap-y'>
                                {reviews.splice(0,3).map((review) => (
                                    <div showArrows={true} swipeable={true} showStatus={false} key={review.id}> 
                                        <div key={review.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }} className='rounded-lg'>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                <img src={review.user.image} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
                                                <div>
                                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }} className='uppercase tracking-wider'>{review.user.firstName} {review.user.lastName}</p>
                                                </div>
                                            </div>
                                            <p style={{ margin: 0, fontSize: '16px', marginBottom: '10px' }} className='text-md tracking-wider'>{review.content}</p>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}><span className='uppercase text-sm tracking-wider'>College -</span> <span className='underline'>{review.user.collegeName}</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase tracking-wider " onClick={() => setShowModal(true)}>Add Review</button>
                    </div>
                </div>
            }
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <button className="absolute top-0 right-0 m-4" onClick={() => setShowModal(false)}>&times;</button>
                        <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wider">Add Review</h2>
                        <textarea
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Enter your review here"
                            className="w-full h-32 border border-gray-300 rounded p-2 mb-4 placeholder:tracking-wider placeholder:uppercase"
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded uppercase tracking-wider" onClick={handleAddReview}>Submit</button>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default Organization;

import React, { useState } from 'react';

const AddListingModal = ({ isOpen, onClose, onSubmit }) => {
    const [newListing, setNewListing] = useState({
        position: '',
        about: '',
        rolesResponsibility: [],
        skills: [],
        salary: '',
        currency: 'USD' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewListing(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddSkill = () => {
        if (newListing.skillInput.trim() !== '') {
            setNewListing(prevState => ({
                ...prevState,
                skills: [...prevState.skills, prevState.skillInput.trim()],
                skillInput: ''
            }));
        }
    };

    const handleRemoveSkill = (index) => {
        setNewListing(prevState => ({
            ...prevState,
            skills: prevState.skills.filter((_, i) => i !== index)
        }));
    };

    const handleAddResponsibility = () => {
        if (newListing.responsibilityInput.trim() !== '') {
            setNewListing(prevState => ({
                ...prevState,
                rolesResponsibility: [...prevState.rolesResponsibility, prevState.responsibilityInput.trim()],
                responsibilityInput: ''
            }));
        }
    };

    const handleRemoveResponsibility = (index) => {
        setNewListing(prevState => ({
            ...prevState,
            rolesResponsibility: prevState.rolesResponsibility.filter((_, i) => i !== index)
        }));
    };
    const handleCurrencyChange = (e) => {
        const { value } = e.target;
        setNewListing(prevState => ({
            ...prevState,
            currency: value
        }));
    };
    const handleSubmit = () => {
        
        const mergedSalary = `${newListing.salary} ${newListing.currency}`;
        
        const updatedListing = {
            ...newListing,
            salary: mergedSalary
        };
        
        onSubmit(updatedListing);
        
        setNewListing({
            position: '',
            about: '',
            rolesResponsibility: [],
            skills: [],
            salary: '',
            currency: 'USD' 
        });
    };


    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 uppercase tracking-wider text-center">Add New Listing</h3>
                                <div className="mb-4">
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">Position</label>
                                    <input type="text" name="position" id="position" value={newListing.position} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">About</label>
                                    <textarea name="about" id="about" rows="3" value={newListing.about} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">Skills</label>
                                    <div className="flex items-center">
                                        <input type="text" name="skillInput" id="skills" value={newListing.skillInput || ''} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                        <button onClick={handleAddSkill} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 uppercase tracking-wider">Add</button>
                                    </div>
                                    <div className="mt-2">
                                        {newListing.skills.map((skill, index) => (
                                            <span key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-md mr-2 mb-2">
                                                {skill}
                                                <button onClick={() => handleRemoveSkill(index)} className="ml-2 text-red-600 hover:text-red-800">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">Responsibilities</label>
                                    <div className="flex items-center">
                                        <input type="text" name="responsibilityInput" id="responsibilities" value={newListing.responsibilityInput || ''} onChange={handleInputChange} onKeyPress={(e) => e.key === 'Enter' && handleAddResponsibility()} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                        <button onClick={handleAddResponsibility} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 uppercase tracking-wider">Add</button>
                                    </div>
                                    <div className="mt-2">
                                        {newListing.rolesResponsibility.map((responsibility, index) => (
                                            <span key={index} className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-md mr-2 mb-2">
                                                {responsibility}
                                                <button onClick={() => handleRemoveResponsibility(index)} className="ml-2 text-red-600 hover:text-red-800">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">Salary</label>
                                    <input type="text" name="salary" id="salary" value={newListing.salary} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">Currency</label>
                                    <select name="currency" id="currency" value={newListing.currency} onChange={handleCurrencyChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="INR">INR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-x-2">
                        <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-3 uppercase tracking-wider">
                            Add Listing
                        </button>
                        <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 uppercase tracking-wider">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddListingModal;

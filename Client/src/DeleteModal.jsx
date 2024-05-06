import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-md shadow-md">
                    <p className="text-lg mb-4 uppercase tracking-wider text-center">Are you sure you want to delete this listing?</p>
                    <div className="flex justify-center">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 uppercase tracking-wider" onClick={onDelete}>Delete</button>
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md uppercase tracking-wider" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DeleteModal;

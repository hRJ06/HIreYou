import React, { useState } from 'react';

function UploadModal({ isOpen, onClose, onSubmit }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        onSubmit(file);
        setFile(null);
    };

    if (!isOpen) {
        return null; // Don't render anything if the modal is closed
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded-md shadow-lg z-50">
                <h2 className="text-lg font-bold mb-4 text-center uppercase tracking-wider">Upload Resume</h2>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <div className='flex justify-center items-baseline'>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 uppercase tracking-wider">Submit</button>
                    <button onClick={onClose} className="bg-red-500 px-4 py-2 rounded-md text-white ml-2 uppercase tracking-wider">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UploadModal;

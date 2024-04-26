// Testimonials.js
import React from 'react';

const Testimonials = () => {
    return (
        <div className="py-20">
            {/* Happy Clients Section */}
            <div className="bg-gray-50 py-20"> {/* Updated background color */}
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-[1.3px] first-letter:text-4xl">Our Happy Clients</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Testimonial 1 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Client 1"
                                className="rounded-full mb-4"
                            />
                            <p className="text-lg font-medium">Client Name</p>
                            <p className="text-sm">Company Name</p>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Client 2"
                                className="rounded-full mb-4"
                            />
                            <p className="text-lg font-medium">Client Name</p>
                            <p className="text-sm">Company Name</p>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Client 3"
                                className="rounded-full mb-4"
                            />
                            <p className="text-lg font-medium">Client Name</p>
                            <p className="text-sm">Company Name</p>
                        </div>
                        {/* Testimonial 4 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Client 4"
                                className="rounded-full mb-4"
                            />
                            <p className="text-lg font-medium">Client Name</p>
                            <p className="text-sm">Company Name</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Partners Section */}
            <div className="bg-gray-100 py-20"> {/* Updated background color */}
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-[1.3px] first-letter:text-4xl">Our Partners</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Partner 1 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://blog.hubspot.com/hs-fs/hubfs/image8-2.jpg?width=600&name=image8-2.jpg"
                                alt="Partner 1"
                                height={500}
                                width={300}
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 2 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png"
                                alt="Partner 2"
                                height={500}
                                width={300}
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 3 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                                height={500}
                                width={300}
                                alt="Partner 3"
                                className="mb-4"
                            />
                        </div>
                        {/* Partner 4 */}
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
                                alt="Partner 4"
                                className="mb-4"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

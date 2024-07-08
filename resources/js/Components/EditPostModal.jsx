import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import InputLabel from './InputLabel';

const EditPostModal = ({ isOpen, onClose, post = {}, onSave }) => {
    const dates = [
        '11/Jul/2024 17:00 - END',
        '12/Jul/2024 17:00 - END',
        '13/Jul/2024 17:00 - END'
      ];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        venue: '',
        tanggal: '',
        dates: '',
        seat: '',
        ...post
    });

    useEffect(() => {
        setFormData({
            name: '',
            email: '',
            venue: '',
            tanggal: '',
            dates: '',
            seat: '',
            ...post
        });
    }, [post]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2 sm:w-1/3 ">
                <h2 className="text-xl mb-4">Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid md:grid-cols-2 md:gap-6 gap-6'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Nama</label>
                            <TextInput
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 md:gap-6 gap-6'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <TextInput
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                        <InputLabel htmlFor="tanggal_input" value="Tanggal" />
                            <select
                            id="tanggal_input"
                            name="tanggal"
                            value={formData.tanggal}
                            onChange={handleChange}
                            className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                            >
                                {dates.map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 md:gap-6 gap-6'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Seat</label>
                            <TextInput
                                type="text"
                                name="seat"
                                value={formData.seat}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostModal;

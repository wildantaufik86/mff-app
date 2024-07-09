import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import SeatSelector from './Seat';

const EditPostModal = ({ isOpen, onClose, post = {}, onSave }) => {
    const dates = [
        '11/Jul/2024 17:00 - END',
        '12/Jul/2024 17:00 - END',
        '13/Jul/2024 17:00 - END'
      ];
      const gates = [
        'A - B',
        'C - D'
      ];
    const [formData, setFormData] = useState({
        name: '',
        tanggal: '',
        dates: '',
        gate: '',
        seat: '',
        ...post
    });

    useEffect(() => {
        setFormData({
            name: '',
            tanggal: '',
            dates: '',
            gate: '',
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
    const handleSeatSelect = (section, row) => {
        setFormData(prev => ({
            ...prev,
            seat: `SECTION ${section} - ROW ${row}`
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg w-1/2 sm:w-1/3 ">
                <h2 className="text-xl mb-4">Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className='grid md:grid-cols-2 md:gap-6 gap-6'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold">Nama</label>
                            <TextInput
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                        <InputLabel htmlFor="tanggal_input" value="Show Data - Time" />
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
                    <div className='grid md:gap-6 gap-6'>
                        <div className="mb-4">
                        <InputLabel htmlFor="gate_input" value="Gate In" />
                            <select
                            id="gates_input"
                            name="gate"
                            value={formData.gate}
                            onChange={handleChange}
                            className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                            >
                                {gates.map(gate => (
                                    <option key={gate} value={gate}>{gate}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='grid md:gap-6 gap-6'>
                    <SeatSelector onSeatSelect={handleSeatSelect} />
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

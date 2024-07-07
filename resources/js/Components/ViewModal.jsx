import { X } from '@phosphor-icons/react';
import React, { useState, useEffect } from 'react';

const ViewModal = ({ isOpen, onClose, post }) => {
  const [formData, setFormData] = useState({ ...post });

  useEffect(() => {
    setFormData({ ...post });
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
      <div className="bg-white py-6 px-9 rounded shadow-lg w-full mx-10 sm:w-1/2 md:w-1/2 lg:w-1/2">
        <div className='flex justify-between items-center mb-10 border-1 border-b-2 pb-4'>
          <h2 className="text-xl text-slate-500">Detail Pengunjung</h2>
          <button type="button" onClick={onClose}>
            <X className='text-rose-500' size={32} weight="fill" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Nama</label>
              <input type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.name || ''} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Email</label>
              <input type="text" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.email || ''} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Instansi</label>
              <input type="text" name="instansi" id="instansi" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.instansi || ''} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Status</label>
              <input type="text" name="status" id="status" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.status || ''} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Venue</label>
              <input type="text" name="venue" id="venue" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.venue || ''} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Ticket Type</label>
              <input type="text" name="seat" id="seat" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.seat || ''} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Date</label>
              <input type="text" name="tanggal" id="tanggal" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.tanggal || ''} />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Time</label>
              <input type="text" name="jam" id="jam" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={`${formData.jam_mulai || ''} ${formData.jam_selesai || ''}`} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <label className="block text-gray-700 text-sm font-bold">Group Status</label>
              <input type="text" name="group_status" id="group_status" className="block py-2.5 px-0 w-full text-sm text-slate-800 bg-transparent border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={formData.tanggal || ''} />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Barcode</label>
            <div className='w-full grid justify-center'>
              <img className='w-[300px]' src={formData.barcode_image_path} alt="Barcode" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewModal;

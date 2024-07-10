import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';

const Modal = ({ message, isOpen, onClose, visitorName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-1/3">
                <h2 className="text-xl mb-4 text-center text-slate-600 border-b-2 pb-4">Informasi Check In</h2>
                <p className='text-slate-700 text-3xl text-center'>{visitorName}</p>
                <p className='text-slate-500 text-center text-2xl pt-10 font-bold'>{message}</p>
            </div>
        </div>
    );
};

export default function CheckIn({ auth, visitorName }) {
    const [barcode, setBarcode] = useState('');
    const { flash, errors, message } = usePage().props;
    const [statusMessage, setStatusMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (flash && flash.success) {
            setStatusMessage(flash.success);
            openModal();
        } else if (flash && flash.error) {
            setStatusMessage(flash.error);
            openModal();
        } else if (message) {
            setStatusMessage(message);
            openModal();
        }
    }, [flash, message]);

    useEffect(() => {
        if (barcode) {
            handleSubmit();
        }
    }, [barcode]);

    const handleSubmit = () => {
        router.post(route('check-in'), { barcode }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setBarcode(''),
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            closeModal();
        }, 5500);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Check In Pengunjung</h2>
                </div>
            }
        >
            <Head title="Attendance" />
            <div className='container mx-auto w-full grid justify-center items-center'>
                <h1 className='text-center my-5 text-slate-800 '>Scan untuk Check In Pengunjung</h1>
                <form className=' bg-white max-w-xl px-8 py-4 drop-shadow-xl rounded-xl'>
                    <div className='grid justify-center items-center gap-4'>
                        <TextInput
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Silahkan Scan Barcode"
                            autoFocus
                        />
                    </div>
                </form>
                <Modal message={statusMessage} isOpen={isModalOpen} onClose={closeModal} visitorName={visitorName}/>
            </div>
        </AuthenticatedLayout>
    );
}

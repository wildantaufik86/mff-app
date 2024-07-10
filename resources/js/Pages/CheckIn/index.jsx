import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';

export default function CheckIn({ auth }) {
    const [barcode, setBarcode] = useState('');
    const { flash, errors, message } = usePage().props;
    const [statusMessage, setStatusMessage] = useState('');


    useEffect(() => {
        if (flash && flash.success) {
            setStatusMessage(flash.success);
        } else if (flash && flash.error) {
            setStatusMessage(flash.error);
        } else if (message) {
            setStatusMessage(message);
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

    return (
        <AuthenticatedLayout
            user={auth}
            header={
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Check In Visitor</h2>
                </div>
            }
        >
            <Head title="Attendance" />
            <div className='container mx-auto w-full grid justify-center items-center'>
                <h1 className='text-center my-5 text-slate-800 '>Scan untuk Check In Pengunjung</h1>
                {statusMessage && <div className='bg-rose-600'>{statusMessage}</div>}
                {errors && errors.barcode && <div>{errors.barcode}</div>}
                <form className=' bg-white max-w-xl px-8 py-4 drop-shadow-xl rounded-xl'>
                    <div className='grid justify-center items-center gap-4'>
                        <TextInput
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Scan barcode Here"
                            autoFocus
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

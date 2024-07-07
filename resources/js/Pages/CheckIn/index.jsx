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

    const handleSubmit = (e, action) => {
        e.preventDefault();
        router.post(route(action), { barcode }, {
            preserveState: true,
            preserveScroll: true,
        });
        setBarcode('');
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
            <div className='container mx-auto w-full'>
                <h1>Attendance</h1>
                {statusMessage && <div>{statusMessage}</div>}
                {errors && errors.barcode && <div>{errors.barcode}</div>}
                <form onSubmit={(e) => handleSubmit(e, 'check-in')} className='grid justify-center gap-5'>
                    <TextInput
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="Scan barcode"
                        autoFocus
                    />
                    <button className='bg-slate-700 p-2' type="submit">Check In</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

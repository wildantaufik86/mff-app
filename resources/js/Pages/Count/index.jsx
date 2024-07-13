import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Count({ auth, sum, sum11, sum12, sum13 }) {
    const [dropdowns, setDropdowns] = useState({});
    const toggleDropdown = (index) => {
        setDropdowns((prevDropdowns) => ({
            ...prevDropdowns,
            [index]: !prevDropdowns[index],
        }));
    };

    const content = [
        { date: "11/Jul/2024", data: sum11 },
        { date: "12/Jul/2024", data: sum12 },
        { date: "13/Jul/2024", data: sum13 }
    ];

    const renderSeatCount = (seatCount) => {
        return Object.entries(seatCount).map(([section, count], index) => (
            <p key={index} className='text-slate-800'>{section}: {count}</p>
        ));
    };

    return (
        <AuthenticatedLayout user={auth} header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Jumlah Undangan</h2>
            </div>
        }>
            <Head title="Count Page" />
            <div className="mx-auto w-full">
                <div className='flex justify-center items-center gap-4 w-full mb-4 '>
                    <div className='bg-slate-800 text-white p-5 rounded-xl text-xl'>
                        <p className='font-bold'>Jumlah Tiket:</p>
                        <p>{sum.totalVisitor}</p>
                    </div>
                    <div className='bg-slate-800 text-white p-5 rounded-xl text-xl'>
                        <p className='font-bold'>Jumlah Check In:</p>
                        <p>{sum.checkInTotal}</p>
                    </div>
                    <div className='bg-slate-800 text-white p-5 rounded-xl text-xl'>
                        <p className='font-bold'>Jumlah Check In Gate A-B:</p>
                        <p>{sum.gateAB}</p>
                    </div>
                    <div className='bg-slate-800 text-white p-5 rounded-xl text-xl'>
                        <p className='font-bold'>Jumlah Check In Gate C-D:</p>
                        <p>{sum.gateCD}</p>
                    </div>
                </div>
                {content.map((item, index) => (
                    <div key={index} className="mb-4 bg-slate-800 p-4 rounded-xl w-full">
                        <p className='text-xl text-white font-bold pb-4'>{item.date}</p>
                        <button
                            onClick={() => toggleDropdown(index)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Lihat
                        </button>
                        {dropdowns[index] && (
                            <div className="mt-2 p-4 border rounded bg-gray-100">
                                <p className='text-slate-800'>Jumlah Check In : {item.data.checkInTotal}</p>
                                <p className='text-slate-800'>Jumlah Check In Gate A - B : {item.data.gateAB}</p>
                                <p className='text-slate-800'>Jumlah Check In Gate C - D : {item.data.gateCD}</p>
                                <div>
                                    {renderSeatCount(item.data.seatCount)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}

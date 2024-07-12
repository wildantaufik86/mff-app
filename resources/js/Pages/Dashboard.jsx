import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TableUser from '@/Components/TableUser';
import { useState } from 'react';

export default function Dashboard({ auth, datas, visitorsSum }) {

return (
<AuthenticatedLayout
    user={auth}
    header={
      <div className='flex justify-between items-center'>
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
      </div>
    }
>
    <Head title="Dashboard" />
    <div className='mb-4 flex justify-start items-center py-4 gap-5'>
        <div className='text-white text-xl rounded-lg font-bold bg-slate-800 px-4 py-4'>Jumlah Ticket: <p>{visitorsSum.totalVisitor}</p></div>
        <div className='text-white text-xl rounded-lg font-bold bg-slate-800 px-4 py-4'>Jumlah Check In Hari Ini: <p>{visitorsSum.checkInTotal}</p></div>
        {/* <div className='text-white text-xl rounded-lg font-bold bg-slate-800 px-4 py-4'>Total Check In Hari Ini: <p>{visitorsSum.gateAB}</p></div> */}
    </div>
    <TableUser datas={datas} visitorsSum={visitorsSum}/>
</AuthenticatedLayout>
);
}

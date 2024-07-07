import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TableUser from '@/Components/TableUser';
import { useState } from 'react';

export default function Dashboard({ auth, datas }) {

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
    <TableUser datas={datas} />
</AuthenticatedLayout>
);
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function kursi({auth}) {

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Halaman Seat</h2>}
    >
        <Head title="Halaman Kursi" />

        <section className='flex gap-5'>
            <div id='seat-list' className='bg-rose-500 h-96 w-7/12 p-5 rounded-lg'>
                ini div kursi
                <div>ini isian kursi</div> {console.log(auth.user)}
            </div>
            <div id='seat-detail' className='bg-orange-600 w-5/12 p-5 rounded-lg'>
                ini div detail
                <div>ini isian detail</div>
            </div>
        </section>
    </AuthenticatedLayout>
    );
};

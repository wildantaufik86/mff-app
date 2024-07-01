import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableUser from '@/Components/TableUser';

export default function Dashboard({ auth, datas }) {
  return (
    <AuthenticatedLayout
      user={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900">
            <div></div>
            <div></div>
            <div>0</div>
          </div>
        </div>
      </div>
      <TableUser datas={datas} />
    </AuthenticatedLayout>
  );
}

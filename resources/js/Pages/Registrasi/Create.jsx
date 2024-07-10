import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SeatSelector from "@/Components/Seat.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    // instansi: '',
    email: '',
    barcode_code: '',
    tanggal: '',
    seat: '',
    gate: '',
    // row: '',
    group_person: [],
  });

  const [visitorNames, setVisitorNames] = useState(['']);

  const dates = [
    '11/Jul/2024 17:00 - END',
    '12/Jul/2024 17:00 - END',
    '13/Jul/2024 11:00 - END'
  ];
  const gates = [
    'A - B',
    'C - D'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     post(route('visitors.store'));
//   };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      ...data,
      group_person: data.group_status ? visitorNames : [],
    };
    post(route("dashboard.store"), formData);
  };

  const handleVisitorNameChange = (index, value) => {
    const newNames = [...visitorNames];
    newNames[index] = value;
    setVisitorNames(newNames);
    setData('group_person', newNames);
  };

  const addVisitorInput = () => {
    setVisitorNames([...visitorNames, '']);
  };

  const removeVisitorInput = (index) => {
    const newNames = [...visitorNames];
    newNames.splice(index, 1);
    setVisitorNames(newNames);
    setData('group_person', newNames);
  };

  const handleSeatSelect = (section, row) => {
    setData('seat', `SECTION ${section} - ROW ${row}`);
  };

  return (
    <Authenticated
      user={auth}
      header={
        <div className='flex justify-between items-center'>
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Visitor Data</h2>
        </div>
      }
    >
      <Head title="Dashboard" />
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Form Create Visitor</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Please fill the input field to add visitor
          </p>
        </div>
        <form onSubmit={onSubmit} className="mx-auto max-w-xl mt-5 bg-white p-5 rounded-xl shadow-xl">
          <div className="">
            {/* Additional input fields */}
            <div className="">
              <div className='pb-3'>
                <InputLabel htmlFor="name_input" value="Name" />
                <TextInput
                  placeholder="Enter Full Name / Nickname"
                  id="name_input"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
            </div>
            <div className="">
              <div className='pb-3'>
                <InputLabel htmlFor="barcode_code_input" value="Barcode Reader" />
                <TextInput
                  placeholder="JANGAN DI ISI JIKA AUTO GENERATE BARCODE / TIDAK BISA DI EDIT"
                  id="barcode_code_input"
                  type="text"
                  name="barcode_code"
                  value={data.barcode_code}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
                />
                <InputError message={errors.barcode_code} className="mt-2" />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 pb-3'>
              <div>
                <InputLabel htmlFor="email_input" value="Email" />
                <TextInput placeholder="Enter Email (John@email.com)" id="email_input" type="text" name="email" value={data.email} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="tanggal_input" value="Tanggal" />
                <select
                  id="tanggal_input"
                  name="tanggal"
                  value={data.tanggal}
                  onChange={handleChange}
                  className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                >
                    <option value="">Select Tanggal</option>
                    {dates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
                <InputError message={errors.tanggal} className="mt-2" />
              </div>
            </div>
            <div>
            <div className='pb-3'>
                <InputLabel htmlFor="gate_input" value="Gate" />
                <select
                  id="gate_input"
                  name="gate"
                  value={data.gate}
                  onChange={handleChange}
                  className='w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm'
                >
                    <option value="">Select Gate</option>
                    {gates.map(gate => (
                        <option key={gate} value={gate}>{gate}</option>
                    ))}
                </select>
                <InputError message={errors.tanggal} className="mt-2" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <SeatSelector onSeatSelect={handleSeatSelect} />
            </div>
            <div>
              <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  );
}

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    instansi: '',
    email: '',
    tanggal: '',
    venue: '',
    seat: '',
    jam_mulai: '',
    jam_selesai: '',
    group_status: false,
    group_person: [],
  });

  const [visitorNames, setVisitorNames] = useState(['']);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

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
          <div className="grid grid-cols-1 gap-y-6">
            <div className="sm:col-span-2">
              <InputLabel htmlFor="group_status" value="Group Status" />
              <input
                type="checkbox"
                id="group_status"
                name="group_status"
                checked={data.group_status}
                onChange={handleChange}
              />
              <span className="ml-2">Is this a group?</span>
            </div>

            {data.group_status ? (
              <>
                <div className="sm:col-span-2">
                  <InputLabel htmlFor="name_input" value="Group Name" />
                  <TextInput
                    placeholder="Enter Group Name"
                    id="name_input"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="grid grid-cols-1 gap-y-4">
                  {visitorNames.map((visitor, index) => (
                    <div key={index}>
                      <InputLabel htmlFor={`name_input_${index}`} value={`Visitor ${index + 1}`} />
                      <div className="flex">
                        <TextInput
                          placeholder={`Enter Visitor ${index + 1} Name`}
                          id={`name_input_${index}`}
                          type="text"
                          value={visitor}
                          onChange={(e) => handleVisitorNameChange(index, e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm"
                        />
                        {index > 0 && (
                          <button type="button" onClick={() => removeVisitorInput(index)} className="ml-2 px-3 py-1.5 bg-red-500 text-white rounded-md text-sm">Remove</button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addVisitorInput} className="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm">Add More</button>
                </div>
              </>
            ) : (
              <div className="sm:col-span-2">
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
            )}

            {/* Additional input fields */}
            <div className="grid grid-cols-1 gap-y-6 sm:col-span-2">
              <div>
                <InputLabel htmlFor="instansi_input" value="Instansi" />
                <TextInput placeholder="Enter Institution Name" id="instansi_input" type="text" name="instansi" value={data.instansi} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.instansi} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="email_input" value="Email" />
                <TextInput placeholder="Enter Email (John@email.com)" id="email_input" type="text" name="email" value={data.email} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="tanggal_input" value="Tanggal" />
                <TextInput placeholder="Enter Visit Date" id="tanggal_input" type="date" name="tanggal" value={data.tanggal} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.tanggal} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="venue_input" value="Venue" />
                <TextInput placeholder="Enter Venue" id="venue_input" type="text" name="venue" value={data.venue} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.venue} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="seat_input" value="Seat" />
                <TextInput placeholder="Enter Seat" id="seat_input" type="text" name="seat" value={data.seat} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
                <InputError message={errors.seat} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="jam_mulai_input" value="Jam Mulai" />
                <TextInput id="jam_mulai_input" type="time" name="jam_mulai" value={data.jam_mulai} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
              </div>
              <div>
                <InputLabel htmlFor="jam_selesai_input" value="Jam Selesai" />
                <TextInput id="jam_selesai_input" type="time" name="jam_selesai" value={data.jam_selesai} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-slate-600 focus:border-slate-600 sm:text-sm" />
              </div>
            </div>

            {/* Submit button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="block w-full bg-slate-600 text-white rounded-md py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-500 focus:ring-2 focus:ring-offset-2 focus:ring-slate-600 duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Authenticated>
  );
}

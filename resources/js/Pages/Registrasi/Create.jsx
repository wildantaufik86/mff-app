import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";


export default function Create({auth}) {
  const {data, setData, post, processing, errors, reset} = useForm({
    name: '',
    instansi: '',
    email: '',
    seat: '',
    status: ''
  })

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("dashboard.store"));
  }

  return (
    <Authenticated
    user={auth}
    header={
      <div className='flex justify-between items-center'>
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New User</h2>
      </div>
    }
>
    <Head title="Dashboard" />
    <div className="container mx-auto px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Form Create Visitor</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto max-w-xl">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Instansi
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
    <div className="container mx-auto text-slate-800">
      <form className="w-full" onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="name_input" value="Name" />
          <TextInput id="name_input" type="text" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
        </div>
        <div>
          <InputLabel htmlFor="instansi_input" value="Instansi" />
          <TextInput id="instansi_input" type="text" name="instansi" value={data.instansi} onChange={(e) => setData("instansi", e.target.value)} />
        </div>
        <div>
          <InputLabel htmlFor="email_input" value="Email" />
          <TextInput id="email_input" type="text" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} />
        </div>
        <div>
          <InputLabel htmlFor="seat_input" value="Seat" />
          <TextInput id="seat_input" type="text" name="seat" value={data.seat} onChange={(e) => setData("seat", e.target.value)} />
        </div>
        {/* <div>
          <InputLabel htmlFor="seat_input" value="Seat" />
          <TextInput id="seat_input" type="text" name="seat" value={data.seat} onChange={(e) => setData("seat", e.target.value)} />
        </div> */}
        <button>submit</button>
      </form>
    </div>
    </Authenticated>
  )
};

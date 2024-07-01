import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function ModalUpdate({ id, s }) {
    const {
        data: editData,
        setData: setEditData,
        errors,
        processing,
        reset
    } = useForm({
        id: s.id,
        name: s.name,
        instansi: s.instansi,
        status: s.status,
        group: s.group,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(`/updateKursi/${s.id}`, {
            _method: "patch",
            ...editData,
        });
    };

    return (
        <>
            <button
                onClick={() =>
                    document
                        .getElementById(`my_modal_3${s.id}`)
                        .showModal()
                }
                className={`inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 `}
            >
                Edit
            </button>
            <dialog id={id} className="modal">
                <div className="modal-box bg-slate-50">
                    <div className="modal-header">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() => reset()}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="modal-body">
                        <h3 className="font-bold text-lg">
                            Edit {s.name} Details
                            <small className="block">
                                id: {editData.id}
                            </small>
                        </h3>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            {/* First Name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="First Name"
                                />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <InputLabel
                                    htmlFor="status"
                                    value="Last Name"
                                />

                                <TextInput
                                    id="status"
                                    className="mt-1 block w-full"
                                    value={editData.status}
                                    onChange={(e) =>
                                        setEditData("status", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="status"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.status}
                                />
                            </div>

                            {/* instansi */}
                            <div>
                                <InputLabel
                                    htmlFor="instansi"
                                    value="instansi"
                                />

                                <TextInput
                                    id="instansi"
                                    className="mt-1 block w-full"
                                    value={editData.instansi}
                                    onChange={(e) =>
                                        setEditData(
                                            "instansi",
                                            e.target.value
                                        )
                                    }
                                    required
                                    isFocused
                                    autoComplete="instansi"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.instansi}
                                />
                            </div>

                            {/* group */}
                            <div>
                                <InputLabel htmlFor="group" value="group" />

                                <TextInput
                                    id="group"
                                    type="group"
                                    className="mt-1 block w-full"
                                    value={editData.group}
                                    onChange={(e) =>
                                        setEditData("group", e.target.value)
                                    }
                                    required
                                    autoComplete="username"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.group}
                                />
                            </div>

                            <button
                                className={`w-full text-center items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-600 active:bg-yellow-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest  focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150`}
                                disabled={processing}
                            >
                                Confirm Update
                            </button>
                        </form>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-black border-0 bg-gray-300 hover:bg-gray-400"
                                onClick={() => reset()}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => reset()}></button>
                </form>
            </dialog>
        </>
    );
}

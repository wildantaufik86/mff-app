import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Horse, Heart, Cube, Trash, NotePencil, Eye } from "@phosphor-icons/react";
import ConfirmModal from '@/Components/ConfirmModal';

export default function TableUser({ datas }) {
    const viewPost = ( id ) => { router.view(`/kursi/${id}`); }
    const editPost = ( id ) => { router.edit(`/kursi/${id}`); }

    const [data, setData] = useState(datas);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        router.delete(`/kursi/${deleteId}`, {
            onSuccess: () => {
                alert('Resource deleted successfully.');
                setData(data.filter(visitor => visitor.id !== deleteId)); // Update local state
                setIsModalOpen(false);
            },
            onError: () => {
                alert('Failed to delete the resource.');
                setIsModalOpen(false);
            }
        });
    };
    return (
        <div className="overflow-x-auto">
          <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete this item?"
            />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800 rounded-tl-xl">Nama</th>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Instansi</th>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Status</th>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Seat</th>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Group</th>
                        <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800 rounded-tr-xl">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {datas.map((visitor, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">{visitor.name}</td>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">{visitor.instansi}</td>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">{visitor.status}</td>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">{visitor.seat}</td>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">Yes</td>
                            <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">
                                <button className="" onClick={() => viewPost(visitor.id)}>
                                  <Eye size={20} className="text-green-500" weight="fill" />
                                </button>
                                <button className="p-2" onClick={() => editPost(visitor.id)}>
                                  <NotePencil size={20} className="text-sky-500" weight="fill" />
                                </button>
                                <button className="" onClick={() => handleDeleteClick(visitor.id)}>
                                  <Trash size={20} className="text-rose-500" weight="fill" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

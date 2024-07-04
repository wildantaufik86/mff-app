import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Trash, NotePencil, Eye } from "@phosphor-icons/react";

import ConfirmModal from '@/Components/ConfirmModal';
import EditPostModal from '@/Components/EditPostModal';

export default function TableUser({ datas }) {
    const [data, setData] = useState(datas);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const viewPost = (id) => { router.view(`/kursi/${id}`); }
    const editPost = (post) => {
        setCurrentPost(post);
        setIsEditModalOpen(true);
    };
    const savePost = (updatedPost) => {
        router.patch(`/kursi/${updatedPost.id}`, updatedPost, {
            onSuccess: () => {
                setData(data.map(item => (item.id === updatedPost.id ? updatedPost : item)));
                closeModal();
            }
        });
    };
    const closeModal = () => {
        setIsEditModalOpen(false);
        setCurrentPost(null);
    };

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
        <div className="overflow-x-auto container mx-auto">
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete this item?"
            />
            <EditPostModal
                isOpen={isEditModalOpen}
                onClose={closeModal}
                post={currentPost}
                onSave={savePost}
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

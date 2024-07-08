import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Trash, NotePencil, Eye } from "@phosphor-icons/react";

import ConfirmModal from '@/Components/ConfirmModal';
import EditPostModal from '@/Components/EditPostModal';
import TextInput from './TextInput';
import VisitorViewModal from './ViewModal';

export default function TableUser({ datas }) {
  const [data, setData] = useState(datas || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const editPost = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  const handlePrint = (id) => {
    window.location.href = route('export.invitation', { id: id });
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

  const closeModalView = () => {
    setIsViewModalOpen(false);
    setCurrentPost(null);
  };

  const viewPost = (post) => {
    setCurrentPost(post);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    Inertia.delete(route('kursi.destroy', deleteId), {
      onSuccess: () => {
        setData(data.filter(visitor => visitor.id !== deleteId)); // Update local state
        setIsModalOpen(false);
      },
      onError: () => {
        alert('Failed to delete the resource.');
        setIsModalOpen(false);
      }
    });
  };

  const handleSelectAll = (e) => {
    if (data && data.length > 0) {
      if (e.target.checked) {
        setSelectedIds(data.map(item => item.id));
      } else {
        setSelectedIds([]);
      }
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) {
      // Batch delete requests
      Promise.all(selectedIds.map(id => router.delete(`/kursi/${id}`)))
        .then(() => {
          setData(data.filter(visitor => !selectedIds.includes(visitor.id))); // Update local state
          setSelectedIds([]);
          alert('Selected resources deleted successfully.');
        })
        .catch(error => {
          console.error('Error deleting selected resources:', error);
          alert('Failed to delete some resources. Please try again.');
        });
    } else {
      alert('No items selected.');
    }
  };

  return (
    <>
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
        <VisitorViewModal
          isOpen={isViewModalOpen}
          onClose={closeModalView}
          post={currentPost}
          onSave={savePost}
        />
        <div className='flex justify-between items-center mb-4'>
          <div className='flex justify-start items-center gap-5'>
            <Link className='bg-sky-600 text-white px-4 py-2 rounded-xl' href={route("dashboard.create")}>
              Add New
            </Link>
            <Link className='bg-green-500 text-white px-6 py-2 rounded-xl'>
              Export
            </Link>
          </div>
          <button className='bg-red-500 text-white px-4 py-2 rounded-xl' onClick={handleDeleteSelected}>
            Delete Data
          </button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800 rounded-tl-xl">
                <TextInput
                  type="checkbox"
                  checked={selectedIds.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-2 px-4 border-b border-gray-100 text-start text-white bg-slate-800">Nama</th>
              <th className="py-2 px-4 border-b border-gray-100 text-start text-white bg-slate-800">Status</th>
              <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Invitation</th>
              <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800">Print</th>
              <th className="py-2 px-4 border-b border-gray-100 text-center text-white bg-slate-800 rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((visitor, index) => (

              <tr className='bg-white' key={index}>
                <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">
                  <TextInput
                    type="checkbox"
                    checked={selectedIds.includes(visitor.id)}
                    onChange={() => handleSelect(visitor.id)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-100 text-start text-slate-800">{visitor.name}</td>
                <td className="py-2 px-4 border-b border-gray-100 text-start text-slate-800">{visitor.status}</td>
                <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">
                    <button className='bg-sky-500 text-white px-2 py-1 rounded-xl text-sm'>Send Invitation</button>
                </td>
                <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">
                <a href={route('export.invitation', { id: visitor.id })} download={visitor.name + "_MFF-INVITATION" + ".png"} className='bg-emerald-700 text-white px-2 py-1 rounded-xl text-sm'>Print Invitation</a>
                </td>
                <td className="py-2 px-4 border-b border-gray-100 text-center text-slate-800">
                  <button className="" onClick={() => viewPost(visitor)}>
                    <Eye size={20} className="text-green-500" weight="fill" />
                  </button>
                  <button className="p-2" onClick={() => editPost(visitor)}>
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
    </>
  );
}

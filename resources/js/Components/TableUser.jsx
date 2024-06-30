import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import React from "react"

const TableUser = ({ datas }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Nama</th>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Instansi</th>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Status</th>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Seat</th>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Group</th>
              <th className="py-2 px-4 border-b border-gray-200 text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((visitor, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200">{visitor.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{visitor.instansi}</td>
                <td className="py-2 px-4 border-b border-gray-200">{visitor.status}</td>
                <td className="py-2 px-4 border-b border-gray-200">{visitor.seat}</td>
                <td className="py-2 px-4 border-b border-gray-200">Yes</td>
                <td className="py-2 px-4 border-b border-gray-200">
                <Link href="">View</Link>
                <Link href="">Edit</Link>
                <Link href={route('kursi.destroy')}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableUser;

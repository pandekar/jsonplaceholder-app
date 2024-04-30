import * as React from 'react';

import { Link } from 'react-router-dom';
import { IoIosContact } from "react-icons/io";

export default function Users({ data, error, isLoading }) {
  return (
    <div className="p-2">
      <div className="shadow-lg bg-base-100 navbar">
        <div className="flex items-center gap-1 p-5 text-xl font-semibold normal-case">
          <div>Users</div> <IoIosContact className="text-2xl" />
        </div>
      </div>
      {isLoading ?
        (<div className="flex items-center justify-center flex-1 h-[50vh]">
          <span
            className="loading loading-spinner loading-lg"
            data-testid="loading-main-data"
          ></span>
        </div>) :
        <div className='p-10 overflow-x-auto'>
          <table className="table">
            <thead className="text-sm">
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Username</th>
                <th className="text-center">Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={index}>
                  <td className='text-center'>{user.name}</td>
                  <td className='text-center'>{user.username}</td>
                  <td className='text-center'>{user.email}</td>
                  <td className='flex flex-row justify-center'>
                    <div className='border border-gray-950 rounded-md hover:bg-black hover:text-white px-2 font-bold'>
                      <Link to={`/users/${user.id}`}>DETAIL</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}
import Link from "next/link";
import React from "react";
import Badge from "../Badge/Badge";

export default function Table() {
  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Filter Dropdown - 15% width */}
        <div className="relative w-[15%]">
          <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500">
            <option value="all">All</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        {/* Second Filter Dropdown - 15% width */}
        <div className="relative w-[15%]">
          <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500">
            <option value="all">All</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        {/* Search Type Dropdown - 15% width */}
        <div className="relative w-[15%]">
          <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500">
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        {/* Search Input with Search Button - Remaining space */}
        <div className="relative flex-grow">
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full rounded leading-tight focus:outline-none focus:ring-blue-500"
            placeholder="Search"
          />
          <button className="absolute inset-y-0 right-0 bg-blue-500 px-3 flex items-center justify-center rounded-r text-white">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-fixed border-collapse shadow-sm rounded-lg text-sm">
        <tbody>
          {/* Header Row */}
          <tr className="bg-gray-200 rounded-t-lg">
            <th colSpan={10} className="p-2 border-b border-gray-300">
              <div className="flex items-center space-x-2">
                <input className="h-4 w-4 cb-all" type="checkbox" />
                <label className="ml-2 text-xs text-gray-600 count-selected"></label>
                <button
                  className="bg-blue-500 text-white text-xs px-2 py-1 ml-2 rounded hidden"
                  type="button"
                  style={{ display: "none" }}
                >
                  Copy ID
                </button>
                <button
                  className="bg-teal-500 text-white text-xs px-2 py-1 ml-2 rounded hidden"
                  type="button"
                  style={{ display: "none" }}
                >
                  Refill
                </button>
              </div>
            </th>
          </tr>

          {/* Data Row */}
          <tr className="bg-white hover:bg-gray-50 border-b">
            {/* First column - 10% width */}
            <td className="border-t border-gray-300 p-2 w-[10%]">
              <div className="flex items-center whitespace-nowrap">
                <input className="h-4 w-4 cb-all" type="checkbox" />
                <span className="font-bold text-gray-700 text-sm pl-2 truncate">
                  ID: 19785587
                </span>
              </div>
              <p className="m-0 font-bold text-blue-500 text-sm">
                <span className="text-[#009ef7] whitespace-nowrap">
                  In progress
                </span>
              </p>
              <p className="m-0 text-xs text-gray-500">2024-10-21 21:58:32</p>
              <p className="m-0 text-xs text-gray-500">2024-10-22 20:42:38</p>
            </td>

            {/* Middle column - this will automatically fill the remaining width */}
            <td className="border-t border-gray-300 p-2">
              <div>
                <p className="m-0 text-gray-700 flex items-center text-sm truncate">
                  <img
                    src="https://cdn.mypanel.link/4cgr8h/ewzs0f9k8ic2932y.gif"
                    className="w-3 h-3 mr-2"
                  />
                  <span className="text-gray-800 font-bold truncate">2198</span>{" "}
                  | TikTok Live Chat Custom Comments [VIETNAM]
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge range={9} />
                </div>
                <p className="mt-1 text-xs break-words">
                  <a
                    href="https://vt.tiktok.com/ZSje9qGTS/"
                    className="text-[#009ef7] truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://vt.tiktok.com/ZSje9qGTS/
                  </a>
                </p>
              </div>
              <div className="text-right">
                <a
                  href="/new?service=2198"
                  className="text-blue-500 font-bold mr-2 text-xs whitespace-nowrap"
                >
                  Reorder
                </a>
                <a
                  href="javascript:;"
                  className="text-red-500 font-bold text-xs whitespace-nowrap"
                >
                  Report
                </a>
              </div>
            </td>

            {/* Last column - 10% width */}
            <td className="border-t border-gray-300 p-2 w-[10%]">
              <p className="font-bold text-sm">
                <span className="text-gray-600">Charge:</span>
                <a href="/cashflow?id=19785587" className="text-blue-500">
                  $0.0228
                </a>
              </p>
              <p className="font-bold text-sm">
                <span className="text-gray-600">Quantity:</span> 19
              </p>
              <p className="font-bold text-sm">
                <span className="text-gray-600">Start count:</span> 0
              </p>
              <p className="font-bold text-sm">
                <span className="text-gray-600">Remains:</span> 13
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

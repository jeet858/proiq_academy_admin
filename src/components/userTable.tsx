import { $Enums } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { api } from "~/utils/api";

interface CentreTableProps {
  users: UserData[];
}
interface UserData {
  email: string;
  id: string;
  userType: string;
  phoneNumber: string;
  name: string;
  centres: {
    name: string;
  }[];
  courses: {
    name: string;
  }[];
}

const UserTable: React.FunctionComponent<CentreTableProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full py-6">
      <div className="relative flex w-full flex-col-reverse items-start justify-start gap-y-2 py-7 lg:flex-row">
        <div className="mb-4 flex space-x-2 self-start">
          <input
            type="text"
            placeholder="Search Student"
            className="w-full rounded-md border p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="rounded-md bg-yellow-500 px-4 py-2 text-white">
            🔍
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto whitespace-nowrap">
          <thead>
            <tr className="border-b border-dashed">
              <th className="border-b border-l border-r border-dashed p-2">
                ID
              </th>
              <th className="border-b border-r border-dashed p-2">Name</th>
              <th className="border-b border-r border-dashed p-2">Email</th>
              <th className="border-b border-r border-dashed p-2">Phone No.</th>
              <th className="border-b border-r border-dashed p-2">User Type</th>
              <th className="border-b border-r border-dashed p-2">Centres</th>
              <th className="border-b border-r border-dashed p-2">Courses</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-transparent">
            {users?.map((user, index) => (
              <tr key={index} className="border-b border-dashed text-center">
                <td className="border border-dashed p-2">
                  {user.id.slice(0, 8)}
                </td>
                <td className="border border-dashed p-2">{user.name}</td>
                <td className="border border-dashed p-2">{user.email}</td>
                <td className="border border-dashed p-2">{user.phoneNumber}</td>
                <td className="border border-dashed p-2">{user.userType}</td>
                <td className="border border-dashed p-2">
                  {user.centres.map((c) => c.name).join(", ") || "N/A"}
                </td>
                <td className="border border-dashed p-2">
                  {user.courses.map((c) => c.name).join(", ") || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserTable;

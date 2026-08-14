import { getCollection } from "../../../../lib/db";
import Link from "next/link";

export default async function UserManagementPage() {
  const userCollection = await getCollection("users");
  const users = await userCollection.find().toArray();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <p className="text-lg text-neutral-700 mb-6">
            View and manage Administrators.
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length > 0 ?
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.email}
                        </p>
                      </td>
                    </tr>
                  ))
                : <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-neutral-800"
                    >
                      <p className="text-sm">No Administrators yet. </p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

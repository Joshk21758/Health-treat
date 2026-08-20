import React from "react";
import Link from "next/link";
import { DASHBOARD_MODULES } from "../../../lib/Links";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { authUser } from "../../../lib/authUser";

export default async function DashboardHubPage() {
  const user = await authUser();

  // Filter modules where user's role exists in allowed roles
  const userRole = (user.role || "").toUpperCase();
  const accessibleModules = DASHBOARD_MODULES.filter((module) =>
    module.roles.includes(userRole),
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-10">
      {/* Banner */}
      <div className="bg-neutral-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold bg-emerald-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Logged in as {userRole}
          </span>
          <h1 className="text-2xl font-bold">Welcome, {user.fullName}</h1>
          <p className="text-lg text-gray-400 mt-1">
            Select a module below to access clinical operations authorized for
            your role.
          </p>
        </div>
      </div>

      {/* Dynamic Grid Mapping */}
      <div>
        <h2 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-4 ">
          Authorized Modules ({accessibleModules.length})
        </h2>

        {accessibleModules.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessibleModules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group bg-gray-200 shadow-lg p-5 rounded-xl border border-gray-300 hover:border-rose-500 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-rose-400 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 transition-colors" />
                    </div>

                    <h3 className="font-bold text-gray-800 text-xl group-hover:text-rose-500 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-lg text-neutral-800 mt-1 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-300 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-sm font-bold text-neutral-900">
                      Access Level
                    </span>
                    <span className="font-semibold text-rose-400 text-sm">
                      {userRole}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        : <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-neutral-600 text-lg font-bold">
            No modules available for your current role. Please contact your
            system administrator.
          </div>
        }
      </div>
    </div>
  );
}

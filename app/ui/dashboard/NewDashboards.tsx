"use client";
import { Dashboard } from "@/app/lib/definitions"
import { signOut } from "@/auth";
import { useState } from "react";
import { PowerIcon } from '@heroicons/react/24/outline';
import { logOut } from "@/app/lib/actions";


interface NewDashboardProps {
    dashboards: Dashboard[] | undefined
}
export default function NewDashboard({ dashboards }: NewDashboardProps) {
    const [activeDash, setActiveDash] = useState(0)

    if (!dashboards) {
        return null;
    }

    return <>
        <div className="w-full flex-none md:w-64">
            {dashboards?.map((d, index) => <button
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                key={d.link} onClick={() => setActiveDash(index)}>
                {d.name}
            </button>)}
            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
        action={async ()=>{
          await logOut();
        }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
        </div>
        <div className="flex-grow p-1 md:overflow-y-auto ">
            <iframe className="w-full h-full" src={dashboards[activeDash].link || ""}></iframe>
        </div>
    </>
}
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchDashboardByUserEmail } from '../../lib/data';
import { Suspense } from 'react';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { auth } from "@/auth";
import SideNav from "@/app/ui/dashboard/sidenav";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  let dashboards;
  let firstLink;
  //fetch all dashboards
  if (user?.email) {
    dashboards = await fetchDashboardByUserEmail(user?.email)
  }
  if (dashboards) {
    firstLink = dashboards[0].link
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto ">
        <iframe className="w-full h-full" src={firstLink}></iframe>
      </div>
    </div>
  );
}
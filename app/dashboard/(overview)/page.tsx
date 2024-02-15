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
import NewDashboard from "@/app/ui/dashboard/NewDashboards";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  let dashboards;

  //fetch all dashboards
  if (user?.email) {
    dashboards = await fetchDashboardByUserEmail(user?.email)
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <NewDashboard dashboards={dashboards} />
    </div>
  );
}
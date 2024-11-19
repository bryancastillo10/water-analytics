import DashboardCard from "@/features/dashboard/components/DashboardCard"
import { statisticsCard } from "./api/mockData"

const Dashboard = () => {
  return (
    <main className="">
      <div className="grid gap-y-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 sm:place-items-center xl:place-items-start gap-8">
        {statisticsCard.map((item) => (
          <DashboardCard
            key={item.id}
            id={item.id}
            parameter={item.parameter}
            icon={item.icon}
            value={item.value}
            unit={item.unit}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 xl:grid-cols-3">
        {/* Spanning two columns on larger screens */}
        <div className="col-span-1 xl:col-span-2 h-[350px] bg-teal-500"></div>

        {/* Single-column items */}
        <div className="col-span-1 h-[350px] bg-amber-500"></div>
        <div className="col-span-1 h-[350px] bg-sky-500"></div>

        {/* Full-width on mobile, balanced columns on larger screens */}
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 h-[350px] bg-emerald-500"></div>
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 h-[350px] bg-indigo-500"></div>
      </div>
    </main>
  );
}

export default Dashboard

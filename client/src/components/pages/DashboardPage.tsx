import DashboardCard from "@/features/dashboard/components/DashboardCard";
import { statisticsCard } from "@/features/dashboard/api/mockData";
import { NutrientsBarChart, PieChart, RadarChart, TimeSeriesLineChart } from "@/features/dashboard";



const DashboardPage = () => {
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
        <TimeSeriesLineChart />
        <PieChart />
        <RadarChart />
        <NutrientsBarChart/>
      </div>
    </main>
  );
}

export default DashboardPage;

import DashboardCard from "@/features/dashboard/components/DashboardCard";
import { statisticsCard } from "@/features/dashboard/api/mockData";

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
        <div className="col-span-1 xl:col-span-2 h-[350px] bg-teal-500">
          <div className="flex flex-col odd:justify-center items-center h-full">
            <h1 className="text-2xl">Time Series Area Chart</h1>
            <p className="text-center">
              pH, Temperature, DO, COD, Suspended Solids over Time
            </p>
          </div>
        </div>
        <div className="col-span-1 h-[350px] bg-amber-500">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl">Pie Chart by Water Source</h1>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 xl:col-span-1 h-[350px] bg-sky-500">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-2xl">Radar Chart Overview</h1>
            <p className="text-center">Comparing Parameters to Thresholds</p>
          </div>
        </div>
        <div className="col-span-1 xl:col-span-2  h-[350px] bg-indigo-500">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-2xl">Bar Chart of Nutrients</h1>
            <p className="text-center">
              Average Concentrations of Ammonia, Nitrates, Phosphates
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;

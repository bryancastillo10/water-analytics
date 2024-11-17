import DashboardCard from "@/features/dashboard/components/DashboardCard"
import { statisticsCard } from "./api/mockData"

const Dashboard = () => {
  return (
    <main>
      <div className="grid grid-cols-1 gap-y-4 place-items-center md:grid-cols-2 xl:grid-cols-4 xl:place-items-start gap-8">
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
      <div className="mt-8">

        Dashboard Charts Here
      </div>
    </main>
  )
}

export default Dashboard

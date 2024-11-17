import DashboardCard from "@/features/dashboard/components/DashboardCard"


const Dashboard = () => {
  return (
    <main>
      <div className="grid grid-cols-1 gap-y-4 place-items-center md:grid-cols-2 xl:grid-cols-4 xl:place-items-start gap-8">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard/>
      </div>
      <h1>Dashboard Page</h1>
    </main>
  )
}

export default Dashboard

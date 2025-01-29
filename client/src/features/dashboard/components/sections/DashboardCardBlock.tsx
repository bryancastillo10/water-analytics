import { useAppSelector } from "@/lib/redux/hooks";
import { useGetDashboardCardValuesQuery } from "@/features/dashboard/api/dashboardApi";
import { parameterIcons } from "@/features/dashboard/utils/parameterMapping";

const DashboardCardBlock = () => {
  const selectedSiteId = useAppSelector((state) => state.dashboard.selectedSiteId);
  const siteId = selectedSiteId || "";
  const {data: statistics } = useGetDashboardCardValuesQuery(siteId);
  
    const statisticsCard = statistics?.map((stat) => ({
        parameter: stat.parameter,
        value: stat.averageValue ?? "N/A",
        unit: stat.unit || "",
        status: stat.status || "Unknown",
        icon: parameterIcons[stat.parameter] || null
    }));

    console.log(statisticsCard);
    return (
    <div className="grid gap-y-4 grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-4 sm:place-items-center xl:place-items-start gap-8">
            {/* DashboardCard should be rendered here */}
    </div>
  )
}

export default DashboardCardBlock;

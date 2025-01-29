import { useAppSelector } from "@/lib/redux/hooks";
import { useGetDashboardCardValuesQuery } from "@/features/dashboard/api/dashboardApi";
import { parameterIcons } from "@/features/dashboard/utils/parameterMapping";

const DashboardCardBlock = () => {
  const selectedSiteId = useAppSelector((state) => state.dashboard.selectedSiteId);
  const siteId = selectedSiteId || "";
  const {data: statistics, isLoading } = useGetDashboardCardValuesQuery(siteId);
  
    const statisticsCard = statistics?.map((stat) => ({
        parameter: stat.parameter,
        value: stat.averageValue ?? "N/A",
        unit: stat.unit || "",
        status: stat.status || "Unknown",
        icon: parameterIcons[stat.parameter] || null
    }));

    if (isLoading) {
        return (
            <div className="grid gap-y-4 grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-4 sm:place-items-center xl:place-items-start gap-8">
            {Array.from({length:4}).map((_, index) => (
                <div
                    key={index}
                    className="w-[250px] h-[190px] overflow-hidden max-w-md 
                    bg-gradient-to-br from-secondary to-primary rounded-xl
                    shadow-lg p-4 lg:p-6 transition-all duration-300 hover:shadow-xl
                    relative animate-pulse"/>
            ))}
            </div>
        )}

    console.log(statisticsCard);
    return (
    <div className="grid gap-y-4 grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-4 sm:place-items-center xl:place-items-start gap-8">
            {/* DashboardCard should be rendered here */}
    </div>
  )
}

export default DashboardCardBlock;

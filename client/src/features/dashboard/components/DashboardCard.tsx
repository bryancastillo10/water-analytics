import { ChartLineUp } from "@phosphor-icons/react";
import type { statisticsCardProps } from "@/features/dashboard/api/mockData";

const DashboardCard = ({
  parameter,
  icon: Icon,
  value,
  unit
}: statisticsCardProps) => {
  return (
    <article className="w-full min-h-[180px] overflow-hidden max-w-sm bg-gradient-to-br from-secondary to-primary text-light rounded-xl shadow-lg p-4 lg:p-6 transition-all duration-300 hover:shadow-xl relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 lg:w-32 h-24 lg:h-32 bg-dark/20 rounded-full -translate-y-12 translate-x-12" />
      
      {/* Header */}
      <h1 className="relative font-bold text-lg tracking-wide mb-4 lg:mb-6 pb-2 border-b border-neutral/80 truncate">
        {parameter}
      </h1>

      <div className="relative flex justify-evenly xl:justify-between items-center gap-4">
        {/* Left Section */}
        <div className="flex flex-col items-baseline gap-y-2">
          <div className="p-2 lg:p-3 bg-white/10 rounded-lg inline-block">
            <Icon className="size-12" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold tracking-tight">{value}</span>
            <span className="text-lg font-medium">{unit}</span>
          </div>
          <div className="flex items-center gap-x-2 text-emerald-300">
            <ChartLineUp className="size-8 lg:size-5" />
            <span className="text-xs lg:text-sm font-medium whitespace-nowrap">Trending Up</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DashboardCard;
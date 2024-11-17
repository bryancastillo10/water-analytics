import { Flask, ChartLineUp, Calendar } from "@phosphor-icons/react";

const DashboardCard = () => {
  return (
    <article className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary text-light rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-dark/20 rounded-full -translate-y-16 translate-x-16" />
      
      {/* Header */}
      <h1 className="relative font-bold text-2xl tracking-tight mb-6 pb-2 border-b border-neutral/80">
        COD Removal
      </h1>

      <div className="relative flex justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-col items-baseline gap-y-2">
          <div className="p-3 bg-white/10 rounded-lg inline-block">
            <Flask className="w-12 h-12" />
          </div>
          <div className="flex items-center gap-2  rounded-full px-3 py-1">
            <Calendar className="size-6" />
            <span className="text-sm font-medium">Jan 2023</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-6xl font-bold tracking-tight">72</span>
            <span className="text-2xl font-medium">%</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <ChartLineUp className="size-6" />
            <span className="text-sm font-medium text-right">Trending Up</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DashboardCard;
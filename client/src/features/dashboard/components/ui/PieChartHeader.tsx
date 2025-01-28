import { MapPin } from "@phosphor-icons/react";
interface PieChartHeaderProps {
    totalSites: string | number;
}

const PieChartHeader = ({totalSites}: PieChartHeaderProps) => {
  return (
      <section className="flex flex-col gap-x-2">
        <h1 className="text-md font-semibold">Distribution of Water Sources Across Sites</h1>
        <div className="flex justify-start items-center gap-4">
            <h1 className="flex items-center gap-1 text-sm"><MapPin size="20"/> Total Sites</h1>
            <p className="text-primary font-semibold">{totalSites}</p>
        </div>       
    </section>
  )
}

export default PieChartHeader;

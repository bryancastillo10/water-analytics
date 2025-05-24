import { type Icon, Drop } from '@phosphor-icons/react';

interface ChartHeaderProps {
  h1?: string;
  h2?: string;
  icon?: Icon;
  totalSites?: string | number;
}

const ChartHeader = (props: ChartHeaderProps) => {
  const { h1 = 'Main Title', h2 = 'Sub Title', icon: Icon = Drop, totalSites } = props;
  return (
    <section className="flex flex-col gap-x-2 mb-3">
      <h1 className="text-md font-semibold tracking-wide">{h1}</h1>
      <div className="flex justify-start items-center gap-4">
        <h1 className="flex items-center gap-1 text-sm">
          <Icon size="20" />
          {h2}
        </h1>
        {totalSites && <p className="text-primary font-semibold">{totalSites}</p>}
      </div>
    </section>
  );
};

export default ChartHeader;

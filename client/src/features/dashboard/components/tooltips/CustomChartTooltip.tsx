import type { TooltipProps } from 'recharts';
import { useAppSelector } from '@/lib/redux/hooks';
import { formatSourceType } from '../../utils/formatSourceType';

interface CustomTooltipProps extends TooltipProps<number, string> {
  chartType: 'bar' | 'gauge' | 'line' | 'pie' | 'radar';
  selectedParameter?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  chartType,
  selectedParameter,
}: CustomTooltipProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  if (!active || !payload || !payload.length) return null;

  const commonStyles = `border shadow-md rounded-md px-4 py-3 ${
    theme ? 'bg-dark border-darkGray text-light' : 'bg-light border-primary text-primary'
  }`;

  switch (chartType) {
    case 'bar': {
      const data = payload[0]?.payload;
      return (
        <div className={commonStyles}>
          <p className={`font-semibold ${theme ? 'text-secondary' : 'text-dark'}`}>
            {data.parameter}
          </p>
          <p className={`${theme ? 'text-light' : 'text-primary'}`}>
            <span className={`${theme ? 'text-secondary' : 'text-dark'}`}>Avg: </span>
            {`${data.avgValue.toFixed(2)}`}
          </p>
        </div>
      );
    }

    case 'gauge': {
      const data = payload.find(param => param.payload.name === 'Loading');
      if (!data) return null;
      return (
        <div className={commonStyles}>
          <p className={`font-medium ${theme ? 'text-secondary' : 'text-dark'}`}>{data.name}</p>
          <p className="font-bold">{`${data?.value?.toFixed(1)}%` || 'No Data'}</p>
        </div>
      );
    }

    case 'line': {
      const data = payload[0]?.value;
      return (
        <div className={commonStyles}>
          <p className="text-sm">
            <span className="font-semibold mr-1">Date:</span>
            {label}
          </p>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">{selectedParameter}</h1>
            <p className={`${theme ? 'text-secondary' : 'text-primary'}`}>{data}</p>
          </div>
        </div>
      );
    }

    case 'pie': {
      const data = payload[0]?.payload;
      return (
        <div className={commonStyles}>
          <p className="font-semibold" style={{ color: data.fill }}>
            {formatSourceType(data.sourceType)}
          </p>
          <p className={`font-semibold ${theme ? 'text-light' : 'text-primary'}`}>
            {`${data.percentage.toFixed(1)} %`}
          </p>
        </div>
      );
    }
    case 'radar': {
      const data = payload[0]?.payload;
      return (
        <div className={commonStyles}>
          <p className={`font-semibold ${theme ? 'text-secondary' : 'text-dark'}`}>
            {data?.parameter}
          </p>
          <p className="font-bold">{`${data.value.toFixed(2)}`}</p>
        </div>
      );
    }
    default:
      return null;
  }
};

export default CustomTooltip;

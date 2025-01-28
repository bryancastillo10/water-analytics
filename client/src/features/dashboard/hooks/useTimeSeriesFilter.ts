
import { useState, useEffect } from "react";
import {
    useGetParameterFiltersQuery,
    useGetDateFiltersQuery,
    useGetTimeSeriesQuery
} from "@/features/dashboard/api/dashboardApi";
 
import { useAppSelector } from "@/lib/redux/hooks";
import { formatDate } from "@/features/waterquality/lib/formatDate";
import { parameterRecord } from "@/features/dashboard/utils/parameterMapping";

export interface IDateRange {
    startDate?: string;
    endDate?: string;
}

const useTimeSeriesFilter = () => {
    const [selectedParameter, setSelectedParameter] = useState<string>("pH");
    const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({ startDate: undefined, endDate: undefined } as unknown as IDateRange);

    const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId);
    const mappedParameter = parameterRecord[selectedParameter] || selectedParameter;

    const { data: parameterList, isLoading: parameterListLoading } = useGetParameterFiltersQuery();
    const { data: dateList, isLoading: dateListLoading } = useGetDateFiltersQuery(siteId!);

    const { data: rawTimeSeries, isLoading: timeSeriesLoading, refetch } = useGetTimeSeriesQuery({
        id: siteId!,
        parameter: mappedParameter,
        startDate: selectedDateRange.startDate!,
        endDate: selectedDateRange.endDate!
    });

    useEffect(() => {
        if (selectedDateRange.startDate && selectedDateRange.endDate) {
          refetch();
        }
      }, [selectedDateRange.startDate, selectedDateRange.endDate, refetch]);

    const parameterOptions = parameterList || ["pH"];
    const dateOptions = dateList?.map((date) => formatDate(date.toString())) || ["2020-01-01"];
    
    const handleSelectedParameter = (parameter: string) => {
        setSelectedParameter(parameter);
    };

    const handleSelectedDate = (key: keyof IDateRange, value?:string) => {
        setSelectedDateRange((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const timeSeriesData = rawTimeSeries || [{ date: "NA", value: 0 }]; 
    const processedTimeSeriesData = timeSeriesData.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        value: item.value || 0
      }));

    return {
        selectedParameter,
        selectedDateRange,
        parameterOptions,
        dateOptions,
        processedTimeSeriesData,
        parameterListLoading,
        dateListLoading,
        timeSeriesLoading,
        handleSelectedParameter,
        handleSelectedDate
    }
}

export default useTimeSeriesFilter;

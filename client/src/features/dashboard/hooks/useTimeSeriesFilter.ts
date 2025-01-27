
import { useState } from "react";
import {
    useGetParameterFiltersQuery,
    useGetDateFiltersQuery,
    useGetTimeSeriesQuery
} from "@/features/dashboard/api/dashboardApi";
 
import { useAppSelector } from "@/lib/redux/hooks";
import { formatDate } from "@/features/waterquality/lib/formatDate";

export interface IDateRange {
    startDate?: string;
    endDate?: string;
}

const useTimeSeriesFilter = () => {
    const [selectedParameter, setSelectedParameter] = useState<string>("pH");
    const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({ startDate: undefined, endDate: undefined } as unknown as IDateRange);

    const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId!);
    
    const { data: parameterList, isLoading: parameterListLoading } = useGetParameterFiltersQuery();
    const { data: dateList, isLoading: dateListLoading } = useGetDateFiltersQuery(siteId);

    const { data: timeSeriesData, isLoading: timeSeriesLoading } = useGetTimeSeriesQuery({
        id: siteId,
        parameter: selectedParameter,
        startDate: selectedDateRange.startDate!,
        endDate: selectedDateRange.endDate!
    });

    const parameterOptions = parameterList || ["pH"];
    const dateOptions = dateList?.map(date => formatDate(date.toString())) || ["2020-01-01"];
    
    const handleSelectedParameter = (parameter: string) => {
        setSelectedParameter(parameter);
    };

    const handleSelectedDate = (key: keyof IDateRange, value?:string) => {
        setSelectedDateRange((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    return {
        selectedParameter,
        selectedDateRange,
        parameterOptions,
        dateOptions,
        timeSeriesData,
        parameterListLoading,
        dateListLoading,
        timeSeriesLoading,
        handleSelectedParameter,
        handleSelectedDate
    }
}

export default useTimeSeriesFilter;

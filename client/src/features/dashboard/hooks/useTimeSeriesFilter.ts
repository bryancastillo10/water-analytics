
import { useState } from "react";
import {
    useGetParameterFiltersQuery,
    useGetDateFiltersQuery,
    useGetTimeSeriesQuery
} from "@/features/dashboard/api/dashboardApi";
 
import { useAppSelector } from "@/lib/redux/hooks";
import { formatDate } from "@/features/waterquality/lib/formatDate";

const useTimeSeriesFilter = () => {
    const [selectedParameter, setSelectedParameter ] = useState<string>("pH");
    const siteId = useAppSelector((state) => state.dashboard?.selectedSiteId!);
    
    const { data: parameterList, isLoading: parameterListLoading } = useGetParameterFiltersQuery();
    const { data: dateList, isLoading: dateListLoading } = useGetDateFiltersQuery(siteId);

    const { data: timeSeriesData, isLoading: timeSeriesLoading } = useGetTimeSeriesQuery({
        id: siteId,
        parameter: selectedParameter
    });

    const parameterOptions = parameterList || ["pH"];
    const dateOptions = dateList?.map(date => formatDate(date.toString())) || ["2020-01-01"];
    
    const handleSelectedParameter = (parameter: string) => {
        setSelectedParameter(parameter);
    };
    return {
        parameterOptions,
        dateOptions,
        timeSeriesData,
        selectedParameter,
        parameterListLoading,
        dateListLoading,
        timeSeriesLoading,
        handleSelectedParameter
    }
}

export default useTimeSeriesFilter;

import { useGetAllMeasurementsQuery } from "@/features/waterquality/api/measurementApi";

const useGetMeasurementData = () => {
    const { data: measurementData } = useGetAllMeasurementsQuery();


    return {
        measurementData
    }
}

export default useGetMeasurementData;

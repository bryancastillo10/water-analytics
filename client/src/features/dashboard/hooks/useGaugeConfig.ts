import type { NutrientStatResult } from "@/features/dashboard/api/interface";

const useGaugeConfig = () => {
    const dataToPercentage = (data: NutrientStatResult<string, number>) => {
        const calcPercentage = Math.min((data.avgValue / data.thresholdValue) * 100, 100).toFixed(2);
        return ({
            name: data.nutrient,
            percentage: calcPercentage,
            status: data.status
        })
    };
    
    const radian = Math.PI / 180;
    
    const cx = 150;
    const cy = 200;
    
    const innerRad = 50;
    const outerRad = 100;
    

    
    return {
        radian,
        cx,
        cy,
        innerRad,
        outerRad,
        dataToPercentage
    }
}

export default useGaugeConfig;

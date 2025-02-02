import { IParameters } from "@/dashboard/core/interface/IDashboardRepository";

type StatType = "average" | "maximum" | "minimum" 

const validStatTypes: StatType[] = ["average", "maximum", "minimum"];

export const validateStatType = (statType: string): StatType => {
    const validStat = validStatTypes.includes(statType as StatType) ?
        (statType as StatType) : "average";
    
    return validStat;
};

export const getAggField = (statType: StatType): object => {
    const parameterSelections = {
        pH: true,
        temperature: true,
        dissolvedOxygen: true,
        totalCOD: true,
        suspendedSolids: true,
        fecalColiform: true,
        ammonia: true,
        nitrates: true,
        phosphates: true
    };
    
    switch (statType) {
        case "average":
            return { _avg: parameterSelections }
        case "maximum":
            return { _max: parameterSelections }
        case "minimum":
            return { _min: parameterSelections }
        default: 
            return { _avg: parameterSelections}
    }
};

export const extractAggData = (calcData: any, aggField: object) => {
    const aggKey = Object.keys(aggField)[0] as keyof typeof calcData;
    
    return calcData[aggKey] || {};
};

export const validateCalcData = (data: Partial<IParameters>): IParameters => {
    return {
        pH: data.pH ?? 0,
        temperature: data.temperature ?? 0,
        dissolvedOxygen: data.dissolvedOxygen ?? 0,
        totalCOD: data.totalCOD ?? 0,
        suspendedSolids: data.suspendedSolids ?? 0,
        fecalColiform: data.fecalColiform ?? 0,
        ammonia: data.ammonia ?? 0,
        nitrates: data.nitrates ?? 0,
        phosphates: data.phosphates ?? 0 
    }
};
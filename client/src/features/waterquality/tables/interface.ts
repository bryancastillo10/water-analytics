export interface IBasicParams {
    id?: string;
    pH: number | null;
    temperature: number | null;
    dissolvedOxygen: number | null;
};

export interface IOrgIndicatorParams {
    id?: string;
    totalCOD: number | null;
    suspendedSolids: number | null;
    fecalColiform: number | null;
};

export interface INutrientParams {
    id?: string;
    ammonia: number | null;
    nitrates: number | null;
    phosphates: number | null;
};

import AddBasicParamsTable from "./AddBasicParamsTable";
import AddNutrientTable from "./AddNutrientTable";
import AddOrgIndTable from "./AddOrgIndTable";

export {
    AddBasicParamsTable,
    AddNutrientTable,
    AddOrgIndTable
}
export interface ParamsTableProps<T> {
    paramsData: T;
    onChangeInput: (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IBasicParams {
    id?: string;
    pH: string | null;
    temperature: string | null;
    dissolvedOxygen: string | null;
};

export interface IOrgIndicatorParams {
    id?: string;
    totalCOD: string | null;
    suspendedSolids: string | null;
    fecalColiform: string | null;
};

export interface INutrientParams {
    id?: string;
    ammonia: string | null;
    nitrates: string | null;
    phosphates: string | null;
};

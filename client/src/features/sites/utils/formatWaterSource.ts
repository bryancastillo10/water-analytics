export const formatEnumWaterSource = (value: string[]) => {
    return value.map( (val) =>
        val.charAt(0).toUpperCase() + val.slice(1).toLowerCase());
}
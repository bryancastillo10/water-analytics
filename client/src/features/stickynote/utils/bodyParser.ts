export const bodyParser = <T = unknown>(value: string | T): T => {
    try {
        return typeof value === 'string' ? JSON.parse(value) as T : value as T;
    } catch (error) {
        return value as T;
    }
};
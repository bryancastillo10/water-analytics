

const useGaugeConfig = () => {
    const radian = Math.PI / 180;
    
    const cx = 150;
    const cy = 200;
    
    const innerRad = 50;
    const outerRad = 100;
    
    const mockGaugeData = {
        nutrient: "Ammonia",
        avgValue: 1.78,
        thresholdValue: 2.5,
        status: "Pass"
    }
    
    return {
        mockGaugeData,
        radian,
        cx,
        cy,
        innerRad,
        outerRad
    }
}

export default useGaugeConfig;

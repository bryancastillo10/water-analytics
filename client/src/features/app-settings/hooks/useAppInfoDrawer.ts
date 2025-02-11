import useDrawer from "@/hooks/useDrawer";

export interface InfoDrawerProps {
    handleCloseDrawer: () => void;
};

const useAppInfoDrawer = () => {
    const { handleOpenDrawer } = useDrawer();
    
    const appOverviewDrawer = () => {
        handleOpenDrawer("About Water Analytics App", "AppOverview")
    };
    
    const keyFeaturesDrawer = () => {
        handleOpenDrawer("App Key Features","KeyFeatures")
    
    };
    
    const techHighlightsDrawer = () => {
        handleOpenDrawer("Technical Highlight", "TechHighlights")
    };
    
    
    return {
        appOverviewDrawer,
        keyFeaturesDrawer,
        techHighlightsDrawer,
    }
}

export default useAppInfoDrawer;

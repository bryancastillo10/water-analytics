import useDrawer from "@/hooks/useDrawer";

import { useAppDispatch } from "@/lib/redux/hooks";
import { closeDrawer } from "@/lib/redux/states/drawerSlice";

export interface InfoDrawerProps {
    handleCloseDrawer: () => void;
};

const useAppInfoDrawer = () => {
    const { handleOpenDrawer } = useDrawer();
    const dispatch = useAppDispatch();
    
    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
    };
    
    const appOverviewDrawer = () => {
        handleOpenDrawer("About Water Analytics App", "AppOverview", { handleCloseDrawer})
    };
    
    const keyFeaturesDrawer = () => {
        handleOpenDrawer("App Key Features","KeyFeatures", { handleCloseDrawer})
    
    };
    
    const techHighlightsDrawer = () => {
        handleOpenDrawer("Technical Highlight", "TechHighlights", { handleCloseDrawer})
    };
    
    
    return {
        appOverviewDrawer,
        keyFeaturesDrawer,
        techHighlightsDrawer,
    }
}

export default useAppInfoDrawer;

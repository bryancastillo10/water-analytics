import { useCallback, type ReactNode } from "react";

import { useAppDispatch } from "@/lib/redux/hooks";
import { openDrawer, closeDrawer } from "@/lib/redux/states/drawerSlice";


const useDrawer = () => {
    const dispatch = useAppDispatch();

    const handleOpenDrawer = useCallback((title: string, body: ReactNode) => {
        dispatch(openDrawer({ title, body }));
    }, [dispatch]);

    const handleCloseDrawer = useCallback(() => {
        dispatch(closeDrawer());
    }, [dispatch]);

    return { handleOpenDrawer, handleCloseDrawer };
}

export default useDrawer;

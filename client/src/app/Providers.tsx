import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/lib/redux/store";
import CustomToastProvider from "@/app/CustomToastProvider";

interface ProviderProps{
    children: React.ReactNode;
}
const Providers = ({children}:ProviderProps) => {
    return (
      <BrowserRouter>
        <CustomToastProvider>
          <ReduxProvider store={store}>{children}</ReduxProvider>
        </CustomToastProvider>
      </BrowserRouter>
    );
}

export default Providers;

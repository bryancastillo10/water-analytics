import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/lib/redux/store";

interface ProviderProps{
    children: React.ReactNode;
}
const Providers = ({children}:ProviderProps) => {
    return (
      <BrowserRouter>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </BrowserRouter>
    );
}

export default Providers;

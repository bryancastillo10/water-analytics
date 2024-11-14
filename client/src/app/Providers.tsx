import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/lib/redux/store";

interface ProviderProps{
    children: React.ReactNode;
}
const Provider = ({children}:ProviderProps) => {
    return (
      <BrowserRouter>
        <ReduxProvider store={store}>
          <ChakraProvider>{children}</ChakraProvider>
        </ReduxProvider>
      </BrowserRouter>
    );
}

export default Provider;

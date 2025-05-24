import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from '@/lib/redux/store';
import CustomToastProvider from '@/app/CustomToastProvider';

interface ProviderProps {
  children: React.ReactNode;
}

const persistor = persistStore(store);

const Providers = ({ children }: ProviderProps) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CustomToastProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </ReduxProvider>
      </CustomToastProvider>
    </BrowserRouter>
  );
};

export default Providers;

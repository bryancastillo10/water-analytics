import { Routes, Route } from "react-router-dom";

import Providers from "@/app/Providers";
import AppLayout from "@/components/layout/AppLayout";

import { ForgotPassword, SignIn, SignUp } from "@/features/auth";
import { Dashboard, WaterQuality, Settings,Sites } from "@/features";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route index path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/role" element={<AppLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="data-table" element={<WaterQuality />} />
          <Route path="sites" element={<Sites />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<p>Page is not Found</p>} />
      </Routes>
    </Providers>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";

import Provider from "@/app/Providers";
import AppLayout from "@/components/layout/AppLayout";

import { SignIn, SignUp } from "@/features/auth";
import { Dashboard, WaterQuality, Profile } from "@/features";

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route index path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/role" element={<AppLayout />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="water-quality" element={<WaterQuality />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;

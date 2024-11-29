import { Routes, Route } from "react-router-dom";

import Providers from "@/app/Providers";
import PageNotFound from "@/app/PageNotFound";

import AppLayout from "@/components/layout/AppLayout";
import { ForgotPassword, SignIn, SignUp } from "@/features/auth";
import { DashboardPage, DataTable, Sites, NotesPage, Settings } from "@/components/pages";

const App = () => {
  return (
    <Providers>
      <Routes>
        <Route index path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/role" element={<AppLayout />}>
          <Route index path="dashboard" element={<DashboardPage />} />
          <Route path="data-table" element={<DataTable />} />
          <Route path="sites" element={<Sites />} />
          <Route path="notes" element={<NotesPage/>} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Providers>
  );
};

export default App;

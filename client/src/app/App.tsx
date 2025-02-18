import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PageNotFound from "@/app/PageNotFound";
import AppLayout from "@/components/layout/AppLayout";
import { ForgotPassword, SignIn, SignUp } from "@/features/auth";
import { appRoutes } from "@/app/routes/appRoutes";
import { useAppSelector } from "@/lib/redux/hooks";
import ProtectedRoute from "@/app/ProtectedRoute";

const App = () => {
  const authUser = useAppSelector((state) => state.user);
  
  const authRole = authUser.role.toLowerCase();
  const authHomePage = `/${authRole}/dashboard`;
  return (
    <Routes>
      {/*  Public Routes */}
      <Route index path="/" element={authUser.user_id ? <Navigate to={authHomePage} replace /> : <SignIn />} />
      <Route path="/sign-up" element={authUser.user_id ? <Navigate to={authHomePage} replace /> : <SignUp />} />
      <Route path="/forgot-password" element={authUser.user_id ? <Navigate to={authHomePage} replace /> : <ForgotPassword />} />

      {/*  Role-Based Routes */}
      <Route path={`/${authRole || "public"}/*`} element={
        <ProtectedRoute user={authUser}>
          <AppLayout />
        </ProtectedRoute>
      }>
        {appRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={React.createElement(route.element)}
          />
        ))}
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

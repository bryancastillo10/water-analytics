import React from "react";
import { Routes, Route } from "react-router-dom";


import PageNotFound from "@/app/PageNotFound";

import AppLayout from "@/components/layout/AppLayout";
import { ForgotPassword, SignIn, SignUp } from "@/features/auth";
import { roleRoutes } from "@/app/routes/roleRoutes";

import { useAppSelector } from "@/lib/redux/hooks";

import ProtectedRoute from "@/app/ProtectedRoute";
import type { UserRole } from "@/app/routes/userRole";

const App = () => {
  const authUser = useAppSelector((state) => state.user);

  const userRoutes = roleRoutes[authUser.role as UserRole] || roleRoutes.public;
  return (
      <Routes>

        {/* Public Routes */}
        <Route index path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route/>
        
        {/* Role Based Routes */}
        <Route path={`${authUser.role || "public"}/*`} element={
          <ProtectedRoute user={authUser}>
            <AppLayout/>
          </ProtectedRoute>}>
          {userRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={React.createElement(route.element)}
            />
          ))}
        </Route>
        
        {/* Page Not Found Route */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
  );
};

export default App;

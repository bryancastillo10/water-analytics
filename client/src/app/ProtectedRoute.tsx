import { Navigate } from "react-router-dom";
import type { UserState } from "@/lib/redux/states/userSlice";

interface ProtectedRouterProps {
  user: UserState;
  children: React.ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouterProps) => {
  if (!user.user_id) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>; 
};

export default ProtectedRoute;

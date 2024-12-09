import { Navigate } from "react-router-dom";
import type { UserState } from "@/lib/redux/states/userSlice";

interface AuthRedirectProps {
  user: UserState;
  children: React.ReactNode;
}

const AuthRedirect = ({ user, children }: AuthRedirectProps) => {
  if (user.user_id) {
    const rolePath = `/${user.role.toLocaleLowerCase() || "public"}/dashboard`; 
    return <Navigate to={rolePath} replace />;
  }
  return <>{children}</>; 
};

export default AuthRedirect;

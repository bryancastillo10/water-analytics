import { Navigate } from "react-router-dom";
import type { UserState } from "@/lib/redux/states/userSlice";

interface ProtectedRouteProps{
    user: UserState;
    children: React.ReactNode;
}

const ProtectedRoute = ({user, children}:ProtectedRouteProps) => {

  if(!user.user_id){
    return <Navigate to="/" replace />
  }
  return children;
}

export default ProtectedRoute;

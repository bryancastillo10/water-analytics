import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui"
import { useAppSelector } from "@/lib/redux/hooks";

const PageNotFound = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    
    const role = user?.role.toLowerCase();
    
    const handleNavigate = () => {
        if (user && role) {
            navigate(`/${role}/dashboard`); 
        } else {
            navigate("/"); 
        }
    };
    
    return (
      <main className="w-full h-screen">
          <div className="flex flex-col h-full justify-center items-center m-auto">
              <h1 className="font-semibold font-secondary text-2xl">Uh-oh... 😱</h1>
              <h1 className="font-semibold font-secondary text-2xl">Page Not Found</h1>
              <p className="mt-2">Looks like you've visited a wrong URL in this app</p>
              <div className="mt-8">
                    <Button
                        action={handleNavigate}
                        variant="outline"
                    >
                        Go back to home
                    </Button>
              </div>
          </div>
    </main>
  )
}

export default PageNotFound

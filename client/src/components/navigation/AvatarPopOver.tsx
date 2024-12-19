import { Link } from "react-router-dom";
import { Gear, GridFour, NoteBlank, SignOut } from "@phosphor-icons/react";
import useLogout from "@/features/auth/hooks/useLogout";
import { useAppSelector } from "@/lib/redux/hooks";

const popOverItems = [
    {
        id: 1,
        name: "Settings",
        icon: Gear,
        link:"/settings"
    },
    {
        id: 2,
        name: "Data",
        icon: GridFour,
        link:"/data-table"
    },
    {
        id: 3,
        name: "Notes",
        icon: NoteBlank,
        link: "/notes"
    },
    {
        id: 4,
        name: "Logout",
        icon: SignOut,
        link:null
    }
]


const AvatarPopOver = () => {
  const user = useAppSelector((state) => state.user);
  const { handleSignOut, isLoading } = useLogout();

  const role = user.role.toLowerCase();
 
  return (
      <>
        <div 
            className="absolute top-12 right-0 z-0  transform rotate-45  shadow-lg bg-light size-8"
            />
            <div className="absolute top-14 -right-2 bg-light w-32 h-42 shadow-lg rounded-b-lg">
              <ul className=" text-dark text-sm px-2 py-1">
                  {popOverItems.map((pop) => {
                      const Icon = pop.icon;
                      return (
                          <li key={pop.id}
                              className="flex justify-between hover:bg-primary rounded-xl hover:text-light px-2 py-1 items-center
                                 my-2">
                              {pop.link ? (<Link to={`/${role}${pop.link}`}>{pop.name}</Link>) :
                                  <button onClick={() => handleSignOut()}>
                                      {isLoading ? "Loading ..." : [pop.name]}
                                  </button>}
                              <Icon size="18"/>
                          </li>
                      )
                  })}
               
              </ul>
        </div>
      </>
  )
}

export default AvatarPopOver;

import TextHeader from "@/components/common/TextHeader";
import { User, Envelope, Pencil } from "@phosphor-icons/react/dist/ssr";

const UserProfile = () => {
  return (
    <section className="px-6 py-4">
      <TextHeader text="User Profile" />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Profile Picture  */}
              <div className="grid place-items-center md:place-items-start">
                <img
                className="shadow-md object-cover size-[150px] rounded-full cursor-pointer duration-300 ease-in-out hover:scale-90"
                src="https://i.pravatar.cc/150?img=55"
                alt="avatar"
                />
            </div>
            {/* User Details */}
        <div className="col-span-2 flex flex-col justify-between bg-neutral text-dark  rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-x-2">
              <User size={24} />
              <h2 className="text-xl font-semibold ">Username</h2>
            </div>
            <div className="flex items-center cursor-pointer">
              <Pencil size={20} />
            </div>
          </div>
          <p className=" text-lg">username123</p>
          <div className="mt-4">
          <div className="flex items-center gap-x-2">
              <Envelope size={24}  />
              <h2 className="text-xl font-semibold ">Email</h2>
            </div>
            <p className="">your_email@domain.com</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile;

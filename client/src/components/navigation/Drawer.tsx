import { X } from "@phosphor-icons/react";
import { closeDrawer } from "@/lib/redux/states/drawerSlice";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";


const Drawer = () => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeDrawer());
  }
  const { isOpenDrawer, title, body: BodyComponent, bodyProps } = useAppSelector((state) => state.drawer);
  return (
    <>
    {isOpenDrawer && <div onClick={onClose} className="fixed inset-0 z-40 backdrop-blur-[1px]"/>}
    <div className={`fixed z-40 flex flex-col top-0 right-0 w-full xl:w-[50%] h-screen 
        transform transition-translate duration-500 ease-in ${isOpenDrawer ? "translate-x-0":"translate-x-full"}
      bg-light shadow-lg py-3 px-6`}>
            <div className="flex justify-between items-center text-primary border-b border-neutral py-2">
              <h1 className="text-2xl tracking-wider">{title}</h1>
              <div onClick={onClose} className="rounded-full cursor-pointer bg-neutral/30 hover:bg-primary hover:text-light duration-500 p-2">
                  <X size="20" /> 
              </div>
            </div>
          <div className="mt-4 overflow-y-auto overflow-x-hidden">
          {BodyComponent && <BodyComponent {...bodyProps} />}
        </div>
      </div>
      </>
  )
}

export default Drawer;

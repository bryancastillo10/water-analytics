import { X } from '@phosphor-icons/react';
import { closeDrawer } from '@/lib/redux/states/drawerSlice';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';

import { drawerForms } from '@/lib/mappings/formMappings';

const Drawer = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.isDarkMode);

  const onClose = () => {
    dispatch(closeDrawer());
  };
  const { isOpenDrawer, title, componentName, bodyProps } = useAppSelector(state => state.drawer);

  const BodyComponent = componentName ? drawerForms[componentName] : null;
  return (
    <>
      {isOpenDrawer && <div onClick={onClose} className="fixed inset-0 z-40 backdrop-blur-[1px]" />}
      <div
        className={`fixed z-40 flex flex-col top-0 right-0 w-full xl:w-[50%] h-screen 
        transform transition-translate duration-500 ease-in shadow-lg py-3 px-6
        ${isOpenDrawer ? 'translate-x-0' : 'translate-x-full'}
        ${theme ? 'bg-dark' : 'bg-light'}
     `}
      >
        <div
          className={`flex justify-between items-center text-primary border-b py-2 ${theme ? 'border-secondary' : 'border-neutral'}`}
        >
          <h1 className={`text-2xl tracking-wider ${theme ? 'text-secondary' : 'text-primary'}`}>
            {title}
          </h1>
          <div
            onClick={onClose}
            className="rounded-full cursor-pointer hover:bg-primary hover:text-light duration-500 p-2"
          >
            <X size="20" />
          </div>
        </div>
        <div className="mt-4 overflow-y-auto overflow-x-hidden">
          {BodyComponent && <BodyComponent {...bodyProps} />}
        </div>
      </div>
    </>
  );
};

export default Drawer;

import RegisterAccountModal from "@/features/auth/components/RegisterAccountModal";

interface AuthContainerProps{
    body: React.ReactNode;
    title: string;
    caption: string;
    captionAlignment?: string;
    isOpenModal?: boolean;
    isPasswordResetScreen?: boolean;
    handleCloseModal?: () => void;
}

const AuthContainer = ({
  body,
  title,
  caption,
  captionAlignment = "text-center",
  isPasswordResetScreen = false,
  isOpenModal,
  handleCloseModal
}: AuthContainerProps) => {
  return (
    <main className="bg-primary/80 bg-[url(@/assets/screenwrapper.png)]  w-full min-h-screen xl:h-screen relative overflow-x-hidden">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className={`${isPasswordResetScreen ? "md:w-[80%] lg:w-[75%] xl:w-[50%]" : "md:w-[95%] lg:w-full xl:w-[550px]"} w-[90%]  mx-auto 
        bg-light rounded-2xl shadow-md px-8 md:px-14 xl:px-20 py-12`}>
          <h1 className="font-secondary text-lg md:text-xl xl:text-2xl tracking-wider text-center text-nowrap text-primary mb-2">
            {title}
          </h1>
          <p className={`text-darkGray leading-tight text-sm md:text-base ${captionAlignment}`}>{caption}</p>
          <hr className="border border-neutral my-4" />
          <div className="mt-4">{body}</div>
        </div>
      </section>
    { isOpenModal && handleCloseModal &&(<RegisterAccountModal
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
        />)}
    </main>
  );
}

export default AuthContainer;

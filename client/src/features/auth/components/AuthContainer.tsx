
interface AuthContainerProps{
    children: React.ReactNode;
    title: string;
    caption: string;
}

const AuthContainer = ({children,title,caption}:AuthContainerProps) => {
  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light rounded-2xl shadow-md p-8">
          <h1 className="font-semibold text-4xl text-center text-nowrap text-primary mb-2">
            {title}
          </h1>
                  <p className="text-[#858585] text-center">{caption}</p>
          <hr className="border border-neutral my-2" />
          <div className="mt-4">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthContainer

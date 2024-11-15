
interface AuthContainerProps{
    body: React.ReactNode;
    title: string;
    caption: string;
}

const AuthContainer = ({body,title,caption}:AuthContainerProps) => {
  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light w-md rounded-2xl shadow-md p-8">
          <h1 className="font-semibold text-4xl text-center text-nowrap text-primary mb-2">
            {title}
          </h1>
                  <p className="text-darkGray text-center">{caption}</p>
          <hr className="border border-neutral my-4" />
          <div className="mt-4">
            {body}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthContainer

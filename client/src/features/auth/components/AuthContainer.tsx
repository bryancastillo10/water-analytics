
interface AuthContainerProps{
    body: React.ReactNode;
    title: string;
  caption: string;
  captionAlignment?: string;
}

const AuthContainer = ({
  body,
  title,
  caption,
  captionAlignment="text-center"
}: AuthContainerProps) => {
  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light w-[440px] xl:w-[500px] rounded-2xl shadow-md px-20 py-12">
          <h1 className="font-secondary text-2xl tracking-wider text-center text-nowrap text-primary mb-2">
            {title}
          </h1>
          <p className={`text-darkGray leading-tight ${captionAlignment}`}>{caption}</p>
          <hr className="border border-neutral my-4" />
          <div className="mt-4">{body}</div>
        </div>
      </section>
    </main>
  );
}

export default AuthContainer;

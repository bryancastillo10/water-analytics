
const AuthContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light rounded-2xl shadow-md w-[300px] p-8">
          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthContainer

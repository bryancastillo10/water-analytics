

const LoadingModal = () => {

  const centerCircle = "flex justify-center items-center";
  return (
<div 
      className="fixed inset-0 bg-dark/50 z-50 flex items-center justify-center 
      transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-white w-[90%] max-w-md rounded-2xl px-6 py-10 h-fit">
        <div className={`${centerCircle}`}>
          <div className={`
            ${centerCircle} 
            relative 
            rounded-full 
            size-48 
            bg-secondary 
            before:absolute 
            before:inset-0 
            before:rounded-full 
            before:bg-secondary 
            before:animate-ping 
            before:opacity-75
          `}>
            <div className={`
              ${centerCircle} 
              relative 
              rounded-full 
              size-36 
              bg-primary 
              before:absolute 
              before:inset-0 
              before:rounded-full 
              before:bg-primary 
              before:animate-ping 
              before:animation-delay-300
            `}>
              <div className={`
                relative 
                bg-cyan-500 
                rounded-full 
                size-24 
                before:absolute 
                before:inset-0 
                before:rounded-full 
                before:bg-cyan-500 
                before:animate-ping 
                before:animation-delay-600
              `} />
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-center text-darkGray">Setting Up Your Account ...</h1>
      </div>
    </div>
  )
}

export default LoadingModal;

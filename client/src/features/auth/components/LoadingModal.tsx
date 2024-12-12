import { LoadingAnimation } from "@/components/common";

const LoadingModal = () => {

  return (
  <div 
      className="fixed inset-0 bg-dark/50 z-50 flex items-center justify-center 
      transition-opacity duration-300 ease-in-out"
    >
      <div className="bg-white w-[90%] max-w-md rounded-2xl px-6 py-10 h-fit">
        <LoadingAnimation size="lg"/>  
        <h1 className="mt-8 text-center text-darkGray">Setting Up Your Account ...</h1>
      </div>
    </div>
  )
}

export default LoadingModal;

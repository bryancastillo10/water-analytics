import { Button } from '@/components/ui';
import { X } from '@phosphor-icons/react';

interface RegisterAccountModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}

const RegisterAccountModal = ({ isOpenModal, handleCloseModal }: RegisterAccountModalProps) => {
  return (
    <>
      {isOpenModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center 
          transition-opacity duration-300 ease-in-out"
        >
          <div 
            className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 
            animate-slide-up transform"
          >
            <button 
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-neutral hover:rotate-180 hover:text-gray-900 
              transition-all duration-200"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold text-primary mb-4">
              Account Registration Information
            </h2>

            <p className="text-sm text-justify text-darkGray mb-4">
              Registering a new account will provide you with a personalized dashboard to help you get started. 
              Please note that it may take a few moments for your account to be fully set up as we prepare your initial data. 
              We appreciate your patience as we work to provide you with the best possible experience.
            </p>

            <div className="flex justify-end mt-6">
              <Button action={handleCloseModal} variant="primary">Understand</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterAccountModal;
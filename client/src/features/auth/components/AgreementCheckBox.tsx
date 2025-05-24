interface AgreementCheckBoxProps {
  isChecked: boolean;
  onCheck: () => void;
  handleOpenModal: () => void;
}

const AgreementCheckBox = ({ isChecked, onCheck, handleOpenModal }: AgreementCheckBoxProps) => {
  return (
    <div className="my-2 flex items-center gap-x-2 text-xs">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheck}
          className="appearance-none size-4 border border-dark
            checked:bg-primary checked:border-primary focus:border-none
            focus:outline-none focus:ring-2 focus:ring-primary 
            rounded"
        />
        <svg
          className="absolute top-0 left-0 size-4 pointer-events-none text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <label>
        <span
          onClick={handleOpenModal}
          className="hover:underline text-darkGray hover:text-primary cursor-pointer"
        >
          Read this first&nbsp;
        </span>
        before signing up
      </label>
    </div>
  );
};

export default AgreementCheckBox;

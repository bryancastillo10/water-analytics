import { FormButtons } from "@/components/layout";
import { WarningCircle, ShieldCheck } from "@phosphor-icons/react";
import { FormInput } from "@/components/ui";

const DeleteAccountConfirmation = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
      <form onSubmit={handleSubmit}>
          <h1 className="text-lg">Are you sure you want to delete your account?</h1>
            <FormInput
                id="confirmUsername"
                label="Confirm Username"
                icon={ShieldCheck}
                value=""
                onChange={()=>{}}
                validationMessage="Type your username to confirm account deletion"
      />
        <p className="flex text-rose-600 items-center gap-2 text-sm my-2">
        <span><WarningCircle size="20"/></span> Deleting your account means that all of your data related to this app will be deleted as well
      </p>

          <FormButtons primaryBtnLabel="Delete" />
          
    </form>
  )
}

export default DeleteAccountConfirmation;
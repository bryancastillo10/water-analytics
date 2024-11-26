import { User, EnvelopeSimple } from "@phosphor-icons/react";

import { FormInput } from "@/components/ui";
import { FormButtons } from "@/components/layout";

const UpdateUserForm = () => {
  return (
      <form>
          <div className="flex flex-col gap-4 w-fit flex-grow">
            <FormInput
                id="username"
                label="Username"
                icon={User}
                value={"username123"}
                onChange={()=>{}}
                validationMessage="Username must be at least 5 alphanumeric characters"
                />
                <FormInput
                id="email"
                label="Email"
                icon={EnvelopeSimple}
                value={"your_email@domain.com"}
                onChange={()=>{}}
                validationMessage="Account email address"
                />
          </div>
              <FormButtons primaryBtnLabel="Update Profile" />
    </form>
  )
}

export default UpdateUserForm;

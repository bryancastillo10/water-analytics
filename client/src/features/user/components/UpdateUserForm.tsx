import { User, EnvelopeSimple } from '@phosphor-icons/react';

import { FormInput } from '@/components/ui';
import { FormButtons } from '@/components/layout';
import useUpdateUser from '@/features/user/hooks/useUpdateUser';

const UpdateUserForm = () => {
  const { updateUserData, isLoading, onChangeInput, handleSubmit } = useUpdateUser();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 w-fit flex-grow">
        <FormInput
          id="username"
          label="Username"
          icon={User}
          value={updateUserData.username}
          onChange={onChangeInput}
          validationMessage="Username must be at least 5 alphanumeric characters"
        />
        <FormInput
          id="email"
          label="Email"
          icon={EnvelopeSimple}
          value={updateUserData.email}
          onChange={onChangeInput}
          validationMessage="Account email address"
        />
      </div>
      <FormButtons primaryBtnLabel="Save" loading={isLoading} />
    </form>
  );
};

export default UpdateUserForm;

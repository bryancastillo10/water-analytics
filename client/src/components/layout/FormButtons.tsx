import { Button } from "@/components/ui";
import { useAppDispatch } from "@/lib/redux/hooks";
import { closeDrawer } from "@/lib/redux/states/drawerSlice";

interface FormButtonsProps{
  primaryBtnLabel?: string;
  loading?: boolean;
}

const FormButtons = ({ primaryBtnLabel = "Submit", loading = false }: FormButtonsProps) => {
    const dispatch = useAppDispatch();
    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
      }
  return (
    <div className="mt-4 w-full flex flex-col-reverse md:flex-row justify-evenly gap-4">
      <Button
        action={handleCloseDrawer}
        width="w-full"
        variant="outline"
        loading={loading}
      >Cancel
      </Button>
      <Button
        type="submit"
        width="w-full"
        variant="primary"
        loading={loading}
      >{primaryBtnLabel}
      </Button>
    </div>
  )
}

export default FormButtons;

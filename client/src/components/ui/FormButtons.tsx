import { Button } from "@/components/ui";
import { useAppDispatch } from "@/lib/redux/hooks";
import { closeDrawer } from "@/lib/redux/states/drawerSlice";

interface FormButtonsProps{
    primaryBtnLabel?: string;
}

const FormButtons = ({ primaryBtnLabel = "Submit" }: FormButtonsProps) => {
    const dispatch = useAppDispatch();
    const handleCloseDrawer = () => {
        dispatch(closeDrawer());
      }
  return (
    <div className="mt-4 w-full flex justify-evenly gap-4">
        <Button action={handleCloseDrawer} width="w-full" variant="outline">Cancel</Button>
        <Button type="submit" width="w-full" variant="primary">{primaryBtnLabel}</Button>
    </div>
  )
}

export default FormButtons;

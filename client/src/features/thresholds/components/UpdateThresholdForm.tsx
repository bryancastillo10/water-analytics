import type { IThresholdData } from "@/features/thresholds/api/interface";

interface UpdateThresholdFormProps{
  thresholdData: IThresholdData[];
}

const UpdateThresholdForm = ({thresholdData}:UpdateThresholdFormProps) => {
  console.log(thresholdData);
  return (
    <section className="grid grid-cols-3 gap-4 w-fit">
      <div className="">Parameter</div>
      <div className="">Min Value</div>
      <div className="">Max Value</div>
    </section>
  )
}

export default UpdateThresholdForm;

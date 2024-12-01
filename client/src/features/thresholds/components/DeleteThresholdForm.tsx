import { FormButtons } from "@/components/layout";
import { sampleThresholds } from "@/features/thresholds/api/mockData";

interface DeleteThresholdFormProps{
    id: string;
}

const DeleteThresholdForm = ({ id }: DeleteThresholdFormProps) => {
  const selectedThreshold = sampleThresholds.find((threshold) => threshold.id === id)!;

  return (
    <section>
      <h1 className="text-xl my-2">Are you sure you want to delete this threshold?</h1>
      <div className="flex justify-between w-fit  gap-x-8 my-8">
        <p className="font-semibold text-pretty">{selectedThreshold.parameter}
          <span className="ml-4 italic font-regular">{selectedThreshold.unit}</span>
        </p>
        <p className="text-primary font-semibold">{selectedThreshold.value}</p>
      </div>

      <FormButtons primaryBtnLabel="Delete"/>
    </section>
  )
}

export default DeleteThresholdForm;

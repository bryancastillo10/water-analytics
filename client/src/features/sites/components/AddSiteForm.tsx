import { FormInput, CustomSelect, UploadImageInput} from "@/components/ui"
import { WaterSourceType } from "@/features/sites/api/interface";
import { formatEnumWaterSource } from "../utils/formatWaterSource";




const AddSiteForm = () => {
  const SourceOptions = formatEnumWaterSource(Object.values(WaterSourceType));

  return (
    <div className="">
      <div className="grid grid-cols-2 items-center gap-x-4">
          <FormInput
              id="siteName"
              label="Site Name"
              value={""}
              onChange={()=>{}}
              validationMessage="Preferred name of the monitoring site"
            />
            <FormInput
              id="location"
              label="Location"
              value={""}
              onChange={()=>{}}
              validationMessage="Describe the place (city, country, etc..)"
            />
      </div>
      <div className="grid grid-cols-2 items-center gap-x-4">
            <CustomSelect
              options={SourceOptions}
              onChangeValue={(selected) => console.log(selected)}
            />
            <UploadImageInput
              label="Site Photo"
              onImageSelect={()=>{}}
            />
      </div>
    </div>
  )
}

export default AddSiteForm;

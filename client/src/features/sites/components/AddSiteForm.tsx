import { FormInput, CustomSelect } from "@/components/ui"
import { WaterSourceType } from "@/features/sites/api/interface";
import { formatEnumWaterSource } from "../utils/formatWaterSource";




const AddSiteForm = () => {
  const SourceOptions = formatEnumWaterSource(Object.values(WaterSourceType));

  return (
    <div className="grid grid-cols-2 items-center gap-3">
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
            <CustomSelect
              options={SourceOptions}
              onChangeValue={(selected) => console.log(selected)}
            />
             <FormInput
              id="sitePhoto"
              label="Site Photo"
              value={""}
              onChange={()=>{}}
              validationMessage="Change this to actual input to upload file"
            />
    </div>
  )
}

export default AddSiteForm;
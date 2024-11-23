import CustomSelect from "@/components/ui/CustomSelect";
import DataTable from "@/features/waterquality/components/DataTable";


const WaterQuality = () => {
  const options = [
    "Domestic",
    "Industrial",
    "Agricultural",
    "Surface",
    "Groundwater",
    "Others"
  ]

  return (
    <main>
      <CustomSelect width="w-[300px]" options={options} onChangeValue={(selection) => {console.log(selection)}} />
      <DataTable/>
    </main>
  )
}

export default WaterQuality;

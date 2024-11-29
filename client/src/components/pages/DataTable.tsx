import CustomSelect from "@/components/ui/CustomSelect";
import WaterQualityTable from "@/features/waterquality/components/WaterQualityTable";


const DataTable = () => {
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
      <WaterQualityTable/>
    </main>
  )
}

export default DataTable;

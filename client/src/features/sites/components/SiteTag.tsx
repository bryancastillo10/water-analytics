import { IndustrialIcon, DomesticIcon, AgricultureIcon, GroundwaterIcon, SurfaceWaterIcon, OtherIcons } from "@/assets/svg";
import { WaterSourceType } from "@/features/sites/api/interface";


export const tagVariants = {
  [WaterSourceType.INDUSTRIAL]: {
      name:"Industrial",
      color: "bg-amber-500",
      icon: IndustrialIcon
  },
  [WaterSourceType.DOMESTIC]: {
  name: "Domestic",
  color: "bg-indigo-500",
  icon:DomesticIcon
  },
 [WaterSourceType.AGRICULTURAL]: {
  name: "Agriculture",
  color: "bg-emerald-500",
  icon:AgricultureIcon
  },
  [WaterSourceType.GROUNDWATER]: {
    name: "Groundwater",
    color: "bg-stone-500",
    icon: GroundwaterIcon
  },
  [WaterSourceType.SURFACE]: {
    name: "Surface Water",
    color: "bg-primary",
    icon: SurfaceWaterIcon
  },
  [WaterSourceType.OTHERS]: {
    name: "Other Source",
    color: "bg-cyan-700",
    icon:OtherIcons
  }

}


interface SiteTagProps{
  variant: keyof typeof tagVariants;
}

const SiteTag = ({variant}:SiteTagProps) => {
  const { color, name, icon: Icon } = tagVariants[variant] || tagVariants[WaterSourceType.OTHERS];
  return (
    <div className={`flex items-center gap-2 text-light ${color} text-sm px-3 py-1 rounded-full w-fit`}>
        <Icon fill="#F6F5F4" />
      <span>{name}</span>
  </div>
  )
}

export default SiteTag;

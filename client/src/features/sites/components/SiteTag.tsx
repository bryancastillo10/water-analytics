import { IndustrialIcon, DomesticIcon, AgricultureIcon, GroundwaterIcon, SurfaceWaterIcon, OtherIcons } from "@/assets/svg";


export const tagVariants = {
  industrial: {
      name:"Industrial",
      color: "bg-amber-500",
      icon: IndustrialIcon
  },
  domestic: {
  name: "Domestic",
  color: "bg-indigo-500",
  icon:DomesticIcon
  },
  agriculture: {
  name: "Agriculture",
  color: "bg-emerald-500",
  icon:AgricultureIcon
  },
  groundwater: {
    name: "Groundwater",
    color: "bg-stone-500",
    icon: GroundwaterIcon
  },
  surface: {
    name: "Surface Water",
    color: "bg-primary",
    icon: SurfaceWaterIcon
  },
  other: {
    name: "Other Source",
    color: "bg-cyan-700",
    icon:OtherIcons
  }

}


interface SiteTagProps{
  variant: keyof typeof tagVariants;
}

const SiteTag = ({variant}:SiteTagProps) => {
  const { color, name, icon: Icon } = tagVariants[variant] || tagVariants["other"];
  return (
    <div className={`flex items-center gap-2 text-light ${color} text-sm px-3 py-1 rounded-full w-fit`}>
        <Icon fill="#F6F5F4" />
      <span>{name}</span>
  </div>
  )
}

export default SiteTag;

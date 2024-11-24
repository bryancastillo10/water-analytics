import IndustrialIcon from "@/assets/svg/IndustrialIcon";
import { DropSimple } from "@phosphor-icons/react";

const SiteTag = () => {
    const tagVariants = {
        industrial: {
            name:"Industrial",
            color: "yellow-500",
            icon: IndustrialIcon
        }
    }

  return (
    <div className="flex items-center gap-2 bg-primary text-white text-sm px-3 py-1 rounded-full w-fit">
        <DropSimple className="size-4" weight="fill" />
    <span>Surface Water</span>
  </div>
  )
}

export default SiteTag;

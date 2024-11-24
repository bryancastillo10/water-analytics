import { MapPin, DropSimple, PencilSimpleLine,TrashSimple } from "@phosphor-icons/react";

const SiteCard = () => {
  return (
<div className="w-80 bg-light relative rounded-xl shadow-md overflow-hidden group">
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="bg-neutral/40 h-48 rounded-lg">
            <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <img
                src="https://res.cloudinary.com/dzruafjwq/image/upload/v1732410427/surface_water_pshwl0.jpg"
                alt="site-photo"
                className="w-full h-full rounded-lg object-cover transition-translate duration-300 hover:translate-y-4 hover:translate-x-4 "
            />
            </div>
        </div>

        <div className="space-y-3">
      
          <h1 className="text-xl font-semibold text-dark">Laguna de Bay</h1>

          <div className="flex items-center gap-2 text-dark/70">
            <MapPin className="size-4" />
            <span className="text-sm">Laguna, Philippines</span>
          </div>

          <div className="flex items-center gap-2 bg-primary text-white text-sm px-3 py-1 rounded-full w-fit">
            <DropSimple className="size-4" weight="fill" />
            <span>Surface Water</span>
          </div>
        </div>

        <p className="text-sm text-darkGray text-balance mt-2 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi, provident quos inventore obcaecati laborum nulla illum itaque totam voluptatibus delectus repellat tempora consectetur, recusandae quibusdam sequi molestiae sunt incidunt rerum?
        </p>
      </div>
    </div>
        <div className="absolute top-0 right-0 flex flex-col gap-y-4 opacity-0 group-hover:opacity-100
        rounded-bl-md px-2 py-2 bg-neutral/80 text-primary font-bold">
        <PencilSimpleLine size="14"/>
        <TrashSimple size="14"/>
    </div>
  </div>
  )
}

export default SiteCard;

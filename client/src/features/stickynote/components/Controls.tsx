import { Plus } from "@phosphor-icons/react";

import ColorShade from "@/features/stickynote/components/ColorShade";
const Controls = () => {
  return (
    <div className="fixed top-[50%] flex flex-col gap-1 items-center transform translate-y-[-50%] bg-darkGray p-3 rounded-3xl">
      <div className="size-10 hover:scale-110 duration-150 ease-out rounded-full cursor-pointer bg-neutral flex justify-center items-center">
        <Plus size="20"/>
      </div>
      <ColorShade />
      <ColorShade />
      <ColorShade/>
    </div>
  )
}

export default Controls;

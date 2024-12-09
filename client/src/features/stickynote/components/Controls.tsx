import { Plus } from "@phosphor-icons/react";

import ColorShade from "@/features/stickynote/components/ColorShade";
import useDrawer from "@/hook/useDrawer";
import { colorOptions } from "../constants/colorOptions";

const Controls = () => {
  const { handleOpenDrawer } = useDrawer();

  const addNoteDrawer = () => {
    handleOpenDrawer("Add Some Sticky Notes", "AddNotesForm");
  }

  return (
    <div className="fixed bottom-0 flex flex-col gap-1 items-center transform translate-y-[-50%] bg-darkGray/90 p-3 rounded-3xl">
        <div
          onClick={addNoteDrawer}
          className="size-10 hover:scale-110 duration-150 ease-out rounded-full cursor-pointer bg-neutral flex justify-center items-center"
        >
        <Plus size="20" />
      </div>
      {colorOptions.map((color) => (
        <ColorShade key={color.id}  color={color}/>
      ))}
    </div>
  )
}

export default Controls;

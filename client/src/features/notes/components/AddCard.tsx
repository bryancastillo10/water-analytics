import { type SetStateAction, type ChangeEvent, useState} from "react";
import type { INotesData } from "@/features/notes/api/interface";
import { Plus, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface AddCardProps{
    column: string;
    setCard: React.Dispatch<SetStateAction<INotesData[]>>
}


const AddCard = ({ column, setCard }: AddCardProps) => {
    const [text, setText] = useState<string>("");
    const [isAdded, setIsAdded] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            id: Math.random().toString(),
            column,
            title: text.trim(),
        };

        setCard((prev) => [...prev, newCard]);
        setIsAdded(false);
    };
  return (
      <>
          {isAdded ? 
          <motion.form layout onSubmit={handleSubmit}>
            <textarea
                onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> setText(e.target.value)}
                autoFocus
                className="w-full rounded border border-primary/90 bg-primary/40 p-3 text-sm text-dark placeholder:text-darkGray focus:outline-0"
            /> 
            <div className="mt-2 flex items-center justify-end gap-1.5">
                <button 
                    onClick={()=> setIsAdded(false)}
                    className="flex items-center px-3 py-1.5 gap-1 text-xs text-primary transition-colors hover:scale-110"
                >
                    <span>Close</span>
                    <X/>
                </button>
                <button 
                    type="submit"
                    className="flex items-center px-3 py-1.5 gap-1 text-xs bg-primary rounded-xl text-light transition-colors hover:bg-primary/80"
                >
                    <span>Add</span>
                    <Plus/>
                </button>   
            </div>       
          </motion.form>
          
          :
        <motion.button
            layout
            onClick={() => setIsAdded(true)}
            className="flex w-full items-center gap-1 px-3 py-1.5 text-xs text-primary transition-colros hover:text-primary/40"
        >
            <span>Add Notes</span>
            <Plus/>
        </motion.button>}
      </>
  )
}

export default AddCard;

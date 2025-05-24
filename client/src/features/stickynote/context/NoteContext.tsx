import { createContext, useState } from 'react';
import { Spinner } from '@/assets/svg';
import type { INotesData } from '@/features/stickynote/api/interface';
import { useGetNotesQuery } from '@/features/stickynote/api/stickynoteApi';

interface INotesState<T> {
  notes: T[];
  selectedNote: T | null;
  setSelectedNote: React.Dispatch<React.SetStateAction<T | null>>;
}

export const NoteContext = createContext<INotesState<INotesData>>({
  notes: [],
  selectedNote: null,
  setSelectedNote: () => {},
});

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedNote, setSelectedNote] = useState<INotesData | null>(null);

  const { data: notes = [], isLoading } = useGetNotesQuery();

  const contextData = {
    notes,
    selectedNote,
    setSelectedNote,
  };

  return (
    <NoteContext.Provider value={contextData}>
      {isLoading ? (
        <div className="flex justify-center items-center bg-neutral h-screen">
          <Spinner className="animate-spin-slow" size="100" />
        </div>
      ) : (
        <>{children}</>
      )}
    </NoteContext.Provider>
  );
};

export default NotesProvider;

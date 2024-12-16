import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stickynoteApi } from "@/features/stickynote/api/stickynoteApi";
import type { INotesData } from "@/features/stickynote/api/interface";

interface NotesState {
    notes: INotesData[];
    selectedNote: INotesData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    selectedNote: null,
    isLoading: true,
    error: null
};

export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await dispatch(
                stickynoteApi.endpoints.getNotes.initiate()
            ).unwrap();
            return res
        }
        catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setSelectedNote: (state, action) => {
            state.selectedNote = action.payload;
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setSelectedNote } = notesSlice.actions;

export default notesSlice.reducer;
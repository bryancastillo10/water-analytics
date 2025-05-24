export interface ColorTypes<T> {
  id: T;
  colorHeader: T;
  colorBody: T;
  colorText: T;
}

export interface INotesData {
  id: string;
  title: string;
  content: string;
  colors: IColors<string>;
  position: string;
}

export interface IColors<T> {
  id: T;
  colorHeader: T;
  colorBody: T;
  colorText: T;
}

export interface CreateNotesResponse {
  message: string;
  note: INotesData;
}

export interface DeleteNotesResponse {
  message: string;
}

export interface UpdateNotesResponse {
  notesData: Partial<Omit<INotesData, 'id'>>;
}

export interface UpdateNotesRequest {
  id: string;
  notesData: Partial<Omit<INotesData, 'id'>>;
}

export interface ColorTypes<T>  {
    id: T;
    colorHeader: T;
    colorBody: T;
    colorText: T;
}

export interface INotesData {
    title: string;
    content: string;
    colors: string;
    position: string;
}

export interface CreateNotesResponse {
    message: string;
    note: INotesData;
}

export interface DeleteNotesResponse{
    message: string;
}
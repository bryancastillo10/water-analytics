export class NotesData {
    id!: string;
    title!: string;
    content!: string;
    colors!: {
      id: string;
      colorHeader: string;
      colorBody: string;
      colorText: string;
    };
    position!: {
      x: number;
      y: number;
    };
  }
  
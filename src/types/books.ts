

export interface BookType {
  id: number;
  title: string;
  author: string;
  cover: string;
  downloadUrl: string;
  year: string;
  publicationDate?: string;
  pages: string;
  description: string;
  tags: string[];
  fullDescription?: string;
}


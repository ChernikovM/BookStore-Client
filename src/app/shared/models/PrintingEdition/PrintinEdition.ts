import { Author } from "../Author/Author";

export class PrintingEdition{
    title!: string;
    price!: number;
    currency!: number; //TODO: enum
    type!: number; //TODO: enum
    description!: string;
    id!: number;

    authors: Author[] = [];
}
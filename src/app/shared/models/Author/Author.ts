import { PrintingEdition } from "../PrintingEdition/PrintinEdition";

export class Author{
    name!: string;
    id!: number;

    printingEditions: PrintingEdition[] = [];
}
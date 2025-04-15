import {Question} from "./Question.model";

export interface Quiz{

    name: string;
    description: string;
    questions: Question[];
    categoryId: string;
    authorId: string;
    quizID?: string;
    authorName?: string;
    categoryName?: string;
}
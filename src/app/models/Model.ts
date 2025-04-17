import {Course} from "./Course.model";

export interface User {
    id: number;
    name?: string;
    email?: string;
}

export interface FormationCourse {
  id: number;
  name?: string;
}

export interface Formation {
    id?: number;
    title: string;
    description: string;
    imagesUrls: string[];
    startDate: Date;
    endDate: Date;
    price: number;
    participants?: User[];
    coursesList?: FormationCourse[];
}
export interface FormationDTO {
    id?: number;
    title: string;
    description: string;
    imagesUrls: string[];
    startDate: Date;
    endDate: Date;
    price: number;
    participantCount?: User[];
}

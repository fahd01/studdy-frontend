export interface User {
    id: number;
    name?: string;
    email?: string;
}

export interface Course {
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
    coursesList?: Course[];
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
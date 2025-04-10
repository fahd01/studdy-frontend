import {Category} from "./Category.model";
import {Module} from "./Module.model";

export class Course {
    id: number | null;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    status: string;
    price: number;
    duration: number;
    level: string;
    category: Category | null;
    modules: Module[] | null;


    constructor(id: number, title: string, description: string, thumbnailUrl: string, status: string, price: number, duration: number, level: string, category: Category, modules: Module[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.status = status;
        this.price = price;
        this.duration = duration;
        this.level = level;
        this.category = category;
        this.modules = modules;
    }
}
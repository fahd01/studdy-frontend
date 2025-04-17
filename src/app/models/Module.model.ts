import {Attachment} from "./Attachment.model";

export interface Module {
    id: number | null
    title: string
    description: string
    externalLinks: URL[]
    attachments: Attachment[]
    files: File[]
}
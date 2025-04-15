export class Historic {
    hisId?: number; //
    message!: string; //
    createdAt!: Date; //
    user!: { userId: number }; // Use userId instead of id
}

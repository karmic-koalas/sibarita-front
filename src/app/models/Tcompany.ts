export type Tcompany = {
    owner: string,
    nickname: string,
    description: string,
    contact: {
        phone: number;
        email?: string;
    }
}
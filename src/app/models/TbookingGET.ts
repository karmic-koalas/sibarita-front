export type TbookingGET =  {
    client: string,
    owner: string,
    bookingToken: string,
    bookingDate: {
        day: string,
        hour: string
    },
    numPerson: number
}
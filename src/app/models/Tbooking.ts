export type Tbooking =  {
    client: string,
    owner: string,
    bookingDate: {
        day: string,
        hour: string
    },
    numPerson: number
}
export type TbookingGET = {
  _id?: string;
  client: string;
  owner: string;
  bookingToken: string;
  bookingDate: {
    day: string;
    hour: string;
  };
  numPerson: number;
  contact: {
    phone: number;
    email: string;
  };
  textArea: string;
};

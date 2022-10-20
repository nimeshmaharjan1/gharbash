export interface Home {
  id?: string;
  image?: any;
  title: string;
  description: string;
  country: string;
  state: string;
  address: string;
  price: number | null;
  guests: number | null;
  beds: number | null;
  baths: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

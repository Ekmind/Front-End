export interface Patient {
  _id: string;
  name: string;
  last_name: string;
  age: number;
  gender: string;
  phone: number;
  image: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

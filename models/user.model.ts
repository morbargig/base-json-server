import { JsonObjectType } from './json.type';
export interface UserModel extends JsonObjectType {
    name: string,
    email: string,
    company: string,
    phone: string,
    country: string,
    bank: string,
    address: string,
    pin: number,
    id: number,
    text: string
}
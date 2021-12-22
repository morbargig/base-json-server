import data from './mocks/index';
import { JsonValueType, JsonObjectType } from './models/json.type';
const { usersModule } = data
export const routes: { [k: string]: JsonValueType | JsonObjectType } = {
    '/healthCheck': { success: true },
    '/users': usersModule.users,
    '/users/:id': usersModule.user,
}
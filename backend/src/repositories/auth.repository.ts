import { UserModel } from './../config/models/user';
import { UserType } from '../config/utils/types/auth';
export class AuthRepository {
    async findByEmail(email: string){
        return UserModel.findOne({ email });
    }

    async createUser(data: UserType ) {
        return UserModel.create(data);
    }

    async deleteUser(id: string){
        return UserModel.findByIdAndDelete(id);
    }
}
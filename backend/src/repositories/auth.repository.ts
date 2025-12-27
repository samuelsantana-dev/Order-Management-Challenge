import { UserModel } from './../config/models/user';

export class AuthRepository {
    async findByEmail(email: string){
        return UserModel.findOne({ email });
    }

    async createUser(data: { email: string; password: string }) {
        return UserModel.create(data);
    }
}
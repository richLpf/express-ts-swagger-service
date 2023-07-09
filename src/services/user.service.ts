import DB from '../databases';
import { HttpException } from '../exceptions/HttpException';
import { User, UserResponse } from '../interfaces/user.interface';
import { isEmpty } from '../utils/util';

class UserService {
  public User = DB.Users;

  public async findAll(query: any): Promise<UserResponse> {
    const { count, rows }  = await this.User.findAndCountAll(query);
    return { Data: rows, count };
  }

  public async findUserById(Id: number): Promise<User> {

    const findUser: User | null = await this.User.findByPk(Id);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async findUserByUsername(username: string): Promise<User | null> {

    const findUser: User | null = await this.User.findOne({
      where: { username },
      raw: true
    });
    return findUser;
  }

  public async createUser(Data: User): Promise<User> {
    const createUser: User = await this.User.create({ ...Data });
    return createUser;
  }

  public async updateUser(Data: User, Id: number): Promise<any> {
    console.log("Data", Data, Id)
    const res: any = await this.User.update({...Data}, {where: {id: Id}})
    console.log("res", res)
    return res
  }
}

export default UserService;

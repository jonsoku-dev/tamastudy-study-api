import { PassportSerializer } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../common/schemas/user.schema';
import { Model } from 'mongoose';

export class SessionSerializer extends PassportSerializer {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  // user 의 id 만 뽑아서 session 에 저장한다.
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    const { _id } = user;
    done(null, { _id });
  }

  // session 에 있는 id 를 뽑아서 유저를 복원하여 req.user 에 넣어준다.
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    try {
      const user = await this.userModel
        .findById(payload._id)
        .select('-password');
      if (!user) {
        return null;
      }
      console.log(user);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
}

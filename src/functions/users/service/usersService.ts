import {
  getOneItem,
  createOneItem,
} from "@libs/database";
import { UserModel, IUser } from "@libs/database";
import { generateJWT } from "@libs/tokens";

export default class UsersService {
  constructor() {}

  async createUser(user: Partial<IUser> | null): Promise<IUser> {
    const userDoc = await createOneItem(UserModel, user);
    return userDoc.toObject();
  }

  async login(email: string, password: string) {

    const userDoc = (await getOneItem(UserModel, { email })) as any;
    if (!userDoc) throw new Error("No account assosiated with this email!");

    const user = (userDoc as any).toObject() as IUser;

    if (user.password !== password) return null;

    const { userId, isSuspended, suspendReason, role } = user;
    return {
      token: await generateJWT(
        {
          type: `auth|${process.env.IS_OFFLINE ? "local" : process.env.STAGE}`,
          user: `${role}|${userId}`,
          actv: isSuspended,
          actv2: suspendReason,
        },
        "1h"
      ),
    };
  }

  async sendAccountVerificationMail(userData: IUser) {
    const verifJWToken = await generateJWT(
      {
        type: "email:verification:token",
        user: `${userData.email}|${userData.userId}`,
        validity: 1,
      },
      "1h"
    );
    // TODO: send verification email logic here
    return verifJWToken;
  }
}

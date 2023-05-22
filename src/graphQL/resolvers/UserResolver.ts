import { UserModel } from "../../models/user.model";

type SignupInput = {
  name: String;
  email: String;
  password: String;
};
type LoginInput = {
  email: String;
  password: String;
};
export const UserResolver = {
  Mutation: {
    loginUser: async (_: any, { input }: any) => {
      const { email, password } = input;
      return await UserModel.findOne({ email: email });
    },
    addUser: async (_: any, { input }: any) => {
      const { name, email, password } = input;
      console.log(name, email);
      const user = await UserModel.create({
        name: name,
        email: email,
        password: password,
      });
      return user;
    },
  },
};

import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import { UpdateMyProfileMutationArgs } from "../../../types/graph";
import cleanNullArg from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(async (_, args: UpdateMyProfileMutationArgs, { req }) => {
      const user: User = req.user;
      const notNull = cleanNullArg(args);
      try {
        if (args.password !== null) {
          user.password = args.password;
          user.save();
        }
        await User.update({ id: user.id }, { ...notNull });
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
};

export default resolvers;
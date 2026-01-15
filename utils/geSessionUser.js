const { getServerSession } = require("next-auth");
const { authOptions } = require("./authOptions");

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session || !session?.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};

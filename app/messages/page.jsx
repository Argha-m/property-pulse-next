import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import "@/models/Property";
import { getSessionUser } from "@/utils/geSessionUser";
import { redirect } from "next/navigation";

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect("/");
  }
  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "email")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", ["username", "email"])
    .populate("property", "name")
    .lean();

  const messages = JSON.parse(
    JSON.stringify([...unreadMessages, ...readMessages])
  );

  return (
    <section className="bg-blue-100">
      <div className="container mx-auto max-w-4xl py-16">
        <div className="bg-white px-6 py-8 rounded-md shadow-md border border-blue-400 m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;

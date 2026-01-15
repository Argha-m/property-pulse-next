"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { unReadMessageCount, setUnReadMessageCount } = useGlobalContext();

  const messageReadHandler = async () => {
    const response = await markMessageAsRead(message._id);
    if (response) {
      setIsRead(true);
      setUnReadMessageCount(unReadMessageCount - 1);
      toast.success("Marked as read.");
    }
  };

  const messageDeleteHandler = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    toast.success("Message deleted successfully");
  };

  if (isDeleted) {
    return (
      <p className="bg-green-700 text-white py-1 px-4">Message Deleted!</p>
    );
  }

  return (
    <div
      className={`${
        isRead ? "border" : "border-3"
      } border-blue-400 p-4 rounded mb-2 relative`}
    >
      <h2 className="text-xl">
        <span className="font-semibold">Property Inquiry:</span>{" "}
        {message.property?.name}
      </h2>
      {isRead ? (
        <span className="absolute top-4 right-5 text-sm text-green-600 font-bold italic">
          Read
        </span>
      ) : (
        <span className="absolute top-4 right-5 text-sm text-red-600 font-bold italic">
          New
        </span>
      )}
      <p className="my-3 text-gray-500">{message.body}</p>
      <ul className="mt-4">
        <li>
          <span className="font-medium">Name:</span> {message.name}
        </li>

        <li>
          <span className="font-medium">Reply Email: </span>
          <a
            href={`mailto:${message.email}`}
            className="text-blue-400 hover:text-blue-500"
          >
            {message.email}
          </a>
        </li>
        <li>
          <span className="font-medium">Reply Phone: </span>
          <a
            href={`tel:${message.phone}`}
            className="text-blue-400 hover:text-blue-500"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <span className="font-medium">Received: </span>
          {new Date(message.createdAt).getUTCDate()}-
          {new Date(message.createdAt).getUTCMonth() + 1}-
          {new Date(message.createdAt).getUTCFullYear()}
        </li>
      </ul>
      {!isRead && (
        <button
          className="mt-4 mr-2 px-4 py-2 inline-flex items-center bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={messageReadHandler}
        >
          <FaEye className="mr-1" /> Mark as Read
        </button>
      )}
      <button
        className="mt-4 px-4 py-2 inline-flex items-center bg-red-500 text-white rounded hover:bg-red-600"
        onClick={messageDeleteHandler}
      >
        <FaTrash className="mr-1" /> Delete
      </button>
    </div>
  );
};

export default MessageCard;

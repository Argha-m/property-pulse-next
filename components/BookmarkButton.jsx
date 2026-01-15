"use client";

import bookmarkProperty from "@/app/actions/bookmarkButton";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (!userId) {
      toast.error("Please log in to bookmark properties.");
      return;
    }

    try {
      const result = await bookmarkProperty(property._id);
      toast.success(result.message);
    } catch (error) {
      console.error("Error bookmarking property:", error);
      toast.error(result.message);
    } finally {
      setLoading(false);
    }
  };

  const buttonClass = isBookmarked
    ? "bg-red-500 hover:bg-red-600"
    : "bg-blue-500 hover:bg-blue-600";

  const buttonText = isBookmarked ? "Remove Bookmark" : "Bookmark Property";

  useEffect(() => {
    if (session) {
      // Here you would typically check if the property is already bookmarked
      checkBookmarkStatus(property._id).then((status) => {
        setIsBookmarked(status.isBookmarked);
      });
    }
  }, [session]);

  return (
    <button
      onClick={handleClick}
      className={`${buttonClass} text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin mr-2" /> Processing...
        </>
      ) : (
        <>
          <FaBookmark className="mr-2" /> {buttonText}
        </>
      )}
    </button>
  );
};

export default BookmarkButton;

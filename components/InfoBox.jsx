import Link from "next/link";

const InfoBox = ({
  title,
  children,
  buttonText,
  buttonHref,
  buttonBgColor = "bg-black",
  buttonBgColorHover = "bg-gray-800",
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{title}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={buttonHref}
        className={`inline-block ${buttonBgColor} text-white rounded-lg px-4 py-2 hover:${buttonBgColorHover}`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default InfoBox;

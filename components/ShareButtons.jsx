"use client";

import { FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share this Property
      </h3>
      <div className="flex justify-center gap-3 pb-5">
        <FacebookShareButton
          url={shareUrl}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          quote={property.name}
          hashtags={[
            `${property.type.replace(/\s/g, "")}ForRent`,
            "PropertyPulse",
          ]}
          title={property.name}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
          source="Property Pulse"
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={property.description}
        >
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;

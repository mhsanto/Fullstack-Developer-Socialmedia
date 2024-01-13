import Link from "next/link";

type ProfileLinkProps = {
  icons: React.ReactNode;
  href?: string;
  title: string;
};
const ProfileLink: React.FC<ProfileLinkProps> = ({ icons, href, title }) => {
  return (
    <div className="flex-center gap-1">
      {icons}
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-500 paragraph-medium "
        >
          {title}
        </Link>
      ) : (
        <p className="text-dark400_light700  text-sm break-keep ">
          {title}
        </p>
      )}
    </div>
  );
};

export default ProfileLink;

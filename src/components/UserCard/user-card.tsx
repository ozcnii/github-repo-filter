import { FC } from "react";
import { UserCardProps } from "./user-card.props";

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="rounded-md border border-[#30363d] px-2 py-2 container mx-auto my-3">
      <a
        href={user.html_url}
        target="_blank"
        className="flex items-center gap-3 cursor-pointer hover:opacity-80"
      >
        <img
          className="rounded-full h-[32px]"
          src={user.avatar_url}
          alt={`${user.login}_avatar`}
        />
        {user.login}
      </a>
    </div>
  );
};

import { FC } from "react";
import { GithubIcon } from "../Icons/GithubIcon/github-icon";
import { Search } from "../Search/search";
import { NavLink } from "../UI/NavLink/nav-link";
import { HeaderProps } from "./header.props";

export const Header: FC<HeaderProps> = ({ selectUser }) => {
  return (
    <header className="bg-[#161b22] h-[60px]">
      <div className="container flex gap-3 items-center mx-auto pt-3">
        <NavLink href="https://github.com/">
          <GithubIcon className="hover:opacity-80" />
        </NavLink>
        <Search selectUser={selectUser} />
      </div>
    </header>
  );
};

import { FC } from "react";
import { NavLinkProps } from "./nav-link.props";

export const NavLink: FC<NavLinkProps> = ({
  href,
  children,
  className,
  target,
}) => {
  return (
    <a
      href={href}
      className={`text-[#58a6ff] hover:underline text-bold wb-break-word ${
        className ?? ""
      }`}
      target={target ?? "_self"}
    >
      {children}
    </a>
  );
};

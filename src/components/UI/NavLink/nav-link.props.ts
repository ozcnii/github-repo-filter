import { HTMLAttributeAnchorTarget, ReactNode } from "react";

export interface NavLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

import { User } from "../../api/fetch-search-users";

export interface HeaderProps {
  selectUser: (user: User | null) => void;
}

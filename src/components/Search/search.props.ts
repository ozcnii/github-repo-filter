import { User } from "../../api/fetch-search-users";

export interface SearchProps {
  selectUser: (user: User) => void;
}

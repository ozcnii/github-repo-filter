import { useCallback, useMemo, useState } from "react";
import { User } from "./api/fetch-search-users";
import { ReposList } from "./components/ReposList/repos-list";
import { Search } from "./components/Search/search";
import { UserCard } from "./components/UserCard/user-card";

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const user = useMemo(() => selectedUser, [selectedUser]);

  return (
    <div>
      <Search selectUser={selectUser} />
      {user && (
        <>
          <UserCard user={user} /> <ReposList user={user} />
        </>
      )}
    </div>
  );
};

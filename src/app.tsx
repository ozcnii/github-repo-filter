import { useCallback, useMemo, useState } from "react";
import { User } from "./api/fetch-search-users";
import { Header } from "./components/Header/header";
import { ReposList } from "./components/ReposList/repos-list";
import { UserCard } from "./components/UserCard/user-card";

export const App = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const selectUser = useCallback((user: User | null) => {
    setSelectedUser(user);
  }, []);

  const user = useMemo(() => selectedUser, [selectedUser]);

  return (
    <>
      <Header selectUser={selectUser} />
      {user && (
        <>
          <UserCard user={user} /> <ReposList user={user} />
        </>
      )}
    </>
  );
};

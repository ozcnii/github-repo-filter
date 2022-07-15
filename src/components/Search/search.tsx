import { FC, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchSearchUsers, User } from "../../api/fetch-search-users";
import { useDebounce } from "../../hooks/use-debounce";
import { useErrorMessage } from "../../hooks/use-error-message";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { ErrorMessage } from "../ErrorMessage/error-message";
import { Loader } from "../Loader/loader";
import { SearchProps } from "./search.props";

export const Search: FC<SearchProps> = ({ selectUser }) => {
  const [searchField, setSearchField] = useState("ozc");
  const debounceInputValue = useDebounce(searchField);

  const {
    show: showMenu,
    setShow,
    ref,
  } = useOutsideClick<HTMLDivElement>(!!searchField.length);

  useEffect(() => {
    setShow(!!searchField.length);
  }, [searchField]);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[]>(
    ["searchUsers", debounceInputValue],
    () => fetchSearchUsers(debounceInputValue),
    {
      enabled: !!searchField.length,
    }
  );

  const errorMessage = useErrorMessage(error);

  const usersNotFound = useMemo(() => {
    return !isError && !isLoading && !users?.length;
  }, [isError, isLoading, users]);

  const selectUserHandler = (user: User) => {
    selectUser(user);
    setSearchField("");
  };

  const focusHandler = () => {
    setShow(!!searchField.length);
  };

  return (
    <div className="container mx-auto mt-3 relative flex">
      <input
        onFocus={focusHandler}
        autoFocus
        className="bg-[#010409] border border-[#30363d] rounded-md focus:border-[#58a6ff] outline-none px-2 h-[36px] w-full"
        value={searchField}
        placeholder="enter username"
        onChange={(event) => setSearchField(event.target.value)}
      />
      {showMenu && (
        <div
          ref={ref}
          className="bg-[#0d1117] border border-[#30363d] rounded-md absolute w-full top-[40px] min-h-[56px] max-h-[150px] overflow-y-scroll"
        >
          {users && (
            <ul>
              {users.map((user) => (
                <li
                  onClick={() => selectUserHandler(user)}
                  className="cursor-pointer flex justify-between items-center p-2 hover:bg-[#1f6feb]"
                  key={user.id}
                >
                  {user.login}
                  <img
                    className="h-[40px] rounded-full"
                    src={user.avatar_url}
                    alt={`${user.login}_avatar`}
                  />
                </li>
              ))}
            </ul>
          )}

          {isLoading && <Loader />}
          {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {usersNotFound && <ErrorMessage>No one user =( </ErrorMessage>}
        </div>
      )}
    </div>
  );
};

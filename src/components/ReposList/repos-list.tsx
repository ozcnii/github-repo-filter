import { FC, useEffect, useMemo, useState } from "react";
import { fetchUserRepos, Repo } from "../../api/fetch-user-repos";
import { maxPerPage } from "../../constants/constants";
import { useErrorMessage } from "../../hooks/use-error-message";
import { useLazyQuery } from "../../hooks/use-lazy-query";
import { ErrorMessage } from "../ErrorMessage/error-message";
import { Loader } from "../Loader/loader";
import { RepoCard } from "../RepoCard/repo-card";
import { UserReposProps } from "./repos-list.props";

enum Filters {
  ALL,
  FORKS,
  NOT_FORKS,
  SORT_BY_DATE_PUSHED,
}

const filterList = [
  {
    name: "All",
    filterName: Filters.ALL,
  },
  {
    name: "Forks",
    filterName: Filters.FORKS,
  },
  {
    name: "Not forks",
    filterName: Filters.NOT_FORKS,
  },
  {
    name: "Sort by date pushed",
    filterName: Filters.SORT_BY_DATE_PUSHED,
  },
];

export const ReposList: FC<UserReposProps> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState(Filters.ALL);

  const [fetch, { data, isLoading, isError, error }] = useLazyQuery<Repo[]>(
    ["searchUsers", user.login],
    () => fetchUserRepos(user.login)
  );

  useEffect(() => {
    fetch();
  }, []);

  const repos = useMemo(() => {
    switch (activeFilter) {
      case Filters.FORKS:
        return data?.filter((repo) => repo.fork === true);
      case Filters.NOT_FORKS:
        return data?.filter((repo) => repo.fork == false);
      case Filters.SORT_BY_DATE_PUSHED:
        return [...(data ?? [])].sort(
          (a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at)
        );
      default:
        return data;
    }
  }, [data, activeFilter]);

  const errorMessage = useErrorMessage(error);

  return (
    <div className="container mx-auto">
      <div className="flex gap-3 px-1 my-3 items-center">
        <ul className="flex gap-3">
          {filterList.map((filter) => (
            <li
              className={`
              cursor-pointer text-[#8b949e]
              ${activeFilter === filter.filterName && "underline text-white"}`}
              onClick={() => setActiveFilter(filter.filterName)}
            >
              {filter.name}
            </li>
          ))}
        </ul>
        <p className="text-[#8b949e] text-xs rounded-md px-[0.5rem] py-[0.12rem] border border-[#30363d]">
          {repos?.length ?? 0}
          {repos?.length === maxPerPage && " (MAX)"}
        </p>
      </div>

      {repos && (
        <ul className="flex flex-col gap-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {repos && !repos?.length && <ErrorMessage>No one repo =(</ErrorMessage>}
    </div>
  );
};

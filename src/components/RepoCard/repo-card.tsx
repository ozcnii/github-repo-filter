import { FC } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { getLanguageColor } from "../../utils/get-language-color";
import { GetCodeTooltip } from "../GetCodeTooltip/get-code-tooltip";
import { RepoCardIcon } from "../Icons/RepoCardIcon/repo-card-icon";
import { RepoUrlIcon } from "../Icons/RepoUrlIcon/repo-url-icon";
import { Button } from "../UI/Button/button";
import { NavLink } from "../UI/NavLink/nav-link";
import { RepoCardProps } from "./repo-card.props";

export const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  const { ref, setShow, show } = useOutsideClick<HTMLDivElement>(false);

  return (
    <div className="w-full items-center rounded-md border border-[#30363d] p-3 flex justify-between">
      <div>
        <div className="flex items-center gap-2">
          <RepoCardIcon />

          <NavLink className="mr-1" target="_blank" href={repo.html_url}>
            <span title={repo.name}>{repo.name}</span>
          </NavLink>

          <span className="text-[#8b949e] text-xs rounded-md px-[0.5rem] py-[0.12rem] border border-[#30363d]">
            {repo.private ? "Private" : "Public"}
          </span>
        </div>

        {repo.homepage && (
          <div className="flex items-center gap-3 mt-2">
            <RepoUrlIcon />
            <NavLink className="mr-1" target="_blank" href={repo.html_url}>
              <span title={repo.homepage}>{repo.homepage}</span>
            </NavLink>
          </div>
        )}

        {repo.description && (
          <p className="text-[#8b949e] text-small mt-2 mb-0">
            {repo.description}
          </p>
        )}

        {repo.language && (
          <p className="mb-0 mt-2 f6 ">
            <span className="flex gap-3 items-center mr-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getLanguageColor(repo.language),
                }}
              ></span>
              <span>{repo.language}</span>
            </span>
          </p>
        )}
      </div>
      <div className="relative">
        <Button onClick={() => setShow(true)}>Code</Button>
        {show && (
          <GetCodeTooltip
            onClose={() => setShow(false)}
            tooltipRef={ref}
            clone_url={repo.clone_url}
            ssh_url={repo.ssh_url}
          />
        )}
      </div>
    </div>
  );
};

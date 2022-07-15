import { FC } from "react";
import { getLanguageColor } from "../../utils/get-language-color";
import { RepoCardIcon } from "../RepoCardIcon/repo-card-icon";
import { RepoCardProps } from "./repo-card.props";

export const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="rounded-md border border-[#30363d] d-flex p-3 width-full">
      <div className="flex items-center gap-2">
        <RepoCardIcon />
        <a
          className="text-[#58a6ff] hover:underline mr-1 text-bold wb-break-word"
          data-hydro-click='{"event_type":"user_profile.click","payload":{"profile_user_id":89480568,"target":"PINNED_REPO","user_id":89480568,"originating_url":"https://github.com/ozcnii"}}'
          data-hydro-click-hmac="193f6f1f1046ec88bd2e1b017696ffdc9d77223cb0f79c0aa85f1a6bf775a5cf"
          target="_blank"
          href={repo.html_url}
        >
          <span title={repo.name}>{repo.name}</span>
        </a>

        <span className="text-[#8b949e] text-xs rounded-md px-[0.5rem] py-[0.12rem] border border-[#30363d]">
          {repo.private ? "Private" : "Public"}
        </span>
      </div>

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
  );
};

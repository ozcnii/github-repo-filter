import { FC } from "react";
import { TerminalIcon } from "../Icons/TerminalIcon/terminal-icon";
import { Button } from "../UI/Button/button";
import { GetCodeTooltipProps } from "./get-code-tooltip.props";

export const GetCodeTooltip: FC<GetCodeTooltipProps> = ({
  clone_url,
  ssh_url,
  tooltipRef,
  onClose,
}) => {
  const copyHandler = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => {
        alert("Success! URL is copied to clipboard");
      },
      () => {
        alert("Error! URL is not copied to clipboard");
      }
    );
  };

  return (
    <div
      ref={tooltipRef}
      className="z-[2] absolute top-0 right-0 bg-[#161b22] p-3 w-[350px] rounded-md border border-[#30363d] shadow-[0_8px_24px_#010409]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <TerminalIcon /> Clone
        </div>
        <button className="px-2 py-1" onClick={onClose}>
          ✖
        </button>
      </div>

      <div className="flex gap-3 flex-col">
        <div className="justify-between flex gap-2 items-center">
          <label htmlFor={clone_url}>HTTP</label>
          <input
            id={clone_url}
            value={clone_url}
            type="text"
            className="bg-[#161b22] border border-[#30363d] px-2 py-1 rounded-md focus:border-[#58a6ff] outline-none"
            readOnly
          />
          <Button onClick={() => copyHandler(clone_url)} className="px-2">
            Copy
          </Button>
        </div>

        <div className="justify-between flex gap-2 items-center">
          <label htmlFor={ssh_url}>SSH</label>
          <input
            id={ssh_url}
            value={ssh_url}
            type="text"
            className="bg-[#161b22] border border-[#30363d] px-2 py-1 rounded-md focus:border-[#58a6ff] outline-none"
            readOnly
          />
          <Button onClick={() => copyHandler(ssh_url)} className="px-2">
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

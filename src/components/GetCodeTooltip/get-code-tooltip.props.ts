import { RefObject } from "react";

export interface GetCodeTooltipProps {
  ssh_url: string;
  clone_url: string;
  tooltipRef: RefObject<any>;
  onClose: () => void;
}

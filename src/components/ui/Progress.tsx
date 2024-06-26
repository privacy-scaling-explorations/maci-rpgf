import { tv } from "tailwind-variants";

import { createComponent } from ".";

const ProgressWrapper = createComponent(
  "div",
  tv({
    base: "h-1 rounded-full bg-gray-200 relative overflow-hidden",
  }),
);

export interface IProgressProps {
  value?: number;
  max?: number;
}

export const Progress = ({ value = 0, max = 100 }: IProgressProps): JSX.Element => (
  <ProgressWrapper>
    <div
      className="absolute h-1 rounded-full bg-primary-600 transition-all"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </ProgressWrapper>
);

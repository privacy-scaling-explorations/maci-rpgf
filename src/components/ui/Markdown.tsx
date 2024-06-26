import clsx from "clsx";
import { type ComponentProps } from "react";
import ReactMarkdown from "react-markdown";

export interface IMarkdownProps extends ComponentProps<typeof ReactMarkdown> {
  isLoading?: boolean;
}

export const Markdown = ({ isLoading = false, ...props }: IMarkdownProps): JSX.Element => (
  <div
    className={clsx("prose prose-xl max-w-none dark:prose-invert", {
      "h-96 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800": isLoading,
    })}
  >
    <ReactMarkdown {...props} />
  </div>
);

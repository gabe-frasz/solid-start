import { JSX } from "solid-js";

type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = (props: LabelProps) => {
  return <label {...props} class="flex flex-col gap-2" />;
};

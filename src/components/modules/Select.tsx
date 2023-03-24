import { JSX } from "solid-js";

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = (props: SelectProps) => {
  return <select {...props} class="rounded bg-zinc-700 p-3" />;
};

import { A } from "solid-start";

export const HomeLink = () => {
  return (
    <A
      href="/"
      class="hover:bg-light-900/25 focus:bg-light-900/25 rounded px-2 py-1 font-semibold outline-none transition-colors"
    >
      Return to Home
    </A>
  );
};

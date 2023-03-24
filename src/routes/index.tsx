import { A } from "solid-start";

export default function Home() {
  return (
    <main class="container flex h-screen items-center justify-center">
      <nav class="flex flex-col items-center gap-4">
        <A
          href="/meme-generator"
          class="font-semibold transition-colors hover:text-violet-300"
        >
          Meme Generator
        </A>

        <A
          href="/tenzies"
          class="font-semibold transition-colors hover:text-emerald-300"
        >
          Tenzies
        </A>

        <A
          href="/quizzical"
          class="font-semibold transition-colors hover:text-pink-300"
        >
          Quizzical
        </A>
      </nav>
    </main>
  );
}

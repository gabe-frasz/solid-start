import { A } from "solid-start";

export default function Home() {
  return (
    <main class="container h-screen flex justify-center items-center">
      <nav class="flex flex-col gap-4 items-center">
        <A
          href="/meme-generator"
          class="font-semibold hover:text-violet-300 transition-colors"
        >
          Meme Generator
        </A>

        <A
          href="/tenzies"
          class="font-semibold hover:text-emerald-300 transition-colors"
        >
          Tenzies
        </A>

        <A
          href="/quiz"
          class="font-semibold hover:text-pink-300 transition-colors"
        >
          Quiz
        </A>
      </nav>
    </main>
  );
}

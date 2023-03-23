import { createResource, createSignal, Show } from "solid-js";

import { Head, HomeLink } from "@/components";

type Meme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
};

interface MemesResponse {
  success: boolean;
  data: { memes: Meme[] };
}

export default function MemeGenerator() {
  const [memes] = createResource<MemesResponse>(() =>
    fetch("https://api.imgflip.com/get_memes").then((res) => res.json()),
  );
  const [memeIndex, setMemeIndex] = createSignal(
    Math.floor(Math.random() * 100),
  );
  const [topText, setTopText] = createSignal("");
  const [bottomText, setBottomText] = createSignal("");

  function getNewImage(e: Event) {
    e.preventDefault();

    const randomNumber = Math.floor(Math.random() * 100);
    setMemeIndex(randomNumber);
  }

  return (
    <>
      <Head title="Meme Generator" />

      <header class="bg-gradient-to-r from-violet-900 to-violet-600">
        <nav class="container mb-9 flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <div class="flex items-center gap-2">
            <img
              src="/images/troll-face.png"
              alt="troll face"
              class="w-8 sm:w-12"
            />

            <h1 class="text-xl font-semibold sm:text-2xl">Meme Generator</h1>
          </div>

          <HomeLink />
        </nav>
      </header>

      <main class="container flex flex-col items-center">
        <form onSubmit={getNewImage} class="mb-12 w-full max-w-3xl">
          <div class="mb-2 flex flex-col items-center gap-2 sm:mb-4 sm:flex-row sm:gap-4">
            <input
              type="text"
              value={topText()}
              onInput={(e) => setTopText(e.currentTarget.value)}
              placeholder="Top text"
              class="w-full flex-1 rounded bg-zinc-700 py-3 pl-2"
            />

            <input
              type="text"
              value={bottomText()}
              onInput={(e) => setBottomText(e.currentTarget.value)}
              placeholder="Bottom text"
              class="w-full flex-1 rounded bg-zinc-700 py-3 pl-2"
            />
          </div>

          <button class="focus:ring-offset-dark-800 w-full rounded bg-gradient-to-r from-violet-900 to-violet-600 py-3 font-semibold outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2">
            Get a new meme image
          </button>
        </form>

        <div class="relative w-full max-w-3xl">
          <Show
            when={!memes.loading}
            fallback={
              <div class="bg-dark-50 h-56 w-full max-w-3xl animate-pulse" />
            }
          >
            <span class="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-2xl font-semibold">
              {topText()}
            </span>

            <img
              src={memes()?.data.memes[memeIndex()].url}
              alt={memes()?.data.memes[memeIndex()].name}
              class="w-full max-w-3xl"
            />

            <span class="absolute left-1/2 bottom-4 z-10 -translate-x-1/2 text-2xl font-semibold">
              {bottomText()}
            </span>
          </Show>
        </div>
      </main>
    </>
  );
}

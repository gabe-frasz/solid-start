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
        <nav class="container mb-9 py-5 flex flex-col justify-between items-center gap-4 sm:flex-row">
          <div class="flex gap-2 items-center">
            <img
              src="/images/troll-face.png"
              alt="troll face"
              class="w-8 sm:w-12"
            />

            <h1 class="text-xl sm:text-2xl font-semibold">Meme Generator</h1>
          </div>

          <HomeLink />
        </nav>
      </header>

      <main class="container flex flex-col items-center">
        <form onSubmit={getNewImage} class="w-full max-w-3xl mb-12">
          <div class="mb-2 flex flex-col items-center gap-2 sm:mb-4 sm:flex-row sm:gap-4">
            <input
              type="text"
              value={topText()}
              onInput={(e) => setTopText(e.currentTarget.value)}
              placeholder="Top text"
              class="flex-1 w-full py-3 bg-zinc-700 pl-2 rounded"
            />

            <input
              type="text"
              value={bottomText()}
              onInput={(e) => setBottomText(e.currentTarget.value)}
              placeholder="Bottom text"
              class="flex-1 w-full py-3 bg-zinc-700 pl-2 rounded"
            />
          </div>

          <button class="w-full bg-gradient-to-r from-violet-900 to-violet-600 font-semibold rounded py-3 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 focus:ring-offset-dark-800">
            Get a new meme image
          </button>
        </form>

        <div class="w-full max-w-3xl relative">
          <Show
            when={!memes.loading}
            fallback={
              <div class="w-full h-56 bg-dark-50 max-w-3xl animate-pulse" />
            }
          >
            <span class="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold top-4 z-10">
              {topText()}
            </span>

            <img
              src={memes()?.data.memes[memeIndex()].url}
              alt={memes()?.data.memes[memeIndex()].name}
              class="w-full max-w-3xl"
            />

            <span class="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold bottom-4 z-10">
              {bottomText()}
            </span>
          </Show>
        </div>
      </main>
    </>
  );
}

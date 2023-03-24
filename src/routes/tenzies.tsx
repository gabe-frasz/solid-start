import { createEffect, createSignal, For, Show } from "solid-js";

import { Die, Head, HomeLink } from "@/components";

interface dieValue {
  id: number;
  selected: boolean;
  value: number;
}

const initialValue = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  selected: false,
  value: Math.ceil(Math.random() * 6),
}));

export default function Tenzies() {
  const [diceValues, setDiceValues] = createSignal<dieValue[]>(initialValue);
  const [isGameFinished, setIsGameFinished] = createSignal(false);

  createEffect(() => {
    const selectedAll = diceValues().every((die) => die.selected);

    if (!selectedAll) return;

    const firstValue = diceValues()[0].value;
    const isEqual = diceValues().every((die) => die.value === firstValue);

    if (isEqual) {
      setIsGameFinished(true);
    }
  });

  function rollDice() {
    if (isGameFinished()) {
      setDiceValues(initialValue);
      setIsGameFinished(false);
      return;
    }

    const newValues = diceValues().map((die) =>
      die.selected ? die : { ...die, value: Math.ceil(Math.random() * 6) },
    );
    setDiceValues(newValues);
  }

  function handleDieSelect(id: number) {
    const newValues = diceValues().map((die) =>
      die.id === id ? { ...die, selected: !die.selected } : die,
    );
    setDiceValues(newValues);
  }

  return (
    <>
      <Head title="Tenzies" />

      <div class="flex min-h-screen items-center justify-center bg-gray-900 px-2">
        <main class="flex w-full max-w-xl flex-col items-center rounded bg-white p-4 text-gray-900">
          <h1 class="mb-2 text-3xl font-semibold">Tenzies</h1>

          <p class="max-w-sm text-center">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>

          <div class="grid grid-cols-2 gap-4 py-12 sm:grid-cols-4 md:grid-cols-6">
            <For each={diceValues()}>
              {(props) => (
                <Die
                  selected={props.selected}
                  value={props.value}
                  onClick={() => handleDieSelect(props.id)}
                />
              )}
            </For>
          </div>

          <Show when={isGameFinished()}>
            <h2 class="mb-4 text-3xl">You won! 🎉🎉</h2>
          </Show>

          <button
            onClick={rollDice}
            class="mb-6 w-20 min-w-fit rounded bg-indigo-600 px-3 py-1 font-semibold text-white transition-colors hover:bg-indigo-600/90"
          >
            {isGameFinished() ? "Play again" : "Roll"}
          </button>

          <HomeLink />
        </main>
      </div>
    </>
  );
}

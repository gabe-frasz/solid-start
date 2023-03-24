import { createSignal, For, Show } from "solid-js";

import { HomeLink, Question } from "@/components";
import {
  gameFinished,
  questions,
  setGameFinished,
  setQuestions,
} from "@/stores";

export const QuizGame = () => {
  const [correctAnswers, setCorrectAnswers] = createSignal(0);

  function checkAnswers() {
    setGameFinished(true);

    setCorrectAnswers(
      questions().filter((q) => q.selectedAnswer === q.correctAnswer).length,
    );
  }

  function playAgain() {
    setGameFinished(false);
    setQuestions([]);
  }

  return (
    <div class="container flex flex-col items-center justify-center py-16">
      <main class="flex flex-col gap-4">
        <For each={questions()}>
          {(props) => (
            <Question
              question={props.question}
              correctAnswer={props.correctAnswer}
              incorrectAnswers={props.incorrectAnswers}
              selectedAnswer={props.selectedAnswer}
            />
          )}
        </For>

        <Show when={gameFinished()}>
          <div class="mt-8 flex flex-col justify-center gap-8">
            <p class="text-center text-2xl font-semibold">
              You scored {correctAnswers()}/{questions().length} correct answers
            </p>

            <div class="flex items-center justify-center gap-4">
              <button
                onClick={playAgain}
                disabled={questions().some((q) => !q.selectedAnswer)}
                class="w-fit rounded bg-pink-900 px-5 py-3 font-semibold disabled:opacity-50"
              >
                Play again
              </button>

              <HomeLink />
            </div>
          </div>
        </Show>

        <Show when={!gameFinished()}>
          <button
            onClick={checkAnswers}
            disabled={questions().some((q) => !q.selectedAnswer)}
            class="mx-auto w-fit rounded bg-pink-900 px-5 py-3 font-semibold disabled:opacity-50"
          >
            Check answers
          </button>
        </Show>
      </main>
    </div>
  );
};

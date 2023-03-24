import clsx from "clsx";
import { For, onMount } from "solid-js";

import { gameFinished, questions, setQuestions } from "@/stores";

interface QuestionProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selectedAnswer?: string;
}

export const Question = (props: QuestionProps) => {
  function selectAnswer(answer: string) {
    setQuestions(
      questions().map((question) =>
        question.question === props.question
          ? { ...question, selectedAnswer: answer }
          : question,
      ),
    );
  }

  let allAnswers = [...props.incorrectAnswers, props.correctAnswer];

  onMount(() => {
    const randomIndex = Math.floor(Math.random() * allAnswers.length);

    if (randomIndex === allAnswers.length) return;

    allAnswers.pop();
    const movedAnswers = allAnswers.splice(randomIndex);
    allAnswers = [...allAnswers, props.correctAnswer, ...movedAnswers];
  });

  return (
    <section>
      <h2 class="mb-2 text-xl font-semibold">
        {props.question
          .replaceAll("&quot;", '"')
          .replaceAll("&amp;", "&")
          .replaceAll("&#039;", "'")}
      </h2>

      <div class="flex gap-2">
        <For each={allAnswers}>
          {(answer) => (
            <button
              onClick={() => selectAnswer(answer)}
              disabled={gameFinished()}
              class={clsx(
                "rounded-full border border-pink-900 p-2 text-pink-100",
                {
                  "bg-pink-900": answer === props.selectedAnswer,
                },
                {
                  "border-0 bg-emerald-900":
                    gameFinished() && answer === props.correctAnswer,
                },
                {
                  "bg-rose-700 opacity-70":
                    gameFinished() &&
                    answer === props.selectedAnswer &&
                    props.selectedAnswer !== props.correctAnswer,
                },
              )}
            >
              {answer
                .replaceAll("&quot;", '"')
                .replaceAll("&amp;", "&")
                .replaceAll("&#039;", "'")}
            </button>
          )}
        </For>
      </div>
    </section>
  );
};

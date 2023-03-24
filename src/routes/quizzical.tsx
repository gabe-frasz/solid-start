import { onMount, Show } from "solid-js";

import { Head, QuizForm, QuizGame } from "@/components";
import { questions, setGameFinished, setQuestions } from "@/stores";

export default function Quiz() {
  onMount(() => {
    setGameFinished(false);
    setQuestions([]);
  });

  return (
    <>
      <Head title="Quiz" />

      <div class="flex min-h-screen items-center justify-center">
        <Show when={questions().length === 0}>
          <QuizForm />
        </Show>

        <Show when={questions().length > 0}>
          <QuizGame />
        </Show>
      </div>
    </>
  );
}

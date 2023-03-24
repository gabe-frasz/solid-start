import { createSignal, Show } from "solid-js";

import { HomeLink, Label, Select } from "@/components";
import { apiUrl, setQuestions } from "@/stores";
import { isAny } from "@/utils";

interface TriviaResponse {
  response_code: number;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
}

export const QuizForm = () => {
  const [triviaAmount, setTriviaAmount] = createSignal(10);
  const [category, setCategory] = createSignal("any");
  const [difficulty, setDifficulty] = createSignal("any");
  const [type, setType] = createSignal("any");
  const [tryAgain, setTryAgain] = createSignal(false);

  async function getQuestions(e: Event) {
    e.preventDefault();
    setTryAgain(false);

    const categoryQuery = isAny(category()) ? "" : `&category=${category()}`;
    const difficultyQuery = isAny(difficulty())
      ? ""
      : `&difficulty=${difficulty()}`;
    const typeQuery = isAny(type()) ? "" : `&type=${type()}`;

    const queryParams = `?amount=${triviaAmount()}${categoryQuery}${difficultyQuery}${typeQuery}`;

    const res = await fetch(apiUrl + queryParams);
    const { response_code, results } = (await res.json()) as TriviaResponse;

    if (response_code === 1) {
      setTryAgain(true);
      return;
    }

    setQuestions(
      results.map((res) => ({
        question: res.question,
        correctAnswer: res.correct_answer,
        incorrectAnswers: res.incorrect_answers,
      })),
    );
  }

  return (
    <main class="container flex flex-col items-center">
      <h1 class="mb-3 text-3xl font-semibold md:text-5xl">Quizzical</h1>

      <p class="mb-6" />

      <Show when={tryAgain()}>
        <p class="my-6 text-xl text-red-100">
          Could not return results. The API doesn't have enough questions for
          your query.
        </p>
      </Show>

      <form
        onSubmit={getQuestions}
        class="mb-6 flex w-full max-w-md flex-col gap-4"
      >
        <Label>
          Number of questions
          <input
            type="number"
            name="trivia_amount"
            min={1}
            max={50}
            value={triviaAmount()}
            onChange={(e) => setTriviaAmount(Number(e.currentTarget.value))}
            class="rounded bg-zinc-700 p-3"
          />
        </Label>

        <Label>
          Select Category
          <Select
            name="trivia_category"
            value={category()}
            onChange={(e) => setCategory(e.currentTarget.value)}
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals &amp; Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>
          </Select>
        </Label>

        <Label>
          Select Difficulty
          <Select
            name="trivia_difficulty"
            value={difficulty()}
            onChange={(e) => setDifficulty(e.currentTarget.value)}
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </Label>

        <Label>
          Select Type
          <Select
            name="trivia_type"
            value={type()}
            onChange={(e) => setType(e.currentTarget.value)}
          >
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </Select>
        </Label>

        <button
          type="submit"
          class="mt-2 rounded bg-pink-900 py-3 font-semibold text-white transition-colors hover:bg-pink-900/90"
        >
          Start quiz
        </button>
      </form>

      <HomeLink />
    </main>
  );
};

import { createSignal } from "solid-js";

import { Question } from "@/@types";

export const apiUrl = "https://opentdb.com/api.php";

export const [questions, setQuestions] = createSignal<Question[]>([]);
export const [gameFinished, setGameFinished] = createSignal(false);

import clsx from "clsx";

interface DieProps {
  selected: boolean;
  value: number;
  onClick: () => void;
}

const dots = {
  top_left: [4, 5, 6],
  top_right: [2, 3, 4, 5, 6],
  center_left: [6],
  center: [1, 3, 5],
  center_right: [6],
  bottom_left: [2, 3, 4, 5, 6],
  bottom_right: [4, 5, 6],
};

export const Die = (props: DieProps) => {
  function handleDieSelect() {
    props.onClick();
  }

  return (
    <button
      onClick={handleDieSelect}
      class={clsx(
        "grid h-12 w-12 grid-cols-3 items-center justify-center justify-items-center rounded-md border border-black/10 shadow-lg",
        {
          "bg-emerald-500": props.selected,
        },
      )}
    >
      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.top_left.includes(props.value),
        })}
      />
      <div />
      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.top_right.includes(props.value),
        })}
      />

      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.center_left.includes(props.value),
        })}
      />
      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.center.includes(props.value),
        })}
      />
      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.center_right.includes(props.value),
        })}
      />

      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.bottom_left.includes(props.value),
        })}
      />
      <div />
      <div
        class={clsx("aspect-square w-[0.35rem] rounded-full", {
          "bg-black": dots.bottom_right.includes(props.value),
        })}
      />
    </button>
  );
};

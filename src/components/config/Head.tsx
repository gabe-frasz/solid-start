import { Meta, Title } from "solid-start";

interface HeadProps {
  title: string;
  description?: string;
}

export const Head = (props: HeadProps) => {
  return (
    <>
      <Title>{props.title}</Title>

      <Meta
        name="description"
        content={props.description ?? "SolidStart app"}
      />
    </>
  );
};

import { FC } from "react";
import { UseFieldArrayAppend, UseFieldArrayPrepend } from "react-hook-form";
import { VariationFormValues } from "./VariationForm";

type FormFooterProps = {
  append: UseFieldArrayPrepend<VariationFormValues, "elements">;
  prepend: UseFieldArrayAppend<VariationFormValues, "elements">;
};

export const FormFooter: FC<FormFooterProps> = ({ append, prepend }) => {
  return (
    <div style={{ margin: "50px" }}>
      <button
        type="button"
        onClick={() => {
          append({
            kind: "simple",
            title: "",
            subject: "",
          });
        }}
      >
        Append simple
      </button>
      <button
        type="button"
        onClick={() => {
          prepend({
            kind: "complex",
            title: "",
            subject: "",
            complexProp: "",
          });
        }}
      >
        prepend complex
      </button>
      <button
        type="button"
        onClick={() => {
          prepend({
            kind: "oneColumn",
            articles: [
              {
                title: "",
                subject: "",
              },
            ],
          });
        }}
      >
        prepend oneColumn
      </button>

      <button
        type="button"
        onClick={() => {
          prepend({
            kind: "twoColumns",
            articles: [
              {
                title: "",
                subject: "",
              },
              {
                title: "",
                subject: "",
              },
            ],
          });
        }}
      >
        prepend twoColumns
      </button>
    </div>
  );
};

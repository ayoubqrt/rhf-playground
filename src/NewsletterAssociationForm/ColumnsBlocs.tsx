import { FC } from "react";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { ErrorLabel } from "../components/ErrorLabel";
import { ArticleElements, OneOrMultipleColumns, VariationFormValues } from "./VariationForm";

type OneColumnBlocProps = {
  index: number;
  field: FieldArrayWithId<VariationFormValues, "elements">;
};

export type NewVariationFormValues = {
  titleNewsletter: string;
  mailSubject: string;
  elements: OneOrMultipleColumns[];
};

export const OneOrMultipleColumnsBloc: FC<OneColumnBlocProps> = ({ index, field }) => {
  if (field.kind !== "oneColumn" && field.kind !== "twoColumns") {
    return null;
  }

  const {
    register,
    formState: { errors, isSubmitted },
    control,
  } = useFormContext<NewVariationFormValues>();

  const { fields: oneColumnArticles } = useFieldArray({
    name: `elements.${index}.articles`,
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  return (
    <div>
      <h2 style={{ color: "red" }}>Kind : {field.kind}</h2>
      {oneColumnArticles.map((oneColumnArticle, oneColumnArticleIndex) => {
        return (
          <section style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <label>
              <span>title</span>
              <input
                {...register(`elements.${index}.articles.${oneColumnArticleIndex}.title`, {
                  required: true,
                })}
              />

              <ErrorLabel
                error={errors?.elements?.[index]?.articles?.[oneColumnArticleIndex]?.title?.message}
              />
            </label>
            <label>
              <span>subject</span>
              <input {...register(`elements.${index}.articles.${oneColumnArticleIndex}.subject`)} />
              <ErrorLabel
                error={errors?.elements?.[index]?.articles?.[oneColumnArticleIndex]?.subject?.message}
              />
            </label>
          </section>
        );
      })}
    </div>
  );
};

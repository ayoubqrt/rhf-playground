import { FC } from "react";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { ErrorLabel } from "../components/ErrorLabel";
import { ArticleElements, OneOrMultipleColumns, VariationFormValues } from "./VariationForm";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { ControlledDropdown } from "../components/ControlledDropdown";

type OneColumnBlocProps = {
  index: number;
  field: FieldArrayWithId<VariationFormValues, "elements">;
};

export type NewVariationFormValues = {
  titleNewsletter: string;
  mailSubject: string;
  elements: OneOrMultipleColumns[];
};

const options: IDropdownOption[] = [
  { key: "fruitsHeader", text: "Fruits", itemType: DropdownMenuItemType.Header },
  { key: "apple", text: "Apple" },
  { key: "banana", text: "Banana" },
  { key: "orange", text: "Orange", disabled: true },
  { key: "grape", text: "Grape" },
  { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
  { key: "vegetablesHeader", text: "Vegetables", itemType: DropdownMenuItemType.Header },
  { key: "broccoli", text: "Broccoli" },
  { key: "carrot", text: "Carrot" },
  { key: "lettuce", text: "Lettuce" },
];

export const OneOrMultipleColumnsBloc: FC<OneColumnBlocProps> = ({ index, field }) => {
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
            {/* <label>
              <span>subject</span>
              <input {...register(`elements.${index}.articles.${oneColumnArticleIndex}.subject`)} />
              <ErrorLabel
                error={errors?.elements?.[index]?.articles?.[oneColumnArticleIndex]?.subject?.message}
              />
            </label> */}
            <ControlledDropdown
              required={true}
              options={options}
              label="This is a required dropdown"
              control={control}
              name={`elements.${index}.articles.${oneColumnArticleIndex}.subject`}
              placeholder="Select a value"
              rules={{ required: "Please select a value" }}
            />
          </section>
        );
      })}
    </div>
  );
};

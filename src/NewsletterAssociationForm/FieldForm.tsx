import { FC } from "react";
import {
  Field,
  FieldArrayWithId,
  useFieldArray,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { ErrorLabel } from "../components/ErrorLabel";
import { ComplexProps, SimpleProps, VariationFormValues } from "./VariationForm";

export type NewVariationFormValues = {
  titleNewsletter: string;
  mailSubject: string;
  elements: (SimpleProps | ComplexProps)[];
};

type FieldFormProps = {
  field: FieldArrayWithId<VariationFormValues, "elements">;
  index: number;
  register: UseFormRegister<VariationFormValues>;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
  numberOfFields: number;
};

export const FieldForm: FC<FieldFormProps> = (props) => {
  const { field, index } = props;

  if (field.kind !== "simple" && field.kind !== "complex") {
    return null;
  }

  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext<NewVariationFormValues>();

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ color: "red" }}>Kind : {field.kind}</h2>
      <label>
        <span>title</span>
        <input {...register(`elements.${index}.title`, { required: true })} />
        <ErrorLabel error={errors?.elements?.[index]?.title?.message} />
      </label>
      <label>
        <span>subject</span>
        <input {...register(`elements.${index}.subject`)} />
        <ErrorLabel error={errors?.elements?.[index]?.subject?.message} />
      </label>
      {field.kind === "complex" && (
        <label>
          <span>complexProp</span>
          <input {...register(`elements.${index}.complexProp`)} />
        </label>
      )}
    </section>
  );
};

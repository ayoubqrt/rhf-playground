import { FC } from "react";
import {
  Field,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArraySwap,
  UseFormRegister,
} from "react-hook-form";
import { VariationFormValues } from "./VariationForm";

type FieldFormProps = {
  field: FieldArrayWithId<VariationFormValues, "elements">;
  index: number;
  register: UseFormRegister<VariationFormValues>;
  remove: UseFieldArrayRemove;
  swap: UseFieldArraySwap;
  numberOfFields: number;
};

export const FieldForm: FC<FieldFormProps> = (props) => {
  const { field, index, register, remove, swap, numberOfFields } = props;

  return (
    <section key={field.id}>
      <h2>Kind : {field.kind}</h2>
      <label>
        <span>title</span>
        <input {...register(`elements.${index}.title`, { required: true })} />
      </label>
      <label>
        <span>subject</span>
        <input {...register(`elements.${index}.subject`)} />
      </label>
      {field.kind === "complex" && (
        <label>
          <span>complexProp</span>
          <input {...register(`elements.${index}.complexProp`)} />
        </label>
      )}
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>

      <button
        type="button"
        onClick={() => {
          if (index !== 0) {
            swap(index, index - 1);
          }
        }}
      >
        remonter
      </button>
      <button
        type="button"
        onClick={() => {
          if (index !== numberOfFields - 1) {
            swap(index, index + 1);
          }
        }}
      >
        descendre
      </button>
    </section>
  );
};

import { FC, useState } from "react";
import { Control, FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FieldForm } from "./FieldForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { variationsType } from "./Association";
import { useUnmount } from "react-use";
import { OneOrMultipleColumnsBloc } from "./ColumnsBlocs";
import { FormFooter } from "./FormFooter";
import { ErrorLabel } from "../components/ErrorLabel";

interface ArticleProps {
  title: string;
  subject: string;
}

export interface SimpleProps extends ArticleProps {
  kind: "simple";
}
export interface ComplexProps extends ArticleProps {
  kind: "complex";
  complexProp: string;
}

export interface OneOrMultipleColumns {
  kind: "oneColumn" | "twoColumns" | "threeColumns";
  articles: ArticleProps[];
}

export type ArticleElements = SimpleProps | ComplexProps | OneOrMultipleColumns;

export type VariationFormValues = {
  titleNewsletter: string;
  mailSubject: string;
  elements: ArticleElements[];
};

const VariationFormSchema: z.ZodType<VariationFormValues> = z.object({
  titleNewsletter: z.string().min(1, { message: "Required" }),
  mailSubject: z.string().min(1, { message: "Required" }),
  elements: z
    .array(
      z.discriminatedUnion("kind", [
        z.object({
          kind: z.literal("simple", { required_error: "Required" }),
          title: z.string().min(1, { message: "Required" }),
          subject: z.string().min(1, { message: "Required" }),
        }),
        z.object({
          kind: z.literal("complex"),
          title: z.string().min(1, { message: "Required" }),
          subject: z.string().min(1, { message: "Required" }),
          complexProp: z.string().min(1, { message: "Required" }),
        }),
        z.object({
          kind: z.literal("oneColumn"),
          articles: z
            .array(
              z.object({
                title: z.string().min(1, { message: "Required" }),
                subject: z.string().min(1, { message: "Required" }),
              })
            )
            .max(1, { message: "Max 1" }),
        }),
        z.object({
          kind: z.literal("twoColumns"),
          articles: z
            .array(
              z.object({
                title: z.string().min(1, { message: "Required" }),
                subject: z.string().min(1, { message: "Required" }),
              })
            )
            .max(2, { message: "Max 2" })
            .min(2, { message: "Min 2" }),
        }),
      ])
    )
    .min(1, { message: "At least 1 element por favor" }),
});

// VariationFormSchema.parse({
//   titleNewsletter: "s",
//   mailSubject: "s",
//   elements: [
//     {
//       kind: "a",
//       title: "a",
//       subject: "b",
//       complexProp: "cqwer",
//       asd: "asd",
//     },
//   ],
// });

const myUnion = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
]);

type inferred = z.infer<typeof VariationFormSchema>;

let renderCount = 0;

type VariationFormProps = {
  title: string;
  content: VariationFormValues;
  onSubmit: (data: Partial<Record<variationsType[number], VariationFormValues>>) => void;
};

export const VariationForm: FC<VariationFormProps> = ({ title, onSubmit, content }) => {
  const [data, setData] = useState<any>();
  const [errorData, setErrorData] = useState<any>();
  const methods = useForm<VariationFormValues>({
    resolver: zodResolver(VariationFormSchema),
    defaultValues: content,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = methods;

  const { fields, append, prepend, replace, remove, insert, move, swap } = useFieldArray({
    name: "elements",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  renderCount++;

  return (
    <div>
      <h1>{title}</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(
            (data) => {
              setData(data);
              onSubmit({ FR: data });
              console.log("Submit data", data);
              console.log(errors);
            },
            (errorData) => {
              setData({});
              setErrorData(errorData);
              console.log(errorData);
            }
          )}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              <span>titleNewsletter</span>
              <input {...register("titleNewsletter", { required: true })} />
              <ErrorLabel error={errors.titleNewsletter?.message} />
            </label>
            <label>
              <span>mailSubject</span>
              <input {...register("mailSubject")} />
              <ErrorLabel error={errors.mailSubject?.message} />
            </label>
          </div>
          {fields.map((field, index) => {
            return (
              <div>
                {field.kind === "simple" && (
                  <FieldForm
                    key={field.id}
                    field={field}
                    index={index}
                    register={register}
                    remove={remove}
                    swap={swap}
                    numberOfFields={fields.length}
                  />
                )}

                {field.kind === "complex" && (
                  <FieldForm
                    key={field.id}
                    field={field}
                    index={index}
                    register={register}
                    remove={remove}
                    swap={swap}
                    numberOfFields={fields.length}
                  />
                )}

                {(field.kind === "oneColumn" || field.kind === "twoColumns") && (
                  <OneOrMultipleColumnsBloc key={field.id} field={field} index={index} />
                )}

                <div>
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
                      if (index !== fields.length - 1) {
                        swap(index, index + 1);
                      }
                    }}
                  >
                    descendre
                  </button>
                </div>
              </div>
            );
          })}

          <FormFooter append={append} prepend={prepend} />

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
      <pre>
        data :<code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

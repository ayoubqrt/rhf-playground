import { FC, useState } from "react";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FieldForm } from "./FieldForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { variationsType } from "./TestFieldArray";
import { useUnmount } from "react-use";

interface ArticleProps {
  title: string;
  subject: string;
}

interface SimpleProps extends ArticleProps {
  kind: "simple";
}

interface ComplexProps extends ArticleProps {
  kind: "complex";
  complexProp: string;
}

type ArticleElements = SimpleProps | ComplexProps;

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
  console.log(content);
  const [data, setData] = useState<any>();
  const [errorData, setErrorData] = useState<any>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<VariationFormValues>({
    resolver: zodResolver(VariationFormSchema),
    defaultValues: content,
  });
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
      <form
        onSubmit={handleSubmit(
          (data) => {
            setData(data);
            onSubmit({ FR: data });
            console.log("Submit data", data);
            console.log(errors);
          },
          (errorData) => {
            setErrorData(errorData);
            console.log(errorData);
          }
        )}
      >
        <label>
          <span>titleNewsletter</span>
          <input {...register("titleNewsletter", { required: true })} />
        </label>
        <label>
          <span>mailSubject</span>
          <input {...register("mailSubject")} />
        </label>
        {fields.map((field, index) => {
          return (
            <FieldForm
              field={field}
              index={index}
              register={register}
              remove={remove}
              swap={swap}
              numberOfFields={fields.length}
            />
          );
        })}
        <button
          type="button"
          onClick={() => {
            append({
              kind: "simple",
              title: "a",
              subject: "a",
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
              title: "a",
              subject: "b",
              complexProp: "c",
            });
          }}
        >
          prepend complex
        </button>

        <p>{errors.elements?.root?.message}</p>
        <button type="submit">Submit</button>
      </form>
      <pre>
        data :<code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

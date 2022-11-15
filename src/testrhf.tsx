import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FieldErrorsImpl, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type ArticleForm = {
  title: string;
  description: string;
};

type MainFlashInfo = {
  title: string;
  description: string;
};

const ArticleFormZod: z.ZodType<ArticleForm> = z.object({
  title: z.string(),
  description: z.string(),
});

const MainFlashInfoZod: z.ZodType<MainFlashInfo> = z.object({
  title: z.string(),
  description: z.string(),
});

const VariationForm = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
  elements: ArticleFormZod || MainFlashInfoZod,
});

const testrhf = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(VariationForm),
  });

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((field: any, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const onValid = (data: any) => {
    console.log(data);
  };

  const onInvalid = (data: Partial<FieldErrorsImpl<{ [x: string]: any }>>) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(
        (d) => onValid(d),
        (invalid) => onInvalid(invalid)
      )}
    >
      <input {...register("name")} />
      {errors.name?.message && <p>{errors.name?.message.toString()}</p>}
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age?.message && <p>{errors.age?.message.toString()}</p>}
      <input type="submit" />
    </form>
  );
};

export default testrhf;

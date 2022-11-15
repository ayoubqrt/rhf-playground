import { useState } from "react";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FieldForm } from "./FieldForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VariationForm, VariationFormValues } from "./VariationForm";

const variations = ["FR", "EN", "ES"] as const;
export type variationsType = typeof variations;

export function TestFieldArray() {
  const [association, setAssociation] = useState<
    Record<variationsType[number], VariationFormValues>
  >({
    FR: {
      titleNewsletter: "",
      mailSubject: "",
      elements: [],
    },
    EN: {
      titleNewsletter: "",
      mailSubject: "",
      elements: [],
    },
    ES: {
      titleNewsletter: "",
      mailSubject: "",
      elements: [],
    },
  });
  const [selectedVariation, setSelectedVariation] = useState<string>("FR");

  const handleSubmit = (data: Partial<Record<variationsType[number], VariationFormValues>>) => {
    setAssociation((prev) => {
      return { ...prev, ...data };
    });
  };

  console.log("asd");

  const selectedVariationKey = Object.keys(association).find(
    (variation) => variation === selectedVariation
  );
  // @ts-ignore
  const selectedVariationData = selectedVariationKey ? association[selectedVariationKey] : null;

  // get seconds of current time
  const seconds = new Date().getSeconds();
  const oui = seconds % 5 === 0;

  return (
    <div>
      {/* select option variation */}
      <select onChange={(e) => setSelectedVariation(e.target.value)}>
        {variations.map((variation) => (
          <option key={variation} value={variation}>
            {variation}
          </option>
        ))}
      </select>

      <VariationForm
        key={selectedVariation}
        title={selectedVariation}
        onSubmit={handleSubmit}
        content={selectedVariationData}
      />
    </div>
  );
}

import { useState } from "react";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";
import { FieldForm } from "./FieldForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VariationForm, VariationFormValues } from "./VariationForm";

const variations = ["FR", "EN", "ES"] as const;
export type variationsType = typeof variations;

export function Association() {
  const [association, setAssociation] = useState<Map<variationsType[number], VariationFormValues>>(new Map());
  const [selectedVariation, setSelectedVariation] = useState<string>("FR");

  const handleSubmit = (data: Partial<Map<variationsType[number], VariationFormValues>>) => {
    setAssociation((prev) => {
      return { ...prev, ...data };
    });
  };

  const selectedVariationKey = Object.keys(association).find((variation) => variation === selectedVariation);
  // @ts-ignore
  const selectedVariationData = selectedVariationKey ? association[selectedVariationKey] : null;

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

import { z } from "zod";

export const PopulationReqSchema = z.object({
  drilldowns: z.string(),
  measures: z.string(),
});

const populationSchema = z.array(
  z.object({
    "ID Nation": z.string(),
    Nation: z.string(),
    "ID Year": z.number(),
    Year: z.string(),
    Population: z.number(),
    "Slug Nation": z.string(),
  })
);

export const PopulationResSchema = z.object({
  data: populationSchema,
  source: z.array(
    z.object({
      measures: z.array(z.string()),
      annotations: z.object({
        source_name: z.string(),
        source_description: z.string(),
        dataset_name: z.string(),
        dataset_link: z.string(),
        table_id: z.string(),
        topic: z.string(),
        subtopic: z.string(),
      }),
      name: z.string(),
      substitutions: z.array(z.unknown()),
    })
  ),
});

// Type inferences
export type PopulationReq = z.infer<typeof PopulationReqSchema>;
export type PopulationRes = z.infer<typeof PopulationResSchema>;
export type Population = z.infer<typeof populationSchema>;

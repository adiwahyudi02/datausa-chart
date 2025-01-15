import { z } from "zod";
import { makeEndpoint } from "@zodios/core";
import { PopulationResSchema } from "../schemas/populationSchema";

export const populationEndpoint = makeEndpoint({
  method: "get",
  path: "/data",
  alias: "getPopulation",
  description: "Fetch population data",
  parameters: [
    { name: "drilldowns", type: "Query", schema: z.string() },
    { name: "measures", type: "Query", schema: z.string() },
  ],
  response: PopulationResSchema,
});

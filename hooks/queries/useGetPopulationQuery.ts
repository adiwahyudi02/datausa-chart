import { datausaApi } from "@/api";
import { PopulationReq } from "@/api/schemas/populationSchema";
import { QUERY_KEY } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export const useGetPopulationQuery = ({
  drilldowns = "Nation",
  measures = "Population",
}: PopulationReq) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_POPULATION, { drilldowns, measures }],
    queryFn: () =>
      datausaApi.getPopulation({
        queries: {
          drilldowns,
          measures,
        },
      }),
  });
};

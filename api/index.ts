import { makeApi, Zodios } from "@zodios/core";
import { populationEndpoint } from "./endpoints/data";

// Combine all endpoint arrays into a single array
const datausaApiEndpoints = makeApi([populationEndpoint]);
// Create the zodios client with the axios instance and the endpoints
export const datausaApi = new Zodios(
  "https://datausa.io/api",
  datausaApiEndpoints
);

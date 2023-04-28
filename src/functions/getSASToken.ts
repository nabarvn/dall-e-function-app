import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { generateSASToken } from "../../lib";

export async function getSASToken(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const sasToken = await generateSASToken();

  return { body: sasToken };
}

app.http("getSASToken", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getSASToken,
});

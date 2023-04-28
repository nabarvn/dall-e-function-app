import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { openai } from "../../lib";
import axios from "axios";
import { generateSASToken } from "../../lib";
import { BlobServiceClient } from "@azure/storage-blob";

const accountName = process.env.STORAGE_ACCOUNT_NAME;
const containerName = "images";

interface RequestResponse {
  prompt: string;
}

export async function generateImage(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const { prompt } = (await request.json()) as RequestResponse;

  console.log(`Prompt: ${prompt}`);

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  // Getting the image url
  const imageUrl = response.data.data[0].url;

  // Download the image and return it as an arraybuffer
  const imageResponse = await axios.get(imageUrl!, {
    responseType: "arraybuffer",
  });
  const arrayBuffer = imageResponse.data;

  const sasToken = await generateSASToken();

  // Access to storage account level
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );

  // Access to container level
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Generate timestamp so that images can be sorted in a particular order
  const timestamp = new Date().getTime();
  const imageFileName = `${prompt}_${timestamp}.png`;

  // Access to blob level
  const blockBlobClient = containerClient.getBlockBlobClient(imageFileName);

  await blockBlobClient
    .uploadData(arrayBuffer)
    .then(() => console.log("Image uploaded successfully!"))
    .catch((error) => console.error("Error uploading image: ", error.message));

  return { body: imageFileName };
}

app.http("generateImage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: generateImage,
});

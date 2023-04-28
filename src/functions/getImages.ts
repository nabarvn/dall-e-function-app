import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { generateSASToken } from "../../lib";

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const accountName = process.env.STORAGE_ACCOUNT_NAME;
const accountKey = process.env.STORAGE_ACCOUNT_KEY;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName!,
  accountKey!
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

export async function getImages(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const images = [];
  const sasToken = await generateSASToken();

  for await (const blob of containerClient.listBlobsFlat()) {
    const imageUrl = `${blob.name}?${sasToken}`;
    const url = `https://${accountName}.blob.core.windows.net/images/${imageUrl}`;
    images.push({ url, name: blob.name });
  }

  const sortedImages = images.sort((a, b) => {
    // Sort by timestamp
    const aName = a.name.split("_").pop().toString().split(".").shift();
    const bName = b.name.split("_").pop().toString().split(".").shift();

    return bName - aName;
  });

  context.log(`Http function processed request for url "${request.url}"`);

  return {
    jsonBody: {
      images: sortedImages,
    },
  };
}

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getImages,
});

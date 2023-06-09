/// <reference types="node" />

import { AbortSignalLike } from "@azure/abort-controller";
import { AzureLogger } from "@azure/logger";
import { BaseRequestPolicy } from "@azure/core-http";
import { CancelOnProgress } from "@azure/core-lro";
import * as coreHttp from "@azure/core-http";
import { deserializationPolicy } from "@azure/core-http";
import { HttpHeaders } from "@azure/core-http";
import { HttpOperationResponse } from "@azure/core-http";
import { HttpRequestBody } from "@azure/core-http";
import { HttpResponse } from "@azure/core-http";
import { HttpClient as IHttpClient } from "@azure/core-http";
import { KeepAliveOptions } from "@azure/core-http";
import { OperationTracingOptions } from "@azure/core-tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike } from "@azure/core-lro";
import { PollOperationState } from "@azure/core-lro";
import { ProxyOptions } from "@azure/core-http";
import { Readable } from "stream";
import { RequestPolicy } from "@azure/core-http";
import { RequestPolicyFactory } from "@azure/core-http";
import { RequestPolicyOptions } from "@azure/core-http";
import { RestError } from "@azure/core-http";
import { ServiceClientOptions } from "@azure/core-http";
import { TokenCredential } from "@azure/core-http";
import { TransferProgressEvent } from "@azure/core-http";
import { UserAgentOptions } from "@azure/core-http";
import { WebResource } from "@azure/core-http";

/** An Access policy */
export declare interface AccessPolicy {
  /** the date-time the policy is active */
  startsOn?: string;
  /** the date-time the policy expires */
  expiresOn?: string;
  /** the permissions for the acl policy */
  permissions?: string;
}

/** Defines values for AccessTier. */
export declare type AccessTier =
  | "P4"
  | "P6"
  | "P10"
  | "P15"
  | "P20"
  | "P30"
  | "P40"
  | "P50"
  | "P60"
  | "P70"
  | "P80"
  | "Hot"
  | "Cool"
  | "Archive"
  | "Cold";

/** Defines values for AccountKind. */
export declare type AccountKind =
  | "Storage"
  | "BlobStorage"
  | "StorageV2"
  | "FileStorage"
  | "BlockBlobStorage";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant permissions for that operation. Once all the
 * values are set, this should be serialized with toString and set as the permissions field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class AccountSASPermissions {
  /**
   * Parse initializes the AccountSASPermissions fields from a string.
   *
   * @param permissions -
   */
  static parse(permissions: string): AccountSASPermissions;
  /**
   * Creates a {@link AccountSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @param permissionLike -
   */
  static from(permissionLike: AccountSASPermissionsLike): AccountSASPermissions;
  /**
   * Permission to read resources and list queues and tables granted.
   */
  read: boolean;
  /**
   * Permission to write resources granted.
   */
  write: boolean;
  /**
   * Permission to create blobs and files granted.
   */
  delete: boolean;
  /**
   * Permission to delete versions granted.
   */
  deleteVersion: boolean;
  /**
   * Permission to list blob containers, blobs, shares, directories, and files granted.
   */
  list: boolean;
  /**
   * Permission to add messages, table entities, and append to blobs granted.
   */
  add: boolean;
  /**
   * Permission to create blobs and files granted.
   */
  create: boolean;
  /**
   * Permissions to update messages and table entities granted.
   */
  update: boolean;
  /**
   * Permission to get and delete messages granted.
   */
  process: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag: boolean;
  /**
   * Permission to filter blobs.
   */
  filter: boolean;
  /**
   * Permission to set immutability policy.
   */
  setImmutabilityPolicy: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete: boolean;
  /**
   * Produces the SAS permissions string for an Azure Storage account.
   * Call this method to set AccountSASSignatureValues Permissions field.
   *
   * Using this method will guarantee the resource types are in
   * an order accepted by the service.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
   *
   */
  toString(): string;
}

/**
 * A type that looks like an account SAS permission.
 * Used in {@link AccountSASPermissions} to parse SAS permissions from raw objects.
 */
export declare interface AccountSASPermissionsLike {
  /**
   * Permission to read resources and list queues and tables granted.
   */
  read?: boolean;
  /**
   * Permission to write resources granted.
   */
  write?: boolean;
  /**
   * Permission to delete blobs and files granted.
   */
  delete?: boolean;
  /**
   * Permission to delete versions granted.
   */
  deleteVersion?: boolean;
  /**
   * Permission to list blob containers, blobs, shares, directories, and files granted.
   */
  list?: boolean;
  /**
   * Permission to add messages, table entities, and append to blobs granted.
   */
  add?: boolean;
  /**
   * Permission to create blobs and files granted.
   */
  create?: boolean;
  /**
   * Permissions to update messages and table entities granted.
   */
  update?: boolean;
  /**
   * Permission to get and delete messages granted.
   */
  process?: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag?: boolean;
  /**
   * Permission to filter blobs.
   */
  filter?: boolean;
  /**
   * Permission to set immutability policy.
   */
  setImmutabilityPolicy?: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete?: boolean;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the resources accessible by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant access to that resource type. Once all the
 * values are set, this should be serialized with toString and set as the resources field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the resources string without this class, but
 * the order of the resources is particular and this class guarantees correctness.
 */
export declare class AccountSASResourceTypes {
  /**
   * Creates an {@link AccountSASResourceTypes} from the specified resource types string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid resource type.
   *
   * @param resourceTypes -
   */
  static parse(resourceTypes: string): AccountSASResourceTypes;
  /**
   * Permission to access service level APIs granted.
   */
  service: boolean;
  /**
   * Permission to access container level APIs (Blob Containers, Tables, Queues, File Shares) granted.
   */
  container: boolean;
  /**
   * Permission to access object level APIs (Blobs, Table Entities, Queue Messages, Files) granted.
   */
  object: boolean;
  /**
   * Converts the given resource types to a string.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
   *
   */
  toString(): string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the services accessible by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant access to that service. Once all the
 * values are set, this should be serialized with toString and set as the services field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the services string without this class, but
 * the order of the services is particular and this class guarantees correctness.
 */
export declare class AccountSASServices {
  /**
   * Creates an {@link AccountSASServices} from the specified services string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid service.
   *
   * @param services -
   */
  static parse(services: string): AccountSASServices;
  /**
   * Permission to access blob resources granted.
   */
  blob: boolean;
  /**
   * Permission to access file resources granted.
   */
  file: boolean;
  /**
   * Permission to access queue resources granted.
   */
  queue: boolean;
  /**
   * Permission to access table resources granted.
   */
  table: boolean;
  /**
   * Converts the given services to a string.
   *
   */
  toString(): string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * AccountSASSignatureValues is used to generate a Shared Access Signature (SAS) for an Azure Storage account. Once
 * all the values here are set appropriately, call {@link generateAccountSASQueryParameters} to obtain a representation
 * of the SAS which can actually be applied to blob urls. Note: that both this class and {@link SASQueryParameters}
 * exist because the former is mutable and a logical representation while the latter is immutable and used to generate
 * actual REST requests.
 *
 * @see https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1
 * for more conceptual information on SAS
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 * for descriptions of the parameters, including which are required
 */
export declare interface AccountSASSignatureValues {
  /**
   * If not provided, this defaults to the service version targeted by this version of the library.
   */
  version?: string;
  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SASProtocol;
  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * The time after which the SAS will no longer work.
   */
  expiresOn: Date;
  /**
   * Specifies which operations the SAS user may perform. Please refer to {@link AccountSASPermissions} for help
   * constructing the permissions string.
   */
  permissions: AccountSASPermissions;
  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;
  /**
   * The values that indicate the services accessible with this SAS. Please refer to {@link AccountSASServices} to
   * construct this value.
   */
  services: string;
  /**
   * The values that indicate the resource types accessible with this SAS. Please refer
   * to {@link AccountSASResourceTypes} to construct this value.
   */
  resourceTypes: string;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
}

/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 */
export declare class AnonymousCredential extends Credential_2 {
  /**
   * Creates an {@link AnonymousCredentialPolicy} object.
   *
   * @param nextPolicy -
   * @param options -
   */
  create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): AnonymousCredentialPolicy;
}

/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 */
export declare class AnonymousCredentialPolicy extends CredentialPolicy {
  /**
   * Creates an instance of AnonymousCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
}

/** Defines headers for AppendBlob_appendBlockFromUrl operation. */
export declare interface AppendBlobAppendBlockFromUrlHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** This response header is returned only for append operations. It returns the offset at which the block was committed, in bytes. */
  blobAppendOffset?: string;
  /** The number of committed blocks present in the blob. This header is returned only for append blobs. */
  blobCommittedBlockCount?: number;
  /** The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned when the block was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlockFromURL} operation.
 */
export declare interface AppendBlobAppendBlockFromURLOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * An MD5 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
}

/** Contains response data for the appendBlockFromUrl operation. */
export declare type AppendBlobAppendBlockFromUrlResponse =
  AppendBlobAppendBlockFromUrlHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: AppendBlobAppendBlockFromUrlHeaders;
    };
  };

/** Defines headers for AppendBlob_appendBlock operation. */
export declare interface AppendBlobAppendBlockHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** This response header is returned only for append operations. It returns the offset at which the block was committed, in bytes. */
  blobAppendOffset?: string;
  /** The number of committed blocks present in the blob. This header is returned only for append blobs. */
  blobCommittedBlockCount?: number;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned when the block was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlock} operation.
 */
export declare interface AppendBlobAppendBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Callback to receive events on the progress of append block operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the appendBlock operation. */
export declare type AppendBlobAppendBlockResponse =
  AppendBlobAppendBlockHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: AppendBlobAppendBlockHeaders;
    };
  };

/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 */
export declare class AppendBlobClient extends BlobClient {
  /**
   * appendBlobsContext provided by protocol layer.
   */
  private appendBlobContext;
  /**
   *
   * Creates an instance of AppendBlobClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param blobName - Blob name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  withSnapshot(snapshot: string): AppendBlobClient;
  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param options - Options to the Append Block Create operation.
   *
   *
   * Example usage:
   *
   * ```js
   * const appendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await appendBlobClient.create();
   * ```
   */
  create(options?: AppendBlobCreateOptions): Promise<AppendBlobCreateResponse>;
  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * If the blob with the same name already exists, the content of the existing blob will remain unchanged.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param options -
   */
  createIfNotExists(
    options?: AppendBlobCreateIfNotExistsOptions
  ): Promise<AppendBlobCreateIfNotExistsResponse>;
  /**
   * Seals the append blob, making it read only.
   *
   * @param options -
   */
  seal(options?: AppendBlobSealOptions): Promise<AppendBlobAppendBlockResponse>;
  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param body - Data to be appended.
   * @param contentLength - Length of the body in bytes.
   * @param options - Options to the Append Block operation.
   *
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello World!";
   *
   * // Create a new append blob and append data to the blob.
   * const newAppendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await newAppendBlobClient.create();
   * await newAppendBlobClient.appendBlock(content, content.length);
   *
   * // Append data to an existing append blob.
   * const existingAppendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await existingAppendBlobClient.appendBlock(content, content.length);
   * ```
   */
  appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options?: AppendBlobAppendBlockOptions
  ): Promise<AppendBlobAppendBlockResponse>;
  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
   *
   * @param sourceURL -
   *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
   *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
   *                 must either be public or must be authenticated via a shared access signature. If the source blob is
   *                 public, no authentication is required to perform the operation.
   * @param sourceOffset - Offset in source to be appended
   * @param count - Number of bytes to be appended as a block
   * @param options -
   */
  appendBlockFromURL(
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options?: AppendBlobAppendBlockFromURLOptions
  ): Promise<AppendBlobAppendBlockFromUrlResponse>;
}

/** Defines headers for AppendBlob_create operation. */
export declare interface AppendBlobCreateHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link AppendBlobClient.createIfNotExists} operation.
 */
export declare interface AppendBlobCreateIfNotExistsOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * HTTP headers to set when creating append blobs. A common header to set is
   * `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
}

/**
 * Contains response data for the {@link appendBlobClient.createIfNotExists} operation.
 */
export declare interface AppendBlobCreateIfNotExistsResponse
  extends AppendBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link AppendBlobClient.create} operation.
 */
export declare interface AppendBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when creating append blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when creating append blobs. A common header
   * to set is `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/** Contains response data for the create operation. */
export declare type AppendBlobCreateResponse = AppendBlobCreateHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: AppendBlobCreateHeaders;
  };
};

/**
 * Conditions to add to the creation of this append blob.
 */
export declare interface AppendBlobRequestConditions
  extends BlobRequestConditions,
    AppendPositionAccessConditions {}

/**
 * Options to configure {@link AppendBlobClient.seal} operation.
 */
export declare interface AppendBlobSealOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet.
   */
  conditions?: AppendBlobRequestConditions;
}

/** Parameter group */
export declare interface AppendPositionAccessConditions {
  /** Optional conditional header. The max length in bytes permitted for the append blob. If the Append Block operation would cause the blob to exceed that limit or if the blob size is already greater than the value specified in this header, the request will fail with MaxBlobSizeConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  maxSize?: number;
  /** Optional conditional header, used only for the Append Block operation. A number indicating the byte offset to compare. Append Block will succeed only if the append position is equal to this number. If it is not, the request will fail with the AppendPositionConditionNotMet error (HTTP status code 412 - Precondition Failed). */
  appendPosition?: number;
}

/** Defines values for ArchiveStatus. */
export declare type ArchiveStatus =
  | "rehydrate-pending-to-hot"
  | "rehydrate-pending-to-cool";

export { BaseRequestPolicy };

/**
 * A request associated with a batch operation.
 */
export declare interface BatchSubRequest {
  /**
   * The URL of the resource to request operation.
   */
  url: string;
  /**
   * The credential used for sub request.
   * Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service.
   * You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   */
  credential:
    | StorageSharedKeyCredential
    | AnonymousCredential
    | TokenCredential;
}

/**
 * The response data associated with a single request within a batch operation.
 */
export declare interface BatchSubResponse {
  /**
   * The status code of the sub operation.
   */
  status: number;
  /**
   * The status message of the sub operation.
   */
  statusMessage: string;
  /**
   * The error code of the sub operation, if the sub operation failed.
   */
  errorCode?: string;
  /**
   * The HTTP response headers.
   */
  headers: HttpHeaders;
  /**
   * The body as text.
   */
  bodyAsText?: string;
  /**
   * The batch sub request corresponding to the sub response.
   */
  _request: BatchSubRequest;
}

/** Defines headers for Blob_abortCopyFromURL operation. */
export declare interface BlobAbortCopyFromURLHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.abortCopyFromURL} operation.
 */
export declare interface BlobAbortCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
}

/** Contains response data for the abortCopyFromURL operation. */
export declare type BlobAbortCopyFromURLResponse =
  BlobAbortCopyFromURLHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlobAbortCopyFromURLHeaders;
    };
  };

/**
 * Options to configure Blob - Acquire Lease operation.
 */
export declare interface BlobAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * A BlobBatch represents an aggregated set of operations on blobs.
 * Currently, only `delete` and `setAccessTier` are supported.
 */
export declare class BlobBatch {
  private batchRequest;
  private readonly batch;
  private batchType;
  constructor();
  /**
   * Get the value of Content-Type for a batch request.
   * The value must be multipart/mixed with a batch boundary.
   * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
   */
  getMultiPartContentType(): string;
  /**
   * Get assembled HTTP request body for sub requests.
   */
  getHttpRequestBody(): string;
  /**
   * Get sub requests that are added into the batch request.
   */
  getSubRequests(): Map<number, BatchSubRequest>;
  private addSubRequestInternal;
  private setBatchType;
  /**
   * The deleteBlob operation marks the specified blob or snapshot for deletion.
   * The blob is later deleted during garbage collection.
   * Only one kind of operation is allowed per batch request.
   *
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param url - The url of the blob resource to delete.
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options -
   */
  deleteBlob(
    url: string,
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: BlobDeleteOptions
  ): Promise<void>;
  /**
   * The deleteBlob operation marks the specified blob or snapshot for deletion.
   * The blob is later deleted during garbage collection.
   * Only one kind of operation is allowed per batch request.
   *
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClient - The BlobClient.
   * @param options -
   */
  deleteBlob(
    blobClient: BlobClient,
    options?: BlobDeleteOptions
  ): Promise<void>;
  /**
   * The setBlobAccessTier operation sets the tier on a blob.
   * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
   * Only one kind of operation is allowed per batch request.
   *
   * A block blob's tier determines Hot/Cool/Archive storage type.
   * This operation does not update the blob's ETag.
   * For detailed information about block blob level tiering
   * see [hot, cool, and archive access tiers](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
   * The operation will be authenticated and authorized
   * with specified credential. See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param url - The url of the blob resource to delete.
   * @param credential - Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param tier -
   * @param options -
   */
  setBlobAccessTier(
    url: string,
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<void>;
  /**
   * The setBlobAccessTier operation sets the tier on a blob.
   * The operation is allowed on block blobs in a blob storage or general purpose v2 account.
   * Only one kind of operation is allowed per batch request.
   *
   * A block blob's tier determines Hot/Cool/Archive storage type.
   * This operation does not update the blob's ETag.
   * For detailed information about block blob level tiering
   * see [hot, cool, and archive access tiers](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers).
   * The operation will be authenticated and authorized
   * with specified credential. See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClient - The BlobClient.
   * @param tier -
   * @param options -
   */
  setBlobAccessTier(
    blobClient: BlobClient,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<void>;
}

/**
 * A BlobBatchClient allows you to make batched requests to the Azure Storage Blob service.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
 */
export declare class BlobBatchClient {
  private serviceOrContainerContext;
  /**
   * Creates an instance of BlobBatchClient.
   *
   * @param url - A url pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobBatchClient.
   *
   * @param url - A url pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a {@link BlobBatch}.
   * A BlobBatch represents an aggregated set of operations on blobs.
   */
  createBatch(): BlobBatch;
  /**
   * Create multiple delete operations to mark the specified blobs or snapshots for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operations will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param urls - The urls of the blob resources to delete.
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options -
   */
  deleteBlobs(
    urls: string[],
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: BlobDeleteOptions
  ): Promise<BlobBatchDeleteBlobsResponse>;
  /**
   * Create multiple delete operations to mark the specified blobs or snapshots for deletion.
   * Note that in order to delete a blob, you must delete all of its snapshots.
   * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
   * The operation(subrequest) will be authenticated and authorized with specified credential.
   * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClients - The BlobClients for the blobs to delete.
   * @param options -
   */
  deleteBlobs(
    blobClients: BlobClient[],
    options?: BlobDeleteOptions
  ): Promise<BlobBatchDeleteBlobsResponse>;
  /**
   * Create multiple set tier operations to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param urls - The urls of the blob resource to delete.
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param tier -
   * @param options -
   */
  setBlobsAccessTier(
    urls: string[],
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<BlobBatchSetBlobsAccessTierResponse>;
  /**
   * Create multiple set tier operations to set the tier on a blob.
   * The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
   * The operation(subrequest) will be authenticated and authorized
   * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
   *
   * @param blobClients - The BlobClients for the blobs which should have a new tier set.
   * @param tier -
   * @param options -
   */
  setBlobsAccessTier(
    blobClients: BlobClient[],
    tier: AccessTier,
    options?: BlobSetTierOptions
  ): Promise<BlobBatchSetBlobsAccessTierResponse>;
  /**
   * Submit batch request which consists of multiple subrequests.
   *
   * Get `blobBatchClient` and other details before running the snippets.
   * `blobServiceClient.getBlobBatchClient()` gives the `blobBatchClient`
   *
   * Example usage:
   *
   * ```js
   * let batchRequest = new BlobBatch();
   * await batchRequest.deleteBlob(urlInString0, credential0);
   * await batchRequest.deleteBlob(urlInString1, credential1, {
   *  deleteSnapshots: "include"
   * });
   * const batchResp = await blobBatchClient.submitBatch(batchRequest);
   * console.log(batchResp.subResponsesSucceededCount);
   * ```
   *
   * Example using a lease:
   *
   * ```js
   * let batchRequest = new BlobBatch();
   * await batchRequest.setBlobAccessTier(blockBlobClient0, "Cool");
   * await batchRequest.setBlobAccessTier(blockBlobClient1, "Cool", {
   *  conditions: { leaseId: leaseId }
   * });
   * const batchResp = await blobBatchClient.submitBatch(batchRequest);
   * console.log(batchResp.subResponsesSucceededCount);
   * ```
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @param batchRequest - A set of Delete or SetTier operations.
   * @param options -
   */
  submitBatch(
    batchRequest: BlobBatch,
    options?: BlobBatchSubmitBatchOptionalParams
  ): Promise<BlobBatchSubmitBatchResponse>;
}

/**
 * Contains response data for the {@link deleteBlobs} operation.
 */
export declare type BlobBatchDeleteBlobsResponse = BlobBatchSubmitBatchResponse;

/**
 * Contains response data for the {@link setBlobsAccessTier} operation.
 */
export declare type BlobBatchSetBlobsAccessTierResponse =
  BlobBatchSubmitBatchResponse;

/**
 * Options to configure the Service - Submit Batch Optional Params.
 */
export declare interface BlobBatchSubmitBatchOptionalParams
  extends ServiceSubmitBatchOptionalParamsModel {}

/**
 * Contains response data for blob batch operations.
 */
export declare type BlobBatchSubmitBatchResponse = ParsedBatchResponse &
  ServiceSubmitBatchHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ServiceSubmitBatchHeaders;
    };
  };

/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export declare interface BlobBeginCopyFromURLOptions
  extends BlobStartCopyFromURLOptions {
  /**
   * The amount of time in milliseconds the poller should wait between
   * calls to the service to determine the status of the Blob copy.
   * Defaults to 15 seconds.
   */
  intervalInMs?: number;
  /**
   * Callback to receive the state of the copy progress.
   */
  onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
  /**
   * Serialized poller state that can be used to resume polling from.
   * This may be useful when starting a copy on one process or thread
   * and you wish to continue polling on another process or thread.
   *
   * To get serialized poller state, call `poller.toString()` on an existing
   * poller.
   */
  resumeFrom?: string;
}

/**
 * The state used by the poller returned from {@link BlobClient.beginCopyFromURL}.
 *
 * This state is passed into the user-specified `onProgress` callback
 * whenever copy progress is detected.
 */
export declare interface BlobBeginCopyFromUrlPollState
  extends PollOperationState<BlobBeginCopyFromURLResponse> {
  /**
   * The instance of {@link BlobClient} that was used when calling {@link BlobClient.beginCopyFromURL}.
   */
  readonly blobClient: CopyPollerBlobClient;
  /**
   * The copyId that identifies the in-progress blob copy.
   */
  copyId?: string;
  /**
   * the progress of the blob copy as reported by the service.
   */
  copyProgress?: string;
  /**
   * The source URL provided in {@link BlobClient.beginCopyFromURL}.
   */
  copySource: string;
  /**
   * The options that were passed to the initial {@link BlobClient.beginCopyFromURL} call.
   * This is exposed for the poller and should not be modified directly.
   */
  readonly startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
}

/**
 * Contains response data for the {@link BlobClient.beginCopyFromURL} operation.
 */
export declare interface BlobBeginCopyFromURLResponse
  extends BlobStartCopyFromURLResponse {}

/**
 * Options to configure Blob - Break Lease operation.
 */
export declare interface BlobBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Change Lease operation.
 */
export declare interface BlobChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * A BlobClient represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 */
export declare class BlobClient extends StorageClient {
  /**
   * blobContext provided by protocol layer.
   */
  private blobContext;
  private _name;
  private _containerName;
  private _versionId?;
  private _snapshot?;
  /**
   * The name of the blob.
   */
  get name(): string;
  /**
   * The name of the storage container the blob is associated with.
   */
  get containerName(): string;
  /**
   *
   * Creates an instance of BlobClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param blobName - Blob name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlobClient object identical to the source but with the specified snapshot timestamp
   */
  withSnapshot(snapshot: string): BlobClient;
  /**
   * Creates a new BlobClient object pointing to a version of this blob.
   * Provide "" will remove the versionId and return a Client to the base blob.
   *
   * @param versionId - The versionId.
   * @returns A new BlobClient object pointing to the version of this blob.
   */
  withVersion(versionId: string): BlobClient;
  /**
   * Creates a AppendBlobClient object.
   *
   */
  getAppendBlobClient(): AppendBlobClient;
  /**
   * Creates a BlockBlobClient object.
   *
   */
  getBlockBlobClient(): BlockBlobClient;
  /**
   * Creates a PageBlobClient object.
   *
   */
  getPageBlobClient(): PageBlobClient;
  /**
   * Reads or downloads a blob from the system, including its metadata and properties.
   * You can also call Get Blob to read a snapshot.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
   *
   * @param offset - From which position of the blob to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Optional options to Blob Download operation.
   *
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
   * console.log("Downloaded blob content:", downloaded.toString());
   *
   * async function streamToBuffer(readableStream) {
   * return new Promise((resolve, reject) => {
   * const chunks = [];
   * readableStream.on("data", (data) => {
   * chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   * });
   * readableStream.on("end", () => {
   * resolve(Buffer.concat(chunks));
   * });
   * readableStream.on("error", reject);
   * });
   * }
   * ```
   *
   * Example usage (browser):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
   * console.log(
   *   "Downloaded blob content",
   *   downloaded
   * );
   *
   * async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
  download(
    offset?: number,
    count?: number,
    options?: BlobDownloadOptions
  ): Promise<BlobDownloadResponseParsed>;
  /**
   * Returns true if the Azure blob resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing blob might be deleted by other clients or
   * applications. Vice versa new blobs might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  exists(options?: BlobExistsOptions): Promise<boolean>;
  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the methods of {@link ContainerClient} that list blobs using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param options - Optional options to Get Properties operation.
   */
  getProperties(
    options?: BlobGetPropertiesOptions
  ): Promise<BlobGetPropertiesResponse>;
  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  delete(options?: BlobDeleteOptions): Promise<BlobDeleteResponse>;
  /**
   * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  deleteIfExists(
    options?: BlobDeleteOptions
  ): Promise<BlobDeleteIfExistsResponse>;
  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
   *
   * @param options - Optional options to Blob Undelete operation.
   */
  undelete(options?: BlobUndeleteOptions): Promise<BlobUndeleteResponse>;
  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specified blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param blobHTTPHeaders - If no value provided, or no value provided for
   *                                                   the specified blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   *                                                   A common header to set is `blobContentType`
   *                                                   enabling the browser to provide functionality
   *                                                   based on file type.
   * @param options - Optional options to Blob Set HTTP Headers operation.
   */
  setHTTPHeaders(
    blobHTTPHeaders?: BlobHTTPHeaders,
    options?: BlobSetHTTPHeadersOptions
  ): Promise<BlobSetHTTPHeadersResponse>;
  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the blob
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
   *
   * @param metadata - Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param options - Optional options to Set Metadata operation.
   */
  setMetadata(
    metadata?: Metadata,
    options?: BlobSetMetadataOptions
  ): Promise<BlobSetMetadataResponse>;
  /**
   * Sets tags on the underlying blob.
   * A blob can have up to 10 tags. Tag keys must be between 1 and 128 characters.  Tag values must be between 0 and 256 characters.
   * Valid tag key and value characters include lower and upper case letters, digits (0-9),
   * space (' '), plus ('+'), minus ('-'), period ('.'), foward slash ('/'), colon (':'), equals ('='), and underscore ('_').
   *
   * @param tags -
   * @param options -
   */
  setTags(
    tags: Tags,
    options?: BlobSetTagsOptions
  ): Promise<BlobSetTagsResponse>;
  /**
   * Gets the tags associated with the underlying blob.
   *
   * @param options -
   */
  getTags(options?: BlobGetTagsOptions): Promise<BlobGetTagsResponse>;
  /**
   * Get a {@link BlobLeaseClient} that manages leases on the blob.
   *
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new BlobLeaseClient object for managing leases on the blob.
   */
  getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
  /**
   * Creates a read-only snapshot of a blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
   *
   * @param options - Optional options to the Blob Create Snapshot operation.
   */
  createSnapshot(
    options?: BlobCreateSnapshotOptions
  ): Promise<BlobCreateSnapshotResponse>;
  /**
   * Asynchronously copies a blob to a destination within the storage account.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that the onProgress callback will not be invoked if the operation completes in the first
   * request, and attempting to cancel a completed copy will result in an error being thrown.
   *
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * Example using automatic polling:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using manual polling:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * while (!poller.isDone()) {
   *    await poller.poll();
   * }
   * const result = copyPoller.getResult();
   * ```
   *
   * Example using progress updates:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   onProgress(state) {
   *     console.log(`Progress: ${state.copyProgress}`);
   *   }
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using a changing polling interval (default 15 seconds):
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   intervalInMs: 1000 // poll blob every 1 second for copy progress
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using copy cancellation:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * // cancel operation after starting it.
   * try {
   *   await copyPoller.cancelOperation();
   *   // calls to get the result now throw PollerCancelledError
   *   await copyPoller.getResult();
   * } catch (err) {
   *   if (err.name === 'PollerCancelledError') {
   *     console.log('The copy was cancelled.');
   *   }
   * }
   * ```
   *
   * @param copySource - url to the source Azure Blob/File.
   * @param options - Optional options to the Blob Start Copy From URL operation.
   */
  beginCopyFromURL(
    copySource: string,
    options?: BlobBeginCopyFromURLOptions
  ): Promise<
    PollerLikeWithCancellation<
      PollOperationState<BlobBeginCopyFromURLResponse>,
      BlobBeginCopyFromURLResponse
    >
  >;
  /**
   * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
   *
   * @param copyId - Id of the Copy From URL operation.
   * @param options - Optional options to the Blob Abort Copy From URL operation.
   */
  abortCopyFromURL(
    copyId: string,
    options?: BlobAbortCopyFromURLOptions
  ): Promise<BlobAbortCopyFromURLResponse>;
  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
   *
   * @param copySource - The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param options -
   */
  syncCopyFromURL(
    copySource: string,
    options?: BlobSyncCopyFromURLOptions
  ): Promise<BlobCopyFromURLResponse>;
  /**
   * Sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier
   *
   * @param tier - The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
   * @param options - Optional options to the Blob Set Tier operation.
   */
  setAccessTier(
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options?: BlobSetTierOptions
  ): Promise<BlobSetTierResponse>;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob in parallel to a buffer.
   * Offset and count are optional, downloads the entire blob if they are not provided.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param offset - From which position of the block blob to download(in bytes)
   * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param options - BlobDownloadToBufferOptions
   */
  downloadToBuffer(
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions
  ): Promise<Buffer>;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob in parallel to a buffer.
   * Offset and count are optional, downloads the entire blob if they are not provided.
   *
   * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
   * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
   * consider {@link downloadToFile}.
   *
   * @param buffer - Buffer to be fill, must have length larger than count
   * @param offset - From which position of the block blob to download(in bytes)
   * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param options - BlobDownloadToBufferOptions
   */
  downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions
  ): Promise<Buffer>;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param filePath -
   * @param offset - From which position of the block blob to download.
   * @param count - How much data to be downloaded. Will download to the end when passing undefined.
   * @param options - Options to Blob download options.
   * @returns The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   */
  downloadToFile(
    filePath: string,
    offset?: number,
    count?: number,
    options?: BlobDownloadOptions
  ): Promise<BlobDownloadResponseParsed>;
  private getBlobAndContainerNamesFromUrl;
  /**
   * Asynchronously copies a blob to a destination within the storage account.
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * @param copySource - url to the source Azure Blob/File.
   * @param options - Optional options to the Blob Start Copy From URL operation.
   */
  private startCopyFromURL;
  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates a Blob Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string>;
  /**
   * Delete the immutablility policy on the blob.
   *
   * @param options - Optional options to delete immutability policy on the blob.
   */
  deleteImmutabilityPolicy(
    options?: BlobDeleteImmutabilityPolicyOptions
  ): Promise<BlobDeleteImmutabilityPolicyResponse>;
  /**
   * Set immutablility policy on the blob.
   *
   * @param options - Optional options to set immutability policy on the blob.
   */
  setImmutabilityPolicy(
    immutabilityPolicy: BlobImmutabilityPolicy,
    options?: BlobSetImmutabilityPolicyOptions
  ): Promise<BlobSetImmutabilityPolicyResponse>;
  /**
   * Set legal hold on the blob.
   *
   * @param options - Optional options to set legal hold on the blob.
   */
  setLegalHold(
    legalHoldEnabled: boolean,
    options?: BlobSetLegalHoldOptions
  ): Promise<BlobSetLegalHoldResponse>;
}

/** Defines headers for Blob_copyFromURL operation. */
export declare interface BlobCopyFromURLHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** String identifier for this copy operation. */
  copyId?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: SyncCopyStatusType;
  /** This response header is returned so that the client can check for the integrity of the copied content. This header is only returned if the source content MD5 was specified. */
  contentMD5?: Uint8Array;
  /** This response header is returned so that the client can check for the integrity of the copied content. */
  xMsContentCrc64?: Uint8Array;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the copyFromURL operation. */
export declare type BlobCopyFromURLResponse = BlobCopyFromURLHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobCopyFromURLHeaders;
  };
};

/** Defines values for BlobCopySourceTags. */
export declare type BlobCopySourceTags = "REPLACE" | "COPY";

/** Defines headers for Blob_createSnapshot operation. */
export declare interface BlobCreateSnapshotHeaders {
  /** Uniquely identifies the snapshot and indicates the snapshot version. It may be used in subsequent requests to access the snapshot */
  snapshot?: string;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** True if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. For a snapshot request, this header is set to true when metadata was provided in the request and encrypted with a customer-provided key. */
  isServerEncrypted?: boolean;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.createSnapshot} operation.
 */
export declare interface BlobCreateSnapshotOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet when creating blob snapshots.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the createSnapshot operation. */
export declare type BlobCreateSnapshotResponse = BlobCreateSnapshotHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobCreateSnapshotHeaders;
  };
};

/** Defines headers for Blob_delete operation. */
export declare interface BlobDeleteHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Contains response data for the {@link BlobClient.deleteIfExists} operation.
 */
export declare interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
  /**
   * Indicate whether the blob is successfully deleted. Is false if the blob does not exist in the first place.
   */
  succeeded: boolean;
}

/** Defines headers for Blob_deleteImmutabilityPolicy operation. */
export declare interface BlobDeleteImmutabilityPolicyHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
}

/**
 * Options for deleting immutability policy {@link BlobClient.deleteImmutabilityPolicy} operation.
 */
export declare interface BlobDeleteImmutabilityPolicyOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the deleteImmutabilityPolicy operation. */
export declare type BlobDeleteImmutabilityPolicyResponse =
  BlobDeleteImmutabilityPolicyHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlobDeleteImmutabilityPolicyHeaders;
    };
  };

/**
 * Options to configure the {@link BlobClient.delete} operation.
 */
export declare interface BlobDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies options to delete blobs that have associated snapshots.
   * - `include`: Delete the base blob and all of its snapshots.
   * - `only`: Delete only the blob's snapshots and not the blob itself.
   */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/** Contains response data for the delete operation. */
export declare type BlobDeleteResponse = BlobDeleteHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobDeleteHeaders;
  };
};

/** Defines headers for Blob_download operation. */
export declare interface BlobDownloadHeaders {
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** Returns the date and time the blob was created. */
  createdOn?: Date;
  metadata?: {
    [propertyName: string]: string;
  };
  /** Optional. Only valid when Object Replication is enabled for the storage container and on the destination blob of the replication. */
  objectReplicationPolicyId?: string;
  /** Optional. Only valid when Object Replication is enabled for the storage container and on the source blob of the replication. When retrieving this header, it will return the header with the policy id and rule id (e.g. x-ms-or-policyid_ruleid), and the value will be the status of the replication (e.g. complete, failed). */
  objectReplicationRules?: {
    [propertyName: string]: string;
  };
  /** The number of bytes present in the response body. */
  contentLength?: number;
  /** The media type of the body of the response. For Download Blob this is 'application/octet-stream' */
  contentType?: string;
  /** Indicates the range of bytes returned in the event that the client requested a subset of the blob by setting the 'Range' request header. */
  contentRange?: string;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header returns the value that was specified for the Content-Encoding request header */
  contentEncoding?: string;
  /** This header is returned if it was previously specified for the blob. */
  cacheControl?: string;
  /** This header returns the value that was specified for the 'x-ms-blob-content-disposition' header. The Content-Disposition response header field conveys additional information about how to process the response payload, and also can be used to attach additional metadata. For example, if set to attachment, it indicates that the user-agent should not display the response, but instead show a Save As dialog with a filename other than the blob name specified. */
  contentDisposition?: string;
  /** This header returns the value that was specified for the Content-Language request header. */
  contentLanguage?: string;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** The blob's type. */
  blobType?: BlobType;
  /** Conclusion time of the last attempted Copy Blob operation where this blob was the destination blob. This value can specify the time of a completed, aborted, or failed copy attempt. This header does not appear if a copy is pending, if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copyCompletedOn?: Date;
  /** Only appears when x-ms-copy-status is failed or pending. Describes the cause of the last fatal or non-fatal copy operation failure. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyStatusDescription?: string;
  /** String identifier for this copy operation. Use with Get Blob Properties to check the status of this copy operation, or pass to Abort Copy Blob to abort a pending copy. */
  copyId?: string;
  /** Contains the number of bytes copied and the total bytes in the source in the last attempted Copy Blob operation where this blob was the destination blob. Can show between 0 and Content-Length bytes copied. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyProgress?: string;
  /** URL up to 2 KB in length that specifies the source blob or file used in the last attempted Copy Blob operation where this blob was the destination blob. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copySource?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: CopyStatusType;
  /** When a blob is leased, specifies whether the lease is of infinite or fixed duration. */
  leaseDuration?: LeaseDurationType;
  /** Lease state of the blob. */
  leaseState?: LeaseStateType;
  /** The current lease status of the blob. */
  leaseStatus?: LeaseStatusType;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** The value of this header indicates whether version of this blob is a current version, see also x-ms-version-id header. */
  isCurrentVersion?: boolean;
  /** Indicates that the service supports requests for partial blob content. */
  acceptRanges?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The number of committed blocks present in the blob. This header is returned only for append blobs. */
  blobCommittedBlockCount?: number;
  /** The value of this header is set to true if the blob data and application metadata are completely encrypted using the specified algorithm. Otherwise, the value is set to false (when the blob is unencrypted, or if only parts of the blob/application metadata are encrypted). */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** If the blob has a MD5 hash, and if request contains range header (Range or x-ms-range), this response header is returned with the value of the whole blob's MD5 value. This value may or may not be equal to the value returned in Content-MD5 header, with the latter calculated from the requested range */
  blobContentMD5?: Uint8Array;
  /** The number of tags associated with the blob */
  tagCount?: number;
  /** If this blob has been sealed */
  isSealed?: boolean;
  /** UTC date/time value generated by the service that indicates the time at which the blob was last read or written to */
  lastAccessed?: Date;
  /** UTC date/time value generated by the service that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiresOn?: Date;
  /** Indicates immutability policy mode. */
  immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
  /** Indicates if a legal hold is present on the blob. */
  legalHold?: boolean;
  /** Error Code */
  errorCode?: string;
  /** If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to true, then the request returns a crc64 for the range, as long as the range size is less than or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is specified in the same request, it will fail with 400(Bad Request). */
  contentCrc64?: Uint8Array;
}

/** Optional parameters. */
export declare interface BlobDownloadOptionalParams
  extends coreHttp.OperationOptions {
  /** Parameter group */
  leaseAccessConditions?: LeaseAccessConditions;
  /** Parameter group */
  modifiedAccessConditions?: ModifiedAccessConditionsModel;
  /** Parameter group */
  cpkInfo?: CpkInfo;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
  /** The snapshot parameter is an opaque DateTime value that, when present, specifies the blob snapshot to retrieve. For more information on working with blob snapshots, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating a Snapshot of a Blob.</a> */
  snapshot?: string;
  /** The version id parameter is an opaque DateTime value that, when present, specifies the version of the blob to operate on. It's for service version 2019-10-10 and newer. */
  versionId?: string;
  /** Return only the bytes of the blob in the specified range. */
  range?: string;
  /** When set to true and specified together with the Range, the service returns the MD5 hash for the range, as long as the range is less than or equal to 4 MB in size. */
  rangeGetContentMD5?: boolean;
  /** When set to true and specified together with the Range, the service returns the CRC64 hash for the range, as long as the range is less than or equal to 4 MB in size. */
  rangeGetContentCRC64?: boolean;
}

/**
 * Options to configure the {@link BlobClient.download} operation.
 */
export declare interface BlobDownloadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * An opaque DateTime string value that, when present, specifies the blob snapshot to retrieve.
   */
  snapshot?: string;
  /**
   * When this is set to true and download range of blob, the service returns the MD5 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   */
  rangeGetContentMD5?: boolean;
  /**
   * When this is set to true and download range of blob, the service returns the CRC64 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   */
  rangeGetContentCrc64?: boolean;
  /**
   * Conditions to meet when downloading blobs.
   */
  conditions?: BlobRequestConditions;
  /**
   * Call back to receive events on the progress of download operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional `FileClient.download()` request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   */
  maxRetryRequests?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/** Contains response data for the download operation. */
export declare type BlobDownloadResponseModel = BlobDownloadHeaders & {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobDownloadHeaders;
  };
};

/**
 * Contains response data for the {@link BlobClient.download} operation.
 */
export declare interface BlobDownloadResponseParsed
  extends BlobDownloadResponseModel {
  /**
   * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
   */
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];
  /**
   * Object Replication Policy Id of the destination blob.
   */
  objectReplicationDestinationPolicyId?: string;
}

/**
 * Option interface for the {@link BlobClient.downloadToBuffer} operation.
 */
export declare interface BlobDownloadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * blockSize is the data every request trying to download.
   * Must be greater than or equal to 0.
   * If set to 0 or undefined, blockSize will automatically calculated according to the blob size.
   */
  blockSize?: number;
  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original block download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
   * from the broken point, until the requested block has been successfully downloaded or
   * maxRetryRequestsPerBlock is reached.
   *
   * Default value is 5, please set a larger value when in poor network.
   */
  maxRetryRequestsPerBlock?: number;
  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;
  /**
   * Concurrency of parallel download.
   */
  concurrency?: number;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.exists} operation.
 */
export declare interface BlobExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Conditions to meet.
   */
  conditions?: BlobRequestConditions;
}

/**
 * An interface representing BlobFlatListSegment.
 */
export declare interface BlobFlatListSegment {
  blobItems: BlobItem[];
}

export declare interface BlobFlatListSegmentModel {
  blobItems: BlobItemInternal[];
}

/**
 * Options to configure {@link BlobClient.generateSasUrl} operation.
 */
export declare interface BlobGenerateSasUrlOptions
  extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: BlobSASPermissions;
}

/** Defines headers for Blob_getProperties operation. */
export declare interface BlobGetPropertiesHeaders {
  /** Returns the date and time the blob was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** Returns the date and time the blob was created. */
  createdOn?: Date;
  metadata?: {
    [propertyName: string]: string;
  };
  /** Optional. Only valid when Object Replication is enabled for the storage container and on the destination blob of the replication. */
  objectReplicationPolicyId?: string;
  /** Optional. Only valid when Object Replication is enabled for the storage container and on the source blob of the replication. When retrieving this header, it will return the header with the policy id and rule id (e.g. x-ms-or-policyid_ruleid), and the value will be the status of the replication (e.g. complete, failed). */
  objectReplicationRules?: {
    [propertyName: string]: string;
  };
  /** The blob's type. */
  blobType?: BlobType;
  /** Conclusion time of the last attempted Copy Blob operation where this blob was the destination blob. This value can specify the time of a completed, aborted, or failed copy attempt. This header does not appear if a copy is pending, if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copyCompletedOn?: Date;
  /** Only appears when x-ms-copy-status is failed or pending. Describes the cause of the last fatal or non-fatal copy operation failure. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyStatusDescription?: string;
  /** String identifier for this copy operation. Use with Get Blob Properties to check the status of this copy operation, or pass to Abort Copy Blob to abort a pending copy. */
  copyId?: string;
  /** Contains the number of bytes copied and the total bytes in the source in the last attempted Copy Blob operation where this blob was the destination blob. Can show between 0 and Content-Length bytes copied. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyProgress?: string;
  /** URL up to 2 KB in length that specifies the source blob or file used in the last attempted Copy Blob operation where this blob was the destination blob. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copySource?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: CopyStatusType;
  /** Included if the blob is incremental copy blob. */
  isIncrementalCopy?: boolean;
  /** Included if the blob is incremental copy blob or incremental copy snapshot, if x-ms-copy-status is success. Snapshot time of the last successful incremental copy snapshot for this blob. */
  destinationSnapshot?: string;
  /** When a blob is leased, specifies whether the lease is of infinite or fixed duration. */
  leaseDuration?: LeaseDurationType;
  /** Lease state of the blob. */
  leaseState?: LeaseStateType;
  /** The current lease status of the blob. */
  leaseStatus?: LeaseStatusType;
  /** The size of the blob in bytes. For a page blob, this header returns the value of the x-ms-blob-content-length header that is stored with the blob. */
  contentLength?: number;
  /** The content type specified for the blob. The default content type is 'application/octet-stream' */
  contentType?: string;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header returns the value that was specified for the Content-Encoding request header */
  contentEncoding?: string;
  /** This header returns the value that was specified for the 'x-ms-blob-content-disposition' header. The Content-Disposition response header field conveys additional information about how to process the response payload, and also can be used to attach additional metadata. For example, if set to attachment, it indicates that the user-agent should not display the response, but instead show a Save As dialog with a filename other than the blob name specified. */
  contentDisposition?: string;
  /** This header returns the value that was specified for the Content-Language request header. */
  contentLanguage?: string;
  /** This header is returned if it was previously specified for the blob. */
  cacheControl?: string;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Indicates that the service supports requests for partial blob content. */
  acceptRanges?: string;
  /** The number of committed blocks present in the blob. This header is returned only for append blobs. */
  blobCommittedBlockCount?: number;
  /** The value of this header is set to true if the blob data and application metadata are completely encrypted using the specified algorithm. Otherwise, the value is set to false (when the blob is unencrypted, or if only parts of the blob/application metadata are encrypted). */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the metadata. This header is only returned when the metadata was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** The tier of page blob on a premium storage account or tier of block blob on blob storage LRS accounts. For a list of allowed premium page blob tiers, see https://docs.microsoft.com/en-us/azure/virtual-machines/windows/premium-storage#features. For blob storage LRS accounts, valid values are Hot/Cool/Archive. */
  accessTier?: string;
  /** For page blobs on a premium storage account only. If the access tier is not explicitly set on the blob, the tier is inferred based on its content length and this header will be returned with true value. */
  accessTierInferred?: boolean;
  /** For blob storage LRS accounts, valid values are rehydrate-pending-to-hot/rehydrate-pending-to-cool. If the blob is being rehydrated and is not complete then this header is returned indicating that rehydrate is pending and also tells the destination tier. */
  archiveStatus?: string;
  /** The time the tier was changed on the object. This is only returned if the tier on the block blob was ever set. */
  accessTierChangedOn?: Date;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** The value of this header indicates whether version of this blob is a current version, see also x-ms-version-id header. */
  isCurrentVersion?: boolean;
  /** The number of tags associated with the blob */
  tagCount?: number;
  /** The time this blob will expire. */
  expiresOn?: Date;
  /** If this blob has been sealed */
  isSealed?: boolean;
  /** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. */
  rehydratePriority?: RehydratePriority;
  /** UTC date/time value generated by the service that indicates the time at which the blob was last read or written to */
  lastAccessed?: Date;
  /** UTC date/time value generated by the service that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiresOn?: Date;
  /** Indicates immutability policy mode. */
  immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
  /** Indicates if a legal hold is present on the blob. */
  legalHold?: boolean;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.getProperties} operation.
 */
export declare interface BlobGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting blob properties.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Contains response data for the {@link BlobClient.getProperties} operation.
 */
export declare interface BlobGetPropertiesResponse
  extends BlobGetPropertiesResponseModel {
  /**
   * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
   */
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];
  /**
   * Object Replication Policy Id of the destination blob.
   */
  objectReplicationDestinationPolicyId?: string;
}

/** Contains response data for the getProperties operation. */
export declare type BlobGetPropertiesResponseModel =
  BlobGetPropertiesHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlobGetPropertiesHeaders;
    };
  };

/** Defines headers for Blob_getTags operation. */
export declare interface BlobGetTagsHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.getTags} operation.
 */
export declare interface BlobGetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet for the blob to perform this operation.
   */
  conditions?: TagConditions & LeaseAccessConditions;
}

/**
 * Contains response data for the {@link BlobClient.getTags} operation.
 */
export declare type BlobGetTagsResponse = {
  tags: Tags;
} & BlobGetTagsHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: BlobGetTagsHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: BlobTags;
    };
  };

/**
 * An interface representing BlobHierarchyListSegment.
 */
export declare interface BlobHierarchyListSegment {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItem[];
}

export declare interface BlobHierarchyListSegmentModel {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItemInternal[];
}

/** Parameter group */
export declare interface BlobHTTPHeaders {
  /** Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request. */
  blobCacheControl?: string;
  /** Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request. */
  blobContentType?: string;
  /** Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded. */
  blobContentMD5?: Uint8Array;
  /** Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request. */
  blobContentEncoding?: string;
  /** Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request. */
  blobContentLanguage?: string;
  /** Optional. Sets the blob's Content-Disposition header. */
  blobContentDisposition?: string;
}

/**
 * Describe immutable policy for blob.
 */
export declare interface BlobImmutabilityPolicy {
  /**
   * Specifies the date time when the blobs immutability policy is set to expire.
   */
  expiriesOn?: Date;
  /**
   * Specifies the immutability policy mode to set on the blob.
   */
  policyMode?: BlobImmutabilityPolicyMode;
}

/** Defines values for BlobImmutabilityPolicyMode. */
export declare type BlobImmutabilityPolicyMode =
  | "Mutable"
  | "Unlocked"
  | "Locked";

/**
 * An Azure Storage blob
 */
export declare interface BlobItem {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  properties: BlobProperties;
  metadata?: {
    [propertyName: string]: string;
  };
  tags?: Tags;
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];
  hasVersionsOnly?: boolean;
}

/** An Azure Storage blob */
export declare interface BlobItemInternal {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  /** Properties of a blob */
  properties: BlobProperties;
  /** Dictionary of <string> */
  metadata?: {
    [propertyName: string]: string;
  };
  /** Blob tags */
  blobTags?: BlobTags;
  /** Dictionary of <string> */
  objectReplicationMetadata?: {
    [propertyName: string]: string;
  };
  /** Inactive root blobs which have any versions would have such tag with value true. */
  hasVersionsOnly?: boolean;
}

/**
 * A client that manages leases for a {@link ContainerClient} or a {@link BlobClient}.
 */
export declare class BlobLeaseClient {
  private _leaseId;
  private _url;
  private _containerOrBlobOperation;
  private _isContainer;
  /**
   * Gets the lease Id.
   *
   * @readonly
   */
  get leaseId(): string;
  /**
   * Gets the url.
   *
   * @readonly
   */
  get url(): string;
  /**
   * Creates an instance of BlobLeaseClient.
   * @param client - The client to make the lease operation requests.
   * @param leaseId - Initial proposed lease id.
   */
  constructor(client: ContainerClient | BlobClient, leaseId?: string);
  /**
   * Establishes and manages a lock on a container for delete operations, or on a blob
   * for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param duration - Must be between 15 to 60 seconds, or infinite (-1)
   * @param options - option to configure lease management operations.
   * @returns Response data for acquire lease operation.
   */
  acquireLease(
    duration: number,
    options?: LeaseOperationOptions
  ): Promise<LeaseOperationResponse>;
  /**
   * To change the ID of the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param proposedLeaseId - the proposed new lease Id.
   * @param options - option to configure lease management operations.
   * @returns Response data for change lease operation.
   */
  changeLease(
    proposedLeaseId: string,
    options?: LeaseOperationOptions
  ): Promise<LeaseOperationResponse>;
  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the container or the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param options - option to configure lease management operations.
   * @returns Response data for release lease operation.
   */
  releaseLease(
    options?: LeaseOperationOptions
  ): Promise<LeaseOperationResponse>;
  /**
   * To renew the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param options - Optional option to configure lease management operations.
   * @returns Response data for renew lease operation.
   */
  renewLease(options?: LeaseOperationOptions): Promise<Lease>;
  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param breakPeriod - Break period
   * @param options - Optional options to configure lease management operations.
   * @returns Response data for break lease operation.
   */
  breakLease(
    breakPeriod: number,
    options?: LeaseOperationOptions
  ): Promise<LeaseOperationResponse>;
}

export declare interface BlobPrefix {
  name: string;
}

/** Properties of a blob */
export declare interface BlobProperties {
  createdOn?: Date;
  lastModified: Date;
  etag: string;
  /** Size in bytes */
  contentLength?: number;
  contentType?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentMD5?: Uint8Array;
  contentDisposition?: string;
  cacheControl?: string;
  blobSequenceNumber?: number;
  blobType?: BlobType;
  leaseStatus?: LeaseStatusType;
  leaseState?: LeaseStateType;
  leaseDuration?: LeaseDurationType;
  copyId?: string;
  copyStatus?: CopyStatusType;
  copySource?: string;
  copyProgress?: string;
  copyCompletedOn?: Date;
  copyStatusDescription?: string;
  serverEncrypted?: boolean;
  incrementalCopy?: boolean;
  destinationSnapshot?: string;
  deletedOn?: Date;
  remainingRetentionDays?: number;
  accessTier?: AccessTier;
  accessTierInferred?: boolean;
  archiveStatus?: ArchiveStatus;
  customerProvidedKeySha256?: string;
  /** The name of the encryption scope under which the blob is encrypted. */
  encryptionScope?: string;
  accessTierChangedOn?: Date;
  tagCount?: number;
  expiresOn?: Date;
  isSealed?: boolean;
  /** If an object is in rehydrate pending state then this header is returned with priority of rehydrate. Valid values are High and Standard. */
  rehydratePriority?: RehydratePriority;
  lastAccessedOn?: Date;
  /** UTC date/time value generated by the service that indicates the time at which the blob immutability policy will expire. */
  immutabilityPolicyExpiresOn?: Date;
  /** Indicates immutability policy mode. */
  immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
  /** Indicates if a legal hold is present on the blob. */
  legalHold?: boolean;
}

/**
 * Options to query blob with Apache Arrow format. Only valid for {@link BlockBlobQueryOptions.outputTextConfiguration}.
 */
export declare interface BlobQueryArrowConfiguration {
  /**
   * Kind.
   */
  kind: "arrow";
  /**
   * List of {@link BlobQueryArrowField} describing the schema of the data.
   */
  schema: BlobQueryArrowField[];
}

/**
 * Describe a field in {@link BlobQueryArrowConfiguration}.
 */
export declare interface BlobQueryArrowField {
  /**
   * The type of the field.
   */
  type: BlobQueryArrowFieldType;
  /**
   * The name of the field.
   */
  name?: string;
  /**
   * The precision of the field. Required if type is "decimal".
   */
  precision?: number;
  /**
   * The scale of the field.  Required if type is is "decimal".
   */
  scale?: number;
}

/**
 * The type of a {@link BlobQueryArrowField}.
 */
export declare type BlobQueryArrowFieldType =
  | "int64"
  | "bool"
  | "timestamp[ms]"
  | "string"
  | "double"
  | "decimal";

/**
 * Options to query blob with CSV format.
 */
export declare interface BlobQueryCsvTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a CSV format blob.
   */
  kind: "csv";
  /**
   * Column separator. Default is ",".
   */
  columnSeparator?: string;
  /**
   * Field quote.
   */
  fieldQuote?: string;
  /**
   * Escape character.
   */
  escapeCharacter?: string;
  /**
   * Has headers. Default is false.
   */
  hasHeaders?: boolean;
}

/**
 * Blob query error type.
 */
export declare interface BlobQueryError {
  /**
   * Whether error is fatal. Fatal error will stop query.
   */
  isFatal: boolean;
  /**
   * Error name.
   */
  name: string;
  /**
   * Position in bytes of the query.
   */
  position: number;
  /**
   * Error description.
   */
  description: string;
}

/** Defines headers for Blob_query operation. */
export declare interface BlobQueryHeaders {
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  metadata?: {
    [propertyName: string]: string;
  };
  /** The number of bytes present in the response body. */
  contentLength?: number;
  /** The media type of the body of the response. For Download Blob this is 'application/octet-stream' */
  contentType?: string;
  /** Indicates the range of bytes returned in the event that the client requested a subset of the blob by setting the 'Range' request header. */
  contentRange?: string;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header returns the value that was specified for the Content-Encoding request header */
  contentEncoding?: string;
  /** This header is returned if it was previously specified for the blob. */
  cacheControl?: string;
  /** This header returns the value that was specified for the 'x-ms-blob-content-disposition' header. The Content-Disposition response header field conveys additional information about how to process the response payload, and also can be used to attach additional metadata. For example, if set to attachment, it indicates that the user-agent should not display the response, but instead show a Save As dialog with a filename other than the blob name specified. */
  contentDisposition?: string;
  /** This header returns the value that was specified for the Content-Language request header. */
  contentLanguage?: string;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** The blob's type. */
  blobType?: BlobType;
  /** Conclusion time of the last attempted Copy Blob operation where this blob was the destination blob. This value can specify the time of a completed, aborted, or failed copy attempt. This header does not appear if a copy is pending, if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copyCompletionTime?: Date;
  /** Only appears when x-ms-copy-status is failed or pending. Describes the cause of the last fatal or non-fatal copy operation failure. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyStatusDescription?: string;
  /** String identifier for this copy operation. Use with Get Blob Properties to check the status of this copy operation, or pass to Abort Copy Blob to abort a pending copy. */
  copyId?: string;
  /** Contains the number of bytes copied and the total bytes in the source in the last attempted Copy Blob operation where this blob was the destination blob. Can show between 0 and Content-Length bytes copied. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List */
  copyProgress?: string;
  /** URL up to 2 KB in length that specifies the source blob or file used in the last attempted Copy Blob operation where this blob was the destination blob. This header does not appear if this blob has never been the destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List. */
  copySource?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: CopyStatusType;
  /** When a blob is leased, specifies whether the lease is of infinite or fixed duration. */
  leaseDuration?: LeaseDurationType;
  /** Lease state of the blob. */
  leaseState?: LeaseStateType;
  /** The current lease status of the blob. */
  leaseStatus?: LeaseStatusType;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** Indicates that the service supports requests for partial blob content. */
  acceptRanges?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The number of committed blocks present in the blob. This header is returned only for append blobs. */
  blobCommittedBlockCount?: number;
  /** The value of this header is set to true if the blob data and application metadata are completely encrypted using the specified algorithm. Otherwise, the value is set to false (when the blob is unencrypted, or if only parts of the blob/application metadata are encrypted). */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** If the blob has a MD5 hash, and if request contains range header (Range or x-ms-range), this response header is returned with the value of the whole blob's MD5 value. This value may or may not be equal to the value returned in Content-MD5 header, with the latter calculated from the requested range */
  blobContentMD5?: Uint8Array;
  /** Error Code */
  errorCode?: string;
  /** If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to true, then the request returns a crc64 for the range, as long as the range size is less than or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is specified in the same request, it will fail with 400(Bad Request). */
  contentCrc64?: Uint8Array;
}

/**
 * Options to query blob with JSON format.
 */
export declare interface BlobQueryJsonTextConfiguration {
  /**
   * Record separator.
   */
  recordSeparator: string;
  /**
   * Query for a JSON format blob.
   */
  kind: "json";
}

/**
 * Options to query blob with Parquet format. Only valid for {@link BlockBlobQueryOptions.inputTextConfiguration}.
 */
export declare interface BlobQueryParquetConfiguration {
  /**
   * Kind.
   */
  kind: "parquet";
}

/** Contains response data for the query operation. */
export declare type BlobQueryResponseModel = BlobQueryHeaders & {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobQueryHeaders;
  };
};

/**
 * Options to configure Blob - Release Lease operation.
 */
export declare interface BlobReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Renew Lease operation.
 */
export declare interface BlobRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease of a blob.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * standard HTTP conditional headers, tags condition and lease condition
 */
export declare interface BlobRequestConditions
  extends ModifiedAccessConditions,
    LeaseAccessConditions {}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a blob. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class BlobSASPermissions {
  /**
   * Creates a {@link BlobSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  static parse(permissions: string): BlobSASPermissions;
  /**
   * Creates a {@link BlobSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @param permissionLike -
   */
  static from(permissionLike: BlobSASPermissionsLike): BlobSASPermissions;
  /**
   * Specifies Read access granted.
   */
  read: boolean;
  /**
   * Specifies Add access granted.
   */
  add: boolean;
  /**
   * Specifies Create access granted.
   */
  create: boolean;
  /**
   * Specifies Write access granted.
   */
  write: boolean;
  /**
   * Specifies Delete access granted.
   */
  delete: boolean;
  /**
   * Specifies Delete version access granted.
   */
  deleteVersion: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag: boolean;
  /**
   * Specifies Move access granted.
   */
  move: boolean;
  /**
   * Specifies Execute access granted.
   */
  execute: boolean;
  /**
   * Specifies SetImmutabilityPolicy access granted.
   */
  setImmutabilityPolicy: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete: boolean;
  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * @returns A string which represents the BlobSASPermissions
   */
  toString(): string;
}

/**
 * A type that looks like a Blob SAS permission.
 * Used in {@link BlobSASPermissions} to parse SAS permissions from raw objects.
 */
export declare interface BlobSASPermissionsLike {
  /**
   * Specifies Read access granted.
   */
  read?: boolean;
  /**
   * Specifies Add access granted.
   */
  add?: boolean;
  /**
   * Specifies Create access granted.
   */
  create?: boolean;
  /**
   * Specifies Write access granted.
   */
  write?: boolean;
  /**
   * Specifies Delete access granted.
   */
  delete?: boolean;
  /**
   * Specifies Delete version access granted.
   */
  deleteVersion?: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag?: boolean;
  /**
   * Specifies Move access granted.
   */
  move?: boolean;
  /**
   * Specifies Execute access granted.
   */
  execute?: boolean;
  /**
   * Specifies SetImmutabilityPolicy access granted.
   */
  setImmutabilityPolicy?: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete?: boolean;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobSASSignatureValues is used to help generating Blob service SAS tokens for containers or blobs.
 */
export declare interface BlobSASSignatureValues {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;
  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;
  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;
  /**
   * Optional only when identifier is provided.
   * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
   * being accessed for help constructing the permissions string.
   */
  permissions?: BlobSASPermissions | ContainerSASPermissions | string;
  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;
  /**
   * The name of the container the SAS user may access.
   */
  containerName: string;
  /**
   * Optional. The blob name of the SAS user may access. Required if snapshotTime or versionId is provided.
   */
  blobName?: string;
  /**
   * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
   */
  snapshotTime?: string;
  /**
   * Optional. VersionId of the blob version the SAS user may access. Only supported from API version 2019-10-10.
   */
  versionId?: string;
  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;
  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;
  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;
  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;
  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
  /**
   * Optional. Beginning in version 2020-02-10, specifies the Authorized AAD Object ID in GUID format. The AAD Object ID of a user
   * authorized by the owner of the user delegation key to perform the action granted by the SAS. The Azure Storage service will
   * ensure that the owner of the user delegation key has the required permissions before granting access but no additional permission
   * check for the user specified in this value will be performed. This is only used for User Delegation SAS.
   */
  preauthorizedAgentObjectId?: string;
  /**
   * Optional. Beginning in version 2020-02-10, this is a GUID value that will be logged in the storage diagnostic logs and can be used to
   * correlate SAS generation with storage resource access. This is only used for User Delegation SAS.
   */
  correlationId?: string;
}

/**
 * A BlobServiceClient represents a Client to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
 */
export declare class BlobServiceClient extends StorageClient {
  /**
   * serviceContext provided by protocol layer.
   */
  private serviceContext;
  /**
   *
   * Creates an instance of BlobServiceClient from connection string.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  static fromConnectionString(
    connectionString: string,
    options?: StoragePipelineOptions
  ): BlobServiceClient;
  /**
   * Creates an instance of BlobServiceClient.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   *
   * Example using DefaultAzureCredential from `@azure/identity`:
   *
   * ```js
   * const account = "<storage account name>";
   *
   * const defaultAzureCredential = new DefaultAzureCredential();
   *
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   defaultAzureCredential
   * );
   * ```
   *
   * Example using an account name/key:
   *
   * ```js
   * const account = "<storage account name>"
   * const sharedKeyCredential = new StorageSharedKeyCredential(account, "<account key>");
   *
   * const blobServiceClient = new BlobServiceClient(
   *   `https://${account}.blob.core.windows.net`,
   *   sharedKeyCredential
   * );
   * ```
   */
  constructor(
    url: string,
    credential?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobServiceClient.
   *
   * @param url - A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a {@link ContainerClient} object
   *
   * @param containerName - A container name
   * @returns A new ContainerClient object for the given container name.
   *
   * Example usage:
   *
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * ```
   */
  getContainerClient(containerName: string): ContainerClient;
  /**
   * Create a Blob container. @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param containerName - Name of the container to create.
   * @param options - Options to configure Container Create operation.
   * @returns Container creation response and the corresponding container client.
   */
  createContainer(
    containerName: string,
    options?: ContainerCreateOptions
  ): Promise<{
    containerClient: ContainerClient;
    containerCreateResponse: ContainerCreateResponse;
  }>;
  /**
   * Deletes a Blob container.
   *
   * @param containerName - Name of the container to delete.
   * @param options - Options to configure Container Delete operation.
   * @returns Container deletion response.
   */
  deleteContainer(
    containerName: string,
    options?: ContainerDeleteMethodOptions
  ): Promise<ContainerDeleteResponse>;
  /**
   * Restore a previously deleted Blob container.
   * This API is only functional if Container Soft Delete is enabled for the storage account associated with the container.
   *
   * @param deletedContainerName - Name of the previously deleted container.
   * @param deletedContainerVersion - Version of the previously deleted container, used to uniquely identify the deleted container.
   * @param options - Options to configure Container Restore operation.
   * @returns Container deletion response.
   */
  undeleteContainer(
    deletedContainerName: string,
    deletedContainerVersion: string,
    options?: ServiceUndeleteContainerOptions
  ): Promise<{
    containerClient: ContainerClient;
    containerUndeleteResponse: ContainerUndeleteResponse;
  }>;
  /**
   * Rename an existing Blob Container.
   *
   * @param sourceContainerName - The name of the source container.
   * @param destinationContainerName - The new name of the container.
   * @param options - Options to configure Container Rename operation.
   */
  private renameContainer;
  /**
   * Gets the properties of a storage account’s Blob service, including properties
   * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
   *
   * @param options - Options to the Service Get Properties operation.
   * @returns Response data for the Service Get Properties operation.
   */
  getProperties(
    options?: ServiceGetPropertiesOptions
  ): Promise<ServiceGetPropertiesResponse>;
  /**
   * Sets properties for a storage account’s Blob service endpoint, including properties
   * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties
   *
   * @param properties -
   * @param options - Options to the Service Set Properties operation.
   * @returns Response data for the Service Set Properties operation.
   */
  setProperties(
    properties: BlobServiceProperties,
    options?: ServiceSetPropertiesOptions
  ): Promise<ServiceSetPropertiesResponse>;
  /**
   * Retrieves statistics related to replication for the Blob service. It is only
   * available on the secondary location endpoint when read-access geo-redundant
   * replication is enabled for the storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats
   *
   * @param options - Options to the Service Get Statistics operation.
   * @returns Response data for the Service Get Statistics operation.
   */
  getStatistics(
    options?: ServiceGetStatisticsOptions
  ): Promise<ServiceGetStatisticsResponse>;
  /**
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-account-information
   *
   * @param options - Options to the Service Get Account Info operation.
   * @returns Response data for the Service Get Account Info operation.
   */
  getAccountInfo(
    options?: ServiceGetAccountInfoOptions
  ): Promise<ServiceGetAccountInfoResponse>;
  /**
   * Returns a list of the containers under the specified account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
   *
   * @param marker - A string value that identifies the portion of
   *                        the list of containers to be returned with the next listing operation. The
   *                        operation returns the continuationToken value within the response body if the
   *                        listing operation did not return all containers remaining to be listed
   *                        with the current page. The continuationToken value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param options - Options to the Service List Container Segment operation.
   * @returns Response data for the Service List Container Segment operation.
   */
  private listContainersSegment;
  /**
   * The Filter Blobs operation enables callers to list blobs across all containers whose tags
   * match a given search expression. Filter blobs searches across all containers within a
   * storage account but can be scoped within the expression to a single container.
   *
   * @param tagFilterSqlExpression - The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                        The given expression must evaluate to true for a blob to be returned in the results.
   *                                        The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                        however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the continuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The continuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to find blobs by tags.
   */
  private findBlobsByTagsSegment;
  /**
   * Returns an AsyncIterableIterator for ServiceFindBlobsByTagsSegmentResponse.
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the continuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The continuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to find blobs by tags.
   */
  private findBlobsByTagsSegments;
  /**
   * Returns an AsyncIterableIterator for blobs.
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param options - Options to findBlobsByTagsItems.
   */
  private findBlobsByTagsItems;
  /**
   * Returns an async iterable iterator to find all blobs with specified tag
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const blob of blobServiceClient.findBlobsByTags("tagkey='tagvalue'")) {
   *   console.log(`Blob ${i++}: ${container.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = blobServiceClient.findBlobsByTags("tagkey='tagvalue'");
   * let blobItem = await iter.next();
   * while (!blobItem.done) {
   *   console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *   blobItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of blobServiceClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 20 })) {
   *   if (response.blobs) {
   *     for (const blob of response.blobs) {
   *       console.log(`Blob ${i++}: ${blob.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = blobServiceClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 blob names
   * if (response.blobs) {
   *   for (const blob of response.blobs) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = blobServiceClient
   *   .findBlobsByTags("tagkey='tagvalue'")
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints blob names
   * if (response.blobs) {
   *   for (const blob of response.blobs) {
   *      console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   * ```
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param options - Options to find blobs by tags.
   */
  findBlobsByTags(
    tagFilterSqlExpression: string,
    options?: ServiceFindBlobByTagsOptions
  ): PagedAsyncIterableIterator<
    FilterBlobItem,
    ServiceFindBlobsByTagsSegmentResponse
  >;
  /**
   * Returns an AsyncIterableIterator for ServiceListContainersSegmentResponses
   *
   * @param marker - A string value that identifies the portion of
   *                        the list of containers to be returned with the next listing operation. The
   *                        operation returns the continuationToken value within the response body if the
   *                        listing operation did not return all containers remaining to be listed
   *                        with the current page. The continuationToken value can be used as the value for
   *                        the marker parameter in a subsequent call to request the next page of list
   *                        items. The marker value is opaque to the client.
   * @param options - Options to list containers operation.
   */
  private listSegments;
  /**
   * Returns an AsyncIterableIterator for Container Items
   *
   * @param options - Options to list containers operation.
   */
  private listItems;
  /**
   * Returns an async iterable iterator to list all the containers
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the containers in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const container of blobServiceClient.listContainers()) {
   *   console.log(`Container ${i++}: ${container.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = blobServiceClient.listContainers();
   * let containerItem = await iter.next();
   * while (!containerItem.done) {
   *   console.log(`Container ${i++}: ${containerItem.value.name}`);
   *   containerItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
   *   if (response.containerItems) {
   *     for (const container of response.containerItems) {
   *       console.log(`Container ${i++}: ${container.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 container names
   * if (response.containerItems) {
   *   for (const container of response.containerItems) {
   *     console.log(`Container ${i++}: ${container.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = blobServiceClient
   *   .listContainers()
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 container names
   * if (response.containerItems) {
   *   for (const container of response.containerItems) {
   *      console.log(`Container ${i++}: ${container.name}`);
   *   }
   * }
   * ```
   *
   * @param options - Options to list containers.
   * @returns An asyncIterableIterator that supports paging.
   */
  listContainers(
    options?: ServiceListContainersOptions
  ): PagedAsyncIterableIterator<
    ContainerItem,
    ServiceListContainersSegmentResponse
  >;
  /**
   * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
   *
   * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
   * bearer token authentication.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
   *
   * @param startsOn -      The start time for the user delegation SAS. Must be within 7 days of the current time
   * @param expiresOn -     The end time for the user delegation SAS. Must be within 7 days of the current time
   */
  getUserDelegationKey(
    startsOn: Date,
    expiresOn: Date,
    options?: ServiceGetUserDelegationKeyOptions
  ): Promise<ServiceGetUserDelegationKeyResponse>;
  /**
   * Creates a BlobBatchClient object to conduct batch operations.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @returns A new BlobBatchClient object for this service.
   */
  getBlobBatchClient(): BlobBatchClient;
  /**
   * Only available for BlobServiceClient constructed with a shared key credential.
   *
   * Generates a Blob account Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-account-sas
   *
   * @param expiresOn - Optional. The time at which the shared access signature becomes invalid. Default to an hour later if not provided.
   * @param permissions - Specifies the list of permissions to be associated with the SAS.
   * @param resourceTypes - Specifies the resource types associated with the shared access signature.
   * @param options - Optional parameters.
   * @returns An account SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  generateAccountSasUrl(
    expiresOn?: Date,
    permissions?: AccountSASPermissions,
    resourceTypes?: string,
    options?: ServiceGenerateAccountSasUrlOptions
  ): string;
}

/** Storage Service Properties. */
export declare interface BlobServiceProperties {
  /** Azure Analytics Logging settings. */
  blobAnalyticsLogging?: Logging;
  /** a summary of request statistics grouped by API in hour or minute aggregates for blobs */
  hourMetrics?: Metrics;
  /** a summary of request statistics grouped by API in hour or minute aggregates for blobs */
  minuteMetrics?: Metrics;
  /** The set of CORS rules. */
  cors?: CorsRule[];
  /** The default version to use for requests to the Blob service if an incoming request's version is not specified. Possible values include version 2008-10-27 and all more recent versions */
  defaultServiceVersion?: string;
  /** the retention policy which determines how long the associated data should persist */
  deleteRetentionPolicy?: RetentionPolicy;
  /** The properties that enable an account to host a static website */
  staticWebsite?: StaticWebsite;
}

/** Stats for the storage service. */
export declare interface BlobServiceStatistics {
  /** Geo-Replication information for the Secondary Storage Service */
  geoReplication?: GeoReplication;
}

/** Defines headers for Blob_setHttpHeaders operation. */
export declare interface BlobSetHTTPHeadersHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.setHTTPHeaders} operation.
 */
export declare interface BlobSetHTTPHeadersOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob HTTP headers.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/** Contains response data for the setHttpHeaders operation. */
export declare type BlobSetHTTPHeadersResponse = BlobSetHTTPHeadersHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobSetHTTPHeadersHeaders;
  };
};

/** Defines headers for Blob_setImmutabilityPolicy operation. */
export declare interface BlobSetImmutabilityPolicyHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Indicates the time the immutability policy will expire. */
  immutabilityPolicyExpiry?: Date;
  /** Indicates immutability policy mode. */
  immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
}

/**
 * Options for setting immutability policy {@link BlobClient.setImmutabilityPolicy} operation.
 */
export declare interface BlobSetImmutabilityPolicyOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  modifiedAccessCondition?: ModificationConditions;
}

/** Contains response data for the setImmutabilityPolicy operation. */
export declare type BlobSetImmutabilityPolicyResponse =
  BlobSetImmutabilityPolicyHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlobSetImmutabilityPolicyHeaders;
    };
  };

/** Defines headers for Blob_setLegalHold operation. */
export declare interface BlobSetLegalHoldHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Indicates if the blob has a legal hold. */
  legalHold?: boolean;
}

/**
 * Options for setting legal hold {@link BlobClient.setLegalHold} operation.
 */
export declare interface BlobSetLegalHoldOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the setLegalHold operation. */
export declare type BlobSetLegalHoldResponse = BlobSetLegalHoldHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobSetLegalHoldHeaders;
  };
};

/** Defines headers for Blob_setMetadata operation. */
export declare interface BlobSetMetadataHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the metadata. This header is only returned when the metadata was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.setMetadata} operation.
 */
export declare interface BlobSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob metadata.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the setMetadata operation. */
export declare type BlobSetMetadataResponse = BlobSetMetadataHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobSetMetadataHeaders;
  };
};

/** Defines headers for Blob_setTags operation. */
export declare interface BlobSetTagsHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.setTags} operation.
 */
export declare interface BlobSetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet for the blob to perform this operation.
   */
  conditions?: TagConditions & LeaseAccessConditions;
}

/** Contains response data for the setTags operation. */
export declare type BlobSetTagsResponse = BlobSetTagsHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobSetTagsHeaders;
  };
};

/** Defines headers for Blob_setTier operation. */
export declare interface BlobSetTierHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and newer. */
  version?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.setAccessTier} operation.
 */
export declare interface BlobSetTierOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions & TagConditions;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   */
  rehydratePriority?: RehydratePriority;
}

/** Contains response data for the setTier operation. */
export declare type BlobSetTierResponse = BlobSetTierHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobSetTierHeaders;
  };
};

/** Defines headers for Blob_startCopyFromURL operation. */
export declare interface BlobStartCopyFromURLHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** String identifier for this copy operation. Use with Get Blob Properties to check the status of this copy operation, or pass to Abort Copy Blob to abort a pending copy. */
  copyId?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: CopyStatusType;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export declare interface BlobStartCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the blob that are being copied.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   */
  rehydratePriority?: RehydratePriority;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Overrides the sealed state of the destination blob. Default true.
   */
  sealBlob?: boolean;
}

/** Contains response data for the startCopyFromURL operation. */
export declare type BlobStartCopyFromURLResponse =
  BlobStartCopyFromURLHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlobStartCopyFromURLHeaders;
    };
  };

/**
 * Options to configure the {@link BlobClient.syncCopyFromURL} operation.
 */
export declare interface BlobSyncCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Specify the md5 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to encrypt the data provided in the request. If not specified, encryption is performed with the default account encryption scope.  For more information, see Encryption at Rest for Azure Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Default 'REPLACE'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
   */
  copySourceTags?: BlobCopySourceTags;
}

export declare interface BlobTag {
  key: string;
  value: string;
}

/** Blob tags */
export declare interface BlobTags {
  blobTagSet: BlobTag[];
}

/** Defines values for BlobType. */
export declare type BlobType = "BlockBlob" | "PageBlob" | "AppendBlob";

/** Defines headers for Blob_undelete operation. */
export declare interface BlobUndeleteHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated. */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobClient.undelete} operation.
 */
export declare interface BlobUndeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/** Contains response data for the undelete operation. */
export declare type BlobUndeleteResponse = BlobUndeleteHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlobUndeleteHeaders;
  };
};

/**
 * Response type for {@link BlockBlobClient.uploadFile}, {@link BlockBlobClient.uploadStream}, and
 * {@link BlockBlobClient.uploadBrowserDate}.
 */
export declare type BlobUploadCommonResponse = BlockBlobUploadHeaders & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse;
};

/** Represents a single block in a block blob.  It describes the block's ID and size. */
export declare interface Block {
  /** The base64 encoded block ID. */
  name: string;
  /** The block size in bytes. */
  size: number;
}

/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 */
export declare class BlockBlobClient extends BlobClient {
  /**
   * blobContext provided by protocol layer.
   *
   * Note. Ideally BlobClient should set BlobClient.blobContext to protected. However, API
   * extractor has issue blocking that. Here we redecelare _blobContext in BlockBlobClient.
   */
  private _blobContext;
  /**
   * blockBlobContext provided by protocol layer.
   */
  private blockBlobContext;
  /**
   *
   * Creates an instance of BlockBlobClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param blobName - Blob name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  withSnapshot(snapshot: string): BlockBlobClient;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Quick query for a JSON or CSV formatted blob.
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Query and convert a blob to a string
   * const queryBlockBlobResponse = await blockBlobClient.query("select * from BlobStorage");
   * const downloaded = (await streamToBuffer(queryBlockBlobResponse.readableStreamBody)).toString();
   * console.log("Query blob content:", downloaded);
   *
   * async function streamToBuffer(readableStream) {
   *   return new Promise((resolve, reject) => {
   *     const chunks = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data instanceof Buffer ? data : Buffer.from(data));
   *     });
   *     readableStream.on("end", () => {
   *       resolve(Buffer.concat(chunks));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * @param query -
   * @param options -
   */
  query(
    query: string,
    options?: BlockBlobQueryOptions
  ): Promise<BlobDownloadResponseModel>;
  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use {@link stageBlock} and {@link commitBlockList}.
   *
   * This is a non-parallel uploading method, please use {@link uploadFile},
   * {@link uploadStream} or {@link uploadBrowserData} for better performance
   * with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param options - Options to the Block Blob Upload operation.
   * @returns Response data for the Block Blob Upload operation.
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  upload(
    body: HttpRequestBody,
    contentLength: number,
    options?: BlockBlobUploadOptions
  ): Promise<BlockBlobUploadResponse>;
  /**
   * Creates a new Block Blob where the contents of the blob are read from a given URL.
   * This API is supported beginning with the 2020-04-08 version. Partial updates
   * are not supported with Put Blob from URL; the content of an existing blob is overwritten with
   * the content of the new blob.  To perform partial updates to a block blob’s contents using a
   * source URL, use {@link stageBlockFromURL} and {@link commitBlockList}.
   *
   * @param sourceURL - Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param options - Optional parameters.
   */
  syncUploadFromURL(
    sourceURL: string,
    options?: BlockBlobSyncUploadFromURLOptions
  ): Promise<BlockBlobPutBlobFromUrlResponse>;
  /**
   * Uploads the specified block to the block blob's "staging area" to be later
   * committed by a call to commitBlockList.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block
   *
   * @param blockId - A 64-byte value that is base64-encoded
   * @param body - Data to upload to the staging area.
   * @param contentLength - Number of bytes to upload.
   * @param options - Options to the Block Blob Stage Block operation.
   * @returns Response data for the Block Blob Stage Block operation.
   */
  stageBlock(
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options?: BlockBlobStageBlockOptions
  ): Promise<BlockBlobStageBlockResponse>;
  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
   *
   * @param blockId - A 64-byte value that is base64-encoded
   * @param sourceURL - Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param offset - From which position of the blob to download, greater than or equal to 0
   * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
   * @param options - Options to the Block Blob Stage Block From URL operation.
   * @returns Response data for the Block Blob Stage Block From URL operation.
   */
  stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset?: number,
    count?: number,
    options?: BlockBlobStageBlockFromURLOptions
  ): Promise<BlockBlobStageBlockFromURLResponse>;
  /**
   * Writes a blob by specifying the list of block IDs that make up the blob.
   * In order to be written as part of a blob, a block must have been successfully written
   * to the server in a prior {@link stageBlock} operation. You can call {@link commitBlockList} to
   * update a blob by uploading only those blocks that have changed, then committing the new and existing
   * blocks together. Any blocks not specified in the block list and permanently deleted.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block-list
   *
   * @param blocks -  Array of 64-byte value that is base64-encoded
   * @param options - Options to the Block Blob Commit Block List operation.
   * @returns Response data for the Block Blob Commit Block List operation.
   */
  commitBlockList(
    blocks: string[],
    options?: BlockBlobCommitBlockListOptions
  ): Promise<BlockBlobCommitBlockListResponse>;
  /**
   * Returns the list of blocks that have been uploaded as part of a block blob
   * using the specified block list filter.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-block-list
   *
   * @param listType - Specifies whether to return the list of committed blocks,
   *                                        the list of uncommitted blocks, or both lists together.
   * @param options - Options to the Block Blob Get Block List operation.
   * @returns Response data for the Block Blob Get Block List operation.
   */
  getBlockList(
    listType: BlockListType,
    options?: BlockBlobGetBlockListOptions
  ): Promise<BlockBlobGetBlockListResponse>;
  /**
   * Uploads a Buffer(Node.js)/Blob(browsers)/ArrayBuffer/ArrayBufferView object to a BlockBlob.
   *
   * When data length is no more than the specifiled {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
   * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
   * to commit the block list.
   *
   * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   * @param data - Buffer(Node.js), Blob, ArrayBuffer or ArrayBufferView
   * @param options -
   */
  uploadData(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options?: BlockBlobParallelUploadOptions
  ): Promise<BlobUploadCommonResponse>;
  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
   *
   * When buffer length lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call
   * {@link commitBlockList} to commit the block list.
   *
   * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   * @deprecated Use {@link uploadData} instead.
   *
   * @param browserData - Blob, File, ArrayBuffer or ArrayBufferView
   * @param options - Options to upload browser data.
   * @returns Response data for the Blob Upload operation.
   */
  uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options?: BlockBlobParallelUploadOptions
  ): Promise<BlobUploadCommonResponse>;
  /**
   *
   * Uploads data to block blob. Requires a bodyFactory as the data source,
   * which need to return a {@link HttpRequestBody} object with the offset and size provided.
   *
   * When data length is no more than the specified {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
   * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
   * to commit the block list.
   *
   * @param bodyFactory -
   * @param size - size of the data to upload.
   * @param options - Options to Upload to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  private uploadSeekableInternal;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file in blocks to a block blob.
   *
   * When file size lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param filePath - Full path of local file
   * @param options - Options to Upload to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  uploadFile(
    filePath: string,
    options?: BlockBlobParallelUploadOptions
  ): Promise<BlobUploadCommonResponse>;
  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a Node.js Readable stream into block blob.
   *
   * PERFORMANCE IMPROVEMENT TIPS:
   * * Input stream highWaterMark is better to set a same value with bufferSize
   *    parameter, which will avoid Buffer.concat() operations.
   *
   * @param stream - Node.js Readable stream
   * @param bufferSize - Size of every buffer allocated, also the block size in the uploaded block blob. Default value is 8MB
   * @param maxConcurrency -  Max concurrency indicates the max number of buffers that can be allocated,
   *                                 positive correlation with max uploading concurrency. Default value is 5
   * @param options - Options to Upload Stream to Block Blob operation.
   * @returns Response data for the Blob Upload operation.
   */
  uploadStream(
    stream: Readable,
    bufferSize?: number,
    maxConcurrency?: number,
    options?: BlockBlobUploadStreamOptions
  ): Promise<BlobUploadCommonResponse>;
}

/** Defines headers for BlockBlob_commitBlockList operation. */
export declare interface BlockBlobCommitBlockListHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** This header is returned so that the client can check for message content integrity. This header refers to the content of the request, meaning, in this case, the list of blocks, and not the content of the blob itself. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. This header refers to the content of the request, meaning, in this case, the list of blocks, and not the content of the blob itself. */
  xMsContentCrc64?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link BlockBlobClient.commitBlockList} operation.
 */
export declare interface BlockBlobCommitBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when committing the block list.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when committing block list.
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when committing block list.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/** Contains response data for the commitBlockList operation. */
export declare type BlockBlobCommitBlockListResponse =
  BlockBlobCommitBlockListHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlockBlobCommitBlockListHeaders;
    };
  };

/** Defines headers for BlockBlob_getBlockList operation. */
export declare interface BlockBlobGetBlockListHeaders {
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** The media type of the body of the response. For Get Block List this is 'application/xml' */
  contentType?: string;
  /** The size of the blob in bytes. */
  blobContentLength?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link BlockBlobClient.getBlockList} operation.
 */
export declare interface BlockBlobGetBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions & TagConditions;
}

/** Contains response data for the getBlockList operation. */
export declare type BlockBlobGetBlockListResponse =
  BlockBlobGetBlockListHeaders &
    BlockList & {
      /** The underlying HTTP response. */
      _response: coreHttp.HttpResponse & {
        /** The response body as text (string format) */
        bodyAsText: string;
        /** The response body as parsed JSON or XML */
        parsedBody: BlockList;
        /** The parsed HTTP response headers. */
        parsedHeaders: BlockBlobGetBlockListHeaders;
      };
    };

/**
 * Option interface for {@link BlockBlobClient.uploadFile} and {@link BlockBlobClient.uploadSeekableStream}.
 */
export declare interface BlockBlobParallelUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Destination block blob size in bytes.
   */
  blockSize?: number;
  /**
   * Blob size threshold in bytes to start concurrency uploading.
   * Default value is 256MB, blob size less than this option will
   * be uploaded via one I/O operation without concurrency.
   * You can customize a value less equal than the default value.
   */
  maxSingleShotSize?: number;
  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Blob HTTP Headers. A common header to set is
   * `blobContentType`, enabling the browser to provide
   * functionality based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * Metadata of block blob.
   */
  metadata?: {
    [propertyName: string]: string;
  };
  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;
  /**
   * Concurrency of parallel uploading. Must be greater than or equal to 0.
   */
  concurrency?: number;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
}

/** Defines headers for BlockBlob_putBlobFromUrl operation. */
export declare interface BlockBlobPutBlobFromUrlHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the putBlobFromUrl operation. */
export declare type BlockBlobPutBlobFromUrlResponse =
  BlockBlobPutBlobFromUrlHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlockBlobPutBlobFromUrlHeaders;
    };
  };

/**
 * Options to configure {@link BlockBlobClient.query} operation.
 */
export declare interface BlockBlobQueryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Configurations for the query input.
   */
  inputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryParquetConfiguration;
  /**
   * Configurations for the query output.
   */
  outputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryArrowConfiguration;
  /**
   * Callback to receive events on the progress of query operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Callback to receive error events during the query operaiton.
   */
  onError?: (error: BlobQueryError) => void;
  /**
   * Conditions to meet when uploading to the block blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
}

/** Defines headers for BlockBlob_stageBlockFromURL operation. */
export declare interface BlockBlobStageBlockFromURLHeaders {
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned when the block was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link BlockBlobClient.stageBlockFromURL} operation.
 */
export declare interface BlockBlobStageBlockFromURLOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the bytes of the source Blob/File to upload.
   * If not specified, the entire content is uploaded as a single block.
   */
  range?: Range_2;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
  /**
   * An MD5 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
}

/** Contains response data for the stageBlockFromURL operation. */
export declare type BlockBlobStageBlockFromURLResponse =
  BlockBlobStageBlockFromURLHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: BlockBlobStageBlockFromURLHeaders;
    };
  };

/** Defines headers for BlockBlob_stageBlock operation. */
export declare interface BlockBlobStageBlockHeaders {
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  contentMD5?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned when the block was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link BlockBlobClient.stageBlock} operation.
 */
export declare interface BlockBlobStageBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
  /**
   * Callback to receive events on the progress of stage block operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the stageBlock operation. */
export declare type BlockBlobStageBlockResponse = BlockBlobStageBlockHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlockBlobStageBlockHeaders;
  };
};

/**
 * Options to configure {@link BlockBlobClient.syncUploadFromURL} operation.
 */
export declare interface BlockBlobSyncUploadFromURLOptions
  extends CommonOptions {
  /**
   * Server timeout in seconds.
   * For more information, @see https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations
   */
  timeoutInSeconds?: number;
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
   * pairs are specified, the operation will copy the metadata from the source blob or file to the
   * destination blob. If one or more name-value pairs are specified, the destination blob is
   * created with the specified metadata, and metadata is not copied from the source blob or file.
   * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
   * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
   * information.
   */
  metadata?: Metadata;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
  /**
   * Specify the md5 calculated for the range of bytes that must be read from the copy source.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Optional, default is true.  Indicates if properties from the source blob should be copied.
   */
  copySourceBlobProperties?: boolean;
  /**
   * HTTP headers to set when uploading to a block blob.
   *
   * A common header to set is `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * Conditions to meet for the destination Azure Blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Conditions to meet for the source Azure Blob.
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
  /**
   * Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
   */
  copySourceTags?: BlobCopySourceTags;
}

/**
 * Represents the access tier on a blob.
 * For detailed information about block blob level tiering see {@link https://docs.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers|Hot, cool and archive storage tiers.}
 */
export declare enum BlockBlobTier {
  /**
   * Optimized for storing data that is accessed frequently.
   */
  Hot = "Hot",
  /**
   * Optimized for storing data that is infrequently accessed and stored for at least 30 days.
   */
  Cool = "Cool",
  /**
   * Optimized for storing data that is rarely accessed.
   */
  Cold = "Cold",
  /**
   * Optimized for storing data that is rarely accessed and stored for at least 180 days
   * with flexible latency requirements (on the order of hours).
   */
  Archive = "Archive",
}

/** Defines headers for BlockBlob_upload operation. */
export declare interface BlockBlobUploadHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link BlockBlobClient.upload} operation.
 */
export declare interface BlockBlobUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading to the block blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when uploading to a block blob. A common header to set is
   * `blobContentType`, enabling the browser to provide functionality
   * based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when uploading to a block blob.
   */
  metadata?: Metadata;
  /**
   * Callback to receive events on the progress of upload operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/** Contains response data for the upload operation. */
export declare type BlockBlobUploadResponse = BlockBlobUploadHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: BlockBlobUploadHeaders;
  };
};

/**
 * Option interface for the {@link BlockBlobClient.uploadStream} operation.
 */
export declare interface BlockBlobUploadStreamOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Blob HTTP Headers.
   *
   * A common header to set is `blobContentType`, enabling the
   * browser to provide functionality based on file type.
   *
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * Metadata of block blob.
   */
  metadata?: {
    [propertyName: string]: string;
  };
  /**
   * Access conditions headers.
   */
  conditions?: BlobRequestConditions;
  /**
   * Progress updater.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Blob tags.
   */
  tags?: Tags;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | string;
}

export declare interface BlockList {
  committedBlocks?: Block[];
  uncommittedBlocks?: Block[];
}

/** Defines values for BlockListType. */
export declare type BlockListType = "committed" | "uncommitted" | "all";

declare interface ClearRange {
  start: number;
  end: number;
}

/**
 * Common options of {@link BlobGenerateSasUrlOptions} and {@link ContainerGenerateSasUrlOptions}.
 */
export declare interface CommonGenerateSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;
  /**
   * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
   */
  protocol?: SASProtocol;
  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * Optional only when identifier is provided. The time after which the SAS will no longer work.
   */
  expiresOn?: Date;
  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;
  /**
   * Optional. The name of the access policy on the container this SAS references if any.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
  /**
   * Optional. The cache-control header for the SAS.
   */
  cacheControl?: string;
  /**
   * Optional. The content-disposition header for the SAS.
   */
  contentDisposition?: string;
  /**
   * Optional. The content-encoding header for the SAS.
   */
  contentEncoding?: string;
  /**
   * Optional. The content-language header for the SAS.
   */
  contentLanguage?: string;
  /**
   * Optional. The content-type header for the SAS.
   */
  contentType?: string;
}

/**
 * An interface for options common to every remote operation.
 */
export declare interface CommonOptions {
  /**
   * Options to configure spans created when tracing is enabled.
   */
  tracingOptions?: OperationTracingOptions;
}

/**
 * Options to configure Container - Acquire Lease operation.
 */
export declare interface ContainerAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/** Optional parameters. */
export declare interface ContainerBreakLeaseOptionalParams
  extends coreHttp.OperationOptions {
  /** Parameter group */
  modifiedAccessConditions?: ModifiedAccessConditionsModel;
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
  /** For a break operation, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. This break period is only used if it is shorter than the time remaining on the lease. If longer, the time remaining on the lease is used. A new lease will not be available before the break period has expired, but the lease may be held for longer than the break period. If this header does not appear with a break operation, a fixed-duration lease breaks after the remaining lease period elapses, and an infinite lease breaks immediately. */
  breakPeriod?: number;
}

/**
 * Options to configure Container - Break Lease operation.
 */
export declare interface ContainerBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Change Lease operation.
 */
export declare interface ContainerChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 */
export declare class ContainerClient extends StorageClient {
  /**
   * containerContext provided by protocol layer.
   */
  private containerContext;
  private _containerName;
  /**
   * The name of the container.
   */
  get containerName(): string;
  /**
   *
   * Creates an instance of ContainerClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an URL pointing to a container.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential?:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an URL pointing to a container.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A URL string pointing to Azure Storage container, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer?sasString".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   * Naming rules: @see https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
   *
   * @param options - Options to Container Create operation.
   *
   *
   * Example usage:
   *
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * const createContainerResponse = await containerClient.create();
   * console.log("Container was created successfully", createContainerResponse.requestId);
   * ```
   */
  create(options?: ContainerCreateOptions): Promise<ContainerCreateResponse>;
  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   * Naming rules: @see https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
   *
   * @param options -
   */
  createIfNotExists(
    options?: ContainerCreateOptions
  ): Promise<ContainerCreateIfNotExistsResponse>;
  /**
   * Returns true if the Azure container resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing container might be deleted by other clients or
   * applications. Vice versa new containers with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param options -
   */
  exists(options?: ContainerExistsOptions): Promise<boolean>;
  /**
   * Creates a {@link BlobClient}
   *
   * @param blobName - A blob name
   * @returns A new BlobClient object for the given blob name.
   */
  getBlobClient(blobName: string): BlobClient;
  /**
   * Creates an {@link AppendBlobClient}
   *
   * @param blobName - An append blob name
   */
  getAppendBlobClient(blobName: string): AppendBlobClient;
  /**
   * Creates a {@link BlockBlobClient}
   *
   * @param blobName - A block blob name
   *
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * const blockBlobClient = containerClient.getBlockBlobClient("<blob name>");
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  getBlockBlobClient(blobName: string): BlockBlobClient;
  /**
   * Creates a {@link PageBlobClient}
   *
   * @param blobName - A page blob name
   */
  getPageBlobClient(blobName: string): PageBlobClient;
  /**
   * Returns all user-defined metadata and system properties for the specified
   * container. The data returned does not include the container's list of blobs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listContainers` method of {@link BlobServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param options - Options to Container Get Properties operation.
   */
  getProperties(
    options?: ContainerGetPropertiesOptions
  ): Promise<ContainerGetPropertiesResponse>;
  /**
   * Marks the specified container for deletion. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param options - Options to Container Delete operation.
   */
  delete(
    options?: ContainerDeleteMethodOptions
  ): Promise<ContainerDeleteResponse>;
  /**
   * Marks the specified container for deletion if it exists. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param options - Options to Container Delete operation.
   */
  deleteIfExists(
    options?: ContainerDeleteMethodOptions
  ): Promise<ContainerDeleteIfExistsResponse>;
  /**
   * Sets one or more user-defined name-value pairs for the specified container.
   *
   * If no option provided, or no metadata defined in the parameter, the container
   * metadata will be removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-metadata
   *
   * @param metadata - Replace existing metadata with this value.
   *                            If no value provided the existing metadata will be removed.
   * @param options - Options to Container Set Metadata operation.
   */
  setMetadata(
    metadata?: Metadata,
    options?: ContainerSetMetadataOptions
  ): Promise<ContainerSetMetadataResponse>;
  /**
   * Gets the permissions for the specified container. The permissions indicate
   * whether container data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potentially lose precision when parsing startsOn and expiresOn strings.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
   *
   * @param options - Options to Container Get Access Policy operation.
   */
  getAccessPolicy(
    options?: ContainerGetAccessPolicyOptions
  ): Promise<ContainerGetAccessPolicyResponse>;
  /**
   * Sets the permissions for the specified container. The permissions indicate
   * whether blobs in a container may be accessed publicly.
   *
   * When you set permissions for a container, the existing permissions are replaced.
   * If no access or containerAcl provided, the existing container ACL will be
   * removed.
   *
   * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
   * During this interval, a shared access signature that is associated with the stored access policy will
   * fail with status code 403 (Forbidden), until the access policy becomes active.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
   *
   * @param access - The level of public access to data in the container.
   * @param containerAcl - Array of elements each having a unique Id and details of the access policy.
   * @param options - Options to Container Set Access Policy operation.
   */
  setAccessPolicy(
    access?: PublicAccessType,
    containerAcl?: SignedIdentifier[],
    options?: ContainerSetAccessPolicyOptions
  ): Promise<ContainerSetAccessPolicyResponse>;
  /**
   * Get a {@link BlobLeaseClient} that manages leases on the container.
   *
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new BlobLeaseClient object for managing leases on the container.
   */
  getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   *
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use {@link BlockBlobClient.stageBlock} and {@link BlockBlobClient.commitBlockList}.
   *
   * This is a non-parallel uploading method, please use {@link BlockBlobClient.uploadFile},
   * {@link BlockBlobClient.uploadStream} or {@link BlockBlobClient.uploadBrowserData} for better
   * performance with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param blobName - Name of the block blob to create or update.
   * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param options - Options to configure the Block Blob Upload operation.
   * @returns Block Blob upload response data and the corresponding BlockBlobClient instance.
   */
  uploadBlockBlob(
    blobName: string,
    body: HttpRequestBody,
    contentLength: number,
    options?: BlockBlobUploadOptions
  ): Promise<{
    blockBlobClient: BlockBlobClient;
    response: BlockBlobUploadResponse;
  }>;
  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param blobName -
   * @param options - Options to Blob Delete operation.
   * @returns Block blob deletion response data.
   */
  deleteBlob(
    blobName: string,
    options?: ContainerDeleteBlobOptions
  ): Promise<BlobDeleteResponse>;
  /**
   * listBlobFlatSegment returns a single segment of blobs starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call listBlobsFlatSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to Container List Blob Flat Segment operation.
   */
  private listBlobFlatSegment;
  /**
   * listBlobHierarchySegment returns a single segment of blobs starting from
   * the specified Marker. Use an empty Marker to start enumeration from the
   * beginning. After getting a segment, process it, and then call listBlobsHierarchicalSegment
   * again (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to Container List Blob Hierarchy Segment operation.
   */
  private listBlobHierarchySegment;
  /**
   * Returns an AsyncIterableIterator for ContainerListBlobFlatSegmentResponse
   *
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list blobs operation.
   */
  private listSegments;
  /**
   * Returns an AsyncIterableIterator of {@link BlobItem} objects
   *
   * @param options - Options to list blobs operation.
   */
  private listItems;
  /**
   * Returns an async iterable iterator to list all the blobs
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the containerClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>");`
   * let i = 1;
   * for await (const blob of containerClient.listBlobsFlat()) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = containerClient.listBlobsFlat();
   * let blobItem = await iter.next();
   * while (!blobItem.done) {
   *   console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *   blobItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * @param options - Options to list blobs.
   * @returns An asyncIterableIterator that supports paging.
   */
  listBlobsFlat(
    options?: ContainerListBlobsOptions
  ): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>;
  /**
   * Returns an AsyncIterableIterator for ContainerListBlobHierarchySegmentResponse
   *
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to list blobs operation.
   */
  private listHierarchySegments;
  /**
   * Returns an AsyncIterableIterator for {@link BlobPrefix} and {@link BlobItem} objects.
   *
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param options - Options to list blobs operation.
   */
  private listItemsByHierarchy;
  /**
   * Returns an async iterable iterator to list all the blobs by hierarchy.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs by hierarchy in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * for await (const item of containerClient.listBlobsByHierarchy("/")) {
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}`);
   *   }
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
   * let entity = await iter.next();
   * while (!entity.done) {
   *   let item = entity.value;
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}`);
   *   }
   *   entity = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page");
   * for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
   *   const segment = response.segment;
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a max page size:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
   *
   * let i = 1;
   * for await (const response of containerClient
   *   .listBlobsByHierarchy("/", { prefix: "prefix2/sub1/" })
   *   .byPage({ maxPageSize: 2 })) {
   *   console.log(`Page ${i++}`);
   *   const segment = response.segment;
   *
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}`);
   *   }
   * }
   * ```
   *
   * @param delimiter - The character or string used to define the virtual hierarchy
   * @param options - Options to list blobs operation.
   */
  listBlobsByHierarchy(
    delimiter: string,
    options?: ContainerListBlobsOptions
  ): PagedAsyncIterableIterator<
    | ({
        kind: "prefix";
      } & BlobPrefix)
    | ({
        kind: "blob";
      } & BlobItem),
    ContainerListBlobHierarchySegmentResponse
  >;
  /**
   * The Filter Blobs operation enables callers to list blobs in the container whose tags
   * match a given search expression.
   *
   * @param tagFilterSqlExpression - The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                        The given expression must evaluate to true for a blob to be returned in the results.
   *                                        The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                        however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the continuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The continuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to find blobs by tags.
   */
  private findBlobsByTagsSegment;
  /**
   * Returns an AsyncIterableIterator for ContainerFindBlobsByTagsSegmentResponse.
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param marker - A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the continuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The continuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param options - Options to find blobs by tags.
   */
  private findBlobsByTagsSegments;
  /**
   * Returns an AsyncIterableIterator for blobs.
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param options - Options to findBlobsByTagsItems.
   */
  private findBlobsByTagsItems;
  /**
   * Returns an async iterable iterator to find all blobs with specified tag
   * under the specified container.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * let i = 1;
   * for await (const blob of containerClient.findBlobsByTags("tagkey='tagvalue'")) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * const iter = containerClient.findBlobsByTags("tagkey='tagvalue'");
   * let blobItem = await iter.next();
   * while (!blobItem.done) {
   *   console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *   blobItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of containerClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 20 })) {
   *   if (response.blobs) {
   *     for (const blob of response.blobs) {
   *       console.log(`Blob ${i++}: ${blob.name}`);
   *     }
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = containerClient.findBlobsByTags("tagkey='tagvalue'").byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 blob names
   * if (response.blobs) {
   *   for (const blob of response.blobs) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   * // Passing next marker as continuationToken
   * iterator = containerClient
   *   .findBlobsByTags("tagkey='tagvalue'")
   *   .byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints blob names
   * if (response.blobs) {
   *   for (const blob of response.blobs) {
   *      console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   * ```
   *
   * @param tagFilterSqlExpression -  The where parameter enables the caller to query blobs whose tags match a given expression.
   *                                         The given expression must evaluate to true for a blob to be returned in the results.
   *                                         The[OData - ABNF] filter syntax rule defines the formal grammar for the value of the where query parameter;
   *                                         however, only a subset of the OData filter syntax is supported in the Blob service.
   * @param options - Options to find blobs by tags.
   */
  findBlobsByTags(
    tagFilterSqlExpression: string,
    options?: ContainerFindBlobByTagsOptions
  ): PagedAsyncIterableIterator<
    FilterBlobItem,
    ContainerFindBlobsByTagsSegmentResponse
  >;
  private getContainerNameFromUrl;
  /**
   * Only available for ContainerClient constructed with a shared key credential.
   *
   * Generates a Blob Container Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  generateSasUrl(options: ContainerGenerateSasUrlOptions): Promise<string>;
  /**
   * Creates a BlobBatchClient object to conduct batch operations.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
   *
   * @returns A new BlobBatchClient object for this container.
   */
  getBlobBatchClient(): BlobBatchClient;
}

/** Defines headers for Container_create operation. */
export declare interface ContainerCreateHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Contains response data for the {@link ContainerClient.createIfNotExists} operation.
 */
export declare interface ContainerCreateIfNotExistsResponse
  extends ContainerCreateResponse {
  /**
   * Indicate whether the container is successfully created. Is false when the container is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link ContainerClient.create} operation.
 */
export declare interface ContainerCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the container.
   */
  metadata?: Metadata;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access. Possible values include:
   * - `container`: Specifies full public read access for container and blob data. Clients can enumerate blobs within the container via anonymous request, but cannot enumerate containers within the storage account.
   * - `blob`: Specifies public read access for blobs. Blob data within this container can be read via anonymous request, but container data is not available. Clients cannot enumerate blobs within the container via anonymous request.
   */
  access?: PublicAccessType;
  /**
   * Container encryption scope info.
   */
  containerEncryptionScope?: ContainerEncryptionScope;
}

/** Contains response data for the create operation. */
export declare type ContainerCreateResponse = ContainerCreateHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: ContainerCreateHeaders;
  };
};

/**
 * Options to configure the {@link ContainerClient.deleteBlob} operation.
 */
export declare interface ContainerDeleteBlobOptions extends BlobDeleteOptions {
  /**
   * An opaque DateTime value that, when present, specifies the version
   * of the blob to delete. It's for service version 2019-10-10 and newer.
   */
  versionId?: string;
}

/** Defines headers for Container_delete operation. */
export declare interface ContainerDeleteHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Contains response data for the {@link ContainerClient.deleteIfExists} operation.
 */
export declare interface ContainerDeleteIfExistsResponse
  extends ContainerDeleteResponse {
  /**
   * Indicate whether the container is successfully deleted. Is false if the container does not exist in the first place.
   */
  succeeded: boolean;
}

/**
 * Options to configure {@link ContainerClient.delete} operation.
 */
export declare interface ContainerDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting the container.
   */
  conditions?: ContainerRequestConditions;
}

/** Contains response data for the delete operation. */
export declare type ContainerDeleteResponse = ContainerDeleteHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: ContainerDeleteHeaders;
  };
};

/** Parameter group */
export declare interface ContainerEncryptionScope {
  /** Optional.  Version 2019-07-07 and later.  Specifies the default encryption scope to set on the container and use for all future writes. */
  defaultEncryptionScope?: string;
  /** Optional.  Version 2019-07-07 and newer.  If true, prevents any request from specifying a different encryption scope than the scope set on the container. */
  preventEncryptionScopeOverride?: boolean;
}

/**
 * Options to configure {@link ContainerClient.exists} operation.
 */
export declare interface ContainerExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Defines headers for Container_filterBlobs operation. */
export declare interface ContainerFilterBlobsHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
}

/**
 * Options to configure the {@link BlobServiceClient.findBlobsByTags} operation.
 */
export declare interface ContainerFindBlobByTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * The response of {@link BlobServiceClient.findBlobsByTags} operation.
 */
export declare type ContainerFindBlobsByTagsSegmentResponse =
  FilterBlobSegment &
    ContainerFilterBlobsHeaders & {
      /**
       * The underlying HTTP response.
       */
      _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerFilterBlobsHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: FilterBlobSegmentModel;
      };
    };

/**
 * Options to configure {@link ContainerClient.generateSasUrl} operation.
 */
export declare interface ContainerGenerateSasUrlOptions
  extends CommonGenerateSasUrlOptions {
  /**
   * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
   */
  permissions?: ContainerSASPermissions;
}

/** Defines headers for Container_getAccessPolicy operation. */
export declare interface ContainerGetAccessPolicyHeaders {
  /** Indicated whether data in the container may be accessed publicly and the level of access */
  blobPublicAccess?: PublicAccessType;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link ContainerClient.getAccessPolicy} operation.
 */
export declare interface ContainerGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Contains response data for the {@link ContainerClient.getAccessPolicy} operation.
 */
export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SignedIdentifierModel[];
    };
  };

/** Defines headers for Container_getProperties operation. */
export declare interface ContainerGetPropertiesHeaders {
  metadata?: {
    [propertyName: string]: string;
  };
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** When a blob is leased, specifies whether the lease is of infinite or fixed duration. */
  leaseDuration?: LeaseDurationType;
  /** Lease state of the blob. */
  leaseState?: LeaseStateType;
  /** The current lease status of the blob. */
  leaseStatus?: LeaseStatusType;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Indicated whether data in the container may be accessed publicly and the level of access */
  blobPublicAccess?: PublicAccessType;
  /** Indicates whether the container has an immutability policy set on it. */
  hasImmutabilityPolicy?: boolean;
  /** Indicates whether the container has a legal hold. */
  hasLegalHold?: boolean;
  /** The default encryption scope for the container. */
  defaultEncryptionScope?: string;
  /** Indicates whether the container's default encryption scope can be overriden. */
  denyEncryptionScopeOverride?: boolean;
  /** Indicates whether version level worm is enabled on a container. */
  isImmutableStorageWithVersioningEnabled?: boolean;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link ContainerClient.getProperties} operation.
 */
export declare interface ContainerGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: LeaseAccessConditions;
}

/** Contains response data for the getProperties operation. */
export declare type ContainerGetPropertiesResponse =
  ContainerGetPropertiesHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ContainerGetPropertiesHeaders;
    };
  };

/** An Azure Storage container */
export declare interface ContainerItem {
  name: string;
  deleted?: boolean;
  version?: string;
  /** Properties of a container */
  properties: ContainerProperties;
  /** Dictionary of <string> */
  metadata?: {
    [propertyName: string]: string;
  };
}

/** Defines headers for Container_listBlobFlatSegment operation. */
export declare interface ContainerListBlobFlatSegmentHeaders {
  /** The media type of the body of the response. For List Blobs this is 'application/xml' */
  contentType?: string;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Contains response data for the listBlobFlatSegment operation.
 */
export declare type ContainerListBlobFlatSegmentResponse =
  ListBlobsFlatSegmentResponse &
    ContainerListBlobFlatSegmentHeaders & {
      /**
       * The underlying HTTP response.
       */
      _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerListBlobFlatSegmentHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ListBlobsFlatSegmentResponseModel;
      };
    };

/** Defines headers for Container_listBlobHierarchySegment operation. */
export declare interface ContainerListBlobHierarchySegmentHeaders {
  /** The media type of the body of the response. For List Blobs this is 'application/xml' */
  contentType?: string;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Contains response data for the listBlobHierarchySegment operation.
 */
export declare type ContainerListBlobHierarchySegmentResponse =
  ListBlobsHierarchySegmentResponse &
    ContainerListBlobHierarchySegmentHeaders & {
      /**
       * The underlying HTTP response.
       */
      _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerListBlobHierarchySegmentHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ListBlobsHierarchySegmentResponseModel;
      };
    };

/**
 * Options to configure Container - List Blobs operations.
 *
 * See:
 * - {@link ContainerClient.listBlobsFlat}
 * - {@link ContainerClient.listBlobsByHierarchy}
 */
export declare interface ContainerListBlobsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies whether metadata related to any current or previous Copy Blob operation should be included in the response.
   */
  includeCopy?: boolean;
  /**
   * Specifies whether soft deleted blobs should be included in the response.
   */
  includeDeleted?: boolean;
  /**
   * Specifies whether blob metadata be returned in the response.
   */
  includeMetadata?: boolean;
  /**
   * Specifies whether snapshots should be included in the enumeration. Snapshots are listed from oldest to newest in the response.
   */
  includeSnapshots?: boolean;
  /**
   * Specifies whether versions should be included in the enumeration. Versions are listed from oldest to newest in the response.
   */
  includeVersions?: boolean;
  /**
   * Specifies whether blobs for which blocks have been uploaded, but which have not been committed using Put Block List, be included in the response.
   */
  includeUncommitedBlobs?: boolean;
  /**
   * Specifies whether blob tags be returned in the response.
   */
  includeTags?: boolean;
  /**
   * Specifies whether deleted blob with versions be returned in the response.
   */
  includeDeletedWithVersions?: boolean;
  /**
   * Specifies whether blob immutability policy be returned in the response.
   */
  includeImmutabilityPolicy?: boolean;
  /**
   * Specifies whether blob legal hold be returned in the response.
   */
  includeLegalHold?: boolean;
}

/** Properties of a container */
export declare interface ContainerProperties {
  lastModified: Date;
  etag: string;
  leaseStatus?: LeaseStatusType;
  leaseState?: LeaseStateType;
  leaseDuration?: LeaseDurationType;
  publicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
  defaultEncryptionScope?: string;
  preventEncryptionScopeOverride?: boolean;
  deletedOn?: Date;
  remainingRetentionDays?: number;
  /** Indicates if version level worm is enabled on this container. */
  isImmutableStorageWithVersioningEnabled?: boolean;
}

/**
 * Options to configure Container - Release Lease operation.
 */
export declare interface ContainerReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/** Defines headers for Container_rename operation. */
export declare interface ContainerRenameHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the rename operation. */
export declare type ContainerRenameResponse = ContainerRenameHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: ContainerRenameHeaders;
  };
};

/**
 * Options to configure Container - Renew Lease operation.
 */
export declare interface ContainerRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Conditions to meet for the container.
 */
export declare interface ContainerRequestConditions
  extends LeaseAccessConditions,
    ModificationConditions {}

/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a container.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 */
export declare class ContainerSASPermissions {
  /**
   * Creates an {@link ContainerSASPermissions} from the specified permissions string. This method will throw an
   * Error if it encounters a character that does not correspond to a valid permission.
   *
   * @param permissions -
   */
  static parse(permissions: string): ContainerSASPermissions;
  /**
   * Creates a {@link ContainerSASPermissions} from a raw object which contains same keys as it
   * and boolean values for them.
   *
   * @param permissionLike -
   */
  static from(
    permissionLike: ContainerSASPermissionsLike
  ): ContainerSASPermissions;
  /**
   * Specifies Read access granted.
   */
  read: boolean;
  /**
   * Specifies Add access granted.
   */
  add: boolean;
  /**
   * Specifies Create access granted.
   */
  create: boolean;
  /**
   * Specifies Write access granted.
   */
  write: boolean;
  /**
   * Specifies Delete access granted.
   */
  delete: boolean;
  /**
   * Specifies Delete version access granted.
   */
  deleteVersion: boolean;
  /**
   * Specifies List access granted.
   */
  list: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag: boolean;
  /**
   * Specifies Move access granted.
   */
  move: boolean;
  /**
   * Specifies Execute access granted.
   */
  execute: boolean;
  /**
   * Specifies SetImmutabilityPolicy access granted.
   */
  setImmutabilityPolicy: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete: boolean;
  /**
   * Specifies that Filter Blobs by Tags is permitted.
   */
  filterByTags: boolean;
  /**
   * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
   * order accepted by the service.
   *
   * The order of the characters should be as specified here to ensure correctness.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
   *
   */
  toString(): string;
}

/**
 * A type that looks like a Container SAS permission.
 * Used in {@link ContainerSASPermissions} to parse SAS permissions from raw objects.
 */
export declare interface ContainerSASPermissionsLike {
  /**
   * Specifies Read access granted.
   */
  read?: boolean;
  /**
   * Specifies Add access granted.
   */
  add?: boolean;
  /**
   * Specifies Create access granted.
   */
  create?: boolean;
  /**
   * Specifies Write access granted.
   */
  write?: boolean;
  /**
   * Specifies Delete access granted.
   */
  delete?: boolean;
  /**
   * Specifies Delete version access granted.
   */
  deleteVersion?: boolean;
  /**
   * Specifies List access granted.
   */
  list?: boolean;
  /**
   * Specfies Tag access granted.
   */
  tag?: boolean;
  /**
   * Specifies Move access granted.
   */
  move?: boolean;
  /**
   * Specifies Execute access granted.
   */
  execute?: boolean;
  /**
   * Specifies SetImmutabilityPolicy access granted.
   */
  setImmutabilityPolicy?: boolean;
  /**
   * Specifies that Permanent Delete is permitted.
   */
  permanentDelete?: boolean;
  /**
   * Specifies that Filter Blobs by Tags is permitted.
   */
  filterByTags?: boolean;
}

/** Defines headers for Container_setAccessPolicy operation. */
export declare interface ContainerSetAccessPolicyHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link ContainerClient.setAccessPolicy} operation.
 */
export declare interface ContainerSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting the access policy.
   */
  conditions?: ContainerRequestConditions;
}

/** Contains response data for the setAccessPolicy operation. */
export declare type ContainerSetAccessPolicyResponse =
  ContainerSetAccessPolicyHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ContainerSetAccessPolicyHeaders;
    };
  };

/** Defines headers for Container_setMetadata operation. */
export declare interface ContainerSetMetadataHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link ContainerClient.setMetadata} operation.
 */
export declare interface ContainerSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   */
  conditions?: ContainerRequestConditions;
}

/** Contains response data for the setMetadata operation. */
export declare type ContainerSetMetadataResponse =
  ContainerSetMetadataHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ContainerSetMetadataHeaders;
    };
  };

/** Defines headers for Container_restore operation. */
export declare interface ContainerUndeleteHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the restore operation. */
export declare type ContainerUndeleteResponse = ContainerUndeleteHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: ContainerUndeleteHeaders;
  };
};

/**
 * Defines the operations from a {@link BlobClient} that are needed for the poller
 * returned by {@link BlobClient.beginCopyFromURL} to work.
 */
export declare type CopyPollerBlobClient = Pick<
  BlobClient,
  "abortCopyFromURL" | "getProperties"
> & {
  startCopyFromURL(
    copySource: string,
    options?: BlobStartCopyFromURLOptions
  ): Promise<BlobBeginCopyFromURLResponse>;
};

/** Defines values for CopyStatusType. */
export declare type CopyStatusType =
  | "pending"
  | "success"
  | "aborted"
  | "failed";

/** CORS is an HTTP feature that enables a web application running under one domain to access resources in another domain. Web browsers implement a security restriction known as same-origin policy that prevents a web page from calling APIs in a different domain; CORS provides a secure way to allow one domain (the origin domain) to call APIs in another domain */
export declare interface CorsRule {
  /** The origin domains that are permitted to make a request against the storage service via CORS. The origin domain is the domain from which the request originates. Note that the origin must be an exact case-sensitive match with the origin that the user age sends to the service. You can also use the wildcard character '*' to allow all origin domains to make requests via CORS. */
  allowedOrigins: string;
  /** The methods (HTTP request verbs) that the origin domain may use for a CORS request. (comma separated) */
  allowedMethods: string;
  /** the request headers that the origin domain may specify on the CORS request. */
  allowedHeaders: string;
  /** The response headers that may be sent in the response to the CORS request and exposed by the browser to the request issuer */
  exposedHeaders: string;
  /** The maximum amount time that a browser should cache the preflight OPTIONS request. */
  maxAgeInSeconds: number;
}

/** Parameter group */
export declare interface CpkInfo {
  /** Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key.  For more information, see Encryption at Rest for Azure Storage Services. */
  encryptionKey?: string;
  /** The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided. */
  encryptionKeySha256?: string;
  /** The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided. */
  encryptionAlgorithm?: EncryptionAlgorithmType;
}

/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 */
declare abstract class Credential_2 implements RequestPolicyFactory {
  /**
   * Creates a RequestPolicy object.
   *
   * @param _nextPolicy -
   * @param _options -
   */
  create(
    _nextPolicy: RequestPolicy,
    _options: RequestPolicyOptions
  ): RequestPolicy;
}
export { Credential_2 as Credential };

/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 */
export declare abstract class CredentialPolicy extends BaseRequestPolicy {
  /**
   * Sends out request.
   *
   * @param request -
   */
  sendRequest(request: WebResource): Promise<HttpOperationResponse>;
  /**
   * Child classes must implement this method with request signing. This method
   * will be executed in {@link sendRequest}.
   *
   * @param request -
   */
  protected signRequest(request: WebResource): WebResource;
}

/**
 * A factory function that creates a new CredentialPolicy that uses the provided nextPolicy.
 */
export declare type CredentialPolicyCreator = (
  nextPolicy: RequestPolicy,
  options: RequestPolicyOptions
) => CredentialPolicy;

/** Defines values for DeleteSnapshotsOptionType. */
export declare type DeleteSnapshotsOptionType = "include" | "only";

export { deserializationPolicy };

/**
 * Defines values for EncryptionAlgorithmType. \
 * {@link KnownEncryptionAlgorithmType} can be used interchangeably with EncryptionAlgorithmType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **AES256**
 */
export declare type EncryptionAlgorithmType = string;

/**
 * Blob info from a {@link BlobServiceClient.findBlobsByTags}
 */
export declare interface FilterBlobItem {
  /**
   * Blob Name.
   */
  name: string;
  /**
   * Container Name.
   */
  containerName: string;
  /**
   * Blob Tags.
   */
  tags?: Tags;
  /**
   * Tag value.
   *
   * @deprecated The service no longer returns this value. Use {@link tags} to fetch all matching Blob Tags.
   */
  tagValue: string;
}

/** Blob info from a Filter Blobs API call */
export declare interface FilterBlobItemModel {
  name: string;
  containerName: string;
  /** Blob tags */
  tags?: BlobTags;
}

/**
 * Segment response of {@link BlobServiceClient.findBlobsByTags} operation.
 */
export declare interface FilterBlobSegment {
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItem[];
  continuationToken?: string;
}

/** The result of a Filter Blobs API call */
export declare interface FilterBlobSegmentModel {
  serviceEndpoint: string;
  where: string;
  blobs: FilterBlobItemModel[];
  continuationToken?: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param accountSASSignatureValues -
 * @param sharedKeyCredential -
 */
export declare function generateAccountSASQueryParameters(
  accountSASSignatureValues: AccountSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters;

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiresOn are required.
 * You MUST assign value to identifier or expiresOn & permissions manually if you initial with
 * this constructor.
 *
 * Fill in the required details before running the following snippets.
 *
 * Example usage:
 *
 * ```js
 * // Generate service level SAS for a container
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Required. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * Example using an identifier:
 *
 * ```js
 * // Generate service level SAS for a container with identifier
 * // startsOn & permissions are optional when identifier is provided
 * const identifier = "unique-id";
 * await containerClient.setAccessPolicy(undefined, [
 *   {
 *     accessPolicy: {
 *       expiresOn: new Date(new Date().valueOf() + 86400), // Date type
 *       permissions: ContainerSASPermissions.parse("racwdl").toString(),
 *       startsOn: new Date() // Date type
 *     },
 *     id: identifier
 *   }
 * ]);
 *
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     identifier // Required
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * Example using a blob name:
 *
 * ```js
 * // Generate service level SAS for a blob
 * const blobSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     blobName, // Required
 *     permissions: BlobSASPermissions.parse("racwd"), // Required
 *     startsOn: new Date(), // Optional
 *     expiresOn: new Date(new Date().valueOf() + 86400), // Required. Date type
 *     cacheControl: "cache-control-override", // Optional
 *     contentDisposition: "content-disposition-override", // Optional
 *     contentEncoding: "content-encoding-override", // Optional
 *     contentLanguage: "content-language-override", // Optional
 *     contentType: "content-type-override", // Optional
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
 * ).toString();
 * ```
 *
 * @param blobSASSignatureValues -
 * @param sharedKeyCredential -
 */
export declare function generateBlobSASQueryParameters(
  blobSASSignatureValues: BlobSASSignatureValues,
  sharedKeyCredential: StorageSharedKeyCredential
): SASQueryParameters;

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 * WARNING: identifier will be ignored when generating user delegation SAS, permissions and expiresOn are required.
 *
 * Example usage:
 *
 * ```js
 * // Generate user delegation SAS for a container
 * const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl"), // Required
 *     startsOn, // Optional. Date type
 *     expiresOn, // Required. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HttpsAndHttp, // Optional
 *     version: "2018-11-09" // Must greater than or equal to 2018-11-09 to generate user delegation SAS
 *   },
 *   userDelegationKey, // UserDelegationKey
 *   accountName
 * ).toString();
 * ```
 *
 * @param blobSASSignatureValues -
 * @param userDelegationKey - Return value of `blobServiceClient.getUserDelegationKey()`
 * @param accountName -
 */
export declare function generateBlobSASQueryParameters(
  blobSASSignatureValues: BlobSASSignatureValues,
  userDelegationKey: UserDelegationKey,
  accountName: string
): SASQueryParameters;

/** Geo-Replication information for the Secondary Storage Service */
export declare interface GeoReplication {
  /** The status of the secondary location */
  status: GeoReplicationStatusType;
  /** A GMT date/time value, to the second. All primary writes preceding this value are guaranteed to be available for read operations at the secondary. Primary writes after this point in time may or may not be available for reads. */
  lastSyncOn: Date;
}

/** Defines values for GeoReplicationStatusType. */
export declare type GeoReplicationStatusType =
  | "live"
  | "bootstrap"
  | "unavailable";

/**
 * Represents authentication information in Authorization, ProxyAuthorization,
 * WWW-Authenticate, and Proxy-Authenticate header values.
 */
export declare interface HttpAuthorization {
  /**
   * The scheme to use for authorization.
   */
  scheme: string;
  /**
   * the credentials containing the authentication information of the user agent for the resource being requested.
   */
  value: string;
}

export { HttpHeaders };

export { HttpOperationResponse };

export { HttpRequestBody };

export { IHttpClient };

/**
 * A helper to decide if a given argument satisfies the Pipeline contract
 * @param pipeline - An argument that may be a Pipeline
 * @returns true when the argument satisfies the Pipeline contract
 */
export declare function isPipelineLike(
  pipeline: unknown
): pipeline is PipelineLike;

/** Known values of {@link EncryptionAlgorithmType} that the service accepts. */
export declare enum KnownEncryptionAlgorithmType {
  AES256 = "AES256",
}

/**
 * The details for a specific lease.
 */
export declare interface Lease {
  /**
   * The ETag contains a value that you can use to
   * perform operations conditionally. If the request version is 2011-08-18 or
   * newer, the ETag value will be in quotes.
   */
  etag?: string;
  /**
   * Returns the date and time the container was
   * last modified. Any operation that modifies the blob, including an update
   * of the blob's metadata or properties, changes the last-modified time of
   * the blob.
   */
  lastModified?: Date;
  /**
   * Uniquely identifies a container's lease
   */
  leaseId?: string;
  /**
   * Approximate time remaining in the lease
   * period, in seconds.
   */
  leaseTime?: number;
  /**
   * This header uniquely identifies the request
   * that was made and can be used for troubleshooting the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the Blob service used
   * to execute the request. This header is returned for requests made against
   * version 2009-09-19 and above.
   */
  version?: string;
  /**
   * UTC date/time value generated by the service that
   * indicates the time at which the response was initiated
   */
  date?: Date;
  /**
   * Error code if any associated with the response that returned
   * the Lease information.
   */
  errorCode?: string;
}

/** Parameter group */
export declare interface LeaseAccessConditions {
  /** If specified, the operation only succeeds if the resource's lease is active and matches this ID. */
  leaseId?: string;
}

/** Defines values for LeaseDurationType. */
export declare type LeaseDurationType = "infinite" | "fixed";

/**
 * Configures lease operations.
 */
export declare interface LeaseOperationOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Contains the response data for operations that create, modify, or delete a lease.
 *
 * See {@link BlobLeaseClient}.
 */
export declare type LeaseOperationResponse = Lease & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Lease;
  };
};

/** Defines values for LeaseStateType. */
export declare type LeaseStateType =
  | "available"
  | "leased"
  | "expired"
  | "breaking"
  | "broken";

/** Defines values for LeaseStatusType. */
export declare type LeaseStatusType = "locked" | "unlocked";

/**
 * An enumeration of blobs
 */
export declare interface ListBlobsFlatSegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegment;
  continuationToken?: string;
}

/** An enumeration of blobs */
export declare interface ListBlobsFlatSegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegmentModel;
  continuationToken?: string;
}

/**
 * An enumeration of blobs
 */
export declare interface ListBlobsHierarchySegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegment;
  continuationToken?: string;
}

/** An enumeration of blobs */
export declare interface ListBlobsHierarchySegmentResponseModel {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegmentModel;
  continuationToken?: string;
}

/** An enumeration of containers */
export declare interface ListContainersSegmentResponse {
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  containerItems: ContainerItem[];
  continuationToken?: string;
}

/**
 * The `@azure/logger` configuration for this package.
 */
export declare const logger: AzureLogger;

/** Azure Analytics Logging settings. */
export declare interface Logging {
  /** The version of Storage Analytics to configure. */
  version: string;
  /** Indicates whether all delete requests should be logged. */
  deleteProperty: boolean;
  /** Indicates whether all read requests should be logged. */
  read: boolean;
  /** Indicates whether all write requests should be logged. */
  write: boolean;
  /** the retention policy which determines how long the associated data should persist */
  retentionPolicy: RetentionPolicy;
}

/**
 * Specifies HTTP options for conditional requests based on ETag matching.
 */
export declare interface MatchConditions {
  /**
   * Specify an ETag value to operate only on blobs with a matching value.
   */
  ifMatch?: string;
  /**
   * Specify an ETag value to operate only on blobs without a matching value.
   */
  ifNoneMatch?: string;
}

/**
 * A map of name-value pairs to associate with the resource.
 */
export declare interface Metadata {
  /**
   * A name-value pair.
   */
  [propertyName: string]: string;
}

/** a summary of request statistics grouped by API in hour or minute aggregates for blobs */
export declare interface Metrics {
  /** The version of Storage Analytics to configure. */
  version?: string;
  /** Indicates whether metrics are enabled for the Blob service. */
  enabled: boolean;
  /** Indicates whether metrics should generate summary statistics for called API operations. */
  includeAPIs?: boolean;
  /** the retention policy which determines how long the associated data should persist */
  retentionPolicy?: RetentionPolicy;
}

/**
 * Specifies HTTP options for conditional requests based on modification time.
 */
export declare interface ModificationConditions {
  /**
   * Specify this header value to operate only on a blob if it has been modified since the
   * specified date/time.
   */
  ifModifiedSince?: Date;
  /**
   * Specify this header value to operate only on a blob if it has not been modified since the
   * specified date/time.
   */
  ifUnmodifiedSince?: Date;
}

/**
 * standard HTTP conditional headers and tags condition.
 */
export declare interface ModifiedAccessConditions
  extends MatchConditions,
    ModificationConditions,
    TagConditions {}

/** Parameter group */
export declare interface ModifiedAccessConditionsModel {
  /** Specify this header value to operate only on a blob if it has been modified since the specified date/time. */
  ifModifiedSince?: Date;
  /** Specify this header value to operate only on a blob if it has not been modified since the specified date/time. */
  ifUnmodifiedSince?: Date;
  /** Specify an ETag value to operate only on blobs with a matching value. */
  ifMatch?: string;
  /** Specify an ETag value to operate only on blobs without a matching value. */
  ifNoneMatch?: string;
  /** Specify a SQL where clause on blob tags to operate only on blobs with a matching value. */
  ifTags?: string;
}

/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
 * @param pipelineOptions - Optional. Options.
 * @returns A new Pipeline object.
 */
export declare function newPipeline(
  credential?:
    | StorageSharedKeyCredential
    | AnonymousCredential
    | TokenCredential,
  pipelineOptions?: StoragePipelineOptions
): Pipeline;

/**
 * Contains Object Replication Policy ID and the respective list of {@link ObjectReplicationRule}.
 * This is used when retrieving the Object Replication Properties on the source blob. The policy id for the
 * destination blob is set in ObjectReplicationDestinationPolicyId of the respective method responses
 * (e.g. {@link BlobProperties.ObjectReplicationDestinationPolicyId}.
 */
export declare interface ObjectReplicationPolicy {
  /**
   * The Object Replication Policy ID.
   */
  policyId: string;
  /**
   * The Rule ID(s) and respective Replication Status(s) that are under the Policy ID.
   */
  rules: ObjectReplicationRule[];
}

/**
 * Contains the Object Replication Rule ID and {@link ObjectReplicationStatus} of a blob.
 * There can be more than one {@link ObjectReplicationRule} under a {@link ObjectReplicationPolicy}.
 */
export declare interface ObjectReplicationRule {
  /**
   * The Object Replication Rule ID.
   */
  ruleId: string;
  /**
   * The Replication Status
   */
  replicationStatus: ObjectReplicationStatus;
}

/**
 * Specifies the Replication Status of a blob. This is used when a storage account has
 * Object Replication Policy(s) applied. See {@link ObjectReplicationPolicy} and {@link ObjectReplicationRule}.
 */
export declare type ObjectReplicationStatus = "complete" | "failed";

/** Defines headers for PageBlob_clearPages operation. */
export declare interface PageBlobClearPagesHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** The current sequence number for the page blob. */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link PageBlobClient.clearPages} operation.
 */
export declare interface PageBlobClearPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when clearing pages.
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the clearPages operation. */
export declare type PageBlobClearPagesResponse = PageBlobClearPagesHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: PageBlobClearPagesHeaders;
  };
};

/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 */
export declare class PageBlobClient extends BlobClient {
  /**
   * pageBlobsContext provided by protocol layer.
   */
  private pageBlobContext;
  /**
   *
   * Creates an instance of PageBlobClient.
   *
   * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param containerName - Container name.
   * @param blobName - Blob name.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of PageBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param url - A Client string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(
    url: string,
    credential:
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of PageBlobClient.
   *
   * @param url - A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param pipeline - Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   */
  constructor(url: string, pipeline: PipelineLike);
  /**
   * Creates a new PageBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  withSnapshot(snapshot: string): PageBlobClient;
  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options - Options to the Page Blob Create operation.
   * @returns Response data for the Page Blob Create operation.
   */
  create(
    size: number,
    options?: PageBlobCreateOptions
  ): Promise<PageBlobCreateResponse>;
  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob. If the blob with the same name already exists, the content
   * of the existing blob will remain unchanged.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options -
   */
  createIfNotExists(
    size: number,
    options?: PageBlobCreateIfNotExistsOptions
  ): Promise<PageBlobCreateIfNotExistsResponse>;
  /**
   * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param body - Data to upload
   * @param offset - Offset of destination page blob
   * @param count - Content length of the body, also number of bytes to be uploaded
   * @param options - Options to the Page Blob Upload Pages operation.
   * @returns Response data for the Page Blob Upload Pages operation.
   */
  uploadPages(
    body: HttpRequestBody,
    offset: number,
    count: number,
    options?: PageBlobUploadPagesOptions
  ): Promise<PageBlobUploadPagesResponse>;
  /**
   * The Upload Pages operation writes a range of pages to a page blob where the
   * contents are read from a URL.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-page-from-url
   *
   * @param sourceURL - Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
   * @param sourceOffset - The source offset to copy from. Pass 0 to copy from the beginning of source page blob
   * @param destOffset - Offset of destination page blob
   * @param count - Number of bytes to be uploaded from source page blob
   * @param options -
   */
  uploadPagesFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options?: PageBlobUploadPagesFromURLOptions
  ): Promise<PageBlobUploadPagesFromURLResponse>;
  /**
   * Frees the specified pages from the page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param offset - Starting byte position of the pages to clear.
   * @param count - Number of bytes to clear.
   * @param options - Options to the Page Blob Clear Pages operation.
   * @returns Response data for the Page Blob Clear Pages operation.
   */
  clearPages(
    offset?: number,
    count?: number,
    options?: PageBlobClearPagesOptions
  ): Promise<PageBlobClearPagesResponse>;
  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns Response data for the Page Blob Get Ranges operation.
   */
  getPageRanges(
    offset?: number,
    count?: number,
    options?: PageBlobGetPageRangesOptions
  ): Promise<PageBlobGetPageRangesResponse>;
  /**
   * getPageRangesSegment returns a single segment of page ranges starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call getPageRangesSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
   * @param options - Options to PageBlob Get Page Ranges Segment operation.
   */
  private listPageRangesSegment;
  /**
   * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesResponseModel}
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param marker - A string value that identifies the portion of
   *                          the get of page ranges to be returned with the next getting operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          getting operation did not return all page ranges remaining within the current page.
   *                          The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of get
   *                          items. The marker value is opaque to the client.
   * @param options - Options to List Page Ranges operation.
   */
  private listPageRangeItemSegments;
  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to List Page Ranges operation.
   */
  private listPageRangeItems;
  /**
   * Returns an async iterable iterator to list of page ranges for a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   *  .byPage() returns an async iterable iterator to list of page ranges for a page blob.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the pageBlobClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>").getPageBlobClient("<your-blob-name>");`
   * let i = 1;
   * for await (const pageRange of pageBlobClient.listPageRanges()) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = pageBlobClient.listPageRanges();
   * let pageRangeItem = await iter.next();
   * while (!pageRangeItem.done) {
   *   console.log(`Page range ${i++}: ${pageRangeItem.value.start} - ${pageRangeItem.value.end}, IsClear: ${pageRangeItem.value.isClear}`);
   *   pageRangeItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of pageBlobClient.listPageRanges().byPage({ maxPageSize: 20 })) {
   *   for (const pageRange of response) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = pageBlobClient.listPageRanges().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 page ranges
   * for (const pageRange of response) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = pageBlobClient.listPageRanges().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 page ranges
   * for (const blob of response) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   * ```
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  listPageRanges(
    offset?: number,
    count?: number,
    options?: PageBlobListPageRangesOptions
  ): PagedAsyncIterableIterator<
    PageRangeInfo,
    PageBlobGetPageRangesResponseModel
  >;
  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page blob
   * @param count - Number of bytes to get ranges diff.
   * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   * @returns Response data for the Page Blob Get Page Range Diff operation.
   */
  getPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options?: PageBlobGetPageRangesDiffOptions
  ): Promise<PageBlobGetPageRangesDiffResponse>;
  /**
   * getPageRangesDiffSegment returns a single segment of page ranges starting from the
   * specified Marker for difference between previous snapshot and the target page blob.
   * Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call getPageRangesDiffSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param marker - A string value that identifies the portion of the get to be returned with the next get operation.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private listPageRangesDiffSegment;
  /**
   * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesDiffResponseModel}
   *
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param marker - A string value that identifies the portion of
   *                          the get of page ranges to be returned with the next getting operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          getting operation did not return all page ranges remaining within the current page.
   *                          The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of get
   *                          items. The marker value is opaque to the client.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private listPageRangeDiffItemSegments;
  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private listPageRangeDiffItems;
  /**
   * Returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   *  .byPage() returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the pageBlobClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>").getPageBlobClient("<your-blob-name>");`
   * let i = 1;
   * for await (const pageRange of pageBlobClient.listPageRangesDiff()) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = pageBlobClient.listPageRangesDiff();
   * let pageRangeItem = await iter.next();
   * while (!pageRangeItem.done) {
   *   console.log(`Page range ${i++}: ${pageRangeItem.value.start} - ${pageRangeItem.value.end}, IsClear: ${pageRangeItem.value.isClear}`);
   *   pageRangeItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of pageBlobClient.listPageRangesDiff().byPage({ maxPageSize: 20 })) {
   *   for (const pageRange of response) {
   *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = pageBlobClient.listPageRangesDiff().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 page ranges
   * for (const pageRange of response) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = pageBlobClient.listPageRangesDiff().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 page ranges
   * for (const blob of response) {
   *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
   * }
   * ```
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns An asyncIterableIterator that supports paging.
   */
  listPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options?: PageBlobListPageRangesDiffOptions
  ): PagedAsyncIterableIterator<
    PageRangeInfo,
    PageBlobGetPageRangesDiffResponseModel
  >;
  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob for managed disks.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page blob
   * @param count - Number of bytes to get ranges diff.
   * @param prevSnapshotUrl - URL of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   * @returns Response data for the Page Blob Get Page Range Diff operation.
   */
  getPageRangesDiffForManagedDisks(
    offset: number,
    count: number,
    prevSnapshotUrl: string,
    options?: PageBlobGetPageRangesDiffOptions
  ): Promise<PageBlobGetPageRangesDiffResponse>;
  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param size - Target size
   * @param options - Options to the Page Blob Resize operation.
   * @returns Response data for the Page Blob Resize operation.
   */
  resize(
    size: number,
    options?: PageBlobResizeOptions
  ): Promise<PageBlobResizeResponse>;
  /**
   * Sets a page blob's sequence number.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param sequenceNumberAction - Indicates how the service should modify the blob's sequence number.
   * @param sequenceNumber - Required if sequenceNumberAction is max or update
   * @param options - Options to the Page Blob Update Sequence Number operation.
   * @returns Response data for the Page Blob Update Sequence Number operation.
   */
  updateSequenceNumber(
    sequenceNumberAction: SequenceNumberActionType,
    sequenceNumber?: number,
    options?: PageBlobUpdateSequenceNumberOptions
  ): Promise<PageBlobUpdateSequenceNumberResponse>;
  /**
   * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
   * The snapshot is copied such that only the differential changes between the previously
   * copied snapshot are transferred to the destination.
   * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
   * @see https://docs.microsoft.com/rest/api/storageservices/incremental-copy-blob
   * @see https://docs.microsoft.com/en-us/azure/virtual-machines/windows/incremental-snapshots
   *
   * @param copySource - Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param options - Options to the Page Blob Copy Incremental operation.
   * @returns Response data for the Page Blob Copy Incremental operation.
   */
  startCopyIncremental(
    copySource: string,
    options?: PageBlobStartCopyIncrementalOptions
  ): Promise<PageBlobCopyIncrementalResponse>;
}

/** Defines headers for PageBlob_copyIncremental operation. */
export declare interface PageBlobCopyIncrementalHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** String identifier for this copy operation. Use with Get Blob Properties to check the status of this copy operation, or pass to Abort Copy Blob to abort a pending copy. */
  copyId?: string;
  /** State of the copy operation identified by x-ms-copy-id. */
  copyStatus?: CopyStatusType;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the copyIncremental operation. */
export declare type PageBlobCopyIncrementalResponse =
  PageBlobCopyIncrementalHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: PageBlobCopyIncrementalHeaders;
    };
  };

/** Defines headers for PageBlob_create operation. */
export declare interface PageBlobCreateHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** A DateTime value returned by the service that uniquely identifies the blob. The value of this header indicates the blob version, and may be used in subsequent requests to access this version of the blob. */
  versionId?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link PageBlobClient.createIfNotExists} operation.
 */
export declare interface PageBlobCreateIfNotExistsOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: PremiumPageBlobTier | string;
}

/**
 * Contains response data for the {@link PageBlobClient.createIfNotExists} operation.
 */
export declare interface PageBlobCreateIfNotExistsResponse
  extends PageBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   */
  succeeded: boolean;
}

/**
 * Options to configure the {@link PageBlobClient.create} operation.
 */
export declare interface PageBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when creating a page blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies immutability policy for a blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  immutabilityPolicy?: BlobImmutabilityPolicy;
  /**
   * Optional. Indicates if a legal hold should be placed on the blob.
   * Note that is parameter is only applicable to a blob within a container that
   * has version level worm enabled.
   */
  legalHold?: boolean;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: PremiumPageBlobTier | string;
  /**
   * Blob tags.
   */
  tags?: Tags;
}

/** Contains response data for the create operation. */
export declare type PageBlobCreateResponse = PageBlobCreateHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: PageBlobCreateHeaders;
  };
};

/** Defines headers for PageBlob_getPageRangesDiff operation. */
export declare interface PageBlobGetPageRangesDiffHeaders {
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** The size of the blob in bytes. */
  blobContentLength?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link PageBlobClient.getRangesDiff} operation.
 */
export declare interface PageBlobGetPageRangesDiffOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges diff.
   */
  conditions?: BlobRequestConditions;
  /**
   * (unused)
   */
  range?: string;
}

/**
 * Contains response data for the {@link BlobClient.getPageRangesDiff} operation.
 */
export declare interface PageBlobGetPageRangesDiffResponse
  extends PageList,
    PageBlobGetPageRangesDiffHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: PageBlobGetPageRangesDiffHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PageList;
  };
}

/** Contains response data for the getPageRangesDiff operation. */
export declare type PageBlobGetPageRangesDiffResponseModel =
  PageBlobGetPageRangesDiffHeaders &
    PageList_2 & {
      /** The underlying HTTP response. */
      _response: coreHttp.HttpResponse & {
        /** The response body as text (string format) */
        bodyAsText: string;
        /** The response body as parsed JSON or XML */
        parsedBody: PageList_2;
        /** The parsed HTTP response headers. */
        parsedHeaders: PageBlobGetPageRangesDiffHeaders;
      };
    };

/** Defines headers for PageBlob_getPageRanges operation. */
export declare interface PageBlobGetPageRangesHeaders {
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** The size of the blob in bytes. */
  blobContentLength?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link PageBlobClient.getPageRanges} operation.
 */
export declare interface PageBlobGetPageRangesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Contains response data for the {@link BlobClient.getPageRanges} operation.
 */
export declare interface PageBlobGetPageRangesResponse
  extends PageList,
    PageBlobGetPageRangesHeaders {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: PageBlobGetPageRangesHeaders;
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;
    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PageList;
  };
}

/** Contains response data for the getPageRanges operation. */
export declare type PageBlobGetPageRangesResponseModel =
  PageBlobGetPageRangesHeaders &
    PageList_2 & {
      /** The underlying HTTP response. */
      _response: coreHttp.HttpResponse & {
        /** The response body as text (string format) */
        bodyAsText: string;
        /** The response body as parsed JSON or XML */
        parsedBody: PageList_2;
        /** The parsed HTTP response headers. */
        parsedHeaders: PageBlobGetPageRangesHeaders;
      };
    };

/**
 * Options to configure the {@link PageBlobClient.listPageRangesDiff} operation.
 */
export declare interface PageBlobListPageRangesDiffOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges diff.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure the {@link PageBlobClient.listPageRanges} operation.
 */
export declare interface PageBlobListPageRangesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
}

/**
 * Conditions to add to the creation of this page blob.
 */
export declare interface PageBlobRequestConditions
  extends BlobRequestConditions,
    SequenceNumberAccessConditions {}

/** Defines headers for PageBlob_resize operation. */
export declare interface PageBlobResizeHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link PageBlobClient.resize} operation.
 */
export declare interface PageBlobResizeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when resizing a page blob.
   */
  conditions?: BlobRequestConditions;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the resize operation. */
export declare type PageBlobResizeResponse = PageBlobResizeHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: PageBlobResizeHeaders;
  };
};

/**
 * Options to configure {@link PageBlobClient.startCopyIncremental} operation.
 */
export declare interface PageBlobStartCopyIncrementalOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when starting a copy incremental operation.
   */
  conditions?: ModifiedAccessConditions;
}

/** Defines headers for PageBlob_updateSequenceNumber operation. */
export declare interface PageBlobUpdateSequenceNumberHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** The current sequence number for a page blob. This header is not returned for block blobs or append blobs */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link PageBlobClient.updateSequenceNumber} operation.
 */
export declare interface PageBlobUpdateSequenceNumberOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   */
  conditions?: BlobRequestConditions;
}

/** Contains response data for the updateSequenceNumber operation. */
export declare type PageBlobUpdateSequenceNumberResponse =
  PageBlobUpdateSequenceNumberHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: PageBlobUpdateSequenceNumberHeaders;
    };
  };

/** Defines headers for PageBlob_uploadPagesFromURL operation. */
export declare interface PageBlobUploadPagesFromURLHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** The current sequence number for the page blob. */
  blobSequenceNumber?: number;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned when the blob was encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure {@link PageBlobClient.uploadPagesFromURL} operation.
 */
export declare interface PageBlobUploadPagesFromURLOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   */
  sourceConditions?: MatchConditions & ModificationConditions;
  /**
   * An MD5 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
  /**
   * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
   */
  sourceAuthorization?: HttpAuthorization;
}

/** Contains response data for the uploadPagesFromURL operation. */
export declare type PageBlobUploadPagesFromURLResponse =
  PageBlobUploadPagesFromURLHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: PageBlobUploadPagesFromURLHeaders;
    };
  };

/** Defines headers for PageBlob_uploadPages operation. */
export declare interface PageBlobUploadPagesHeaders {
  /** The ETag contains a value that you can use to perform operations conditionally. If the request version is 2011-08-18 or newer, the ETag value will be in quotes. */
  etag?: string;
  /** Returns the date and time the container was last modified. Any operation that modifies the blob, including an update of the blob's metadata or properties, changes the last-modified time of the blob. */
  lastModified?: Date;
  /** If the blob has an MD5 hash and this operation is to read the full blob, this response header is returned so that the client can check for message content integrity. */
  contentMD5?: Uint8Array;
  /** This header is returned so that the client can check for message content integrity. The value of this header is computed by the Blob service; it is not necessarily the same value specified in the request headers. */
  xMsContentCrc64?: Uint8Array;
  /** The current sequence number for the page blob. */
  blobSequenceNumber?: number;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** The value of this header is set to true if the contents of the request are successfully encrypted using the specified algorithm, and false otherwise. */
  isServerEncrypted?: boolean;
  /** The SHA-256 hash of the encryption key used to encrypt the pages. This header is only returned when the pages were encrypted with a customer-provided key. */
  encryptionKeySha256?: string;
  /** Returns the name of the encryption scope used to encrypt the blob contents and application metadata.  Note that the absence of this header implies use of the default account encryption scope. */
  encryptionScope?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link PageBlobClient.uploadPages} operation.
 */
export declare interface PageBlobUploadPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading pages.
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Callback to receive events on the progress of upload pages operation.
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the content. This hash is used to verify the integrity of the content during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content. This hash is used to verify the integrity of the content during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   */
  encryptionScope?: string;
}

/** Contains response data for the uploadPages operation. */
export declare type PageBlobUploadPagesResponse = PageBlobUploadPagesHeaders & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The parsed HTTP response headers. */
    parsedHeaders: PageBlobUploadPagesHeaders;
  };
};

/**
 * List of page ranges for a blob.
 */
export declare interface PageList {
  /**
   * Valid non-overlapping page ranges.
   */
  pageRange?: Range_2[];
  /**
   * Present if the prevSnapshot parameter was specified and there were cleared
   * pages between the previous snapshot and the target snapshot.
   */
  clearRange?: Range_2[];
}

/** the list of pages */
declare interface PageList_2 {
  pageRange?: PageRange[];
  clearRange?: ClearRange[];
  continuationToken?: string;
}

declare interface PageRange {
  start: number;
  end: number;
}

export declare interface PageRangeInfo {
  start: number;
  end: number;
  isClear: boolean;
}

/**
 * The multipart/mixed response which contains the response for each subrequest.
 */
export declare interface ParsedBatchResponse {
  /**
   * The parsed sub responses.
   */
  subResponses: BatchSubResponse[];
  /**
   * The succeeded executed sub responses' count;
   */
  subResponsesSucceededCount: number;
  /**
   * The failed executed sub responses' count;
   */
  subResponsesFailedCount: number;
}

/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export declare class Pipeline implements PipelineLike {
  /**
   * A list of chained request policy factories.
   */
  readonly factories: RequestPolicyFactory[];
  /**
   * Configures pipeline logger and HTTP client.
   */
  readonly options: PipelineOptions;
  /**
   * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
   *
   * @param factories -
   * @param options -
   */
  constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
  /**
   * Transfer Pipeline object to ServiceClientOptions object which is required by
   * ServiceClient constructor.
   *
   * @returns The ServiceClientOptions object from this Pipeline.
   */
  toServiceClientOptions(): ServiceClientOptions;
}

/**
 * An interface for the {@link Pipeline} class containing HTTP request policies.
 * You can create a default Pipeline by calling {@link newPipeline}.
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 *
 * Refer to {@link newPipeline} and provided policies before implementing your
 * customized Pipeline.
 */
export declare interface PipelineLike {
  /**
   * A list of chained request policy factories.
   */
  readonly factories: RequestPolicyFactory[];
  /**
   * Configures pipeline logger and HTTP client.
   */
  readonly options: PipelineOptions;
  /**
   * Transfer Pipeline object to ServiceClientOptions object which is required by
   * ServiceClient constructor.
   *
   * @returns The ServiceClientOptions object from this Pipeline.
   */
  toServiceClientOptions(): ServiceClientOptions;
}

/**
 * Option interface for Pipeline constructor.
 */
export declare interface PipelineOptions {
  /**
   * Optional. Configures the HTTP client to send requests and receive responses.
   */
  httpClient?: IHttpClient;
}

export { PollerLike };

/**
 * Abstract representation of a poller, intended to expose just the minimal API that the user needs to work with.
 */
export declare interface PollerLikeWithCancellation<
  TState extends PollOperationState<TResult>,
  TResult
> {
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Stops the poller. After this, no manual or automated requests can be sent.
   */
  stopPolling(): void;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Attempts to cancel the underlying operation.
   */
  cancelOperation(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns the state of the operation.
   * The TState defined in PollerLike can be a subset of the TState defined in
   * the Poller implementation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a serialized version of the poller's operation
   * by invoking the operation's toString method.
   */
  toString(): string;
}

export { PollOperationState };

/**
 * Specifies the page blob tier to set the blob to. This is only applicable to page blobs on premium storage accounts.
 * Please see {@link https://docs.microsoft.com/azure/storage/storage-premium-storage#scalability-and-performance-targets|here}
 * for detailed information on the corresponding IOPS and throughput per PageBlobTier.
 */
export declare enum PremiumPageBlobTier {
  /**
   * P4 Tier.
   */
  P4 = "P4",
  /**
   * P6 Tier.
   */
  P6 = "P6",
  /**
   * P10 Tier.
   */
  P10 = "P10",
  /**
   * P15 Tier.
   */
  P15 = "P15",
  /**
   * P20 Tier.
   */
  P20 = "P20",
  /**
   * P30 Tier.
   */
  P30 = "P30",
  /**
   * P40 Tier.
   */
  P40 = "P40",
  /**
   * P50 Tier.
   */
  P50 = "P50",
  /**
   * P60 Tier.
   */
  P60 = "P60",
  /**
   * P70 Tier.
   */
  P70 = "P70",
  /**
   * P80 Tier.
   */
  P80 = "P80",
}

/** Defines values for PublicAccessType. */
export declare type PublicAccessType = "container" | "blob";

/**
 * Range for Blob Service Operations.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-the-range-header-for-blob-service-operations
 */
declare interface Range_2 {
  /**
   * StartByte, larger than or equal 0.
   */
  offset: number;
  /**
   * Optional. Count of bytes, larger than 0.
   * If not provided, will return bytes from offset to the end.
   */
  count?: number;
}
export { Range_2 as Range };

/** Defines values for RehydratePriority. */
export declare type RehydratePriority = "High" | "Standard";

export { RequestPolicy };

export { RequestPolicyFactory };

export { RequestPolicyOptions };

export { RestError };

/** the retention policy which determines how long the associated data should persist */
export declare interface RetentionPolicy {
  /** Indicates whether a retention policy is enabled for the storage service */
  enabled: boolean;
  /** Indicates the number of days that metrics or logging or soft-deleted data should be retained. All data older than this value will be deleted */
  days?: number;
}

/**
 * Allowed IP range for a SAS.
 */
export declare interface SasIPRange {
  /**
   * Starting IP address in the IP range.
   * If end IP doesn't provide, start IP will the only IP allowed.
   */
  start: string;
  /**
   * Optional. IP address that ends the IP range.
   * If not provided, start IP will the only IP allowed.
   */
  end?: string;
}

/**
 * Protocols for generated SAS.
 */
export declare enum SASProtocol {
  /**
   * Protocol that allows HTTPS only
   */
  Https = "https",
  /**
   * Protocol that allows both HTTPS and HTTP
   */
  HttpsAndHttp = "https,http",
}

/**
 * Represents the components that make up an Azure Storage SAS' query parameters. This type is not constructed directly
 * by the user; it is only generated by the {@link AccountSASSignatureValues} and {@link BlobSASSignatureValues}
 * types. Once generated, it can be encoded into a {@link String} and appended to a URL directly (though caution should
 * be taken here in case there are existing query parameters, which might affect the appropriate means of appending
 * these query parameters).
 *
 * NOTE: Instances of this class are immutable.
 */
export declare class SASQueryParameters {
  /**
   * The storage API version.
   */
  readonly version: string;
  /**
   * Optional. The allowed HTTP protocol(s).
   */
  readonly protocol?: SASProtocol;
  /**
   * Optional. The start time for this SAS token.
   */
  readonly startsOn?: Date;
  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   */
  readonly expiresOn?: Date;
  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSASPermissions}, {@link BlobSASPermissions}, or {@link ContainerSASPermissions} for
   * more details.
   */
  readonly permissions?: string;
  /**
   * Optional. The storage services being accessed (only for Account SAS). Please refer to {@link AccountSASServices}
   * for more details.
   */
  readonly services?: string;
  /**
   * Optional. The storage resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSASResourceTypes} for more details.
   */
  readonly resourceTypes?: string;
  /**
   * Optional. The signed identifier (only for {@link BlobSASSignatureValues}).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  readonly identifier?: string;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  readonly encryptionScope?: string;
  /**
   * Optional. Specifies which resources are accessible via the SAS (only for {@link BlobSASSignatureValues}).
   * @see https://docs.microsoft.com/rest/api/storageservices/create-service-sas#specifying-the-signed-resource-blob-service-only
   */
  readonly resource?: string;
  /**
   * The signature for the SAS token.
   */
  readonly signature: string;
  /**
   * Value for cache-control header in Blob/File Service SAS.
   */
  readonly cacheControl?: string;
  /**
   * Value for content-disposition header in Blob/File Service SAS.
   */
  readonly contentDisposition?: string;
  /**
   * Value for content-encoding header in Blob/File Service SAS.
   */
  readonly contentEncoding?: string;
  /**
   * Value for content-length header in Blob/File Service SAS.
   */
  readonly contentLanguage?: string;
  /**
   * Value for content-type header in Blob/File Service SAS.
   */
  readonly contentType?: string;
  /**
   * Inner value of getter ipRange.
   */
  private readonly ipRangeInner?;
  /**
   * The Azure Active Directory object ID in GUID format.
   * Property of user delegation key.
   */
  private readonly signedOid?;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   * Property of user delegation key.
   */
  private readonly signedTenantId?;
  /**
   * The date-time the key is active.
   * Property of user delegation key.
   */
  private readonly signedStartsOn?;
  /**
   * The date-time the key expires.
   * Property of user delegation key.
   */
  private readonly signedExpiresOn?;
  /**
   * Abbreviation of the Azure Storage service that accepts the user delegation key.
   * Property of user delegation key.
   */
  private readonly signedService?;
  /**
   * The service version that created the user delegation key.
   * Property of user delegation key.
   */
  private readonly signedVersion?;
  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Storage service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This is only used for User Delegation SAS.
   */
  readonly preauthorizedAgentObjectId?: string;
  /**
   * A GUID value that will be logged in the storage diagnostic logs and can be used to correlate SAS generation with storage resource access.
   * This is only used for User Delegation SAS.
   */
  readonly correlationId?: string;
  /**
   * Optional. IP range allowed for this SAS.
   *
   * @readonly
   */
  get ipRange(): SasIPRange | undefined;
  /**
   * Creates an instance of SASQueryParameters.
   *
   * @param version - Representing the storage version
   * @param signature - Representing the signature for the SAS token
   * @param permissions - Representing the storage permissions
   * @param services - Representing the storage services being accessed (only for Account SAS)
   * @param resourceTypes - Representing the storage resource types being accessed (only for Account SAS)
   * @param protocol - Representing the allowed HTTP protocol(s)
   * @param startsOn - Representing the start time for this SAS token
   * @param expiresOn - Representing the expiry time for this SAS token
   * @param ipRange - Representing the range of valid IP addresses for this SAS token
   * @param identifier - Representing the signed identifier (only for Service SAS)
   * @param resource - Representing the storage container or blob (only for Service SAS)
   * @param cacheControl - Representing the cache-control header (only for Blob/File Service SAS)
   * @param contentDisposition - Representing the content-disposition header (only for Blob/File Service SAS)
   * @param contentEncoding - Representing the content-encoding header (only for Blob/File Service SAS)
   * @param contentLanguage - Representing the content-language header (only for Blob/File Service SAS)
   * @param contentType - Representing the content-type header (only for Blob/File Service SAS)
   * @param userDelegationKey - Representing the user delegation key properties
   * @param preauthorizedAgentObjectId - Representing the authorized AAD Object ID (only for User Delegation SAS)
   * @param correlationId - Representing the correlation ID (only for User Delegation SAS)
   * @param encryptionScope -
   */
  constructor(
    version: string,
    signature: string,
    permissions?: string,
    services?: string,
    resourceTypes?: string,
    protocol?: SASProtocol,
    startsOn?: Date,
    expiresOn?: Date,
    ipRange?: SasIPRange,
    identifier?: string,
    resource?: string,
    cacheControl?: string,
    contentDisposition?: string,
    contentEncoding?: string,
    contentLanguage?: string,
    contentType?: string,
    userDelegationKey?: UserDelegationKey,
    preauthorizedAgentObjectId?: string,
    correlationId?: string,
    encryptionScope?: string
  );
  /**
   * Creates an instance of SASQueryParameters.
   *
   * @param version - Representing the storage version
   * @param signature - Representing the signature for the SAS token
   * @param options - Optional. Options to construct the SASQueryParameters.
   */
  constructor(
    version: string,
    signature: string,
    options?: SASQueryParametersOptions
  );
  /**
   * Encodes all SAS query parameters into a string that can be appended to a URL.
   *
   */
  toString(): string;
  /**
   * A private helper method used to filter and append query key/value pairs into an array.
   *
   * @param queries -
   * @param key -
   * @param value -
   */
  private tryAppendQueryParameter;
}

/**
 * Options to construct {@link SASQueryParameters}.
 */
export declare interface SASQueryParametersOptions {
  /**
   * Optional only when identifier is provided.
   * Please refer to {@link AccountSASPermissions}, {@link BlobSASPermissions}, or {@link ContainerSASPermissions} for
   * more details.
   */
  permissions?: string;
  /**
   * Optional. The storage services being accessed (only for Account SAS). Please refer to {@link AccountSASServices}
   * for more details.
   */
  services?: string;
  /**
   * Optional. The storage resource types being accessed (only for Account SAS). Please refer to
   * {@link AccountSASResourceTypes} for more details.
   */
  resourceTypes?: string;
  /**
   * Optional. The allowed HTTP protocol(s).
   */
  protocol?: SASProtocol;
  /**
   * Optional. The start time for this SAS token.
   */
  startsOn?: Date;
  /**
   * Optional only when identifier is provided. The expiry time for this SAS token.
   */
  expiresOn?: Date;
  /**
   * Optional. IP ranges allowed in this SAS.
   */
  ipRange?: SasIPRange;
  /**
   * Optional. The signed identifier (only for {@link BlobSASSignatureValues}).
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
  /**
   * Optional. Specifies which resources are accessible via the SAS (only for {@link BlobSASSignatureValues}).
   * @see https://docs.microsoft.com/rest/api/storageservices/create-service-sas#specifying-the-signed-resource-blob-service-only
   */
  resource?: string;
  /**
   * Value for cache-control header in Blob/File Service SAS.
   */
  cacheControl?: string;
  /**
   * Value for content-disposition header in Blob/File Service SAS.
   */
  contentDisposition?: string;
  /**
   * Value for content-encoding header in Blob/File Service SAS.
   */
  contentEncoding?: string;
  /**
   * Value for content-length header in Blob/File Service SAS.
   */
  contentLanguage?: string;
  /**
   * Value for content-type header in Blob/File Service SAS.
   */
  contentType?: string;
  /**
   * User delegation key properties.
   */
  userDelegationKey?: UserDelegationKey;
  /**
   * Authorized AAD Object ID in GUID format. The AAD Object ID of a user authorized by the owner of the User Delegation Key
   * to perform the action granted by the SAS. The Azure Storage service will ensure that the owner of the user delegation key
   * has the required permissions before granting access but no additional permission check for the user specified in
   * this value will be performed. This cannot be used in conjuction with {@link signedUnauthorizedUserObjectId}.
   * This is only used for User Delegation SAS.
   */
  preauthorizedAgentObjectId?: string;
  /**
   * A GUID value that will be logged in the storage diagnostic logs and can be used to correlate SAS generation with storage resource access.
   * This is only used for User Delegation SAS.
   */
  correlationId?: string;
}

/** Parameter group */
export declare interface SequenceNumberAccessConditions {
  /** Specify this header value to operate only on a blob if it has a sequence number less than or equal to the specified. */
  ifSequenceNumberLessThanOrEqualTo?: number;
  /** Specify this header value to operate only on a blob if it has a sequence number less than the specified. */
  ifSequenceNumberLessThan?: number;
  /** Specify this header value to operate only on a blob if it has the specified sequence number. */
  ifSequenceNumberEqualTo?: number;
}

/** Defines values for SequenceNumberActionType. */
export declare type SequenceNumberActionType = "max" | "update" | "increment";

/** Defines headers for Service_filterBlobs operation. */
export declare interface ServiceFilterBlobsHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobServiceClient.findBlobsByTags} operation.
 */
export declare interface ServiceFindBlobByTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * The response of {@link BlobServiceClient.findBlobsByTags} operation.
 */
export declare type ServiceFindBlobsByTagsSegmentResponse = FilterBlobSegment &
  ServiceFilterBlobsHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ServiceFilterBlobsHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: FilterBlobSegmentModel;
    };
  };

/**
 * Options to configure {@link BlobServiceClient.generateAccountSasUrl} operation.
 */
export declare interface ServiceGenerateAccountSasUrlOptions {
  /**
   * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
   * library.
   */
  version?: string;
  /**
   * Optional. SAS protocols allowed.
   */
  protocol?: SASProtocol;
  /**
   * Optional. When the SAS will take effect.
   */
  startsOn?: Date;
  /**
   * Optional. IP range allowed.
   */
  ipRange?: SasIPRange;
  /**
   * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
   */
  encryptionScope?: string;
}

/** Defines headers for Service_getAccountInfo operation. */
export declare interface ServiceGetAccountInfoHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Identifies the sku name of the account */
  skuName?: SkuName;
  /** Identifies the account kind */
  accountKind?: AccountKind;
  /** Version 2019-07-07 and newer. Indicates if the account has a hierarchical namespace enabled. */
  isHierarchicalNamespaceEnabled?: boolean;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobServiceClient.getAccountInfo} operation.
 */
export declare interface ServiceGetAccountInfoOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the getAccountInfo operation. */
export declare type ServiceGetAccountInfoResponse =
  ServiceGetAccountInfoHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceGetAccountInfoHeaders;
    };
  };

/** Defines headers for Service_getProperties operation. */
export declare interface ServiceGetPropertiesHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobServiceClient.getProperties} operation.
 */
export declare interface ServiceGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the getProperties operation. */
export declare type ServiceGetPropertiesResponse = ServiceGetPropertiesHeaders &
  BlobServiceProperties & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;
      /** The response body as parsed JSON or XML */
      parsedBody: BlobServiceProperties;
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceGetPropertiesHeaders;
    };
  };

/** Defines headers for Service_getStatistics operation. */
export declare interface ServiceGetStatisticsHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobServiceClient.getStatistics} operation.
 */
export declare interface ServiceGetStatisticsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the getStatistics operation. */
export declare type ServiceGetStatisticsResponse = ServiceGetStatisticsHeaders &
  BlobServiceStatistics & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;
      /** The response body as parsed JSON or XML */
      parsedBody: BlobServiceStatistics;
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceGetStatisticsHeaders;
    };
  };

/** Defines headers for Service_getUserDelegationKey operation. */
export declare interface ServiceGetUserDelegationKeyHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** UTC date/time value generated by the service that indicates the time at which the response was initiated */
  date?: Date;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the Service - Get User Delegation Key.
 */
export declare interface ServiceGetUserDelegationKeyOptions
  extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link getUserDelegationKey} operation.
 */
export declare type ServiceGetUserDelegationKeyResponse = UserDelegationKey &
  ServiceGetUserDelegationKeyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ServiceGetUserDelegationKeyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: UserDelegationKeyModel;
    };
  };

/**
 * Options to configure the {@link BlobServiceClient.listContainers} operation.
 */
export declare interface ServiceListContainersOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
  /**
   * Specifies whether the container's metadata
   *                                   should be returned as part of the response body.
   */
  includeMetadata?: boolean;
  /**
   * Specifies whether soft deleted containers should be included in the response.
   */
  includeDeleted?: boolean;
  /**
   * Specifies whether system containers should be included in the response.
   */
  includeSystem?: boolean;
}

/** Defines headers for Service_listContainersSegment operation. */
export declare interface ServiceListContainersSegmentHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** Error Code */
  errorCode?: string;
}

/** Contains response data for the listContainersSegment operation. */
export declare type ServiceListContainersSegmentResponse =
  ServiceListContainersSegmentHeaders &
    ListContainersSegmentResponse & {
      /** The underlying HTTP response. */
      _response: coreHttp.HttpResponse & {
        /** The response body as text (string format) */
        bodyAsText: string;
        /** The response body as parsed JSON or XML */
        parsedBody: ListContainersSegmentResponse;
        /** The parsed HTTP response headers. */
        parsedHeaders: ServiceListContainersSegmentHeaders;
      };
    };

/**
 * Options to configure {@link BlobServiceClient.renameContainer} operation.
 */
export declare interface ServiceRenameContainerOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Condition to meet for the source container.
   */
  sourceCondition?: LeaseAccessConditions;
}

/** Defines headers for Service_setProperties operation. */
export declare interface ServiceSetPropertiesHeaders {
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** Error Code */
  errorCode?: string;
}

/**
 * Options to configure the {@link BlobServiceClient.setProperties} operation.
 */
export declare interface ServiceSetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
}

/** Contains response data for the setProperties operation. */
export declare type ServiceSetPropertiesResponse =
  ServiceSetPropertiesHeaders & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceSetPropertiesHeaders;
    };
  };

/** Defines headers for Service_submitBatch operation. */
export declare interface ServiceSubmitBatchHeaders {
  /** The media type of the body of the response. For batch requests, this is multipart/mixed; boundary=batchresponse_GUID */
  contentType?: string;
  /** This header uniquely identifies the request that was made and can be used for troubleshooting the request. */
  requestId?: string;
  /** Indicates the version of the Blob service used to execute the request. This header is returned for requests made against version 2009-09-19 and above. */
  version?: string;
  /** If a client request id header is sent in the request, this header will be present in the response with the same value. */
  clientRequestId?: string;
  /** Error Code */
  errorCode?: string;
}

/** Optional parameters. */
export declare interface ServiceSubmitBatchOptionalParamsModel
  extends coreHttp.OperationOptions {
  /** The timeout parameter is expressed in seconds. For more information, see <a href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting Timeouts for Blob Service Operations.</a> */
  timeoutInSeconds?: number;
  /** Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled. */
  requestId?: string;
}

/** Contains response data for the submitBatch operation. */
export declare type ServiceSubmitBatchResponseModel =
  ServiceSubmitBatchHeaders & {
    /**
     * BROWSER ONLY
     *
     * The response body as a browser Blob.
     * Always `undefined` in node.js.
     */
    blobBody?: Promise<Blob>;
    /**
     * NODEJS ONLY
     *
     * The response body as a node.js Readable stream.
     * Always `undefined` in the browser.
     */
    readableStreamBody?: NodeJS.ReadableStream;
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The parsed HTTP response headers. */
      parsedHeaders: ServiceSubmitBatchHeaders;
    };
  };

/**
 * Options to configure {@link BlobServiceClient.undeleteContainer} operation.
 */
export declare interface ServiceUndeleteContainerOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. Specifies the new name of the restored container.
   * Will use its original name if this is not specified.
   * @deprecated Restore container to a different name is not supported by service anymore.
   */
  destinationContainerName?: string;
}

/**
 * Signed identifier.
 */
export declare interface SignedIdentifier {
  /**
   * a unique id
   */
  id: string;
  /**
   * Access Policy
   */
  accessPolicy: {
    /**
     * Optional. The date-time the policy is active
     */
    startsOn?: Date;
    /**
     * Optional. The date-time the policy expires
     */
    expiresOn?: Date;
    /**
     * The permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permissions?: string;
  };
}

/** signed identifier */
export declare interface SignedIdentifierModel {
  /** a unique id */
  id: string;
  /** An Access policy */
  accessPolicy: AccessPolicy;
}

/** Defines values for SkuName. */
export declare type SkuName =
  | "Standard_LRS"
  | "Standard_GRS"
  | "Standard_RAGRS"
  | "Standard_ZRS"
  | "Premium_LRS";

/** The properties that enable an account to host a static website */
export declare interface StaticWebsite {
  /** Indicates whether this account is hosting a static website */
  enabled: boolean;
  /** The default name of the index page under each directory */
  indexDocument?: string;
  /** The absolute path of the custom 404 page */
  errorDocument404Path?: string;
  /** Absolute path of the default index page */
  defaultIndexDocumentPath?: string;
}

/**
 * Defines the known cloud audiences for Storage.
 */
export declare enum StorageBlobAudience {
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Storage.
   */
  StorageOAuthScopes = "https://storage.azure.com/.default",
  /**
   * The OAuth scope to use to retrieve an AAD token for Azure Disk.
   */
  DiskComputeOAuthScopes = "https://disk.compute.azure.com/.default",
}

/**
 * StorageBrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * StorageBrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 */
export declare class StorageBrowserPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of StorageBrowserPolicy.
   * @param nextPolicy -
   * @param options -
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
  /**
   * Sends out request.
   *
   * @param request -
   */
  sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}

/**
 * StorageBrowserPolicyFactory is a factory class helping generating StorageBrowserPolicy objects.
 */
export declare class StorageBrowserPolicyFactory
  implements RequestPolicyFactory
{
  /**
   * Creates a StorageBrowserPolicyFactory object.
   *
   * @param nextPolicy -
   * @param options -
   */
  create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): StorageBrowserPolicy;
}

/**
 * A StorageClient represents a based URL class for {@link BlobServiceClient}, {@link ContainerClient}
 * and etc.
 */
declare abstract class StorageClient {
  /**
   * Encoded URL string value.
   */
  readonly url: string;
  readonly accountName: string;
  /* Excluded from this release type: pipeline */
  /**
   * Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   */
  readonly credential:
    | StorageSharedKeyCredential
    | AnonymousCredential
    | TokenCredential;
  /**
   * StorageClient is a reference to protocol layer operations entry, which is
   * generated by AutoRest generator.
   */
  protected readonly storageClientContext: StorageClientContext;
  /**
   */
  protected readonly isHttps: boolean;
  /**
   * Creates an instance of StorageClient.
   * @param url - url to resource
   * @param pipeline - request policy pipeline.
   */
  protected constructor(url: string, pipeline: PipelineLike);
}

declare class StorageClientContext extends coreHttp.ServiceClient {
  url: string;
  version: string;
  /**
   * Initializes a new instance of the StorageClientContext class.
   * @param url The URL of the service account, container, or blob that is the target of the desired
   *            operation.
   * @param options The parameter options
   */
  constructor(url: string, options?: StorageClientOptionalParams);
}

/** Optional parameters. */
declare interface StorageClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}

/**
 * The OAuth scope to use with Azure Storage.
 */
export declare const StorageOAuthScopes: string | string[];

/**
 * Options interface for the {@link newPipeline} function.
 */
export declare interface StoragePipelineOptions {
  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxyOptions;
  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentOptions;
  /**
   * Configures the built-in retry policy behavior.
   */
  retryOptions?: StorageRetryOptions;
  /**
   * Keep alive configurations. Default keep-alive is enabled.
   */
  keepAliveOptions?: KeepAliveOptions;
  /**
   * Configures the HTTP client to send requests and receive responses.
   */
  httpClient?: IHttpClient;
  /**
   * The audience used to retrieve an AAD token.
   */
  audience?: string | string[];
}

/**
 * Storage Blob retry options interface.
 */
export declare interface StorageRetryOptions {
  /**
   * Optional. StorageRetryPolicyType, default is exponential retry policy.
   */
  readonly retryPolicyType?: StorageRetryPolicyType;
  /**
   * Optional. Max try number of attempts, default is 4.
   * A value of 1 means 1 try and no retries.
   * A value smaller than 1 means default retry number of attempts.
   */
  readonly maxTries?: number;
  /**
   * Optional. Indicates the maximum time in ms allowed for any single try of an HTTP request.
   * A value of zero or undefined means no default timeout on SDK client, Azure
   * Storage server's default timeout policy will be used.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-blob-service-operations
   */
  readonly tryTimeoutInMs?: number;
  /**
   * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
   * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
   * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
   */
  readonly retryDelayInMs?: number;
  /**
   * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
   * If you specify 0, then you must also specify 0 for retryDelayInMs.
   */
  readonly maxRetryDelayInMs?: number;
  /**
   * If a secondaryHost is specified, retries will be tried against this host. If secondaryHost is undefined
   * (the default) then operations are not retried against another host.
   *
   * NOTE: Before setting this field, make sure you understand the issues around
   * reading stale and potentially-inconsistent data at
   * {@link https://docs.microsoft.com/en-us/azure/storage/common/storage-designing-ha-apps-with-ragrs}
   */
  readonly secondaryHost?: string;
}

/**
 * Retry policy with exponential retry and linear retry implemented.
 */
export declare class StorageRetryPolicy extends BaseRequestPolicy {
  /**
   * RetryOptions.
   */
  private readonly retryOptions;
  /**
   * Creates an instance of RetryPolicy.
   *
   * @param nextPolicy -
   * @param options -
   * @param retryOptions -
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    retryOptions?: StorageRetryOptions
  );
  /**
   * Sends request.
   *
   * @param request -
   */
  sendRequest(request: WebResource): Promise<HttpOperationResponse>;
  /**
   * Decide and perform next retry. Won't mutate request parameter.
   *
   * @param request -
   * @param secondaryHas404 -  If attempt was against the secondary & it returned a StatusNotFound (404), then
   *                                   the resource was not found. This may be due to replication delay. So, in this
   *                                   case, we'll never try the secondary again for this operation.
   * @param attempt -           How many retries has been attempted to performed, starting from 1, which includes
   *                                   the attempt will be performed by this method call.
   */
  protected attemptSendRequest(
    request: WebResource,
    secondaryHas404: boolean,
    attempt: number
  ): Promise<HttpOperationResponse>;
  /**
   * Decide whether to retry according to last HTTP response and retry counters.
   *
   * @param isPrimaryRetry -
   * @param attempt -
   * @param response -
   * @param err -
   */
  protected shouldRetry(
    isPrimaryRetry: boolean,
    attempt: number,
    response?: HttpOperationResponse,
    err?: RestError
  ): boolean;
  /**
   * Delay a calculated time between retries.
   *
   * @param isPrimaryRetry -
   * @param attempt -
   * @param abortSignal -
   */
  private delay;
}

/**
 * StorageRetryPolicyFactory is a factory class helping generating {@link StorageRetryPolicy} objects.
 */
export declare class StorageRetryPolicyFactory implements RequestPolicyFactory {
  private retryOptions?;
  /**
   * Creates an instance of StorageRetryPolicyFactory.
   * @param retryOptions -
   */
  constructor(retryOptions?: StorageRetryOptions);
  /**
   * Creates a StorageRetryPolicy object.
   *
   * @param nextPolicy -
   * @param options -
   */
  create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): StorageRetryPolicy;
}

/**
 * RetryPolicy types.
 */
export declare enum StorageRetryPolicyType {
  /**
   * Exponential retry. Retry time delay grows exponentially.
   */
  EXPONENTIAL = 0,
  /**
   * Linear retry. Retry time delay grows linearly.
   */
  FIXED = 1,
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
export declare class StorageSharedKeyCredential extends Credential_2 {
  /**
   * Azure Storage account name; readonly.
   */
  readonly accountName: string;
  /**
   * Azure Storage account key; readonly.
   */
  private readonly accountKey;
  /**
   * Creates an instance of StorageSharedKeyCredential.
   * @param accountName -
   * @param accountKey -
   */
  constructor(accountName: string, accountKey: string);
  /**
   * Creates a StorageSharedKeyCredentialPolicy object.
   *
   * @param nextPolicy -
   * @param options -
   */
  create(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions
  ): StorageSharedKeyCredentialPolicy;
  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param stringToSign -
   */
  computeHMACSHA256(stringToSign: string): string;
}

/**
 * StorageSharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 */
export declare class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
  /**
   * Reference to StorageSharedKeyCredential which generates StorageSharedKeyCredentialPolicy
   */
  private readonly factory;
  /**
   * Creates an instance of StorageSharedKeyCredentialPolicy.
   * @param nextPolicy -
   * @param options -
   * @param factory -
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    factory: StorageSharedKeyCredential
  );
  /**
   * Signs request.
   *
   * @param request -
   */
  protected signRequest(request: WebResource): WebResource;
  /**
   * Retrieve header value according to shared key sign rules.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
   *
   * @param request -
   * @param headerName -
   */
  private getHeaderValueToSign;
  /**
   * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
   * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
   * 2. Convert each HTTP header name to lowercase.
   * 3. Sort the headers lexicographically by header name, in ascending order.
   *    Each header may appear only once in the string.
   * 4. Replace any linear whitespace in the header value with a single space.
   * 5. Trim any whitespace around the colon in the header.
   * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
   *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
   *
   * @param request -
   */
  private getCanonicalizedHeadersString;
  /**
   * Retrieves the webResource canonicalized resource string.
   *
   * @param request -
   */
  private getCanonicalizedResourceString;
}

/** Defines values for SyncCopyStatusType. */
export declare type SyncCopyStatusType = "success";

/**
 * Specifies HTTP options for conditional requests based on blob tags.
 */
export declare interface TagConditions {
  /**
   * Optional SQL statement to apply to the tags of the blob.
   */
  tagConditions?: string;
}

/**
 * Blob tags.
 */
export declare type Tags = Record<string, string>;

/**
 * A user delegation key.
 */
export declare interface UserDelegationKey {
  /**
   * The Azure Active Directory object ID in GUID format.
   */
  signedObjectId: string;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   */
  signedTenantId: string;
  /**
   * The date-time the key is active.
   */
  signedStartsOn: Date;
  /**
   * The date-time the key expires.
   */
  signedExpiresOn: Date;
  /**
   * Abbreviation of the Azure Storage service that accepts the key.
   */
  signedService: string;
  /**
   * The service version that created the key.
   */
  signedVersion: string;
  /**
   * The key as a base64 string.
   */
  value: string;
}

/** A user delegation key */
export declare interface UserDelegationKeyModel {
  /** The Azure Active Directory object ID in GUID format. */
  signedObjectId: string;
  /** The Azure Active Directory tenant ID in GUID format */
  signedTenantId: string;
  /** The date-time the key is active */
  signedStartsOn: string;
  /** The date-time the key expires */
  signedExpiresOn: string;
  /** Abbreviation of the Azure Storage service that accepts the key */
  signedService: string;
  /** The service version that created the key */
  signedVersion: string;
  /** The key as a base64 string */
  value: string;
}

export { WebResource };

export {};

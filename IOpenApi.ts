export interface IOpenAPI {
  openapi: string;
  info: Info;
  servers?: Server[];
  paths: Record<string, PathItem>;
  components?: Components;
  security?: Record<string, any>[];
  tags?: { name: string; description?: string }[];
  externalDocs?: { description?: string; url: string };
  [extension: `x-${string}`]: any;
}

export interface Info {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
  };
}

export interface Server {
  url: string;
  description?: string;
  variables?: Record<string, any>;
}

export type HttpMethod =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";

export type PathItem = {
  summary?: string;
  description?: string;
  servers?: IOpenAPI["servers"];
  parameters?: Parameter[];
} & {
  [method in HttpMethod]?: Operation;
};

export interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
  callbacks?: Record<string, PathItem>;
  deprecated?: boolean;
  security?: Record<string, any>[];
  servers?: IOpenAPI["servers"];
}

export interface Parameter {
  name: string;
  in: "query" | "header" | "path" | "cookie" | (string & {});
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  schema?: Schema | Reference;
  [extension: `x-${string}`]: any;
}

export interface RequestBody {
  description?: string;
  content: Record<string, MediaType>;
  required?: boolean;
  [extension: `x-${string}`]: any;
}

export interface Response {
  description: string;
  headers?: Record<string, Header | Reference>;
  content?: Record<string, MediaType>;
  links?: Record<string, Link | Reference>;
  [extension: `x-${string}`]: any;
}

export interface MediaType {
  schema?: Schema | Reference;
  example?: any;
  examples?: Record<string, Example | Reference>;
  encoding?: Record<string, Encoding>;
}

export interface Components {
  schemas?: Record<string, Schema | Reference>;
  responses?: Record<string, Response | Reference>;
  parameters?: Record<string, Parameter | Reference>;
  examples?: Record<string, Example | Reference>;
  requestBodies?: Record<string, RequestBody | Reference>;
  headers?: Record<string, Header | Reference>;
  securitySchemes?: Record<string, SecurityScheme | Reference>;
  links?: Record<string, Link | Reference>;
  callbacks?: Record<string, PathItem | Reference>;
}

export type Schema = {
  type?: string;
  format?: string;
  nullable?: boolean;
  enum?: any[];
  items?: Schema | Reference;
  properties?: Record<string, Schema | Reference>;
  required?: string[];
  additionalProperties?: boolean | Schema | Reference;
  allOf?: (Schema | Reference)[];
  oneOf?: (Schema | Reference)[];
  anyOf?: (Schema | Reference)[];
  not?: Schema | Reference;
  description?: string;
  default?: any;
  [extension: `x-${string}`]: any;
};

export interface Reference {
  $ref: string;
}

export interface Example {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
}

export interface Encoding {
  contentType?: string;
  headers?: Record<string, Header | Reference>;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
}

export interface Header extends Parameter {}

export interface Link {
  operationRef?: string;
  operationId?: string;
  parameters?: Record<string, any>;
  requestBody?: any;
  description?: string;
  server?: NonNullable<IOpenAPI["servers"]>[number];
}

export type SecurityScheme =
  | {
      type: "apiKey" | (string & {});
      description?: string;
      name: string;
      in: "query" | "header" | "cookie" | (string & {});
    }
  | {
      type: "http" | (string & {});
      description?: string;
      scheme: string;
      bearerFormat?: string;
    }
  | {
      type: "oauth2" | (string & {});
      description?: string;
      flows: Record<string, any>;
    }
  | {
      type: "openIdConnect" | (string & {});
      description?: string;
      openIdConnectUrl: string;
    };

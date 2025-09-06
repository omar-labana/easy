export type XGenerator = string;
export type OpenAPIVersion = '3.0.0';

export interface Info {
  title: string;
  version: string;
}

export interface Server {
  url: string;
}

export type Servers = Server[];

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'
  | 'CONNECT';

export type Path = Record<string, unknown>;

export type Paths = Record<string, Path>;

export type Schema = Record<string, unknown>;

export interface Components {
  schemas: Record<string, Schema>;
}

export interface Document {
  'x-generator': XGenerator;
  'openapi': OpenAPIVersion;
  'info': Info;
  'servers': Servers;
  'paths': Paths;
  'components': Components;
}

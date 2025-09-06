import { consola } from 'consola';
import { parseURL } from 'ufo';
import { $fetch } from 'ofetch';
import { Document } from '@interfaces';

class Sequence {
  url: string;
  document?: Document;

  constructor(url: string) {
    this.url = url;
  }

  validateURL() {
    const parsed = parseURL(this.url);

    if (!parsed.host || !parsed.pathname.endsWith('.json')) {
      throw new Error('Invalid URL. Please provide a valid URL to a JSON Swagger file.');
    }
  }

  async fetchSwaggerDocument() {
    try {
      this.document = await $fetch<Document>(this.url);
    } catch (error) {
      throw new Error(`Failed to fetch Swagger document: ${error}`);
    }
  }

  async start() {
    consola.start(`Parsing Swagger file from ${this.url}`);

    this.validateURL();

    consola.success(`Successfully validated Swagger JSON file URL from ${this.url}`);

    consola.info(`Fetching Swagger document from ${this.url}`);

    await this.fetchSwaggerDocument();

    if (!this.document) return;

    consola.success(`Successfully fetched Swagger document: ${this.document['x-generator']}`);
  }
}

export default Sequence;

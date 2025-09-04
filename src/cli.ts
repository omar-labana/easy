import { defineCommand } from 'citty';
import { parseURL } from 'ufo';
import { consola } from 'consola';

const main = defineCommand({
  meta: {
    name: 'easy',
    version: '0.1.0',
    description: 'Easy Swagger Parser',
  },
  args: {
    url: {
      type: 'positional',
      description: 'The complete URL for the JSON Swagger file to parse',
      required: true,
    },
  },
  run({ args }) {
    consola.start(`Parsing Swagger file from ${args.url}`);

    const parsed = parseURL(args.url);

    if (!parsed.host || !parsed.pathname.endsWith('.json')) {
      consola.error('Provided URL is not a valid JSON file URL.');
      Deno.exit(1);
    }

    consola.success(`Successfully validated Swagger JSON file from ${args.url}`);
  },
});

export default main;

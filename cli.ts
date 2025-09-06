import { defineCommand } from 'citty';
import Sequence from '@/Sequence.ts';

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
    const sequence = new Sequence(args.url);

    try {
      sequence.start();
    } catch (error) {
      console.log(error);
    }

    // const document = $fetch<Document>(args.url).then((res) =>
    //   consola.success(`Successfully fetched Swagger document: ${res['x-generator']}`)
    // );
  },
});

export default main;

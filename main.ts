import { runMain } from 'citty';
import main from '@/cli.ts';

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  runMain(main);
}

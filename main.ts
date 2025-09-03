// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Hello World");
// }

import SwaggerJson from './swagger.json' with { type: 'json'}
import { IOpenAPI } from './IOpenApi.ts';
const swaggerObject: IOpenAPI = SwaggerJson;

console.log(swaggerObject.openapi); 
console.log(swaggerObject.info.title); 
console.log(swaggerObject.paths["/azure/token"].get?.responses["200"].description);
console.log(swaggerObject.components?.securitySchemes?.JWTBearerAuth);
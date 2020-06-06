import { merge } from 'lodash';

import { 
  directive as authDirective,
  schema as authDirectiveSchema 
} from './auth.directives';

export const schema = [
  authDirectiveSchema
];

export const directives = merge(
  authDirective
);

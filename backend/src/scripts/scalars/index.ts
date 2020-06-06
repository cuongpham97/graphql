import { merge } from 'lodash';

import {
  schema as DateScalarSchema,
  resolvers as DateScalarResolvers
} from './date.scalars';

export const schema = [
  DateScalarSchema
];

export const resolvers = merge(
  DateScalarResolvers
);

import { SchemaDirectiveVisitor } from "graphql-tools";
import { defaultFieldResolver } from "graphql";
import { gql } from "apollo-server-express";

export const schema = gql` directive @auth on FIELD_DEFINITION | OBJECT `;

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: any) {
    this.ensureFieldsWrapped(type);
    type._requireAuth = true;
  }

  visitFieldDefinition(field: any, details: any) {
    this.ensureFieldsWrapped(details.objectType);
    field._requireAuth = true;
  }

  ensureFieldsWrapped(objectType: any) {

    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args: any[]) {

        let requireAuth = field._requireAuth || objectType._requireAuth;

        if(!requireAuth) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        
        //Get token here
        console.log('auth directive run');

        return resolve.apply(this, args);
      };
    });
  }
}

export const directive = {
  auth: AuthDirective
}

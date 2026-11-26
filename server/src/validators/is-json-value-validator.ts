import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";
import isJSONValidator from "validator/lib/isJSON";

export function IsJSONValue(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: "IsJSONValue",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value === "string") {
            return isJSONValidator(value);
          } else if (value !== undefined) {
            return isJSONValidator(JSON.stringify(value));
          }

          return value;
        },
        defaultMessage(args: ValidationArguments): string {
          return `${args.property} must be a valid json`;
        },
      },
    });
  };
}

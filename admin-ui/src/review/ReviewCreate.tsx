import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  TextInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
} from "react-admin";

import { ListingTitle } from "../listing/ListingTitle";
import { UserTitle } from "../user/UserTitle";

export const ReviewCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="comments" multiline source="comments" />
        <ReferenceInput source="listing.id" reference="Listing" label="listing">
          <SelectInput optionText={ListingTitle} />
        </ReferenceInput>
        <NumberInput label="ratings" source="ratings" />
        <ReferenceInput source="user.id" reference="User" label="user">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

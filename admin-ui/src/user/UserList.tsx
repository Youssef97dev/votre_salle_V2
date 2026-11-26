import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  BooleanField,
} from "react-admin";
import Pagination from "../Components/Pagination";

export const UserList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Users"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Adresse" source="adresse" />
        <TextField label="companyInfo" source="companyInfo" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="First Name" source="firstName" />
        <TextField label="ID" source="id" />
        <BooleanField label="isVerified" source="isVerified" />
        <TextField label="Last Name" source="lastName" />
        <TextField label="pack" source="pack" />
        <TextField label="phone" source="phone" />
        <TextField label="Profile Image" source="profileImage" />
        <TextField label="Profile Logo" source="profileLogo" />
        <TextField label="roleNotification" source="roleNotification" />
        <TextField label="Roles" source="roles" />
        <BooleanField label="suspended" source="suspended" />
        <TextField label="typeUser" source="typeUser" />
        <TextField label="typeUserNotification" source="typeUserNotification" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Username" source="username" />
        <TextField label="verificationToken" source="verificationToken" />
      </Datagrid>
    </List>
  );
};

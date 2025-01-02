export type User = {
  firstName : string;
  lastName : string;
  email : string;
  address : Address;
}

export type Address = {
  street : string;
  city : string;
  postalCode : string;
  country : string;
}

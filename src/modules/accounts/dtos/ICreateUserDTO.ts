interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar_file?: string;
}

export { ICreateUserDTO };

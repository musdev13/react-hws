export interface PostDTO {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface UserDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface PostFormData {
  title: string;
  body: string;
}
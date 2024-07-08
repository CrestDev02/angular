// INTERFACE, INITIAL STATE FOR THE STORE
export interface user {
  name: string;
  username: string;
  email: string;
}

export interface UserState {
  users: user[];
}

export const intialState = {
  users: [
    {
      name: '',
      username: '',
      email: '',
    },
  ],
};

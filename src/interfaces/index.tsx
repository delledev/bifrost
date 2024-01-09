import { Dispatch, SetStateAction } from 'react';
import { User } from 'libs/types/user';

export interface DataType {
  message: string;
  user: User;
  token: string;
}

export interface ResponseType {
  data: DataType;
  success: boolean;
}

export interface childrenType {
  children: JSX.Element;
}

export interface UserContextType {
  isLoading: boolean;
  sessionSet: boolean;
  currentUser: User | undefined | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSessionSet: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<User | undefined | null>>;
}

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../../types/types';

const user: IUser = {
  _id: '',
  _type: 'user',
  name: '',
  username: '',
  image: '',
};

const AllUsersContext = createContext<IUser[]>([user]);

const fethAllUsers = async () => {
  const response = await axios.get(`/api/users`);
  return response.data.users;
};

export const AllUsersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fethAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <AllUsersContext.Provider value={users}>
      {children}
    </AllUsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(AllUsersContext);

import { useState, useEffect } from "react";
import UserList from "../../components/UserAccounts/UserList";
import UserService from "../../services/UserService";
import User from "../../types/User";
import Loader from "../../components/Loader";

const EmplCollectionPage = () => {
  const [userList, setUserlist] = useState<User[]>([]);
  const api = UserService.getInstance();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getEmployees()
      .then((users) => {
        setUserlist(users);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api]);

  return <>{loading ? <Loader /> : <UserList users={userList} />}</>;
};

export default EmplCollectionPage;

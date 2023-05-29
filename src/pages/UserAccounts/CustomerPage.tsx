import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserServiceJames";
import User from "../../types/User";
import Loader from "../../components/Loader";
import NotFound from "../NotFound";
import UserInfoCard from "../../components/UserAccounts/ViewPage/UserInfoCard";
import UserActions from "../../components/UserAccounts/ViewPage/UserActions";

const CustomerPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const api = UserService.getInstance();

  useEffect(() => {
    api
      .getCustomer(id!)
      .then((user) => {
        setUser(user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [api, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : user === null ? (
        <NotFound />
      ) : (
        <Container>
          <UserInfoCard user={user} />
          <UserActions user={user} setUser={setUser} />
        </Container>
      )}
    </>
  );
};

export default CustomerPage;

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import UserService from "../../services/UserService";
import User from "../../types/User";
import NotFound from "../NotFound";
import UserInfoCard from "../../components/UserAccounts/UserInfoCard";
import UserActions from "../../components/UserAccounts/UserActions";

const EmployeePage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const api = UserService.getInstance();

  useEffect(() => {
    api
      .getEmployee(id!)
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
          <UserActions user={user} />
        </Container>
      )}
    </>
  );
};

export default EmployeePage;

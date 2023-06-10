import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserServiceJames";
import User from "../../types/User";
import Loader from "../../components/Loader";
import NotFound from "../NotFound";
import UserInfoCard from "../../components/UserAccounts/ViewPage/UserInfoCard";
import UserActions from "../../components/UserAccounts/ViewPage/UserActions";
import axios from "axios";

const CustomerPage = () => {
  const  {pk}  = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const api = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
  })


  useEffect(() => {

    api
    .get(`http://localhost:8080/accounts-api/customers/${pk}`).then(res=>{setUser(res.data)}).catch(err=>{console.log("There was an error when attempting to fetch customer with primary key: " + pk)});
  }, []);

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

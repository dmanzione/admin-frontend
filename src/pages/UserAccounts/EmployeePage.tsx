import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ListElement from "../../components/UserAccounts/ListElement";
import { prettifyPhoneNumber } from "../../helpers/Prettify";
import UserService from "../../services/UserService";
import User from "../../types/User";
import NotFound from "../NotFound";

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
        <Card>
          <Card.Body>
            <ListElement title="Full Name" content={user?.fullName()!} />
            <hr />
            <ListElement title="Email" content={user?.email!} />
            <hr />
            <ListElement title="Phone" content={prettifyPhoneNumber(user?.phone!)} />
            <hr />
            <ListElement title="Address" content={user?.address.toString()!} />
            <hr />
            <ListElement title="Role" content={user?.role.name!} />
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default EmployeePage;

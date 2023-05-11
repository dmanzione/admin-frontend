import { Card } from "react-bootstrap";
import User from "../../types/User";
import { prettifyPhoneNumber } from "../../helpers/Prettify";
import ListElement from "./ListElement";
import AccountStatus from "../../types/AccountStatus";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  const headerStyle = ((status: AccountStatus) => {
    switch (status) {
      case AccountStatus.OPEN:
        return "bg-success";
      case AccountStatus.CLOSED:
        return "bg-danger";
      case AccountStatus.FROZEN:
        return "bg-warning";
    }
  })(user.status);

  return (
    <Card>
      <Card.Header className={"text-light " + headerStyle}>
        <Card.Title>Account status: {user.status}</Card.Title>
      </Card.Header>
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
  );
};

export default UserInfoCard;

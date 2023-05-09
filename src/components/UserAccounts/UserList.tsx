import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import User from "../../types/User";
import UserElement from "./UserElement";
import UserService from "../../services/UserService";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return <UserElement key={user.id} user={user} />;
        })}
      </tbody>
    </Table>
  );
};

export default UserList;

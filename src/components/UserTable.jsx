import { useState } from "react";
import DeleteUserConfirmationModal from "./DeleteUserConfirmationModal";
import "./UserTable.css";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";

const UserTable = (props) => {
  const [deleteUserId, setDeleteUserId] = useState(undefined);
  const [viewUser, setViewUser] = useState(undefined);
  const [editUser, setEditUser] = useState(undefined);

  return (
    <>
      <div className="head">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>P/W</th>
              <th>Tanggal Lahir</th>
              <th>Tanggal Input</th>
              <th>Aksi</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="body">
        <table>
          <tbody>
            {props.userList.map((user, i) => (
              <tr key={user.id}>
                <th>{i + 1}</th>
                <th>{user.name}</th>
                <th>{user.address}</th>
                <th>{user.gender}</th>
                <th>{user.dob}</th>
                <th>{user.doi}</th>
                <th>
                  <div>
                    <button onClick={() => setViewUser(user)}>View</button>
                    <button onClick={() => setEditUser(user)}>Edit</button>
                    <button
                      onClick={() => {
                        setDeleteUserId(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteUserId && (
        <DeleteUserConfirmationModal
          userId={deleteUserId}
          refetch={() => props.refetch()}
          setIsLoading={() => props.setIsLoading()}
          onClose={() => setDeleteUserId(undefined)}
        ></DeleteUserConfirmationModal>
      )}

      {viewUser && (
        <ViewUserModal
          user={viewUser}
          onClose={() => setViewUser(undefined)}
          setIsLoading={() => props.setIsLoading()}
        ></ViewUserModal>
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(undefined)}
          refetch={() => props.refetch()}
          setIsLoading={() => props.setIsLoading()}
        ></EditUserModal>
      )}
    </>
  );
};

export default UserTable;

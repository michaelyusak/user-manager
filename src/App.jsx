import { useEffect, useState } from "react";
import "./App.css";
import { GetAllUser } from "../util/API";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import LoadingModal from "./components/LoadingModal";

function App() {
  const [userList, setUserList] = useState([]);
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllUser = () => {
    GetAllUser()
      .then((data) => {
        setUserList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <>
      <section className="content">
        <div>
          <div>
            <button onClick={() => setIsShowAddUserModal(true)}>
              Tambah User
            </button>
          </div>
          <UserTable
            userList={userList}
            setIsLoading={(isLoading) => setIsLoading(isLoading)}
            refetch={() => fetchAllUser()}
          ></UserTable>
        </div>
      </section>

      {isLoading && <LoadingModal></LoadingModal>}

      {isShowAddUserModal && (
        <AddUserModal
          onClose={() => setIsShowAddUserModal(false)}
          refetch={() => fetchAllUser()}
          setIsLoading={(isLoading) => setIsLoading(isLoading)}
        ></AddUserModal>
      )}
    </>
  );
}

export default App;

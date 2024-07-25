import { useState } from "react";
import { PostOneUser } from "../../util/API";
import "./AddAndEditUserModal.css";
import { convertToStrDate } from "../../util/DateConverter";
import { NameRegex } from "../../util/Regex";

const AddUserModal = (props) => {
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userDOB, setUserDOB] = useState("");

  function handleDateOfBirthChange(e) {
    const currentDate = new Date();
    const inputDate = new Date(e.target.value);

    if (inputDate > currentDate) {
      alert("tanggal lahir tidak valid")
      e.target.value = "";
    }

    setUserDOB(e.target.value);
  }

  async function handlePostOneUser() {
    if (!NameRegex.test(userName)) {
      alert("nama harus diisi dan hanya dapat terdiri dari huruf")
      return
    }

    if (userAddress == "") {
      alert("alamat harus diisi")
      return
    }

    if (userGender == "") {
      alert("jenis kelamin harus dipilih salah satunya")
      return
    }

    if (userDOB == "") {
      alert("tanggal lahir harus diisi")
      return
    }

    PostOneUser(userName, userAddress, userGender, convertToStrDate(userDOB))
      .then(() => {
        props.onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="modal">
      <div className="overlay" onClick={() => props.onClose()}></div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          
          props.setIsLoading(true);

          handlePostOneUser().then(() => {
            props.setIsLoading(false);
            
            props.refetch();
          });
        }}
      >
        <div className="inputField">
          <p>Nama:</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>

        <div className="inputField">
          <p>Alamat:</p>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          ></input>
        </div>

        <div className="inputField">
          <p>P/W:</p>
          <div className="gender-radio-buttons">
            <div>
              <input
                type="radio"
                name="gender"
                value={userGender == "Pria"}
                onChange={(e) => {
                  e.target.value && setUserGender("Pria");
                }}
              ></input>
              <label>Pria</label>
            </div>

            <div>
              <input
                type="radio"
                name="gender"
                value={userGender == "Wanita"}
                onChange={(e) => {
                  e.target.value && setUserGender("Wanita");
                }}
              ></input>
              <label>Wanita</label>
            </div>
          </div>
        </div>

        <div className="inputField">
          <p>Tanggal lahir:</p>
          <input
            type="date"
            onBlur={(e) => {
              handleDateOfBirthChange(e);
            }}
          ></input>
        </div>

        <div>
          <button type="button" onClick={() => props.onClose()}>
            Cancel
          </button>
          <button>OK</button>
        </div>
      </form>
    </section>
  );
};

export default AddUserModal;

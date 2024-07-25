import { useState } from "react";
import "./AddAndEditUserModal.css";
import { convertToIntDate } from "../../util/DateConverter";
import { NameRegex } from "../../util/Regex";
import { PutOneUser } from "../../util/API";

const EditUserModal = (props) => {
  const [userName, setUserName] = useState(props.user.name);
  const [userAddress, setUserAddress] = useState(props.user.address);
  const [userGender, setUserGender] = useState(props.user.gender);
  const [userDOB, setUserDOB] = useState(props.user.dob);

  function handleDateOfBirthChange(e) {
    const currentDate = new Date();
    const inputDate = new Date(e.target.value);

    if (inputDate > currentDate) {
      alert("tanggal lahir tidak valid");
      e.target.value = "";
    }

    setUserDOB(e.target.value);
  }

  async function handlePutOneUser() {
    if (!NameRegex.test(userName)) {
      alert("nama harus diisi dan hanya dapat terdiri dari huruf");
      return;
    }

    if (userAddress == "") {
      alert("alamat harus diisi");
      return;
    }

    if (userGender == "") {
      alert("jenis kelamin harus dipilih salah satunya");
      return;
    }

    if (userDOB == "") {
      alert("tanggal lahir harus diisi");
      return;
    }

    PutOneUser(props.user.id, userName, userAddress, userGender, userDOB)
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

          handlePutOneUser().then(() => {
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
          <p>P/W:{props.user.gender}</p>
          <div className="gender-radio-buttons">
            <div>
              <input
                type="radio"
                name="gender"
                value={userGender == "Pria"}
                checked={userGender == "Pria"}
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
                checked={userGender == "Wanita"}
                onChange={(e) => {
                  e.target.value && setUserGender("Wanita");
                }}
              ></input>
              <label>Wanita</label>
            </div>
          </div>
        </div>

        <div className="inputField">
          <p>Tanggal lahir: </p>
          <input
            type="date"
            value={convertToIntDate(userDOB)}
            onBlur={(e) => {
              handleDateOfBirthChange(e);
            }}
          ></input>
        </div>

        <div>
          <button type="button" onClick={() => props.onClose()}>
            Cancel
          </button>
          <button>Save</button>
        </div>
      </form>
    </section>
  );
};

export default EditUserModal;

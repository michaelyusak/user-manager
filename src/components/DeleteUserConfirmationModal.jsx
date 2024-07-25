import { DeleteOneUser } from "../../util/API";
import "./DeleteUserConfirmationModal.css";

const DeleteUserConfirmationModal = (props) => {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="dialog">
        <p>Apakah anda yakin?</p>

        <div>
          <button onClick={() => props.onClose()}>Tidak</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setIsLoading(true);

              DeleteOneUser(props.userId)
                .then(() => {
                  props.refetch();
                })
                .then(() => {
                  props.setIsLoading(false);
                  props.onClose();
                });
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserConfirmationModal;

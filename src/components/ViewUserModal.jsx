import './ViewUserModal.css'

const ViewUserModal = (props) => {
  return (
    <section className="modal">
      <div className="overlay" onClick={() => props.onClose()}></div>

      <div className='outer-wrap'>
        <div className="inputField">
          <p>Nama:</p>
          <p>{props.user.name}</p>
        </div>

        <div className="inputField">
          <p>Alamat:</p>
          <p>{props.user.address}</p>
        </div>

        <div className="inputField">
          <p>P/W:</p>
          <p>{props.user.gender}</p>
        </div>

        <div className="inputField">
          <p>Tanggal lahir:</p>
          <p>{props.user.dob}</p>
        </div>

        <div className="inputField">
          <p>Tanggal input:</p>
          <p>{props.user.doi}</p>
        </div>

        <div>
          <button type="button" onClick={() => props.onClose()}>
            Close
          </button>
        </div>
      </div>
    </section>
  )
}

export default ViewUserModal
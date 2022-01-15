import { Modal } from "react-bootstrap";

const DetailsModal = ({ modalDetail, handleClose }) => {
  return (
    <Modal show={!!modalDetail?.title} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalDetail.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
        <img src={modalDetail.url} className="modal-image" />
        </div>
        <p>{modalDetail.explanation}</p>
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;

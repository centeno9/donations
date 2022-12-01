import { Modal } from "react-bootstrap";
import "./PublicityModalStyles.scss";

export function PublicityModal(props: any) {
    return(
            <Modal
              show={props.show}
              onHide={props.onHide}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="publicity-modal"
            >
              <Modal.Header closeButton>
                
              </Modal.Header>
              <Modal.Body>
                <div>
                    Espacio publicitario
                </div>
              </Modal.Body>
            </Modal>
    )
}
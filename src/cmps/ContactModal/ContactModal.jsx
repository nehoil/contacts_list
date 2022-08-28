import "./ContactModal.scss";
import { Modal } from "antd";
import ContactListItem from "../ContactListItem";

export default function ContactModal({ contact, onClose }) {
  const getContactName = () => {
    return contact?.name?.first + " " + contact?.name?.last;
  };
  return (
    <Modal
      visible={true}
      footer={null}
      onCancel={onClose}
      title={getContactName()}
      className="contact-modal-container">
      <ContactListItem contact={contact} isFullInfoMode={true} />
    </Modal>
  );
}

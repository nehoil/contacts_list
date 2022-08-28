import ContactListItem from "../ContactListItem";
import "./ContactsList.scss";
import { Empty } from "antd";

export default function ContactsList({
  contacts,
  onSelectContact,
  onRemoveContact
}) {
  return (
    <div className="contacts-list-container">
      {contacts?.length ? (
        <ul>
          {contacts.map((contact, idx) => {
            return (
              <ContactListItem
                contact={contact}
                onSelectContact={() => onSelectContact(contact)}
                onRemoveContact={onRemoveContact}
                key={idx}
              />
            );
          })}
        </ul>
      ) : (
        <div className="empty-state">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
}

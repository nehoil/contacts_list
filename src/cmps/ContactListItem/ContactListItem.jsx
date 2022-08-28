import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./ContactListItem.scss";

export default function ContactListItem({
  contact,
  isFullInfoMode = false,
  onSelectContact,
  onRemoveContact
}) {
  const getAgeFromBirthday = birthday => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const getFormattedBirthday = date => {
    return new Date(date).toLocaleDateString();
  };
  const getFullAddress = location => {
    return `${location.street.name} ${location.street.number}, ${location.city}, ${location.country}`;
  };
  const getContactTitle = contact => {
    return `${contact?.name?.title} ${contact?.name?.first} ${contact?.name?.last}`;
  };
  const getEmailLink = email => {
    return `mailto:${email}`;
  };

  return (
    <li className="contact-list-item-container">
      <div className="contact-main-content">
        <div className="contact-image">
          <img
            src={contact?.picture?.thumbnail}
            alt="contact"
            className={contact?.gender}
          />
        </div>
        <div className="contact-details">
          <div className="contact-title">{getContactTitle(contact)}</div>
          <div className="contact-email">
            ✉{" "}
            <a
              href={getEmailLink(contact?.email)}
              target="_blank"
              rel="noopener noreferrer">
              {contact?.email}
            </a>
          </div>
          {isFullInfoMode && (
            <>
              <div className="contact-phone">📞 {contact?.phone}</div>
              <div className="contact-country">
                🌎 {contact?.location?.country}
              </div>
              <div className="contact-country">
                📅 Age: {getAgeFromBirthday(contact?.dob?.date)}{" "}
              </div>
              <div className="contact-country">
                🎉 Birthday: {getFormattedBirthday(contact?.dob?.date)}{" "}
              </div>
              <div className="contact-address">
                📍 Full Address: {getFullAddress(contact?.location)}{" "}
              </div>
            </>
          )}
        </div>
      </div>
      {!isFullInfoMode && (
        <div className="contact-action-buttons">
          <div
            className="more-info-button"
            onClick={() => onSelectContact(contact)}>
            More Info {""}
            <DoubleRightOutlined />
          </div>
          <div
            className="delete-button"
            onClick={() => onRemoveContact(contact?.id?.value)}>
            <DeleteOutlined />
          </div>
        </div>
      )}
    </li>
  );
}

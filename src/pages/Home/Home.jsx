import "./Home.scss";
import { connect } from "react-redux";
import { useState } from "react";
import { addContact, updateContacts } from "../../store/actions/userActions";
import { message } from "antd";
import ContactsList from "../../cmps/ContactsList/ContactsList.jsx";
import ListTitle from "../../cmps/ListTitle/ListTitle.jsx";
import ListActions from "../../cmps/ListActions/ListActions.jsx";
import ContactModal from "../../cmps/ContactModal/ContactModal.jsx";

const _Home = ({ user, addContact, updateContacts }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [form, setForm] = useState({
    search: "",
    sortDirection: "asc",
    sortBy: "firstName"
  });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const onRemoveContact = async contactId => {
    const newContacts = user.contacts.filter(
      contact => contact.id.value !== contactId
    );
    try {
      await updateContacts(newContacts);
      showMessage("success", "Contact removed successfully");
    } catch (error) {
      showMessage("error", "Error removing contact");
    }
  };
  const showMessage = (type, msg) => {
    message[type](msg);
  };
  const onAddContact = async () => {
    try {
      setIsAddingContact(true);
      await addContact();
      showMessage("success", "Contact added successfully");
    } catch (error) {
      showMessage("error", "Failed to add contact");
    } finally {
      setIsAddingContact(false);
    }
  };

  const calculateDaysUntilBirthday = birthday => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const thisYear = today.getFullYear();
    const nextBirthday = new Date(
      thisYear,
      birthDate.getMonth(),
      birthDate.getDate()
    );
    const daysUntilBirthday = Math.ceil(
      (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilBirthday;
  };
  const sortContacts = (sortBy, sortDirection, contacts) => {
    if (sortBy === "firstName") {
      return sortByName(contacts, sortDirection);
    }
    return sortByBirthday(contacts, sortDirection);
  };
  const sortByBirthday = (contacts, sortDirection) => {
    return contacts.sort((a, b) => {
      if (sortDirection === "asc") {
        return (
          calculateDaysUntilBirthday(a.dob.date) -
          calculateDaysUntilBirthday(b.dob.date)
        );
      }
      return (
        calculateDaysUntilBirthday(b.dob.date) -
        calculateDaysUntilBirthday(a.dob.date)
      );
    });
  };
  const sortByName = (contacts, sortDirection) => {
    if (!contacts.length) return [];
    return contacts
      .sort((a, b) => {
        if (sortDirection === "asc") {
          return a?.name?.first > b?.name?.first ? 1 : -1;
        } else {
          return a?.name?.first < b?.name?.first ? 1 : -1;
        }
      })
      .map(contact => contact);
  };
  const filteredContacts = () => {
    const { search, sortDirection, sortBy } = form;
    const sortedContacts = sortContacts(sortBy, sortDirection, user.contacts);
    if (!search) return sortedContacts;
    return sortedContacts.filter(({ name, location, email, dob, phone }) => {
      const valuesToSearch = { ...name, ...location, email, dob, phone };
      const values = Object.values(valuesToSearch).join(" ").toLowerCase();
      return values.includes(search.toLowerCase());
    });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <ListTitle contacts={filteredContacts()} />
        <ListActions
          isAddingContact={isAddingContact}
          form={form}
          onFormChange={setForm}
          onAddContact={onAddContact}
        />
        <ContactsList
          contacts={filteredContacts()}
          onSelectContact={val => setSelectedContact(val)}
          onRemoveContact={onRemoveContact}
        />
        {selectedContact && (
          <ContactModal
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        )}

        <div className="circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = {
  addContact,
  updateContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(_Home);

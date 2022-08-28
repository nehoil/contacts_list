import "./ListTitle.scss";

export default function listTitle({ contacts }) {
  const getCountriesCount = () => {
    const countryCountMap = contacts.reduce((acc, contact) => {
      if (contact?.location?.country) {
        acc[contact?.location?.country] =
          acc[contact?.location?.country] + 1 || 1;
      }
      return acc;
    }, {});
    return Object.keys(countryCountMap).length;
  };
  return (
    <div className="list-title-container">
      Contacts ({contacts.length})
      <div className="countries-count">
        from {JSON.stringify(getCountriesCount())} countries 🌎
      </div>
    </div>
  );
}

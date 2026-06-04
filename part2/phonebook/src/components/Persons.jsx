const Persons = ({ personToShow, onDelete }) => {
  return (
    <ul className="contacts-list">
      {personToShow.map((person) => (
        <li key={person.id} className="contact-card">
          <div className="person-info">
            <span className="person-name">{person.name}</span>

            <span className="person-number">{person.number}</span>
          </div>

          <button className="delete-btn" onClick={() => onDelete(person.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;

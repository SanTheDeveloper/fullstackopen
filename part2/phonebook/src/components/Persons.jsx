const Persons = ({ personToShow, onDelete }) => {
  if (personToShow.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">📭</span>
        <h3>No contacts yet</h3>
        <p>Add your first contact using the form above.</p>
      </div>
    );
  }

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

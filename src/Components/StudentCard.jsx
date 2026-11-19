function StudentCard({ student }) {
  return (
    <div className="student-card">
      <img src={student.image} alt={student.name} />

      <h2>{student.name}</h2>

      <p><strong>Register No:</strong> {student.regNo}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Email:</strong> {student.email}</p>
    </div>
  );
}

export default StudentCard;
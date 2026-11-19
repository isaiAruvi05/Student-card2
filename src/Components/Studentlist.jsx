import students from "../Data/Student.js";
import StudentCard from "./StudentCard";

function Studentlist() {
  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default Studentlist;
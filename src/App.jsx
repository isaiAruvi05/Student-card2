import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Studentlist from "./Components/Studentlist";
import StudentCard from "./Components/StudentCard";
import { initialStudents, initialStaff } from "./Data/Student";
import "./App.css";

function App() {
  const [role, setRole] = useState("staff");
  const [page, setPage] = useState("students");

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("campus_students");
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [staff, setStaff] = useState(() => {
    const saved = localStorage.getItem("campus_staff");
    return saved ? JSON.parse(saved) : initialStaff;
  });

  const [studentForm, setStudentForm] = useState(null);
  const [staffEditing, setStaffEditing] = useState(false);
  const [staffDraft, setStaffDraft] = useState(staff);

  useEffect(() => {
    localStorage.setItem("campus_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("campus_staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    setPage(role === "staff" ? "students" : "student-profile");
    setStudentForm(null);
  }, [role]);

  const saveStudent = (student) => {
    setStudents(current =>
      current.some(item => item.id === student.id)
        ? current.map(item =>
            item.id === student.id ? student : item
          )
        : [student, ...current]
    );

    setStudentForm(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student ID?")) {
      setStudents(current =>
        current.filter(student => student.id !== id)
      );
    }
  };

  const uploadImage = (file, callback) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 1500000) {
      alert("Image must be smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const updateStudentPhoto = (id, file) => {
    uploadImage(file, photo => {
      setStudents(current =>
        current.map(student =>
          student.id === id ? { ...student, photo } : student
        )
      );
    });
  };

  const saveStaff = () => {
    setStaff(staffDraft);
    setStaffEditing(false);
  };

  return (
    <div className="app">

      <Header
        role={role}
        setRole={setRole}
        page={page}
        setPage={setPage}
      />

      <main className="page-container">

        {role === "staff" && page === "staff-profile" ? (

          <section className="panel profile-panel">

            <div className="section-heading">
              <div>
                <p className="eyebrow">STAFF ACCOUNT</p>
                <h1>Staff Profile</h1>
                <p>Manage your staff information.</p>
              </div>

              <button
                className="button primary"
                onClick={() =>
                  staffEditing ? saveStaff() : setStaffEditing(true)
                }
              >
                {staffEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>

            <div className="profile-layout">

              <div className="profile-photo">
                {staff.photo ? (
                  <img src={staff.photo} alt="Staff" />
                ) : (
                  <span>SA</span>
                )}

                {staffEditing && (
                  <label className="photo-button">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        uploadImage(e.target.files?.[0], photo =>
                          setStaffDraft(p => ({ ...p, photo }))
                        )
                      }
                    />
                  </label>
                )}
              </div>

              <div className="profile-fields">

                {[
                  ["name", "Full Name"],
                  ["staffId", "Staff ID"],
                  ["department", "Department"],
                  ["email", "Email"],
                  ["phone", "Phone"]
                ].map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <input
                      disabled={!staffEditing}
                      value={staffDraft[key] || ""}
                      onChange={e =>
                        setStaffDraft(p => ({
                          ...p,
                          [key]: e.target.value
                        }))
                      }
                    />
                  </label>
                ))}

              </div>
            </div>
          </section>

        ) : (

          <Studentlist
            students={students}
            role={role}
            onAdd={() => setStudentForm({
              mode: "add",
              student: null
            })}
            onEdit={student => setStudentForm({
              mode: "edit",
              student
            })}
            onDelete={deleteStudent}
            onPhoto={updateStudentPhoto}
          />

        )}

      </main>

      {studentForm && role === "staff" && (
        <StudentCard
          student={studentForm.student}
          onSave={saveStudent}
          onClose={() => setStudentForm(null)}
        />
      )}

      <footer className="footer">
        Campus ID Management System
      </footer>

    </div>
  );
}

export default App;
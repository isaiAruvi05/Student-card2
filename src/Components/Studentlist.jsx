import { useMemo, useState } from "react";

export default function Studentlist({
  students,
  role,
  onAdd,
  onEdit,
  onDelete,
  onPhoto
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return students.filter(student =>
      `${student.name} ${student.registerNo} ${student.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [students, search]);

  const isStaff = role === "staff";

  return (
    <section>

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            {isStaff ? "STAFF WORKSPACE" : "STUDENT PORTAL"}
          </p>

          <h1>
            {isStaff
              ? "Student ID Card Management"
              : "Student Profiles"}
          </h1>

          <p>
            {isStaff
              ? "Create, edit and manage student identity cards."
              : "Search and view student ID card details."}
          </p>
        </div>

        {isStaff && (
          <button
            className="button primary"
            onClick={onAdd}
          >
            + Create Student ID
          </button>
        )}

      </div>

      <div className="toolbar">

        <input
          className="search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search name, register number or department..."
        />

        <span className="count">
          {filtered.length} Student(s)
        </span>

      </div>

      {filtered.length === 0 ? (

        <div className="empty-state">
          <h3>No Students Found</h3>
          <p>Try another search or create a student ID.</p>
        </div>

      ) : (

        <div className="student-grid">

          {filtered.map(student => (

            <article className="id-card" key={student.id}>

              <div className="id-card-top">
                <span>COLLEGE IDENTITY CARD</span>
                <b>STUDENT</b>
              </div>

              <div className="id-card-body">

                <div className="student-photo-wrap">

                  {student.photo ? (
                    <img
                      className="student-photo"
                      src={student.photo}
                      alt={student.name}
                    />
                  ) : (
                    <div className="student-photo initials">
                      {student.name
                        .split(" ")
                        .map(x => x[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}

                  {isStaff && (
                    <label className="change-photo">
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e =>
                          onPhoto(student.id, e.target.files?.[0])
                        }
                      />
                    </label>
                  )}

                </div>

                <div className="student-details">

                  <h3>{student.name}</h3>

                  <p className="register">
                    {student.registerNo}
                  </p>

                  <p>
                    <b>Department:</b> {student.department}
                  </p>

                  <p>
                    <b>Year:</b> {student.year}
                  </p>

                  <p>
                    <b>Email:</b> {student.email || "—"}
                  </p>

                  <p>
                    <b>Phone:</b> {student.phone || "—"}
                  </p>

                </div>

              </div>

              <div className="id-card-bottom">
                <span>Status: {student.status || "Active"}</span>
                <span>Campus ID</span>
              </div>

              {isStaff && (
                <div className="card-actions">

                  <button
                    className="button secondary"
                    onClick={() => onEdit(student)}
                  >
                    ✎ Edit
                  </button>

                  <button
                    className="button danger"
                    onClick={() => onDelete(student.id)}
                  >
                    Delete
                  </button>

                </div>
              )}

            </article>

          ))}

        </div>
      )}

    </section>
  );
}
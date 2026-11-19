export default function Header({
  role,
  setRole,
  page,
  setPage
}) {
  return (
    <header className="topbar">

      <div className="brand">
        <span className="brand-mark">C</span>
        <span>
          <strong>Campus ID</strong>
          <small>Identity Card Portal</small>
        </span>
      </div>

      <nav className="navigation">

        {role === "staff" && (
          <>
            <button
              className={page === "students" ? "nav-link active" : "nav-link"}
              onClick={() => setPage("students")}
            >
              Manage Students
            </button>

            <button
              className={page === "staff-profile" ? "nav-link active" : "nav-link"}
              onClick={() => setPage("staff-profile")}
            >
              Staff Profile
            </button>
          </>
        )}

        {role === "student" && (
          <button className="nav-link active">
            Student Profiles
          </button>
        )}

      </nav>

      <div className="role-switch">

        <button
          className={role === "staff" ? "chosen" : ""}
          onClick={() => setRole("staff")}
        >
          Staff View
        </button>

        <button
          className={role === "student" ? "chosen" : ""}
          onClick={() => setRole("student")}
        >
          Student View
        </button>

      </div>

    </header>
  );
}
import { useEffect, useState } from "react";

const blankStudent = {
  name: "",
  registerNo: "",
  department: "",
  year: "I Year",
  email: "",
  phone: "",
  photo: "",
  status: "Active"
};

export default function StudentCard({
  student,
  onSave,
  onClose
}) {
  const [form, setForm] = useState(student || blankStudent);

  useEffect(() => {
    setForm(student || blankStudent);
  }, [student]);

  const update = (event) => {
    setForm(current => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 1500000) {
      alert("Choose an image smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm(current => ({
        ...current,
        photo: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();

    onSave({
      ...form,
      id: student?.id ?? Date.now()
    });
  };

  return (
    <div
      className="modal-backdrop"
      onClick={event =>
        event.target === event.currentTarget && onClose()
      }
    >

      <form className="student-form" onSubmit={submit}>

        <div className="form-heading">
          <div>
            <p className="eyebrow">STUDENT RECORD</p>
            <h2>
              {student ? "Edit Student" : "Create Student ID"}
            </h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <label className="photo-upload">

          {form.photo ? (
            <img src={form.photo} alt="Student preview" />
          ) : (
            <span>＋</span>
          )}

          <div>
            <strong>Upload Student Photo</strong>
            <small>JPG or PNG · Maximum 1.5 MB</small>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={changePhoto}
          />

        </label>

        <div className="form-grid">

          <label>
            Full Name
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
            />
          </label>

          <label>
            Register Number
            <input
              name="registerNo"
              value={form.registerNo}
              onChange={update}
              required
            />
          </label>

          <label>
            Department
            <input
              name="department"
              value={form.department}
              onChange={update}
              required
            />
          </label>

          <label>
            Year
            <select
              name="year"
              value={form.year}
              onChange={update}
            >
              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>
            </select>
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={update}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={form.status}
              onChange={update}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="button secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="button primary"
          >
            {student ? "Save Changes" : "Create ID Card"}
          </button>

        </div>

      </form>
    </div>
  );
}
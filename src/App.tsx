import React, { useEffect, useState } from 'react';

// Student type
interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

const API_URL = 'http://localhost:3000/students';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [submitting, setSubmitting] = useState(false);

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch students');
      const data = await res.json();
      setStudents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Open modal for create or edit
  const openModal = (student?: Student) => {
    if (student) {
      setEditStudent(student);
      setForm({ name: student.name, email: student.email, age: String(student.age) });
    } else {
      setEditStudent(null);
      setForm({ name: '', email: '', age: '' });
    }
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setEditStudent(null);
    setForm({ name: '', email: '', age: '' });
  };

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        age: Number(form.age),
      };
      let res;
      if (editStudent) {
        res = await fetch(`${API_URL}/${editStudent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error('Failed to save student');
      closeModal();
      fetchStudents();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete student
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete student');
      fetchStudents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Student Info CRUD</h1>
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => openModal()}
        >
          + Add Student
        </button>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">No students found.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-2 border text-center">{student.id}</td>
                    <td className="p-2 border">{student.name}</td>
                    <td className="p-2 border">{student.email}</td>
                    <td className="p-2 border text-center">{student.age}</td>
                    <td className="p-2 border text-center">
                      <button
                        className="px-2 py-1 bg-yellow-400 rounded mr-2 hover:bg-yellow-500"
                        onClick={() => openModal(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded shadow p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">{editStudent ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  min={1}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : (editStudent ? 'Update' : 'Create')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

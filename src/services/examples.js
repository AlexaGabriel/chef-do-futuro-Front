// Example: How to use the API services in components

import { useState, useEffect } from 'react';
import alunosService from '../services/alunosService';
import cursosService from '../services/cursosService';
import professoresService from '../services/professoresService';

// ============================================================================
// EXAMPLE 1: Fetching a list of students with pagination
// ============================================================================
function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await alunosService.listar({
          pagina: 1,
          limite: 10,
          busca: 'João',
          status: 'ativo'
        });
        setStudents(response.dados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {students.map(student => (
        <li key={student._id}>{student.nome}</li>
      ))}
    </ul>
  );
}

// ============================================================================
// EXAMPLE 2: Creating a new student
// ============================================================================
function CreateStudentForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    nivelCulinaria: 'iniciante'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await alunosService.criar(form);
      console.log('Student created:', response.dados);
      // Redirect or show success message
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
        placeholder="Nome"
        required
      />
      {/* ... other form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Create Student'}
      </button>
    </form>
  );
}

// ============================================================================
// EXAMPLE 3: Updating a student
// ============================================================================
async function updateStudent(studentId, updates) {
  try {
    const response = await alunosService.atualizar(studentId, updates);
    console.log('Updated student:', response.dados);
    return response.dados;
  } catch (error) {
    console.error('Failed to update student:', error);
    throw error;
  }
}

// Usage:
// updateStudent('123abc', { status: 'inativo' });

// ============================================================================
// EXAMPLE 4: Deleting a student
// ============================================================================
async function deleteStudent(studentId) {
  if (!confirm('Are you sure you want to delete this student?')) {
    return;
  }

  try {
    await alunosService.deletar(studentId);
    console.log('Student deleted successfully');
    // Refresh the list or remove from state
  } catch (error) {
    console.error('Failed to delete student:', error);
    alert('Failed to delete student: ' + error.message);
  }
}

// ============================================================================
// EXAMPLE 5: Fetching courses by category
// ============================================================================
function CoursesByCategory({ categoria }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await cursosService.buscarPorCategoria(categoria);
        setCourses(response.dados);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [categoria]);

  if (loading) return <div>Loading courses...</div>;

  return (
    <div>
      <h2>Courses in {categoria}</h2>
      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.titulo}</h3>
          <p>{course.descricao}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// EXAMPLE 6: Fetching courses by professor
// ============================================================================
async function getTeacherCourses(professorId) {
  try {
    const response = await cursosService.buscarPorProfessor(professorId);
    return response.dados;
  } catch (error) {
    console.error('Error fetching teacher courses:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 7: Search with debounce
// ============================================================================
function SearchStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await alunosService.listar({
            busca: searchTerm,
            limite: 20
          });
          setResults(response.dados);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search students..."
      />
      {loading && <div>Searching...</div>}
      <ul>
        {results.map(student => (
          <li key={student._id}>{student.nome}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// EXAMPLE 8: Error handling with toast notifications
// ============================================================================
function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadStudents(filters = {}) {
    setLoading(true);
    try {
      const response = await alunosService.listar(filters);
      setStudents(response.dados);
      return response.dados;
    } catch (error) {
      // Show toast notification
      showToast('error', error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function createStudent(data) {
    try {
      const response = await alunosService.criar(data);
      setStudents(prev => [...prev, response.dados]);
      showToast('success', 'Student created successfully!');
      return response.dados;
    } catch (error) {
      showToast('error', error.message);
      throw error;
    }
  }

  async function updateStudent(id, data) {
    try {
      const response = await alunosService.atualizar(id, data);
      setStudents(prev => 
        prev.map(s => s._id === id ? response.dados : s)
      );
      showToast('success', 'Student updated successfully!');
      return response.dados;
    } catch (error) {
      showToast('error', error.message);
      throw error;
    }
  }

  async function deleteStudent(id) {
    try {
      await alunosService.deletar(id);
      setStudents(prev => prev.filter(s => s._id !== id));
      showToast('success', 'Student deleted successfully!');
    } catch (error) {
      showToast('error', error.message);
      throw error;
    }
  }

  return {
    students,
    loading,
    loadStudents,
    createStudent,
    updateStudent,
    deleteStudent
  };
}

// Placeholder toast function
function showToast(type, message) {
  console.log(`[${type}] ${message}`);
  // Implement actual toast notification here
}

export {
  StudentsList,
  CreateStudentForm,
  updateStudent,
  deleteStudent,
  CoursesByCategory,
  getTeacherCourses,
  SearchStudents,
  useStudents
};

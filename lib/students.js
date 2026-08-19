const STUDENTS_API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getStudents() {
  const response = await fetch(STUDENTS_API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Ne uspeavme da gi vcitame studentite");
  }

  return response.json();
}

export async function getStudent(studentId) {
  const response = await fetch(`${STUDENTS_API_URL}/${studentId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const student = await response.json();

  if (!student.id) {
    return null;
  }

  return student;
}

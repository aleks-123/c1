"use client";

import { useState } from "react";
import StudentForm from "./StudentForm";
import styles from "./StudentRegistrastionDemo.module.css";
import StudentList from "./StudentList";

const initialStudents = [
  {
    id: "student-1",
    name: "Petko Petkoski",
    email: "petko@petko.com",
    course: "React",
    age: 20,
  },
  {
    id: "student-2",
    name: "Pero Peroski",
    email: "pero@pero.com",
    course: "Next.js",
    age: 21,
  },
];

export default function StudentRegistrastionDemo() {
  const [students, setStudents] = useState(initialStudents);

  function addStudent(studentData) {
    const newStudent = {
      id: crypto.randomUUID(),
      ...studentData,
    };

    setStudents((prevStudents) => [...prevStudents, newStudent]);
  }

  function deleteStudent(studentId) {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  }

  return (
    <section className={styles.demo}>
      <StudentForm onAddStudent={addStudent} />
      <StudentList students={students} onDeleteStudent={deleteStudent} />
    </section>
  );
}

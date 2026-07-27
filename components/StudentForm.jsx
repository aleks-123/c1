import { useState } from "react";
import styles from "./StudentForm.module.css";

const inicialFormdata = {
  name: "",
  email: "",
  course: "",
  age: "",
  isAdult: false,
};

export default function StudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState(inicialFormdata);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousError) => ({
        ...previousError,
        [name]: "",
      }));
    }
  }

  function handleAdultChange(event) {
    const { checked } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      isAdult: checked,
    }));
  }

  function validateForm() {
    const newError = {};

    if (!formData.name.trim()) {
      newError.name = "Imeto e zadolzitelno";
    }

    if (!formData.email.includes("@")) {
      newError.email = "Vnesi validaen email";
    }

    if (!formData.age || Number(formData.age) < 18) {
      newError.age = "Studentot mora da e polnoleten";
    }

    if (!formData.isAdult) {
      newError.isAdult = "Potvrdi deka imash najmalku 18 godini";
    }

    return newError;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddStudent({
      ...formData,
      age: Number(formData.age),
    });

    setFormData(inicialFormdata);
    setErrors({});
  }

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.heading}>
          <h2>Registriraj student</h2>
          <p>Vnesi podatoci vo samata forma</p>
        </div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="student-name">Ime i prezime</label>
            <input
              id="student-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ana Petkoska"
              className={errors.name ? styles.inputError : undefined}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="student-email">Email</label>
            <input
              id="student-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={errors.email ? styles.inputError : undefined}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="student-course">Kurs</label>
            <select id="student-course" name="course" value={formData.course} onChange={handleChange}>
              <option value="React">React</option>
              <option value="Next.js">Next.js</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="student-age">Vozrast</label>
            <input
              id="student-age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="23"
              className={errors.age ? styles.inputError : undefined}
            />
            {errors.age && <span className={styles.errorMessage}>{errors.age}</span>}
          </div>

          <div className={styles.checkboxField}>
            <label className={`${styles.checkbox} ${errors.isAdult ? styles.checkboxError : ""}`}>
              <input
                type="checkbox"
                checked={formData.isAdult}
                onChange={handleAdultChange}
                aria-label="Polnoleten student"
              />
              <span>Ve molam potvrdete deka ste polnoletni</span>
            </label>
            {errors.isAdult && <span className={styles.errorMessage}>{errors.isAdult}</span>}
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          Registriraj
        </button>
      </form>
    </div>
  );
}

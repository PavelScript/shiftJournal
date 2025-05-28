import styles from "./AddModalZayavka.module.scss";
import { React, useState, useEffect } from "react";
import BasicDateTimePicker from "../DatePicker/DatePicker";

const AddModalZayavka = ({ onClose }) => {
  const [formData, setFormData] = useState({
    place: "",
    timeOpened: "",
    whoOpened: "",
    whoGot: "",
    via: "",
    description: "",
    solution: "",
    timeClosed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.place === "") {
      alert("Введите объект, титул относящийся к заявке");
    }
    if (formData.whoGot === "") {
      alert("Введите принявшего заявку");
    } else {
      try {
        const response = await fetch("http://46.173.29.202:5000/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Заявка успешно добавлена");
          onClose(); // Закрываем модальное окно
        }
      } catch (err) {
        console.error("Ошибка:", err.message);
      }
    }
  };
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.container)) {
      onClose();
    }
  };

  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <div className={styles.inputForm}>
        <h3>Добавить заявку</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.firstRow}>
            <label>
              Объект
              <br />
              <select name="place" onChange={handleChange}>
                <option value="" selected disabled>
                  Выберите объект
                </option>
                <option value="AT-2">АТ-2</option>
                <option value="Тит.300">Тит. 300</option>
                <option value="Тит.208">Тит. 208</option>
                <option value="Тит.204">Тит. 204</option>
                <option value="Тит.205">Тит. 205</option>
                <option value="Тит.206">Тит. 206</option>
              </select>
            </label> 
            <label>
              ФИО, должность подавшего заявку
              <br />
              <select name="whoOpened" onChange={handleChange}>
                <option value="" selected disabled>
                  Выберите пользователя
                </option>
                <option value="Ст. оператор">Ст. оператор</option>
                <option value="Начальник смены">Начальник смены</option>
              </select>
            </label>
            <label >
              Дата и время принятия заявки
              <br />
              <BasicDateTimePicker 
                name="timeOpened"
                value={formData.timeOpened}
                onChange={(name, newValue) =>
                  setFormData((prev) => ({ ...prev, [name]: newValue }))
                }
              />
            </label>
           
          </div>
          <div className={styles.secondRow}>
            <label>
              ФИО, должность принявшего заявку
              <br />
              <select name="whoGot" onChange={handleChange}>
                <option value="" selected disabled>
                  Выберите пользователя
                </option>
                <option value="Бузмаков П.О.">Бузмаков П.О.</option>
                <option value="Щербина М.С.">Щербина М.С.</option>
              </select>
            </label>
            <label>
              Способ подачи заявки
              <br />
              <select name="via" onChange={handleChange}>
                <option value="" selected disabled>
                  Выберите способ подачи заявки
                </option>
                <option value="Заявка в журнале">Заявка в журнале</option>
                <option value="По телефону">По телефону</option>
                <option value="Устно">Устно</option>
              </select>
            </label>
            <label>
              Время закрытия заявки
              <br />
        <BasicDateTimePicker 
                name="timeClosed"
                value={formData.timeClosed}
                onChange={(name, newValue) =>
                  setFormData((prev) => ({ ...prev, [name]: newValue }))
                }
              />
            </label>
          </div>
          <div className={styles.thirdRow}>
            <label className={styles.description}>
              Описание заявки/инцидента
              <br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label className={styles.solution}>
              Решение заявки/инцидента
              <br />
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* другие поля */}
          <div className={styles.buttons}>
            <button className={styles.saveButton} type="submit">
              Сохранить
            </button>
            <button
              className={styles.closeButton}
              type="button"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddModalZayavka;

import { useState } from "react";
import styles from "./Form.module.scss";

function getId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function Form({
  onClick,
  inProgressLength,
  completedLength,
  todosLength,
}) {
  const [title, setTitle] = useState("");

  const onClickAdd = () => {
    if (title === "") {
      alert("Enter something");
    } else {
      const todo = {
        title: title,
        completed: false,
        isRedacted: false,
        id: getId(),
      };
      onClick(todo);
      setTitle("");
    }
  };

  const onChangeInput = (event) => {
    setTitle(event.target.value);
  };

  const pressEnter = (event) => {
    if (event.key === "Enter") {
      return onClickAdd();
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        <input
          value={title}
          className={styles.form__input}
          onChange={onChangeInput}
          onKeyDown={(event) => pressEnter(event)}
          placeholder="+ Add a task, press Enter to save"
        />
        <button className={styles.form__button} onClick={onClickAdd}>
          Add
        </button>
      </div>
      <div className={styles.form__info}>
        <p className={styles.form__total}>Total: {todosLength}</p>
        <p className={styles.form__toDo}>To do: {inProgressLength}</p>
        <p className={styles.form__completed}>Completed: {completedLength}</p>
      </div>
    </div>
  );
}

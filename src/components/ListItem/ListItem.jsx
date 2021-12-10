import styles from "./ListItem.module.scss";
import { useState } from "react";
import { CheckboxCompleted, DeleteSvg, EditSvg } from "./ListItemSvg";

export function ListItem({
  title,
  id,
  completed,
  isRedacted,
  onClickCompleted,
  onClickDelete,
  onClickRedacted,
}) {
  const [newTitle, setTitle] = useState(title);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      return onClickRedacted(id, newTitle);
    } else if (event.key === "Escape") {
      setTitle(title);
      return onClickRedacted(id, title);
    }
  };

  const onChangeInput = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className={styles.ListItem}>
      <div className={styles.ListItem__container}>
        <div
          className={
            completed ? styles.ListItem__completed : styles.ListItem__checkbox
          }
          onClick={() => onClickCompleted(id)}
        >
          {completed ? <CheckboxCompleted /> : null}
        </div>
        {isRedacted ? (
          <input
            className={styles.ListItem__input}
            type="text"
            value={newTitle}
            onChange={(event) => onChangeInput(event)}
            onKeyDown={(event) => onKeyDown(event)}
            autoFocus
          />
        ) : (
          <p
            className={
              completed
                ? styles.ListItem__text_completed
                : styles.ListItem__text
            }
          >
            {title}
          </p>
        )}
      </div>
      <div className={styles.ListItem__buttons}>
        {!completed ? (
          <button
            className={styles.ListItem__button}
            onClick={() => onClickRedacted(id, newTitle)}
          >
            <EditSvg isRedacted={isRedacted} />
          </button>
        ) : null}
        <button
          className={styles.ListItem__button}
          onClick={() => onClickDelete(id, completed)}
        >
          <DeleteSvg />
        </button>
      </div>
    </div>
  );
}

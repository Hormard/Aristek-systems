import { useState, useEffect } from "react";

import styles from "./TodoList.module.scss";
import { Form } from "../Form/Form";
import { ListItem } from "../ListItem/ListItem";
import { NavBar } from "../NavBar";
import { TodoSvg } from "./TodoListSvg";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  async function getTodo() {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let newTodos = await response.json();
    let newCompleted = [];
    let newInProgres = [];
    newTodos = newTodos.map((item) => {
      delete item.userId;
      item = { ...item, isRedacted: false };
      if (item.completed) {
        newCompleted.push(item);
        setCompleted(newCompleted);
      } else {
        newInProgres.push(item);
        setInProgress(newInProgres);
      }
      return item;
    });

    setTodos(newTodos);
  }

  useEffect(() => {
    getTodo();
  }, []);

  const onClickAdd = (todo) => {
    const newTodos = [...todos, todo];
    const newInProgress = [...inProgress, todo];
    setTodos(newTodos);
    setInProgress(newInProgress);
  };

  const moveTodo = (todo) => {
    if (todo.completed) {
      const newInProgres = inProgress.filter((item) => item.id !== todo.id);
      setInProgress(newInProgres);

      const newCompleted = [todo, ...completed];
      setCompleted(newCompleted);
    } else {
      const newInProgres = [...inProgress, todo];
      setInProgress(newInProgres);

      const newCompleted = completed.filter((item) => item.id !== todo.id);
      setCompleted(newCompleted);
    }
  };

  const onClickCompleted = (id) => {
    const changedTodos = todos.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
        item.isRedacted = false;
        moveTodo();
      }
      return item;
    });
    setTodos(changedTodos);
  };

  const onClickDelete = (id, isCompleted) => {
    if (isCompleted) {
      const newTodos = completed.filter((item) => item.id !== id);
      setCompleted(newTodos);
    } else {
      const newTodos = inProgress.filter((item) => item.id !== id);
      setInProgress(newTodos);
    }

    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const onClickRedacted = (id, newTitle) => {
    const changedTodos = todos.map((item) => {
      if (item.id !== id) {
        item.isRedacted = false;
      }
      if (item.id === id) {
        item.isRedacted = !item.isRedacted;
        if (newTitle === "") {
          alert("Enter somethink");
          return item;
        } else {
          item.title = newTitle;
        }
      }
      return item;
    });
    setTodos(changedTodos);
  };

  return (
    <>
      <NavBar />
      <div className={styles.wrap}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar__button}>
            <TodoSvg />
          </div>
        </div>
        <div className={styles.todoList}>
          <div className={styles.todoList__container}>
            <Form
              onClick={onClickAdd}
              completedLength={completed.length}
              inProgressLength={inProgress.length}
              todosLength={todos.length}
            />
            <div className={styles.todoList__list}>
              <h3 className={styles.todoList__title}>
                To do ({inProgress.length})
              </h3>
              {inProgress.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    title={item.title}
                    completed={item.completed}
                    isRedacted={item.isRedacted}
                    id={item.id}
                    onClickCompleted={onClickCompleted}
                    onClickDelete={onClickDelete}
                    onClickRedacted={onClickRedacted}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.todoList__completed}>
            <h3 className={styles.todoList__title}>
              Completed ({completed.length})
            </h3>
            {completed.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  title={item.title}
                  completed={item.completed}
                  isRedacted={item.isRedacted}
                  id={item.id}
                  onClickCompleted={onClickCompleted}
                  onClickDelete={onClickDelete}
                  onClickRedacted={onClickRedacted}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

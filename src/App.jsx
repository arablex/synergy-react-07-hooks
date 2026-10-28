import React, { useState, useCallback, useMemo, useRef } from 'react'
import TodoList from './components/TodoList'
import AddTodoModal from './components/AddTodoModal'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // Посторонний счётчик: меняет состояние App, но к списку задач отношения не имеет.
  // Нужен для проверки оптимизации: при его нажатии TodoList перерисовываться не должен.
  const [clicks, setClicks] = useState(0)

  // useRef: генератор id для задач. Значение живёт между рендерами, но его изменение
  // не вызывает перерисовку.
  const nextId = useRef(1)

  // useCallback (К3): функция создаётся один раз и не меняется между рендерами,
  // поэтому дочерние компоненты не получают «новую» функцию в props без необходимости.
  // Используем функциональную форму setTodos, чтобы не зависеть от текущего todos.
  const handleAddTodo = useCallback((newTodo) => {
    setTodos((prevTodos) => [...prevTodos, { ...newTodo, id: nextId.current++ }])
  }, [])

  // Переключение статуса «выполнено» по клику на задачу
  const handleToggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }, [])

  // Открытие/закрытие модального окна
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  // useMemo (К3): статистика считается заново только при изменении списка задач
  const doneCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos])

  return (
    <div className="app">
      <h1>Список задач</h1>
      <button className="add-todo-button" onClick={openModal}>
        Добавить задачу
      </button>

      <p className="stats">
        Всего задач: {todos.length}, выполнено: {doneCount}
      </p>

      <TodoList todos={todos} onToggle={handleToggleTodo} />

      {/* Проверка оптимизации: этот счётчик перерисовывает App, но не TodoList */}
      <div className="check">
        <button onClick={() => setClicks((c) => c + 1)}>Посторонний счётчик: {clicks}</button>
        <span> (после нажатий «Отрисовок TodoList» не растёт)</span>
      </div>

      {isModalOpen && <AddTodoModal onAdd={handleAddTodo} onClose={closeModal} />}
    </div>
  )
}

export default App

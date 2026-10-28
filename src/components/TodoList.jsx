import React, { useMemo, useRef, memo } from 'react'

// Список задач (К1): данные приходят через props (todos, onToggle).
const TodoList = ({ todos, onToggle }) => {
  // useRef (К3): счётчик рендеров. Изменение ref НЕ вызывает перерисовку,
  // поэтому им удобно считать, сколько раз компонент отрисовывался.
  // (В режиме разработки React StrictMode рендерит дважды — в сборке (build) счётчик точный.)
  const renders = useRef(0)
  renders.current += 1

  // useMemo (К3): список JSX-элементов пересчитывается только когда изменился массив todos
  // (или функция onToggle), а не при каждом рендере.
  const renderedTodos = useMemo(() => {
    return todos.map((todo) => (
      // key — уникальный id задачи (а не индекс), чтобы React правильно сопоставлял элементы
      <div
        key={todo.id}
        className={`todo-item ${todo.completed ? 'completed' : ''}`}
        onClick={() => onToggle(todo.id)}
        title="Нажмите, чтобы отметить выполненной"
      >
        <span>{todo.title}</span>
      </div>
    ))
  }, [todos, onToggle])

  return (
    <div className="todo-list">
      {todos.length === 0 && <p className="empty">Задач пока нет — добавьте первую.</p>}
      {renderedTodos}
      <p className="render-info">Отрисовок TodoList: {renders.current}</p>
    </div>
  )
}

// memo: компонент перерисуется, только если изменились его props.
// Вместе с useCallback в App это не даёт TodoList рендериться из-за посторонних обновлений.
export default memo(TodoList)

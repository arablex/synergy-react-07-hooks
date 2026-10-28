import React, { useRef, useEffect } from 'react'

// Модальное окно добавления задачи (К2).
// onAdd — добавить задачу, onClose — закрыть окно (обе функции приходят из App).
const AddTodoModal = ({ onAdd, onClose }) => {
  // useRef (К3): ссылка на DOM-элемент input. Текст читаем только при нажатии «Добавить»,
  // поэтому не нужно хранить его в состоянии и перерисовывать окно на каждую букву.
  const inputRef = useRef(null)

  // При открытии окна сразу ставим курсор в поле ввода
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleAdd = () => {
    const title = inputRef.current.value.trim()
    if (title) {
      onAdd({ title, completed: false })
      onClose()
    } else {
      // Пустое название не добавляем — подсвечиваем поле и оставляем окно открытым
      inputRef.current.focus()
    }
  }

  // Enter в поле = «Добавить», Escape = «Отмена»
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div className="modal">
      <div className="modal-content" role="dialog" aria-modal="true" aria-label="Добавить задачу">
        <h3>Добавить задачу</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Название задачи"
          onKeyDown={handleKeyDown}
        />
        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleAdd}>Добавить</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodoModal

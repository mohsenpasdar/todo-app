import { getFilters, setFilters } from "./filters";
import { getTodos, createTodo, removeTodo, toggleTodo,loadTodos } from "./todos";
import { renderTodos } from './views'

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters(e.target.value)
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', e => {
    const filters = getFilters()
    filters.hideCompleted = !filters.hideCompleted
    renderTodos()
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', e => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
    }
    e.target.elements.text.value = ''
})

// Bonus: Add a watcher for local storage
window.addEventListener('storage', (e) => {
    console.log(e);
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})

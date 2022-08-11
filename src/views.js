import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

const renderTodos = () => {
    const todosEl = document.querySelector('#todos')
    const todos = getTodos()
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = todos.filter(todo => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    todosEl.innerHTML = ''

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    
    todosEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            todosEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-todos to show!'
        todosEl.appendChild(messageEl)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.append(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)
    
    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
    
    // setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

const generateSummaryDOM = (incompleteTodos)  => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

export { renderTodos }
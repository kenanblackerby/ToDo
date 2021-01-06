// Selectors
const todoInput = document.querySelector('#todo-text');
const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');
const todoList = document.querySelector('#todo-list');
const completeList = document.querySelector('#complete-list');
const filter = document.querySelector('#filter-todo');

// Event Listeners
addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', clearList);
filter.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded', getStoredTodos);

// Functions

// Add new item to task list
function addTodo(e) {
    e.preventDefault();
    // Add Todo to list
    todoList.appendChild(constructTodoItem(todoInput.value));
    // Save to LocalStorage
    savelocalTodo(todoInput.value);
    // Clear Todo Text Area
    todoInput.value = '';
}

// Clear all tasks from list
function clearList() {
    todoList.innerHTML = '';
    localStorage.removeItem('todos');
}

function deleteItem(e) {
    const itemEl = e.currentTarget.parentElement;
    const todo = itemEl.children[0].innerText;
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    itemEl.remove();
}

function checkItem(e) {
    const item = e.currentTarget.parentElement;
    item.classList.toggle('completed');
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => { 
        switch(e.target.value) {
            case 'all':
                todo.classList.remove('hidden');
                break;
            case 'complete':
                if (todo.classList.contains('completed')) {
                    todo.classList.remove('hidden');
                } else {
                    todo.classList.add('hidden');
                }
                break;
            case 'incomplete':
                if (todo.classList.contains('completed')) {
                    todo.classList.add('hidden');
                } else {
                    todo.classList.remove('hidden');
                }
                break;
        }
    })
}

function savelocalTodo (todo) {
    let todos = [];
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getStoredTodos () {
    let todos = [];
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        todoList.appendChild(constructTodoItem(todo));
    })
}

function constructTodoItem (todoText) {
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Checkmark BUTTON
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', checkItem);
    todoDiv.appendChild(completeBtn);
    // Delete BUTTON
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', deleteItem);
    todoDiv.appendChild(deleteBtn);
    
    return todoDiv;
}
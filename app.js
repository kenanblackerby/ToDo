// Selectors
const todoInput = document.querySelector('#todo-text');
const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');
const todoList = document.querySelector('#todo-list');
const filter = document.querySelector('#filter-todo');

// Event Listeners
addButton.addEventListener('click', addTodo);
clearButton.addEventListener('click', clearList);
filter.addEventListener('click', filterTodos);
document.addEventListener('DOMContentLoaded', renderStoredTodos);

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
    const item = e.currentTarget.parentElement;
    deleteLocalTodo(item);
    item.remove();
}

function checkItem(e) {
    const item = e.currentTarget.parentElement;
    item.classList.toggle('complete');
    checkLocalTodo(item);
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => { 
        switch(e.target.value) {
            case 'all':
                todo.classList.remove('hidden');
                break;
            case 'complete':
                if (todo.classList.contains('complete')) {
                    todo.classList.remove('hidden');
                } else {
                    todo.classList.add('hidden');
                }
                break;
            case 'incomplete':
                if (todo.classList.contains('complete')) {
                    todo.classList.add('hidden');
                } else {
                    todo.classList.remove('hidden');
                }
                break;
        }
    })
}

function savelocalTodo (todoText) {
    let todos = getStoredTodos();
    let todo = {text:todoText, complete:false};
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteLocalTodo (todo) {
    const index = Array(...todo.parentNode.childNodes).indexOf(todo);
    let todos = getStoredTodos();
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalTodo (todo) {
    const index = Array(...todo.parentNode.childNodes).indexOf(todo);
    let todos = getStoredTodos();
    todos[index].complete = true;
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderStoredTodos () {
    let todos = getStoredTodos();
    todos.forEach(todo => {
        const todoEl = constructTodoItem(todo.text);
        if (todo.complete) {
            todoEl.classList.add('complete');
        }
        todoList.appendChild(todoEl);
    })
}

function getStoredTodos () {
    if (localStorage.getItem('todos') !== null) {
        return JSON.parse(localStorage.getItem('todos'));
    }
    return [];
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
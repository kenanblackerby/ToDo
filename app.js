// Selectors
const todoInput = document.querySelector('#todo-text');
const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');
const todoList = document.querySelector('#todo-list');
const completeList = document.querySelector('#complete-list');

// Event Listeners
addButton.addEventListener('click', addTodo);
// todoInput.addEventListener('beforeinput', e => {
//     if (e.data === null) {
//         e.preventDefault();
//         addButton.click();
//     }
// });
clearButton.addEventListener('click', clearList);

// Functions

// Add new item to task list
function addTodo() {
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
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
    // Add Todo to list
    todoList.appendChild(todoDiv);
    // Clear Todo Text Area
    todoInput.value = '';
}

// Clear all tasks from list
function clearList() {
}

function deleteItem(e) {
    const item = e.currentTarget.parentElement;
    item.remove();
}

function checkItem(e) {
    const item = e.currentTarget.parentElement;
    item.classList.toggle('completed');
}

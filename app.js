const addButton = document.querySelector("#add-button");
const clearButton = document.querySelector("#clear-button");
const refreshButton = document.querySelector("#refresh-button");

const taskList = [{msg: 'This is not complete', complete: false}, {msg: 'this is complete', complete: false}];

// Add new item to task list
function addToTaskList() {
    const textArea = document.querySelector("#task");
    const task = textArea.value;
    textArea.value = '';
    taskList.push({msg: task, complete: false});
    displayTasks();
    return false;
}

// Clear all tasks from list
function clearList() {
    taskList = [];
    displayTasks();
}

// Mark task as complete
function completeTask(taskIndex) {
    taskList[taskIndex].complete = true;
    displayTasks();
}

// Remove task from list
function deleteTask(taskIndex) {
    taskList.splice(taskIndex,1);
    displayTasks();
}

// Display all incomplete tasks in list
function displayTasks() {
    let taskContent = '';
    let completeContent = '';
    
    for (let index = 0; index < taskList.length; index++) {
        const task = taskList[index];
        if(!task.complete) {
            taskContent +=  `<li>`
                            +   `<p>${task.msg}</p>`
                            +   '<div class="task-buttons">'
                            +       `<button onclick="completeTask(${index});">Check</button>`
                            +       `<button onclick="deleteTask(${index});">X</button>`
                            +   '</div>'
                          + `</li>`;
        } else {
            completeContent +=  `<li>`
                                +   `<p>${task.msg}</p>`
                                +   '<div class="task-buttons">'
                                +       `<button onclick="deleteTask(${index});">X</button>`
                                +   '</div>'
                              + `</li>`;
        }
    }
    document.getElementById('to-do').innerHTML = taskContent;
    document.getElementById('complete').innerHTML = completeContent;
}

addButton.addEventListener("click",addToTaskList);
clearButton.addEventListener("click",clearList);
refreshButton.addEventListener("click",displayTasks);

displayTasks();

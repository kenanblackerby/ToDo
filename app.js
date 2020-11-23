var taskList = [{msg: 'This is not complete', complete: false}, {msg: 'this is complete', complete: true}];

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
                            +   `<button onclick="completeTask(${index});">Check</button>`
                            +   `<button onclick="deleteTask(${index});">X</button>`
                          + `</li>`;
        } else {
            completeContent +=  `<li>`
                                +   `<p>${task.msg}</p>`
                                +   `<button onclick="deleteTask(${index});">X</button>`
                              + `</li>`;
        }
    }
    document.getElementById('task-list').innerHTML = taskContent;
    document.getElementById('completed-list').innerHTML = completeContent;
}

displayTasks();

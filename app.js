var taskList = [{msg: 'This is not complete', complete: false}, {msg: 'this is complete', complete: true}];

function addToTaskList() {

    displayList(taskList);
}

function clearList() {
}

function displayList() {
    let listContent = "";
    listContent = taskList.reduce((tasks, task) => {
        if(task.complete === false) {
            tasks +=  '<li>'
                    +   '<p>' + task.msg + '</p>'
                    +   '<button onclick="completeTask();">Check</button>'
                    +   '<button onclick="deleteTask();">X</button>'
                    + '</li>';
        }
        return tasks;
    },'');
    document.getElementById('task-list').innerHTML = listContent;
}

function completeTask() {
}

function deleteTask() {
}

displayList(taskList);

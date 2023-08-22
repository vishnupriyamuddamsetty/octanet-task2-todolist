document.getElementById('addTaskButton').addEventListener('click', addTask);

function addTask() {
    const taskDescriptionElem = document.getElementById('taskDescription');
    const taskPriorityElem = document.getElementById('taskPriority');
    const taskDeadlineElem = document.getElementById('taskDeadline');

    const taskDescription = taskDescriptionElem.value;
    const taskPriority = taskPriorityElem.value;
    const taskDeadline = taskDeadlineElem.value;

    if (!taskDescription) {
        alert('Please enter a task description.');
        return;
    }

    const taskElem = document.createElement('li');
    taskElem.innerHTML = `
        <strong>${taskDescription}</strong>
        <div>Priority: ${taskPriority}</div>
        <div>Deadline: ${taskDeadline}</div>
    `;

    document.getElementById('tasksList').appendChild(taskElem);

    // Clear the input fields after adding the task
    taskDescriptionElem.value = '';
    taskPriorityElem.selectedIndex = 0;
    taskDeadlineElem.value = '';
}



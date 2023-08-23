document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('filterPriority').addEventListener('change', filterTasks);

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1); // remove task at given index
    saveTasks(tasks);
    displayTasks(tasks);
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElem = document.createElement('li');

        if (isTaskOverdue(task.deadline)) {
            taskElem.classList.add('overdue');
        }

        taskElem.innerHTML = `
            <strong>${task.description}</strong>
            <div>Priority: ${task.priority}</div>
            <div>Deadline: ${task.deadline}</div>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        tasksList.appendChild(taskElem);
    });
}

// ... (rest of the code remains unchanged)


function isTaskOverdue(deadline) {
    const currentDate = new Date();
    const taskDate = new Date(deadline);

    // Compare only the year, month, and day components of the date.
    return (taskDate.getFullYear() < currentDate.getFullYear()) ||
        (taskDate.getFullYear() === currentDate.getFullYear() && taskDate.getMonth() < currentDate.getMonth()) ||
        (taskDate.getFullYear() === currentDate.getFullYear() && taskDate.getMonth() === currentDate.getMonth() && taskDate.getDate() < currentDate.getDate());
}


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

    const tasks = getTasks();
    tasks.push({
        description: taskDescription,
        priority: taskPriority,
        deadline: taskDeadline
    });
    saveTasks(tasks);
    displayTasks(tasks);

    // Clear the input fields after adding the task
    taskDescriptionElem.value = '';
    taskPriorityElem.selectedIndex = 0;
    taskDeadlineElem.value = '';
}

function filterTasks() {
    const filterValue = document.getElementById('filterPriority').value;
    let tasks = getTasks();

    if (filterValue !== 'all') {
        tasks = tasks.filter(task => task.priority === filterValue);
    }

    displayTasks(tasks);
}

// On page load
(function initialize() {
    const tasks = getTasks();
    displayTasks(tasks);
})();




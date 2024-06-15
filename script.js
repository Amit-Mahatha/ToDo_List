document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        status: 'pending'
    };

    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

    taskInput.value = '';
    renderTasks();
}

function editTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        const newTaskText = prompt('Edit task', task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            saveTasksToLocalStorage(tasks);
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function toggleTaskStatus(taskId) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const highPriorityList = document.getElementById('highPriorityList');
    const lowPriorityList = document.getElementById('lowPriorityList');
    const tasks = getTasksFromLocalStorage();
    highPriorityList.innerHTML = '';
    lowPriorityList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.status === 'completed' ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button onclick="toggleTaskStatus(${task.id})">
                    ${task.status === 'completed' ? 'Undo' : 'Complete'}
                </button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        if (task.priority === 'high') {
            highPriorityList.appendChild(li);
        } else {
            lowPriorityList.appendChild(li);
        }
    });
}

function loadTasks() {
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    let tasks = [
        { id: 1, description: 'Revisar informes diagnósticos', completed: false },
        { id: 2, description: 'Remitir informes a TRIFAM', completed: false },
        { id: 3, description: 'Realizar registro en SIS', completed: false },
    ];

    const taskList = document.getElementById('task-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const noTasksMessage = document.getElementById('no-tasks-message');

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const updateTaskList = () => {
        taskList.innerHTML = '';
        if (tasks.length > 0) {
            taskList.innerHTML += `
                <li class="task-header">
                    <span class="task-id-header">ID</span>
                    <span class="description-header">Tarea</span>
                    <span class="actions-header">Acciones</span>
                </li>`;
            for (const task of tasks) {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
                taskItem.innerHTML = `
                    <span class="task-id">${task.id}</span>
                    <span class="description">${task.description}</span>
                    <div class="task-actions">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                        <button onclick="editTask(${task.id})">Editar</button>
                        <button onclick="deleteTask(${task.id})">Borrar</button>
                    </div>
                `;
                taskList.appendChild(taskItem);
            }
        }
        updateCounters();
    };

    const updateCounters = () => {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    };

    window.toggleTask = id => {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        saveTasks();
        updateTaskList();
    };

    window.deleteTask = id => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        updateTaskList();
    };

    window.editTask = id => {
        const task = tasks.find(task => task.id === id);
        const descriptionSpan = document.querySelector(`.task-item:nth-child(${tasks.indexOf(task) + 2}) .description`);
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.description;
        input.className = 'edit-task-input';
        descriptionSpan.replaceWith(input);

        input.addEventListener('blur', () => {
            task.description = input.value;
            saveTasks();
            updateTaskList();
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });

        input.focus();
    };

    addTaskBtn.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description) {
            const newTask = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                description,
                completed: false
            };
            tasks.push(newTask);
            newTaskInput.value = '';
            saveTasks();
            updateTaskList();
        }
    });

    updateTaskList(); 
});

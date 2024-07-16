document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.toggle("completed", task.completed);
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskItem.addEventListener("click", () => toggleComplete(index));
            taskList.appendChild(taskItem);
        });
    };

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    };

    // Function to edit a task
    window.editTask = (index) => {
        const newText = prompt("Edit your task:", tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    };

    // Function to delete a task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Function to toggle task completion
    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Event listeners
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});

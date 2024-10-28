let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

// Adds a task based on selected date and category
function addTask() {
    const date = document.getElementById("date-picker").value;
    const category = document.getElementById("category-select").value;
    const taskText = document.getElementById("task-input").value.trim();

    if (!date || !taskText) {
        alert("Please select a date and enter a task.");
        return;
    }

    // Add task to the tasks object
    if (!tasks[date]) tasks[date] = [];
    tasks[date].push({ category, task: taskText });

    // Update localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear input and refresh table
    document.getElementById("task-input").value = "";
    loadTasksByDate();
}

// Loads tasks based on the selected date
function loadTasksByDate() {
    const date = document.getElementById("date-picker").value;
    const tasksTableBody = document.getElementById("tasks-table-body");
    tasksTableBody.innerHTML = "";  // Clear previous entries

    if (!tasks[date]) return;

    // Populate table rows with tasks for the selected date
    tasks[date].forEach((task, index) => {
        const row = tasksTableBody.insertRow();

        row.innerHTML = `
            <td>${task.category}</td>
            <td contenteditable="true" onblur="editTask('${date}', ${index}, this)">${task.task}</td>
            <td><button onclick="deleteTask('${date}', ${index})">Done</button></td>
        `;
    });
}

// Edit a specific task in the tasks object and update localStorage
function editTask(date, index, element) {
    tasks[date][index].task = element.textContent.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete a task based on date and index
function deleteTask(date, index) {
    tasks[date].splice(index, 1);
    if (tasks[date].length === 0) delete tasks[date];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasksByDate();
}

// Load tasks from localStorage on page load
window.onload = function() {
    loadTasksByDate();
};

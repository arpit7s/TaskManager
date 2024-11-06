
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

let tasks = [];
let editIndex = -1;

function addTask(title, description, status) {
    if (editIndex === -1) {

        tasks.push({ title, description, status });
    } else {

        tasks[editIndex] = { title, description, status };
        editIndex = -1;
    }
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter(task => filter.value === "all" || task.status === filter.value);
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        if (task.status === "completed") {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
                    <div class="task-details">
                        <strong>${task.title}</strong><br>${task.description}
                    </div>
                    <div class="actions">
                        <button class="edit" onclick="editTask(${index})">Edit</button>
                        <button class="delete" onclick="deleteTask(${index})">Delete</button>
                        <button onclick="toggleStatus(${index})">${task.status === "pending" ? "Mark as Complete" : "Mark as Pending"}</button>
                    </div>
                `;

        taskList.appendChild(taskItem);
    });
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    addTask(title, description, status);
    taskForm.reset();
});

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function toggleStatus(index) {
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    displayTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("status").value = task.status;
    editIndex = index;
}

filter.addEventListener("change", displayTasks);
displayTasks();

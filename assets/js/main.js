console.log("hello world");

// Cache DOM elements
const newTaskWrapper = document.querySelector(".new_task_wrapper");
const allTasksBox = document.querySelector(".all_tasks");
const newTaskDescription_wrapper = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description");
const newTaskDescription = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description #taskdescription");
const newTaskName = document.querySelector(".new_task_wrapper .input_fields .input_field_task_name #taskname");

function initializeTaskCreation() {
    newTaskName.addEventListener("keyup", () => {
        if(newTaskName.value.trim() === ""){
            newTaskDescription_wrapper.style.display = "none";
        } else {
            newTaskDescription_wrapper.style.display = "block";
        }
    });

    newTaskWrapper.style.display = "flex";
    allTasksBox.style.paddingTop = "25%";
}

// Event listeners for tasks
allTasksBox.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        removeTask(event.target);
    } else if (event.target.classList.contains('complete')) {
        completeTask(event.target);
    }
});

function removeTask(element) {
    const parent = element.parentElement;
    parent.remove();
}

function completeTask(element) {
    const parent = element.parentElement;
    parent.classList.add("completed");
}

function submitNewTask() {
    if (newTaskName) {
        newTaskWrapper.style.display = "none";
        allTasksBox.style.paddingTop = "0px";
        const taskId = `task-${Math.random().toString(36).substring(2, 9)}`;
        const taskElement = document.createElement('div');
        taskElement.id = taskId;
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <span class='delete'>X</span>
            <span class="new_task_name">${newTaskName.value}</span>
            <span class='complete'>✔</span>
        `;
        allTasksBox.appendChild(taskElement);
        newTaskName.value = "";
        newTaskDescription.value = "";
        newTaskDescription_wrapper.style.display = "none";

    }
}

// Initialize the task creation process
initializeTaskCreation();

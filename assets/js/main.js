console.log("hello world");

// All needed DOM Elements
const newTaskWrapper = document.querySelector(".new_task_wrapper");
const allTasksBox = document.querySelector(".all_tasks");
const newTaskDescription_wrapper = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description");
const newTaskDescription = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description #taskdescription");
const newTaskName = document.querySelector(".new_task_wrapper .input_fields .input_field_task_name #taskname");
const closeIcon = document.querySelector(".new_task_wrapper .close_icon");
const datepicker = document.querySelector('#datepicker');
const finishedTasksBox = document.querySelector('.completed_tasks');

//
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
var todayTimestamp=new Date(today).getTime() / 1000;

// Start of the functions

// Close Icon Functionality
closeIcon.addEventListener('click', function(){
    newTaskWrapper.style.display = "none";
    allTasksBox.style.paddingTop = "0px";
});

// Show task creation box if button is clicked
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

// Event listeners for tasks functionality (delete/complete/expand)
allTasksBox.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        removeTask(event.target);
    } else if (event.target.classList.contains('complete')) {
        completeTask(event.target);
    } else if (event.target.classList.contains('new_task_name') || event.target.classList.contains('expand-icon')){
        expand_minimize_details(event.target);
    }
});
finishedTasksBox.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        removeTask(event.target);
    } else if (event.target.classList.contains('complete')) {
        completeTask(event.target);
    } else if (event.target.classList.contains('new_task_name') || event.target.classList.contains('expand-icon')){
        expand_minimize_details(event.target);
    }
});

// remove task functionality -> remove element after confirmation
function removeTask(element) {
    const parent = element.parentElement.parentElement.parentElement.parentElement;
    const selectedTask = parent.querySelector(".new_task_name").textContent;
    const message = "Möchtest du wirklich " + selectedTask + " löschen?";
    var answer = confirm (message);
    if (answer){
        parent.remove();
    }else{
    }
}

// mark task as completed or uncompleted -> move it to completed task/open task section and add/remove class
function completeTask(element) {
    const parent = element.parentElement.parentElement.parentElement;
    if(parent.classList.contains('completed')){
        parent.classList.remove("completed");
        parent.remove();
        allTasksBox.appendChild(parent);
    }else{
        parent.classList.add("completed");
        parent.remove();
        finishedTasksBox.appendChild(parent);
    }
}

// make task details expandable
function expand_minimize_details(element){
    const parent = element.closest(".container");
    if(parent.classList.contains('expanded')){
        parent.classList.remove("expanded");
    }else{
        parent.classList.add("expanded");
    }
}

// add new task to the open task board
function submitNewTask() {
    if (newTaskName.value.trim() !== "") {
        newTaskWrapper.classList.add('hidden');
        allTasksBox.style.paddingTop = "0px";

        const taskHTML = createTaskElement(newTaskName.value, datepicker.value, newTaskDescription.value);
        allTasksBox.innerHTML += taskHTML;

        resetTaskInputs();
        newTaskWrapper.style.display = "none";      
        document.querySelector('.input_field_task_checkbox #duedate').checked = false;
  
    }
}

// create task element object code
function createTaskElement(taskName, dueDate, taskDescription) {
    const dateContent = calculateDateContent(dueDate);
    return `
        <div class="container">
            <div class="row">
                <div class="col-md-1">
                    <span class='complete'>✔</span>
                </div>
                <div class="col-md-10" style="display: flex; justify-content: start; margin: auto; flex-direction: column;">
                    <div class="new_task_name">${taskName}</div>
                    <div class="task_details">
                        ${dateContent}
                        <br>
                        <h4>Taskbeschreibung:</h4>
                        <span class="task_description">${taskDescription}</span>
                    </div>
                    <div class="delete_section">
                        <button class="delete">Löschen</button>
                    </div>
                </div>
                <div class="col-md-1 expand-icon">
                    <img class='expand-icon' src='/assets/img/Vector-1.svg'>
                </div>
            </div>
        </div>
    `;
}


// reset the inputs
function resetTaskInputs() {
    newTaskName.value = "";
    newTaskDescription.value = "";
    newTaskDescription_wrapper.classList.add('hidden');
    datepicker.classList.add('hidden');
    document.querySelector('.input_field_task_checkbox #duedate').checked = false;
}

function calculateDateContent(dueDate) {
    // TODO: add logic to determine how much time is left for task
    return `<h4>Fälligkeitsdatum:</h4><span>${dueDate}</span>`;
}

// set today date at default value for datepicker
function validate() {
    if (document.querySelector('.input_field_task_checkbox #duedate').checked) {
        datepicker.style.display="block";
        datepicker.value=today;
    } else {
        datepicker.style.display="none";
    }
}


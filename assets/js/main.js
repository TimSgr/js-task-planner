console.log("hello world");

// Cache DOM elements
const newTaskWrapper = document.querySelector(".new_task_wrapper");
const allTasksBox = document.querySelector(".all_tasks");
const newTaskDescription_wrapper = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description");
const newTaskDescription = document.querySelector(".new_task_wrapper .input_fields .input_field_task_description #taskdescription");
const newTaskName = document.querySelector(".new_task_wrapper .input_fields .input_field_task_name #taskname");
const closeIcon = document.querySelector(".new_task_wrapper .close_icon");
const datepicker = document.querySelector('#datepicker');

closeIcon.addEventListener('click', function(){
    newTaskWrapper.style.display = "none";
    allTasksBox.style.paddingTop = "0px";
});

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
    } else if (event.target.classList.contains('new_task_name')){
        expand_minimize_details(event.target);
    }
});


function removeTask(element) {
    const parent = element.parentElement.parentElement;
    parent.remove();
}

function completeTask(element) {
    const parent = element.parentElement;
    parent.classList.add("completed");
}

function expand_minimize_details(element){
    const parent = element.parentElement.parentElement;
    if(parent.classList.contains('expanded')){
        parent.classList.remove("expanded");
    }else{
        parent.classList.add("expanded");
    }
}

function submitNewTask() {
    if (newTaskName.value.trim() !== "") {
        newTaskWrapper.style.display = "none";
        allTasksBox.style.paddingTop = "0px";

        const container = document.createElement('div');
        container.className = "container";

        const row = document.createElement('div');
        row.className = "row";

        // Closing Icon
        const colCloseIcon = document.createElement('div');
        colCloseIcon.className = "col-md-1";
        colCloseIcon.innerHTML = "<span class='delete'>X</span>";

        // Task Content
        const colTaskContent = document.createElement('div');
        colTaskContent.className = "col-md-10";
        colTaskContent.style.display = "flex";
        colTaskContent.style.justifyContent = "start";
        colTaskContent.style.margin = "auto";
        colTaskContent.style.flexDirection = "column";

        const taskNameDiv = document.createElement('div');
        taskNameDiv.className="new_task_name";
        taskNameDiv.textContent = newTaskName.value;

        const taskDetailsDiv = document.createElement('div');
        taskDetailsDiv.style.maxHeight="0px";
        taskDetailsDiv.style.display="none";
        taskDetailsDiv.className = 'task_details';

        taskDetailsDiv.innerHTML = `<span>${datepicker.value}</span><br><span>${newTaskDescription.value}</span>`;

        colTaskContent.appendChild(taskNameDiv);
        colTaskContent.appendChild(taskDetailsDiv);

        // Checking Icon
        const colCheckIcon = document.createElement('div');
        colCheckIcon.className = "col-md-1";
        colCheckIcon.innerHTML = "<span class='complete'>✔</span>";

        // Assembling the row
        row.appendChild(colCloseIcon);
        row.appendChild(colTaskContent);
        row.appendChild(colCheckIcon);

        // Adding the row to the container
        container.appendChild(row);

        // Adding the container to the allTasksBox
        allTasksBox.appendChild(container);
        newTaskName.value = "";
        newTaskDescription.value = "";
        newTaskDescription_wrapper.style.display = "none";
        document.querySelector('.input_field_task_checkbox #duedate').checked=false;
        datepicker.style.display="none";
    }
}

// Initialize the task creation process

function validate() {
    if (document.querySelector('.input_field_task_checkbox #duedate').checked) {
        datepicker.style.display="block";
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        datepicker.value=today;
    } else {
        datepicker.style.display="none";
    }
}


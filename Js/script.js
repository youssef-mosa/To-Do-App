
let textInput = document.getElementById("text-task");
let addInput =  document.querySelector(".add");
let tasks =  document.querySelector(".tasks");




addInput.onclick = addTask;

function createElements(text ="",completed = false){
    let task = document.createElement("div");
    let taskLeft = document.createElement("div");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");
    let span =document.createElement("span");

    task.classList.add("task");
    taskLeft.classList.add("task-left");
    span.innerHTML = "&#x2715;";
    
    let uniqueId = Date.now();
    checkbox.setAttribute("id", `task${uniqueId}`);
    label.setAttribute("for",`task${uniqueId}`);

    checkbox.setAttribute("type", "checkbox");
    label.textContent = text || textInput.value;

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(label);
    task.appendChild(taskLeft);
    task.appendChild(span);
    tasks.appendChild(task);

    //span onclick
    span.onclick = function (){
        task.remove();
        saveTask()
    }
    //check localStorge
    if(completed){
        checkbox.checked = true;
        label.classList.add("completed");
    }
    //checkbox change
    checkbox.onchange = function(){
        label.classList.toggle("completed");
        saveTask()
    }
}
function addTask(){
    createElements();
    saveTask();
    textInput.value = "";
}

function saveTask(){
    let taskList = document.querySelectorAll(".task label");
    let tasks =Array.from(taskList).map(label=>({
        text:label.textContent,
        completed:label.classList.contains("completed")
    }))
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTask(){
    let saved = localStorage.getItem("tasks");
    if(saved)
    {
        JSON.parse(saved).forEach(task => {
            createElements(task.text,task.completed);
        });
    }
}

loadTask();

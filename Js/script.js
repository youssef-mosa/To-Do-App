
let textInput = document.getElementById("text-task");
let addInput =  document.querySelector(".add");
let tasks =  document.querySelector(".tasks");


window.onload = function(){
    textInput.focus();
}

function checkEmpty(){
    if(tasks.children.length === 0)
    {
        let noTasks = document.createElement("p");
        noTasks.classList.add("no-tasks");
        noTasks.textContent = "No Tasks To Show";
        tasks.appendChild(noTasks);
    }
}

function updateCount(){
    let allTasks = document.querySelectorAll(".task");
    let countTasks =document.querySelector(".count-tasks span");
    let countComplete =document.querySelector(".count-completed span");
    let completed = document.querySelectorAll(".task label.completed");
    countTasks.textContent = allTasks.length;
    countComplete.textContent = completed.length;
}

addInput.onclick = addTask;

function createElements(text ="",completed = false){
    let noTasks = document.querySelector(".no-tasks");
    if(noTasks) noTasks.remove();

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
        saveTask();
        checkEmpty();
        updateCount();
    }
    //check localStorge
    if(completed){
        checkbox.checked = true;
        label.classList.add("completed");
    }
    //checkbox change
    checkbox.onchange = function(){
        label.classList.toggle("completed");
        saveTask();
        updateCount();
        completeAll();
    }
}
function addTask(){
    if(textInput.value.trim() !== "")
    {
        createElements();
        checkEmpty();
        updateCount()
        saveTask();
        textInput.value = "";
    }
    else{
        textInput.style.border = "2px solid red";
        setTimeout(()=>{
            textInput.style.border = "none";
        },1000);
    }
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
    checkEmpty();
    updateCount();
}

let btnComplete = document.querySelector(".complete-All");
btnComplete.onclick = function(){
    let checkboxs = document.querySelectorAll(".task input[type='checkbox']");
    checkboxs.forEach(check =>{
        check.checked = true;
        check.nextElementSibling.classList.add("completed");
    })
    saveTask();
    updateCount();
}

let btnRemove = document.querySelector(".Remove-All");
btnRemove.onclick = function(){
    let allTasks = document.querySelectorAll(".task");
    allTasks.forEach(task =>{
        task.remove();
    })
    saveTask();
    updateCount();
    checkEmpty();
}


loadTask();

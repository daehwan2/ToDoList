const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

let toDos = [];
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return parseInt(li.id) !==toDo.id;
    });
    toDos=cleanToDos;
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function paintToDo(text){
    toDoInput.value="";
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId=toDos.length+1;

    span.innerText=text;
    li.id=newId;
    li.appendChild(delBtn);
    li.appendChild(span);    
    toDoList.appendChild(li);
    const toDoObj = {
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}
function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        console.log(loadToDos);
        const parsedToDos=JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            console.log(toDo.text);
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();
var open = document.getElementById("open");
var close = document.getElementById("close");
var sidebar = document.getElementById("sidebar");
var page = document.getElementById("main-page");
var menuopen;


open.onclick = function () {
    menuopen = true;
    sidebar.style.width = "300px";
    sidebar.style.marginTop = "25px";
    document.getElementById("open").setAttribute("id", "close");
    close.style.display = "block";
    open.style.display = "none";
    page.style.paddingLeft = "312px";
};

close.onclick = function () {
    menuopen = false;
    sidebar.style.width = "0px";
    document.getElementById("close").setAttribute("id", "open");
    close.style.display = "none";
    open.style.display = "block";
    page.style.paddingLeft = "0px";
};

var addButton = document.getElementById("add-btns");
var date = document.getElementById("date");
var table = document.getElementsByClassName("Data-table");
var form = document.getElementsByClassName("main-form");
var dateT = document.getElementById("dateT");
var time = setInterval(time, 1000);
var displayDate = new Date();
var serialN = 1;


function time() {
    var display = new Date();
    var kj = display.toLocaleDateString();
    var time = display.toLocaleTimeString();
    var showDisplay = `${kj} ${time}`;
    date.innerHTML = showDisplay;
};


var LIST;
var id;


getList();

function setList() {
    localStorage.setItem("LIST", JSON.stringify(LIST));
};

 var savedList = localStorage.getItem("LIST");
function getList() {
    if (savedList) {
        LIST = JSON.parse(savedList);
         id = 1;
        loadList(LIST); 
    } else {
        LIST = [];
        id = 1;
    }
};


function reNumber(array) {
    array.forEach(element => {
     //   id = array.indexOf(element);
       console.log(element);
   });
};

function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.date, element.serialNuber);
        console.log(element);
    });
};

function addToDo (inputted, dateaTime){
    let table = document.getElementById("dataTable");
    let statusP = document.getElementById("statusT");
    let selectCol = document.getElementById("selectV");
    let selectedOption = selectCol.value;
    let dateInput = document.getElementById("dateT");
    let activity = document.getElementById("Activity-name");
    let dateValue = dateInput.value;
    let timeValue = document.getElementById("dateTime").value;

    let newros = `<tr class="row nrow" id="row${id}">
                            <td class="colserial"> ${id} </td>
                            <td class="cols"> ${dateaTime} </td>
                            <td class="cols"> ${inputted} </td>
                            <td class="cols"> 
                             <p id= "statusT">  ${selectedOption}  </p>
                             </td>
                            <td class="cols"> <button onclick ="Editactivity()" id="edit-btn"> &#9998; </button> </td>
                            <td class="cols"> <button class="delete-btn" onclick = "Deletetodo()">  &#128465; </button> </td>
                            <td class="cols"> <button onclick="updateTodo()" class="update-btn"> Update </button> </td>
                          </tr>`;
        activity.value = "";
        neww = document.createElement("tr");
        neww.innerHTML = newros;
        table.appendChild(neww);
        id++;
 };

 

addButton.addEventListener("click", function addNew() {
    let activity = document.getElementById("Activity-name");
    let inputted = activity.value;
    let dateInput = document.getElementById("dateT");
    let dateValue = dateInput.value;
    let timeValue = document.getElementById("dateTime").value;
    dateaTime = `${dateValue} ${timeValue}`;
    
    if (inputted && dateValue && timeValue) {
        addToDo(inputted, dateaTime);
        LIST.push({
            serialNuber: id, 
            date: dateaTime,
            name: inputted
        });

        
    //    reNumber(LIST);
    };
    setList();
 });


function Deletetodo() {
    let child = event.target;
    let rows = document.getElementsByClassName("colserial");
    let table = document.getElementById("dataTable");

    LIST.splice(child.parentNode.parentNode, 1);
    table.removeChild(child.parentNode.parentNode);
   
    LIST.forEach(col => {
     //    LIST.splice(col, 1);
         console.log(col);
        id = 1;
     });
   
    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        element.innerText = id;
        id++;
        console.log(element);
    };
    
    setList();
   // ReList();
};



function Editactivity(element) {
    let child = event.target;
    let editBtn = document.getElementById("edit-btn");
    let activity = document.getElementById("Activity-name");
    let elements = child.parentNode.parentNode.lastChild.previousSibling;
    let updateElement = elements.childNodes[1];
    child.style.display = "none";
    updateElement.style.display = "block";
    let theAct = child.parentNode.parentNode.children[2];
    activity.value = theAct.innerText;
};

function updateTodo (){
    let child = event.target;
    let activity = document.getElementById("Activity-name");
    let theAct = child.parentNode.parentNode.children[2];
    let edit = child.parentNode.parentNode.children[4].children[0];
    theAct.innerText = activity.value;
    child.style.display = "none";
    edit.style.display = "block";
    activity.value = "";
    let selectCol = document.getElementById("selectV");
    let statusP = document.getElementById("statusT");
    let selectedOption = selectCol.value;
    statusP.innerHTML = selectedOption;
    console.log(selectedOption);
 
    LIST.forEach( (col) =>{
        let selectCol = document.getElementById("selectV");
        let selectedOption = selectCol.value;
        editStatus.innerText = selectedOption;
    });
};



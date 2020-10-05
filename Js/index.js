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
    page.style.paddingLeft = "319px";
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
var mainInput = document.getElementById("main-input");


function time() {
    var display = new Date();
    var kj = display.toDateString();
    var time = display.toLocaleTimeString();
    var showDisplay = `${kj} ${time}`;
    date.innerHTML = showDisplay;
};


var LIST;
var id = 1;


getList();

function setList() {
    localStorage.setItem("LIST", JSON.stringify(LIST));
};

function getList() {
    var savedList = localStorage.getItem("LIST");
    if (savedList) {
        LIST = JSON.parse(savedList);
        loadList(LIST); 
    } else {
        LIST = [];
    }
};


function loadList(array) {
    array.forEach(element => {
        addToDo(element.name, element.date, element.serialNuber);
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

    let newros = `<tr class="text-rows rows table-rows" id="row">
                            <td class="cols colserial"> ${id}. </td>
                            <td class="cols column col-date"> ${dateaTime} </td>
                            <td class="cols column col-activity"> ${inputted} </td>
                            <td class="cols column col-status"> 
                              ${selectedOption}
                             </td>
                            <td class="cols column col-edit"> <button onclick ="Editactivity()" id="edit-btn"> &#9998; </button>
                            <button onclick="updateTodo()" class="update-btn"> Update </button>
                            </td>
                            <td class="cols columnL"> <button class="delete-btn" onclick = "Deletetodo()">  &#128465; </button> </td>
                          </tr>`;
        activity.value = "";
        timeValue.value = "";
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
    let selectCol = document.getElementById("selectV");
    let selectedOption = selectCol.value;
    let timeValue = document.getElementById("dateTime").value;
    dateaTime = `${dateValue} ${timeValue}`;
    

    if (mainInput.style.visibility == "hidden") {
        mainInput.style.visibility = "visible";
    } else {
        mainInput.style.visibility = "hidden";
    };

     if (mainInput.style.height == "0px") {
        mainInput.style.height = "60px";
    } else {
        mainInput.style.height = "0px";
    };
    

    if (inputted && dateValue && timeValue) {
        addToDo(inputted, dateaTime);
        LIST.push({
            serialNuber: id, 
            status: selectedOption,
            date: dateaTime,
            name: inputted
        });
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
};



function Editactivity() {
    let child = event.target;
    let activity = document.getElementById("Activity-name");
    let updateElement = child.parentNode.children[1];
    let theAct = child.parentNode.parentNode.children[2];
    child.style.display = "none";
    updateElement.style.display = "block";  
    activity.value = theAct.innerText;
};

function updateTodo (){
    let child = event.target;
    let activity = document.getElementById("Activity-name");
    let theAct = child.parentNode.parentNode.children[2];
    let edit = child.parentNode.parentNode.children[4].children[0];
    let selectCol = document.getElementById("selectV");
    let statusP = document.getElementById("statusT");
    let selectedOption = selectCol.value;
    let time = document.getElementById("dateT");
    let theTime = child.parentNode.parentNode.children[1];
    let rows = document.getElementsByClassName("rows");
    let thatT =  theTime.innerText.substring(10, 16);
    theAct.innerText = activity.value;
    child.style.display = "none";
    edit.style.display = "block";
    activity.value = "";
    statusP.innerHTML = selectedOption;
    console.log(time.value);
 
    LIST.forEach( (col) =>{
        let selectCol = document.getElementById("selectV");
        let selectedOption = selectCol.value;
    });
};

function clearAll() {
    localStorage.clear();
    location.reload();
    id = 1;
};
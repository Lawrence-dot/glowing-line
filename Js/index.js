var open = document.getElementById("open");
var close = document.getElementById("close");
var sidebar = document.getElementById("sidebar");
var page = document.getElementById("main-page");
var listToggle = document.getElementById("list-toggle");
var menuopen;


open.onclick = function () {
    menuopen = true;
    sidebar.style.width = "300px";
    sidebar.style.marginTop = "25px";
    document.getElementById("open").setAttribute("id", "close");
    close.style.display = "block";
    open.style.display = "none";
    // page.style.paddingLeft = "319px";
};

close.onclick = function () {
    menuopen = false;
    sidebar.style.width = "0px";
    document.getElementById("close").setAttribute("id", "open");
    close.style.display = "none";
    open.style.display = "block";
    // page.style.paddingLeft = "0px";
};

var addButton = document.getElementById("add-btns");
var date = document.getElementById("date");
var table = document.getElementsByClassName("Data-table");
var form = document.getElementsByClassName("main-form");
var dateT = document.getElementById("dateT");
var dateTime = document.getElementById("dateTime");
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
                            <td class="cols column col-date" id="dateTable"> ${dateaTime} </td>
                            <td class="cols column col-activity"> ${inputted} </td>
                            <td class="cols column col-status" id="statusTable"> 
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

 listToggle.onclick = function name() {
    if (mainInput.style.visibility == "hidden") {
        mainInput.style.visibility = "visible";
        listToggle.innerHTML = "&#9650;";
    } else {
        mainInput.style.visibility = "hidden";
        listToggle.innerHTML = "&#9660;";
    };

     if (mainInput.style.height == "0px") {
        mainInput.style.height = "60px";
    } else {
        mainInput.style.height = "0px";
    };
    
 }


addButton.addEventListener("click", function addNew() {
    let activity = document.getElementById("Activity-name");
    let inputted = activity.value;
    let dateInput = document.getElementById("dateT");
    let dateValue = dateInput.value;
    let selectCol = document.getElementById("selectV");
    let selectedOption = selectCol.value;
    let timeValue = document.getElementById("dateTime").value;
    dateaTime = `${dateValue} ${timeValue}`;
    

    

    if (inputted && dateValue && timeValue) {
        addToDo(inputted, dateaTime);
        LIST.push({
            serialNuber: id, 
            status: selectedOption,
            date: dateaTime,
            name: inputted
        });
    };

    if(!inputted || !dateValue || !timeValue){
        alert("Please Fill all the boxes");
    }; 

    setList();
 
    if (selectedOption == "Pending") {
        thecols.style.color = "green";
        console.log("cols");
    }
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
    let tableDate = document.getElementById("dateTable");
    dateT.value = tableDate.innerText.substring(0, 10);
    dateTime.value = tableDate.innerText.substring(11, 16);

    child.style.display = "none";
    updateElement.style.display = "block";  
    activity.value = theAct.innerText;
    addButton.style.visibility = "hidden";
    addButton.style.height = "0px";
    mainInput.style.visibility = "visible";
    mainInput.style.height = "60px";
};


function updateTodo (){
    let child = event.target;
    let activity = document.getElementById("Activity-name");
    let theAct = child.parentNode.parentNode.children[2];
    let edit = child.parentNode.parentNode.children[4].children[0];
    let selectCol = document.getElementById("selectV");
    let tableStatus = document.getElementById("statusTable");
    let tableDate = document.getElementById("dateTable");
    
    theAct.innerText = activity.value;
    child.style.display = "none";
    edit.style.display = "block";
    activity.value = "";
    tableStatus.innerHTML = selectCol.value;
    tableDate.innerHTML = `${dateT.value} ${dateTime.value}`;


       for (let i = 0; i < tableStatus.length; i++) {
           const element = tableStatus[i];
           console.log(element);
       };

    mainInput.style.visibility = "hidden";
    mainInput.style.height = "0px";
    addButton.style.visibility = "visible";
    addButton.style.height = "40px";
    setList();
};

function clearAll() {
    localStorage.clear();
    location.reload();
    id = 1;
};

//localStorage.clear();
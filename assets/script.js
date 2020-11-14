// Declare variables
let times = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
let currentTime = moment().format('HH');


// Initialize page
$(document).ready(function() {
    let currentDate = moment().format('dddd' + ', ' + 'LL');
    document.getElementById("currentDay").innerHTML = currentDate;
    renderTimeBlocks();
    // Retrieve local storage data
    let todos = localStorage.getItem("storedTodos") ? JSON.parse(localStorage.getItem("storedTodos")) : []
    todos.forEach(function(todo, i){
    if (todo.task){
        $(`#${todo.time}`).text(todo.task)
    }
    console.log(todo.time)
    })
})

// functions!
function renderTimeBlocks() {
    times.forEach(function(time, i){
        let addedElement = times[i];
        // dynamically render a row with styling
        let row = $("<div/>",{
            "class" : "row time-block col-12 hour",
            "id" : addedElement + "row"
        }).appendTo(".container");

        // dynamically render a column for the hour and append to row
        let hour = $("<div>", {
            "class" : "hour col-2",
            "text" : addedElement,
        }).appendTo(row);

        // Determine relative time relationship beween current time and the time block being rendered and append to row
        if(currentTime === addedElement) {
            let textArea = $("<textarea>", {
                "class" : "present description col-9",
                "id" : addedElement
            }).appendTo(row);
        }
        else if (currentTime > addedElement) {
            let textArea = $("<textarea>", {
                "class" : "past description col-9",
                "id" : addedElement
            }).appendTo(row);
        }
        else {
            let textArea = $("<textarea>", {
                "class" : "future description col-9",
                "id" : addedElement
            }).appendTo(row);
        };
        
        // render save button and append to row
        let saveBtn = $("<button>", {
            "class" : "saveBtn col-1",
            "text" : "Save",
        }).appendTo(row);
        i++;
        console.log(i)
    });
}

// event listeners
$(document).on("click", ".saveBtn", function() {
    let savedTask = {
        task: $(this).siblings(".description").val(),
        time: $(this).siblings(".description").attr("id"),
    }
    todos.push(savedTask);
    localStorage.setItem("storedTodos", JSON.stringify(todos))
})
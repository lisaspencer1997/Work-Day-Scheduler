// pseudocode notes first

$(document).ready(function () {


// TODO: Display the current day at the top of the calender when a user opens the planner.
    

    // add the text of the current day using jQuery dayjs
    // format like this "Tuesday 9 January 2024"
    
    $("#currentDay").text("Today is " + dayjs().format("dddd, D MMMM YYYY"));



// TODO: Present time blocks for standard business hours when the user scrolls down.

    // create a variable container for the time block

    var container = $(".container");

    // create a for loop with the following inside:
        // variable of hours = 9am - 5pm
        // each time should be in a row
        // each text area should have a description
        // each row should have a save button so I can store the event

    for (var hour= 9; hour <= 24; hour++) {

        var timeBlock = $("<div>").addClass("row time-block");

        // create 3 columns within each row 
        var hourBlock = $("<div>").addClass("col-md-1 hour d-flex align-items-center justify-content-end").text(dayjs().hour(hour).format("hA"));
        var textArea = $("<textarea>").addClass("col-md-10 description");
        var saveBtn = $("<button>").addClass("col-md-1 saveBtn").html("<i class").html("<i class='fas fa-save'></i>");
    
    // append the elements to the time block

    timeBlock.append(hourBlock, textArea, saveBtn);

    // append the time block to the container

    container.append(timeBlock);

    }

// TODO: Color-code each time block based on past, present, and future when the time block is viewed.

    // for each time block

    $(".time-block").each(function() {
 
        // the current hour = get current hour using Day.js

        var currentHour = dayjs().hour();
    
        // block hour = extract the hour from the time block
        
        var blockHourMatch = $(this).find(".hour").text().match(/(\d+)(?:\s*([apAP])\.?[mM]\.?)/);
        
        // var blockHour = blockHourMatch ? parseInt(blockHourMatch[1]) + (blockHourMatch[2].toLowerCase() === 'p' ? 12 : 0) : NaN;

        var blockHour = blockHourMatch ? dayjs().hour(parseInt(blockHourMatch[1]) + (blockHourMatch[2].toLowerCase() === 'p' ? 12 : 0)).hour() : NaN;
        
        if (blockHour === 0) {
            blockHour = 12;
        } else if (blockHour === 12) {
            blockHour = 0;
        }

        console.log("Block hour: " + blockHour)
        console.log("Current hour: " + currentHour)

        // need to change the midnight-midday issue

        

        // if the block hour is less than current hour:

        if (blockHour < currentHour) {
        
            // add 'past' class (which will be red) to the time block

            $(this).addClass("past");

        // else if block hour is equal to current hour:

        } else if (blockHour === currentHour) {

            // add 'present' class (which will be amber) to the time block

            $(this).addClass("present");

        // else

        } else {

            // add 'future' class (which will be green) to the time block

            $(this).addClass("future");

        }

    });

// TODO: Save the event in local storage when the save button is clicked in that time block.

    //on save button click 

    $(".saveBtn").on("click", function () {

        // get the evnt text from the corresponding text area

        var eventText = $(this).siblings(".description").val();

        // get the hour from the time block

        var eventHour = $(this).siblings(".hour").text();

    // save the event to local storage

        localStorage.setItem(eventHour, eventText);


    })

        

// TODO: Persist events between refreshes of a page

    // for each time block 

    $(".time-block").each(function () {

        // get the hour value from the time block

        var blockHour = $(this).find(".hour").text();

        // retrieve the saved event from local storage based on the hour value

        var savedEvent = localStorage.getItem(blockHour);

        // if a saved event is found:

        if (savedEvent) {
            

        // set the value of the description textarea i the time block to the saved event 

            $(this).find(".description").val(savedEvent);
        }
    
    });
})
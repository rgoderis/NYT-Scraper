// click listener for scraper button
$(document).on("click", ".scraper", (event)=>{
    event.preventDefault()
    $.get("/api/articles", function(){
        console.log("scraped new articles")
    }).then(function(){
        location.reload()
    });
});

// click listener for clear button
$(document).on("click", ".clear", (event)=>{
    event.preventDefault();
    $.getJSON("/api/delete", function(data){
        location.reload();
    });
});

// click listener for save button
$(document).on("click", ".save", function(event){
    event.preventDefault();
    var thisId = $(this).attr("data-id")
    $.ajax({
        method: "PUT",
        url: "/article/"+thisId,
    }).then(err=>{
        if(err) throw err
    });
     location.reload();
});
// click listener for delete button
$(document).on("click", ".delete", function(event){
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/article/"+thisId
    }).then(err=>{
        if(err) throw err
    });
     location.reload();
});

// click listener for add-note to display notes
$(document).on("click", ".add-note", function(event){
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/article/"+thisId
    }).then(data=>{
        $(".notes-display").empty();
        for(var i =0; i < data.notes.length; i++){
            console.log(data.notes[i])
            let div = $("<div>");
            div.addClass("note-display")
            let p = $("<p>")
            let button = $("<button>");
            button.text("X");
            button.addClass("delete-note");
            button.attr("data-id", data.notes[i]._id)
            p.text(data.notes[i].body)
            $(div).append(p,button);
            $(".notes-display").append(div);
        }
    });
});

// click listener for submit-note to add new note
$(document).on("click", ".submit-note", function(event){
    event.preventDefault();
    let thisId = $(this).attr("data-id")
    let thisNote = $(".note-input"+thisId).val();
    console.log(thisNote)
    if(thisNote !== ""){
        $.ajax({
            method: "POST",
            url: "/article/"+thisId,
            data: {
                body: thisNote
            }
        }).then(data=>{
            console.log(data);
            $(".note-input").val("")
        });
    }
    else{
        return false;
    }
    location.reload();
});

// click listener for delete note to delete associated note
$(document).on("click", ".delete-note", function(event){
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/note/"+thisId
    }).then(err=>{
        if(err) throw err
    });
    location.reload();
});
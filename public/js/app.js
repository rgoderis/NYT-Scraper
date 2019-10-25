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
// click listener for unsave button
$(document).on("click", ".delete", function(event){
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/article/"+thisId
    }).then(err=>{
        if(err) throw err
    });
     location.reload();
});



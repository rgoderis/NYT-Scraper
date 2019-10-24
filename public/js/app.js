// click listener for scraper button
$("#scraper").on("click", (event)=>{
    event.preventDefault()
    $.post("/api/articles", function(){
        console.log("scraped new articles")
    }).then(function(){
        // Grab the articles as a json
        $.get("/api/articles").then(function(data) {
            // For each one
            for (var i = 0; i < data.length; i++) {
              // Display the apropos information on the page
              $("#articles").append("<div data-id='" + data[i]._id + "'>" + "<h3><a href='"+ data[i].link+"'>" +  data[i].title +"</a></h3><p>"+data[i].text +"</p></div>");
            }
        })
    })
});

// click listener for clear button
$("#clear").on("click", (event)=>{
    event.preventDefault();
    $.getJSON("/api/delete", function(data){
        console.log(data)
        location.reload()
    })
})

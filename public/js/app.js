// click listener for scraper button
$(document).on("click", ".scraper", (event)=>{
    event.preventDefault()
    $.get("/api/articles", function(){
        console.log("scraped new articles")
    }).then(function(){
        location.reload()
    })
});

// click listener for clear button
$(document).on("click", ".clear", (event)=>{
    event.preventDefault();
    $.getJSON("/api/delete", function(data){
        console.log(data)
        location.reload()
    })
})

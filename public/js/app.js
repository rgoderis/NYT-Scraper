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

// click listener for save button
$(document).on("click", ".save", function(event){
    event.preventDefault();
    console.log("you clicked me");
    var thisId = $(this).attr("data-id")
    console.log(thisId)
    // const savedArticle = {
    //     id: thisId
    // }
    // $.put("/article/"+ thisId, {saved: true})
    // .then((err)=>{
    //     if(err) throw err
    //     location.reload
    // })
    $.ajax({
        method: "PUT",
        url: "/article/"+thisId,
    }).then(err=>{
        if(err) throw err
    });
    location.reload();
})



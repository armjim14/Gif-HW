var list = ["cats", "dog", "fish"];
var fav = [];

// made Enter key work to add-button.on("click")
document.onkeyup = function(e){
    var choice = e.key;
    
    if( choice == "Enter" ){
        var dataValue = document.getElementById("user");
        list.push(dataValue.value);
    
        $("#buttons").empty();
    
        for( let i = 0; i < list.length; i++ ){
            var newButton = $("<button>");
            newButton.attr("data-name", list[i]);
            newButton.text(list[i]);
            $("#buttons").append(newButton);
        }

        dataValue.value= "";
        buttonWork();
    }// if statment ends
}
//user adds button that is name from the value from the input
$("#add-button").on("click", function(){
    var dataValue = document.getElementById("user");
    list.push(dataValue.value);

    $("#buttons").empty();

    for( let i = 0; i < list.length; i++ ){
        var newButton = $("<button>");
        newButton.attr("data-name", list[i]);
        newButton.text(list[i]);
        $("#buttons").append(newButton);
    }

    dataValue.value= "";
    buttonWork();
})

//going to display all the images
function buttonWork() {
    $("button").on("click", function(){

        $("#images").empty();

        var data = $(this).attr("data-name");
        var link = "https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=" + data + "&limit=20&offset=0&rating=G&lang=en";
        
        $.ajax({
            url: link,
            Method: "GET"
        }).then(function(response){
            var runTime = response.data;
            for(let i = 0; i < runTime.length; i++){
                var gif = response.data[i].images.fixed_width.url;
                var pic = response.data[i].images.fixed_height_still.url;
                var imgTag = $("<img>").attr("src", pic);
                imgTag.attr("data-run", gif);
                imgTag.attr("data-still", pic);
                imgTag.attr("data-status", "still");
                imgTag.attr("class", "change");
                imgTag.attr("id", i);
                imgTag.attr("data-name", data);
                $("#images").append(imgTag);
            } 
            changeType();
        }) // once we get request funtion ends
    }) //click funtion ends
}//function ends

buttonWork();

//able to switch from gif to pic
function changeType() {
    $(".change").on("click", function(){

        var status = $(this).attr("data-status");
        var name = $(this).attr("id");
        
        if( status == "still" ){
            $(this).attr("src", $(this).attr("data-run"));
            $(this).attr("data-status", "run")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still")
        }
            add(status, name)
    })// click function ends
}//function ends

function add(status, name){
    $("#add-fav").on("click", function(){
        // for( let i = 0; i < classed; i++ ){
            if ( status == "run" ){
                alert("second");
                fav.push(name);
            }
        // }

    })
}

/*
    find status of image
    if image is gif add that to a separate list
    add new button to play those specific stuff
*/
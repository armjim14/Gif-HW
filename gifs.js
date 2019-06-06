var list = ["cats", "dog", "fish"];

$("#add-button").on("click", function(){
    var dataValue = document.getElementById("user").value;
    list.push(dataValue);

    $("#buttons").empty();

    for( let i = 0; i < list.length; i++ ){
        var newButton = $("<button>");
        newButton.attr("data-name", list[i]);
        newButton.text(list[i]);
        $("#buttons").append(newButton);
    }

    buttonWork();
})

function buttonWork() {
    $("button").on("click", function(){

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
                $("#images").append(imgTag);
            }
        })
    })
}
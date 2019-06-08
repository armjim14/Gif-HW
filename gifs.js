var list = ["cats", "dog", "fish"];
var fav = [];

document.onkeyup = function(e){ var choice = e.key; if( choice == "Enter" ){ addbuttons(); }}

$("#add-button").on("click", function(){ addbuttons(); })

function addbuttons(){
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
}

//going to display all the images
function buttonWork() {
    $("button").on("click", function(){

        $("#images").empty();

        var data = $(this).attr("data-name");
        var link = "https://api.giphy.com/v1/gifs/search?api_key=mlDPhCMeJbeV6rDU6gCS025nk1pBDPgy&q=" + data + "&limit=10&offset=0&rating=G&lang=en";
        
        $.ajax({
            url: link,
            Method: "GET"
        }).then(function(response){
            var runTime = response.data;
            for(let i = 0; i < runTime.length; i++){
                var gif = response.data[i].images.fixed_width.url;
                var pic = response.data[i].images.fixed_height_still.url;
                var title = response.data[i].title;
                var imgTag = $("<img>").attr("src", pic);
                var newp = $("<p>").text(title);
                var newbutton = $("<button>").text("Fav");
                newbutton.attr("class", "add-fav");
                imgTag.attr("data-run", gif);
                imgTag.attr("data-still", pic);
                imgTag.attr("data-status", "still");
                imgTag.attr("class", "change");
                newbutton.attr("data-number", "pic"+i);
                imgTag.attr("data-name", data);
                $("#images").append(newp);
                $("#images").append(newbutton);
                $("#images").append(imgTag);
            } 
            changeType();
            add();
        }) // once we get request funtion ends
    }) //click funtion ends
}//function ends

buttonWork();

//able to switch from gif to pic
function changeType() {
    $(".change").on("click", function(){

        var status = $("img").attr("data-status");

        if( status == "still" ){
            $(this).attr("src", $(this).attr("data-run"));
            $(this).attr("data-status", "run")
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still")
        }
    })// click function ends
}//function ends

function add(){
    $(".add-fav").on("click", function(){

        var srcvalue = $("img").attr("src");
        var still = $("img").attr("data-still");
        var run = $("img").attr("data-run");
        var stat = $("img").attr("data-status");
        var clas = $("img").attr("class");
        fav.push(srcvalue, still, run, stat, clas);

    })
}

$("#play-fav").on("click", function(){
    if (fav = []){
        alert("You have nothing on your favorites");
    } else {
        alert("no");
    }
})
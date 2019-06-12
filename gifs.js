var list = ["cats", "dog", "fish"];
var fav = [];
var count = 0;
var amount = 0;

localStorage.setItem(amount, fav);

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
                imgTag.attr("data-number", "pic"+count)
                imgTag.attr("class", "change");
                newbutton.attr("data-number", "pic"+i);
                imgTag.attr("data-name", data);
                var newdiv = $("<div>").attr("data-num", i)
                newdiv.append(newp);
                newdiv.append(newbutton);
                newdiv.append(imgTag);
                $("#images").append(newdiv);
                count++;
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

        var status = $(this).attr("data-status");

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

        var divNumber = $(this).parent();
        var imginfo = divNumber.children()[2];

        fav.push(imginfo);
        localStorage.setItem(amount, fav)
        amount++;
    })
}

$("#play-fav").on("click", function(){
    if (fav.length == 0){
        alert("You have nothing on your favorites");
    } else {
        $("#images").empty();

        for ( let i = 0; i < fav.length; i++ ){
            var put = fav[i];
            $("#images").append(put);
            $("#images").append(localStorage.getItem(amount));
        }
        changeType();
    }
})
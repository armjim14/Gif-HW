var list = ["cats", "dog", "fish"];
var count = 0;
var Storage = [];

if (typeof (Storage) !== "undefined"){
    localStorage.getItem("items");
} else {
    console.log("no favs");
}

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
function renderGifs(gifUrl, picUrl, title1, number, imgname){
                newdiv = $("<div>");
                var gif = gifUrl
                var pic = picUrl;
                var title = title1;
                var imgTag = $("<img>").attr("src", pic);
                var newp = $("<p>").text(title);
                var newbutton = $("<button>").text("Fav");
                newbutton.attr("class", "add-fav");
                imgTag.attr("data-run", gif);
                imgTag.attr("data-still", pic);
                imgTag.attr("data-status", "still");
                imgTag.attr("data-number", "pic"+ number)
                imgTag.attr("class", "change");
                newbutton.attr("data-number", "pic"+number);
                imgTag.attr("data-name", imgname);
                var newdiv = $("<div>").attr("data-num", number)
                newdiv.append(newp);
                newdiv.append(newbutton);
                newdiv.append(imgTag);
                $("#images").append(newdiv);
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
                // var newDiv = $("<div>");
                var gif = response.data[i].images.fixed_width.url;
                var pic = response.data[i].images.fixed_height_still.url;
                var title = response.data[i].title;
                renderGifs(gif, pic, title, i, data);
            } 
            // changeType();
            add();
        }) // once we get request funtion ends
    }) //click funtion ends
}//function ends

buttonWork();

//able to switch from gif to pic
    $("body").on("click", ".change", function(){
        var status = $(this).attr("data-status");

        if( status == "still" ){
            $(this).attr("src", $(this).attr("data-run"));
            $(this).attr("data-status", "run")
        } else if( status == "run" ) {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-status", "still")
        }
    })// click function ends

function add(){
    $(".add-fav").on("click", function(){

        var divNumber = $(this).parent();
        var imginfo = divNumber.children()[2];
        var firstpart = divNumber.children()[0];
        var imgstill = imginfo.getAttribute("data-still");
        var imgrun = imginfo.getAttribute("data-run");
        var imgname = imginfo.getAttribute("data-name");
        var imgtitle = firstpart.innerText;

        var obj = {
            imageStill: imgstill,
            imageRun: imgrun,
            imgName: imgname,
            imgTitle: imgtitle
        };

        Storage.push(obj);
        localStorage.setItem("items", JSON.stringify(Storage));
        console.log(firstpart.innerText);

    })
}

function getStorage(){
    if ((localStorage.getItem("items")) !== null){
        Storage = JSON.parse(localStorage.getItem("items"));
        console.log(JSON.parse(localStorage.getItem("items")));
        console.log(Storage);
        for (let i = 0; i < Storage.length; i++){
            renderGifs(Storage[i].imageRun, Storage[i].imageStill, Storage[i].imgName, i, Storage[i].imgTitle);
        }
    } else {
        alert("no gifs");
    }
}

getStorage();

$("#play-fav").on("click", function(){
    if (Storage.length == 0){
        alert("You have nothing on your favorites");
    } else {
        $("#images").empty();
        getStorage();
    }
})
//QUICK NOTE:
//Im aware that the current design isn't really the best and probably not really scalable 
//But this is solely intended for learning purposes and get to know how javascrip works and interacts with css and html

window.onload = function() {
    colorRandomSeats("movie1");
  };

let seatColors = {
    "movie1" : [],
    "movie2" : [],
    "movie3" : []
};

let selectedSeats = {
    "movie1" : [],
    "movie2" : [],
    "movie3" : []
}

//color the seats

//color some seats (randomly) so that it doesnt look like the cinema is empty all the time (solely for learning experiences)
function colorRandomSeats(movieId){
    const seats = document.querySelectorAll('.seat');
    for(let i = 0; i<seats.length; i++){
        const seat = seats[i];
        if(Math.floor(Math.random() * 10) < 3){
            seat.style.backgroundColor = "rgb(17, 2, 2)";
            seatColors[movieId].push(seat);
        }else{
            seat.style.backgroundColor = "rgb(46, 89, 89)";
        }
    }
}

//color the already reserved and selected seats
function colorSeats(selectedMovie){
    //reserved seats
    const seatsOfSelectedMovie = seatColors[selectedMovie];
    //selected seats
    const selected = selectedSeats[selectedMovie];
    const seats = document.querySelectorAll('.seat');
    for(let i = 0; i<seats.length; i++){
        const seat = seats[i];
        //color reserved seats
        if(seatsOfSelectedMovie.includes(seat)){
            seat.style.backgroundColor = "rgb(17, 2, 2)";
        }
        //color selected seats
        else if(selected.includes(seat)){
            seat.style.backgroundColor = "rgb(150, 204, 229)";
        }
        //color remaining ones
        else{
            seat.style.backgroundColor = "rgb(46, 89, 89)";
        }
    }
}

//detect change in the movie selection option and change seats accordingly

const selector = document.getElementById("id_select");

let galaxyFirst = 1;
let killFirst = 1;
//check if slected movie sections gets looked at for the first time
//if case color some seats as reserved randomly (for learing experience and so that i looks nicer)
function checkIfClickedForFirstTime(selectedMovie){
    if(selectedMovie === "movie1"){
       colorSeats(selectedMovie);
    }else if(selectedMovie === "movie2"){
        if(galaxyFirst === 1){
            colorRandomSeats(selectedMovie);
            galaxyFirst = 0;
        }else{
            colorSeats(selectedMovie);
        }
    }else if(selectedMovie === "movie3"){
        if(killFirst === 1){
            colorRandomSeats(selectedMovie);
            killFirst = 0;
        }else{
            colorSeats(selectedMovie);
        }
    }
}


//trigger actions as soon as another movie option gets selected
selector.addEventListener("change", function(event){
    const selectedMovie = event.target.options[event.target.selectedIndex].id;
    checkIfClickedForFirstTime(selectedMovie);

    if(selectedMovie === "movie2"){
        if(galaxyFirst === 1){
            colorRandomSeats(selectedMovie);
            galaxyFirst = 0;
        }
    }else if(selectedMovie === "movie3"){
        if(killFirst === 1){
            colorRandomSeats(selectedMovie);
            killFirst = 0;
        }
    }
    countSeats();
})


//now we need to color the seats light blue if they get selected

//it is necessary to handle the logic of determineCurrentSelectedMovie in a function since if it wouldnt be, it would only be determined once and than selectedMovieId would
//always be the one which is selected by default on loading of page
function determineCurrentSelectedMovie(){
    const selectedIndex = selector.selectedIndex;
    const selectedOption = selector.options[selectedIndex];
    const selectedMovieId = selectedOption.id;
    return selectedMovieId;
}

const seats = document.querySelectorAll(".seat");
for(let i = 0; i<seats.length; i++){
    seats[i].addEventListener("mouseover", function(){
        selectedMovieId = determineCurrentSelectedMovie();
        if(!seatColors[selectedMovieId].includes(seats[i])){
            seats[i].style.backgroundColor = "rgb(129, 204, 229)";
        }
    });

    seats[i].addEventListener("mouseout", function(){
        selectedMovieId = determineCurrentSelectedMovie();
        if(!seatColors[selectedMovieId].includes(seats[i]) && !selectedSeats[selectedMovieId].includes(seats[i]) ){
            seats[i].style.backgroundColor = "rgb(46, 89, 89)";
        }
    });

    seats[i].addEventListener("click", function(){
        selectedMovieId = determineCurrentSelectedMovie();
        //color free seats as selected if clicked
        if(!seatColors[selectedMovieId].includes(seats[i]) && !selectedSeats[selectedMovieId].includes(seats[i])){
            selectedSeats[selectedMovieId].push(seats[i]);
            seats[i].style.backgroundColor = "rgb(150, 204, 229)";
            countSeats();
        }//color selected seats as free again if clicked
        else if(selectedSeats[selectedMovieId].includes(seats[i])){
            seats[i].style.backgroundColor = "rgb(46, 89, 89)";
            removeSeatFromSelected(seats[i], selectedMovieId);
            countSeats();
        }
    });
}

function removeSeatFromSelected(seat, movieId){
    selectedSeats[movieId].splice(selectedSeats[movieId].indexOf(seat), 1);
}

//calculate the price of the selected seats and display it


function countSeats(){
    let amountOfSeats = 0;
    let amountToPay = 0;
    for(let movie in selectedSeats){
        for(let seat in selectedSeats[movie]){
            amountOfSeats += 1;
            if(movie === "movie1"){
                amountToPay += 15;
            }else if(movie === "movie2"){
                amountToPay += 18;
            }else{
                amountToPay += 12;
            }
        }
    }
    changeDisplay(amountOfSeats, amountToPay);
}

function changeDisplay(amountOfSeats, amountToPay){
    const amtPay = document.getElementById("amountToPay");
    const amtSeats = document.getElementById("amountOfSeats");

    amtPay.innerHTML = amountToPay;
    amtSeats.innerHTML = amountOfSeats;
}


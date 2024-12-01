
var audio = document.getElementById("myAudio");
var speakerIcon = document.getElementById("speakerIcon");

function playAudio() {
    audio.play(); // מנגן את קובץ השמע
}

function Mute() {
    if (audio.muted) {
        audio.muted = false;
        speakerIcon.src = "pictures/רמקול\ דלוק.png";
    } else {
        audio.muted = true;
        speakerIcon.src = "pictures/רמקול\ מכובה.png";
    }
}



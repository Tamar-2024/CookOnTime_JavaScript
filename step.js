const levels=document.querySelectorAll('.levelb')
let players = JSON.parse(localStorage.getItem('userDatas'));
let player = localStorage.getItem('player');
let playerpassword = localStorage.getItem('playerpassword');
 let index;
for (let i = 0; i < players.length; i++) {
    if (players[i].password == playerpassword && players[i].username == player) {
        index=i;
    }
 };

function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}
for(let i = 0; i < levels.length; i++) {
    if(players[index].check==true)
        {
            levels[i].removeAttribute('disabled');
            levels[i].style.color = '#9c5833';
        }
    levels[i].addEventListener('click',()=>{
        localStorage.setItem('idstep', levels[i].id);
        window.location.href = 'main.html'; 
    });
};
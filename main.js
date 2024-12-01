let players = JSON.parse(localStorage.getItem('userDatas'));
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const overlay = document.getElementById("overlay");
const stopButton = document.getElementById('stop');
let customerCount = 1;
const backgroundMusic = document.getElementById("background-music");
let timerInterval;
let timerRunning = false; // מצב הטיימר
const droparr = [
   'תמונות/קטשופבלירקע.png',
   'תמונות/ציפסבלירקע.png',
   'תמונות/בקבוקולה.png',
   'תמונות/המבורגרבלירקע.png',
   'תמונות/חסהבלירקע.png',
   'תמונות/כוסשתיהאדומה.png',
   'תמונות/עגבניהבלירקע.png'
];
let remainingTime;
const divprice = document.querySelector('.price');
const dragarr = document.querySelectorAll('.drag');
let levelid2 = 0;
const arrcustomer = ['תמונות/איש1.png', 'תמונות/איש2.png', 'תמונות/איש3.png', 'תמונות/איש4.png'];
let numofcustomer, numofdrag;
const btnprice = document.getElementById('startAnimation');

startButton.addEventListener('click', () => {
   levelid2 = localStorage.getItem('idstep');
   if (levelid2 == 1) {
      setTimeout(level1, 2000);
     remainingTime=180;
      
   } else if (levelid2 == 2) {
      level2();
      remainingTime=120;
   } else {
      level3();
      remainingTime=90;
   }
});
if (levelid2 == 1) {
   remainingTime=180;
    
 } else if (levelid2 == 2) {
    remainingTime=120;
 } else {
    remainingTime=90;
 }
function startTimer(display) {
  
   timerInterval = setInterval(() => {
      let minutes = parseInt(remainingTime / 60, 10);
      let seconds = parseInt(remainingTime % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--remainingTime < 0) {
         clearInterval(timerInterval);
         checkifmoov(players);
      }
   }, 1000);
   backgroundMusic.play();
}

startButton.addEventListener("click", () => {
   overlay.style.display = "none"; // Hide overlay
   if (!timerRunning) {
      startTimer(timerElement);
      timerRunning = true; // עדכון מצב הטיימר
   }
});

stopButton.addEventListener('click', () => {
   if (timerRunning) {
      clearInterval(timerInterval); // עצירת הטיימר
      timerRunning = false; // עדכון מצב הטיימר
      stopButton.classList.remove('fas', 'fa-pause'); // הסרת האייקון של ההשהיה
      stopButton.classList.add('fas', 'fa-play'); // הוספת האייקון של ההפעלה
   }
   else {
      startTimer(timerElement); // המשך הטיימר
      timerRunning = true; // עדכון מצב הטיימר
      stopButton.classList.remove('fas', 'fa-play'); // הסרת האייקון של ההפעלה
      stopButton.classList.add('fas', 'fa-pause'); // הוספת האייקון של ההשהיה
   }
});

///////////////////////////////////////////




const divcontain = document.createElement('div'); // יצירת דיב עבור הלקוחות
divcontain.id = 'divcontain';
document.body.appendChild(divcontain);

let droptarget = [];
let draggedElement, check = 0;

function level1() {
   customer();
}
function level2() {
   alert('you are in level 2');
   customer();
}
function level3() {
   alert('you are in level 3');
   customer();
   setTimeout(customer, 3000);
}

let imgcustomer, divfood;
function customer() { // פונקציה יוצרת לקוחות
   imgcustomer = document.createElement('img');
   numofcustomer = Math.floor(Math.random() * arrcustomer.length);
   imgcustomer.src = arrcustomer[numofcustomer]; // קובעת את ה-src
   imgcustomer.id = 'customerimg';
   imgcustomer.style.marginTop = '5%';
   imgcustomer.style.width = '25%';
   imgcustomer.style.height = '110%';
   imgcustomer.alt = 'customer';
   divcontain.appendChild(imgcustomer); // יצירת דיב לתמונות
   divfood = document.createElement('div');
   divfood.id = 'divfood';
   divcontain.appendChild(divfood);
   numofcustomer = numofcustomer + 1;

   if (numofcustomer >= 3) {
      divfood.style.width = '20%';
   }

   while (numofcustomer > 0) {
      numofdrag = Math.floor(Math.random() * droparr.length);
      const food = document.createElement('img');
      food.src = droparr[numofdrag];
      food.className = 'dragfood'; // הוספת קלאס עבור גרירה
      droptarget.push(food);
      divfood.appendChild(food);
      numofcustomer--;
   }
   checkdrop(dragarr, droptarget);
}


function checkdrop(dragarr, droptarget) {
   for (let i = 0; i < dragarr.length; i++) {
      dragarr[i].addEventListener('dragstart', (e) => {
         // alert[dragarr[i]];
         draggedElement = e.target;
      });
   };

   for (let i = 0; i < droptarget.length; i++) {
      droptarget[i].addEventListener('dragover', (e) => {
         e.preventDefault();
      });

      droptarget[i].addEventListener('drop', (e) => {
         e.preventDefault();
         if (draggedElement.src === droptarget[i].src) {
            check++;
            droptarget[i].remove();
            if (check == droptarget.length) {
               pricrtopay();
               divfood.remove();
               imgcustomer.remove();
               imgcustomer.remove();
               droptarget.splice(0, droptarget.length);
               setTimeout(customer, 2000);
               check = 0;
            }
         }
      });
   }
}


function pricrtopay() {
   btnprice.removeAttribute('hidden');
   setTimeout(() => { btnprice.hidden = true; }, 2000);
   divprice.innerHTML = parseInt(divprice.innerHTML) + 20+ '$';
}

function checkifmoov(players)
 {
   let player = localStorage.getItem('player');
   let playerpassword = localStorage.getItem('playerpassword');
   levelid2 = localStorage.getItem('idstep');
   if (levelid2 == 1) 
   {
      if (parseInt(divprice.innerHTML) >= 20) {
         checktrue();
      }
      else {
         checkfalse();
      }
   }

   if (levelid2 == 2) {
      if (parseInt(divprice.innerHTML) >= 200) {
         checktrue();
      }
      else {
         checkfalse();
      }
   }
   if (levelid2 == 3) {
      if (parseInt(divprice.innerHTML) >= 300) {
         checktrue();
      }
      else {
         checkfalse();
      }
   }
};

function checktrue() {
   let player = localStorage.getItem('player');
   let playerpassword = localStorage.getItem('playerpassword');
   const finish = document.createElement('button');
   finish.innerHTML = 'Congratulations, you passed the stage, to next stege';
   finish.classList = 'finish';
   document.body.appendChild(finish);
   for (let i = 0; i < players.length; i++) {
      if (players[i].password == playerpassword && players[i].username == player) {
         players[i].check = true;
         localStorage.setItem('userDatas', JSON.stringify(players));
      }
   };

   finish.addEventListener('click', function () {
      window.location.href = 'step.html';
   });
};

function checkfalse() {
   let player = localStorage.getItem('player');
   let playerpassword = localStorage.getItem('playerpassword');
   const finish = document.createElement('button');
   finish.innerHTML = 'try again';
   finish.classList = 'finish';
   document.body.appendChild(finish);
   for (let i = 0; i < players.length; i++) {
      if (players[i].password == playerpassword && players[i].username == player) {
         players[i].check = false;
         localStorage.setItem('userDatas', JSON.stringify(players));
      }
   };

   finish.addEventListener('click', function () {
      window.location.href = 'step.html';
   });
};
// שני אירועים חדשים
const burgerButton = document.getElementById("burgerButton");
burgerButton.addEventListener("dblclick", () => {
   alert("you pley in ton burger play"); // הודעה כאשר לוחצים פעמיים על האייקון
});
startButton.addEventListener('pointermove', function(event) {
   let text=document.createElement('p');
   text.innerHTML='Enjoy the game';
   startButton.appendChild(text);
   
});








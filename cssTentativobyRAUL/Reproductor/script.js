console.clear();
const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
});

$('.btn').click(function() {
    $(".bigPlay img").toggleClass("active");
});

const audio = document.querySelector('#audio');
let isPlay = false;

const allLines = document.querySelectorAll('.lines');
let index = 0;
let animation;

const bigButton = document.querySelector('.bigPlay');
bigButton.addEventListener('click', () => {
    if (!isPlay) {
        isPlay = true;
        audio.play();
        animation = setInterval(() => {
            if (index < allLines.length) {
                allLines[index].style.borderColor = '#063064'; 
                index++;
            } else {
                clearInterval(animation);
            }
        }, 1000);
    } else {
        isPlay = false;
        audio.pause();
        clearInterval(animation);
    }
});

function resetLines() {
    allLines.forEach(line => {
        line.style.borderColor = '#e8e9f4';
    });
    index = 0;
}


audio.addEventListener('ended', () => {
    isPlay = false;
    clearInterval(animation);
    resetLines();
    $(".bigPlay img").removeClass("active");
});


bigButton.addEventListener('click', () => {
    if (!isPlay) {
        resetLines();
    }
});
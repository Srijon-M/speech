const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm thirsty"
    },
    {
        image: './img/angry.jpg',
        text: "I'm angry"
    },
    {
        image: './img/food.jpg',
        text: "I'm hungry"
    },
    {
        image: './img/happy.jpg',
        text: "I'm happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    {
        image: './img/sad.jpg',
        text: "I'm sad"
    },
    {
        image: './img/outside.jpg',
        text: "I want to go outside"
    },
    {
        image: './img/scared.jpg',
        text: "I'm scared"
    },
    {
        image: './img/tired.jpg',
        text: "I'm tired"
    },
    {
        image: './img/school.jpg',
        text: "I don't want to go to schoool"
    },
    {
        image: './img/grandma.jpg',
        text: "I want to kill grandma"
    },
    {
        image: './img/hurt.jpg',
        text: "I will hurt you"
    }
];

data.forEach(createBox);

//create sppech boxes
function createBox(item){
    const box = document.createElement('div');
    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
        <img src = "${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakeText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

//Store Voices
let voices = []

function getVoices(){
    voices = speechSynthesis.getVoices();
    // console.log(voices);
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    })
}

//Set Text
function setTextMessage(text){
    message.text = text;
}

//Speak Text

function speakeText(){
    speechSynthesis.speak(message);
}

//Set Voice
function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

//Voices changed
speechSynthesis.addEventListener('voiceschanged',getVoices);


//Toggle text box
toggleBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show');
    // alert("Toggle button clicked");
})

//Close text box
closeBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show');
    // alert("Toggle button clicked");
});

voicesSelect.addEventListener('change', setVoice);

//ReaD button clicked
readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakeText();
})

getVoices();
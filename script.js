// Pet state
let petState = {
    mood: "happy",
    hunger: "Full",
    energy: "Energized"
};

// Load from local storage if available
if (localStorage.getItem("petState")) {
    petState = JSON.parse(localStorage.getItem("petState"));
}

// Elements
const pet = document.getElementById('pet');
const moodText = document.getElementById('mood');
const hungerText = document.getElementById('hunger');
const energyText = document.getElementById('energy');
const feedBtn = document.getElementById('feedBtn');
const playBtn = document.getElementById('playBtn');
const sleepBtn = document.getElementById('sleepBtn');

// Functions
function updateDisplay() {
    moodText.textContent = petState.mood;
    hungerText.textContent = petState.hunger;
    energyText.textContent = petState.energy;
  
    pet.className = 'pet';
  
    if (petState.hunger === "Hungry") {
      pet.classList.add('hungry');
    } else if (petState.energy === "Sleepy") {
      pet.classList.add('sleepy');
    } else {
      pet.classList.add('happy');
    }

     // Save to localStorage
  localStorage.setItem('petState', JSON.stringify(petState));
}

function feedPet() {
    petState.hunger = "Full";
    petState.mood = "Happy";
    shakePet();
    updateDisplay();
  }
  
  function playPet() {
    petState.mood = "Excited";
    petState.energy = "Tired";
    shakePet();
    updateDisplay();
  }
  
  function sleepPet() {
    petState.energy = "Energized";
    petState.mood = "Calm";
    updateDisplay();
  }
  
  // Simple shake animation
  function shakePet() {
    pet.style.transform = "rotate(10deg)";
    setTimeout(() => {
      pet.style.transform = "rotate(-10deg)";
    }, 100);
    setTimeout(() => {
      pet.style.transform = "rotate(0deg)";
    }, 200);
  }
  
  // Events
  feedBtn.addEventListener('click', feedPet);
  playBtn.addEventListener('click', playPet);
  sleepBtn.addEventListener('click', sleepPet);
  
  // Gradual decline over time
  setInterval(() => {
    // Hunger worsens
    if (petState.hunger === "Full") {
      petState.hunger = "Okay";
    } else if (petState.hunger === "Okay") {
      petState.hunger = "Hungry";
      petState.mood = "Grumpy";
    }
  
    // Energy declines
    if (petState.energy === "Energized") {
      petState.energy = "Okay";
    } else if (petState.energy === "Okay") {
      petState.energy = "Sleepy";
      petState.mood = "Drowsy";
    }
  
    updateDisplay();
  }, 10000); // Every 10 seconds
  
  // Initialize display
  updateDisplay();
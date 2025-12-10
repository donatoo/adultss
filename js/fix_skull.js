
let wasPaused = false;


const fixedMiniJemss = {
  phrases: [
    "Uh-oh... video not working?",
    "Try switching to another server 😊",
    "Server might be napping again.",
    "Try again at a different time. Like at night",
    "Sorry—ads may randomly appear!",
    "Ads is not mine",
    "Don't blame me for that",
    "I just borrowed these servers kindly.",
    "Not my servers, be gentle.",
    "Helpful skull assistant, reporting in! 😎",
    "Streaming magic, totally free today!",
    "Try another server if needed."
  ],
  index: 0,
  container: document.getElementById("fixedRobotContainer"),
  bubble: document.getElementById("fixedRobotBubble"),
  mouth: document.getElementById("fixedRobotMouth"),
  loopId: null
};

function speakNextPhrase() {
  if (wasPaused) return; // ⛔ Skip this if paused manually

  const phrase = fixedMiniJemss.phrases[fixedMiniJemss.index];
  fixedMiniJemss.bubble.textContent = phrase;
  fixedMiniJemss.bubble.classList.add("visible");
  fixedMiniJemss.mouth.classList.add("talking");

  // Hide bubble after 3 seconds
  setTimeout(() => {
    fixedMiniJemss.bubble.classList.remove("visible");
    fixedMiniJemss.mouth.classList.remove("talking");
  }, 3000);

  // Prepare for next phrase after 5 seconds
  fixedMiniJemss.index = (fixedMiniJemss.index + 1) % fixedMiniJemss.phrases.length;
  fixedMiniJemss.loopId = setTimeout(speakNextPhrase, 5000);
}


function showInitialPhrase() {
  const phrase = fixedMiniJemss.phrases[fixedMiniJemss.index];
  fixedMiniJemss.bubble.textContent = phrase;
  fixedMiniJemss.bubble.classList.add("visible");
  fixedMiniJemss.mouth.classList.add("talking");

  // Hide after 10 seconds
  setTimeout(() => {
    fixedMiniJemss.bubble.classList.remove("visible");
    fixedMiniJemss.mouth.classList.remove("talking");
  }, 10000);

  // Move to next after 12 seconds (10s visible + 2s delay)
  fixedMiniJemss.index = (fixedMiniJemss.index + 1) % fixedMiniJemss.phrases.length;
  fixedMiniJemss.loopId = setTimeout(speakNextPhrase, 12000);
}

// Start
showInitialPhrase();



document.addEventListener("DOMContentLoaded", () => {
  const container = fixedMiniJemss.container;
  const bubble = fixedMiniJemss.bubble;

  let originalLoopId = null;

 function pauseAndShowAllPhrases() {
  if (!wasPaused) {
    wasPaused = true;
    clearTimeout(fixedMiniJemss.loopId);
    originalLoopId = fixedMiniJemss.loopId;

    // Join with \n for multi-line
    bubble.textContent = fixedMiniJemss.phrases.join("\n\n");
    bubble.classList.add("visible", "multiline"); // Add multiline class
    bubble.style.width = "200px";
    fixedMiniJemss.mouth.classList.add("talking");
  }
}

function resumeLoop() {
  if (wasPaused) {
    wasPaused = false;

    bubble.classList.remove("visible", "multiline");
    fixedMiniJemss.mouth.classList.remove("talking");
    bubble.style.width = "";

    // 🔧 Clear the joined text immediately
    bubble.textContent = "";

    // Resume loop freshly after a slight delay
    fixedMiniJemss.loopId = setTimeout(speakNextPhrase, 1000);
  }
}





  // Pause on hover or click
  container.addEventListener("click", pauseAndShowAllPhrases);

  // Resume on mouse leave or anywhere else clicked

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      resumeLoop();
    }
  });
});


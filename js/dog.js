 
  const ghostDog_container = document.getElementById("ghostdog-container");
const ghostDog_bubble = document.getElementById("ghost-speech");
const  ghostDog_phrases  = [
      "Do they still remember you?",
      "You were their shadow once.",
      "You waited by the door every day.",
      "Somehow, you still love them.",
      "You were more than 'just a dog.'",
      "You saw them at their worst and stayed.",
      "You still chase dreams in silence.",
      "You were their best friend. They moved on.",
      "Do they still whisper your name?",
      "You protected them, even in storms.",
      "You wagged your tail through heartbreaks.",
      "You're gone, but love doesn’t fade.",
      "Some spirits don’t rest. They stay loyal.",
      "Love outlives the leash.",
      "You never wanted to leave.",
      "You heard them cry in secret.",
      "You were their peace. Their quiet joy.",
      "They moved on. But you stayed."
    ];

  const ghostDog_margin = 30;
  const ghostDog_speed = 80;

  let ghostDog_posX = 100;
  let ghostDog_posY = 100;
  let ghostDog_targetX = ghostDog_posX;
  let ghostDog_targetY = ghostDog_posY;
  let ghostDog_lastTime = Date.now();

  function ghostDog_getRandomPosition() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const x = Math.random() * (vw * 1.5) + ghostDog_margin;
    const y = Math.random() * (vh * 1.5) + ghostDog_margin;

    return { x, y };
  }

  function ghostDog_showSpeechBubble(text) {
    ghostDog_bubble.textContent = text;
    ghostDog_bubble.style.opacity = 1;

    setTimeout(() => {
      const ghostRect = ghostDog_container.getBoundingClientRect();
      const bubbleRect = ghostDog_bubble.getBoundingClientRect();

      let left = -bubbleRect.width / 2 + 20;
      let correctedLeft = Math.max(
        -ghostRect.left,
        Math.min(left, window.innerWidth - ghostRect.left - bubbleRect.width)
      );
      ghostDog_bubble.style.left = `${correctedLeft}px`;
    }, 0);
  }

  function ghostDog_hideSpeechBubble() {
    ghostDog_bubble.style.opacity = 0;
  }

  function ghostDog_pickNewTarget() {
    const { x, y } = ghostDog_getRandomPosition();
    ghostDog_targetX = x;
    ghostDog_targetY = y;
  }

  function ghostDog_animate() {
    const now = Date.now();
    const deltaTime = (now - ghostDog_lastTime) / 1000;
    ghostDog_lastTime = now;

    const dx = ghostDog_targetX - ghostDog_posX;
    const dy = ghostDog_targetY - ghostDog_posY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const moveX = (dx / distance) * ghostDog_speed * deltaTime;
      const moveY = (dy / distance) * ghostDog_speed * deltaTime;

      ghostDog_posX += moveX;
      ghostDog_posY += moveY;
    } else {
      ghostDog_pickNewTarget();
    }

    ghostDog_container.style.transform = `translate(${ghostDog_posX}px, ${ghostDog_posY}px)`;
    requestAnimationFrame(ghostDog_animate);
  }

  async function ghostDog_startSpeechLoop() {
    while (true) {
      const phrase = ghostDog_phrases[Math.floor(Math.random() * ghostDog_phrases.length)];
      ghostDog_showSpeechBubble(phrase);

      await new Promise((res) => setTimeout(res, 10000)); // Show 10s
      ghostDog_hideSpeechBubble();

      await new Promise((res) => setTimeout(res, 2000));  // Hide 2s
    }
  }

  window.addEventListener("load", () => {
    ghostDog_pickNewTarget();
    ghostDog_animate();
    ghostDog_startSpeechLoop();
  });
  

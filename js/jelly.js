

    const container = document.getElementById("jellyfish-container");
    const bubble = document.getElementById("jelly-speech");

   const phrases = [
  "Was it love or just comfort?",
  "You gave your all... did they?",
  "It felt real... didn’t it?",
  "They said forever. But forever ended early.",
  "You waited, but they drifted.",
  "Some connections aren't meant to last.",
  "Did they care, or were you just convenient?",
  "Love shouldn't feel uncertain.",
  "You were honest. Were they?",
  "Now you’re left with questions, not closure.",
  "They smiled like they meant it. Did they?",
  "You fell fast. They let go faster.",
  "Do they ever think about you now?",
  "You were there when no one else was.",
  "What changed? You still don’t know.",
  "They held your hand, then let go.",
  "You deserved more than silence.",
  "Maybe it was love. Maybe it was illusion.",
  "You saw a future. They saw a phase.",
  "You remember everything. They remember nothing.",
  "It hurts because it mattered.",
  "You loved them in ways they’ll never understand.",
  "You were all in. They were half-hearted.",
  "You wrote them poems. They gave you reasons.",
  "You asked for honesty. They gave you hope.",
  "You saw a spark. They saw a distraction.",
  "You believed their words. Now you doubt yours.",
  "You gave them peace. They gave you doubt.",
  "You were healing. They reopened wounds.",
  "They moved on. You’re still here.",
  "You made them a priority. They made you a memory.",
  "They were the chapter. You made them the story.",
  "You weren’t too much. They were too little.",
  "You didn’t lose them. They lost you.",
  "Sometimes goodbye is mercy in disguise.",
  "The hardest part is not knowing why.",
  "They gave up too soon. You held on too long.",
  "You gave them everything. They left anyway.",
  "Your heart still whispers their name.",
  "You keep remembering what you should forget.",
  "You searched for meaning in silence.",
  "Some hearts are meant to ache.",
  "You felt seen... until they stopped looking.",
  "They were your home. Now you feel homeless.",
  "You kept the memories. They deleted them.",
  "You still check the time they used to call.",
  "You were the calm. They were the storm.",
  "You smiled for them. They frowned at you.",
  "You wanted growth. They wanted escape.",
  "You kept the promises. They kept the lies.",
  "You painted love. They erased it.",
  "You deserved answers, not avoidance.",
  "You made space. They made excuses.",
  "You trusted the wrong heart.",
  "You’re healing, even if it still hurts.",
  "Their silence speaks louder now.",
  "Your heart remembers what your mind tries to forget.",
  "You still dream of a voice that left.",
  "You miss what could’ve been.",
  "Love doesn’t always stay. But it always changes you.",
  "You bloomed for them. They left in winter.",
  "You were their safe space. They were your lesson.",
  "It’s okay to feel everything. That means you loved.",
  "You tried. That’s brave.",
  "You let them in. They walked away.",
  "Some stories end without closure.",
  "They let you go like you were nothing.",
  "You saw forever. They saw convenience.",
  "You whispered love. They shouted absence.",
  "They forgot. You’re still remembering.",
  "They were a moment. You were ready for a lifetime.",
  "You wanted clarity. They gave confusion.",
  "They ghosted. You grieved.",
  "You stayed real. They wore masks.",
  "You saw potential. They saw an option.",
  "They closed the door. You stood in the hallway.",
  "You carried love. They dropped it.",
  "Your love didn’t fail. They did.",
  "You became stronger from the wreckage.",
  "You mattered, even if they didn’t show it.",
  "You felt alone beside them.",
  "They made you question your worth.",
  "You don’t need their love to feel lovable.",
  "You were not hard to love. They just didn’t know how.",
  "They saw your light but still walked away.",
  "You kept your heart open. That’s powerful.",
  "They walked out. But love doesn’t leave you.",
  "You became their history. They were your hope.",
  "You’re more than who left.",
  "You were soft in a world that wasn’t kind.",
  "They taught you what you’ll never accept again.",
  "You still care. That doesn’t make you weak.",
  "You gave more than they deserved.",
  "You’re still learning to let go.",
  "You let them see the real you. That was rare.",
  "You were enough. They just couldn’t see it.",
  "They didn’t deserve your best.",
  "You’re allowed to miss them and move on.",
  "Your love was sincere. That matters.",
  "You chose love. They chose comfort.",
  "You don’t need to forget to forgive.",
  "They don’t know what they lost.",
  "Your love didn’t fail. They did.",
  "You’re still standing. That’s strength.",
  "Even broken hearts still beat.",
  "You were never asking for too much.",
  "You outgrew the space they put you in.",
  "Your silence holds more truth than their words.",
  "You gave them pieces you’ll never get back.",
  "Some feelings have no closure.",
  "You loved them. Now love yourself.",
  "They ran. You stayed with the pain.",
  "Some lessons wear human faces.",
  "You planted flowers in soil that wasn’t ready.",
  "You offered depth. They skimmed the surface.",
  "You burned bright. They closed their eyes.",
  "You weren’t hard to love. They were scared.",
  "They played games. You wanted truth.",
  "You were present. They were distracted.",
  "You gave time. They gave excuses.",
  "You gave your light to someone hiding in shadows.",
  "You made space for them. They filled it with silence.",
  "They called it timing. You called it love.",
  "You spoke heart. They spoke habit.",
  "You stayed. They wandered.",
  "They forgot how much you gave.",
  "You weren’t lost. You were left behind.",
  "You held on. They let go.",
  "Your tears held more love than their words.",
  "They missed the best parts of you.",
  "You built bridges. They burned them.",
  "They lost a future. You lost an illusion.",
  "You deserve someone who chooses you daily.",
  "You cried in silence. They moved in noise.",
  "You kept hope. They kept distance.",
  "You wanted forever. They wanted familiar.",
  "You needed warmth. They brought cold.",
  "You deserve peace after chaos.",
  "Your love was rare. Don’t regret it.",
  "They left. Your love remained.",
  "Your love was brave. Their exit wasn’t.",
  "You loved with eyes open. They blinked and missed it.",
  "They walked away from the best thing they never understood.",
  "You can miss them and still heal.",
  "Letting go is loving yourself more.",
  "You gave meaning. They gave silence.",
  "You stayed loyal. They stayed lost.",
  "Your heart still believes in better.",
  "You gave too many chances to someone who never tried.",
  "They left you searching for yourself in ruins.",
  "You aren’t broken. You’re becoming.",
  "They weren’t ready for your kind of love.",
  "You were real in a world of almosts.",
  "They didn’t leave because of you. They left because of them.",
  "You were the lighthouse. They drifted away.",
  "They chose pride. You chose heart.",
  "Your love changed you. That’s not failure.",
  "You don’t need their love to be whole.",
  "You are someone worth staying for.",
  "You are worthy of reciprocation.",
  "You deserve someone who sees you clearly.",
  "You are not your heartbreak.",
  "You’re learning how to be loved better.",
  "What hurt you once taught you truth.",
  "Even broken hearts find new rhythms.",
  "You can start over without forgetting.",
  "Their goodbye was your beginning.",
  "You gave them love. Now give it to yourself.",
  "They didn’t meet you halfway. You walked the whole road.",
  "You don’t need to be chased, just chosen.",
  "Your heart knows how to try again.",
  "Love isn’t about fixing. It’s about growing.",
  "You let go. You rose higher.",
  "You gave fire. They brought smoke.",
  "Your peace matters more than their presence.",
  "They broke the trust. Not your worth.",
  "You are not too much. They were not enough.",
  "Some losses are blessings in disguise.",
  "You deserve ease, not exhaustion.",
  "You were love in human form.",
  "You gave clarity. They gave chaos.",
  "You brought magic. They didn’t believe.",
  "They didn’t stay — but you will."
];





  const margin = 30;
  const speed = 80; // pixels per second

  let posX = 100;
  let posY = 100;
  let targetX = posX;
  let targetY = posY;
  let lastTime = Date.now();

  function getRandomPosition() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const x = Math.random() * (vw * 1.5) + margin;
    const y = Math.random() * (vh * 1.5) + margin;

    return { x, y };
  }

  function showSpeechBubble(text) {
    bubble.textContent = text;
    bubble.style.opacity = 1;

    // Position bubble nicely
    setTimeout(() => {
      const jellyRect = container.getBoundingClientRect();
      const bubbleRect = bubble.getBoundingClientRect();

      let left = -bubbleRect.width / 2 + 20;
      let correctedLeft = Math.max(
        -jellyRect.left,
        Math.min(left, window.innerWidth - jellyRect.left - bubbleRect.width)
      );
      bubble.style.left = `${correctedLeft}px`;
    }, 0);
  }

  function hideSpeechBubble() {
    bubble.style.opacity = 0;
  }

  function pickNewTarget() {
    const { x, y } = getRandomPosition();
    targetX = x;
    targetY = y;
  }

  function animate() {
    const now = Date.now();
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    const dx = targetX - posX;
    const dy = targetY - posY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const moveX = (dx / distance) * speed * deltaTime;
      const moveY = (dy / distance) * speed * deltaTime;

      posX += moveX;
      posY += moveY;
    } else {
      pickNewTarget();
    }

    container.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
  }

  async function startBubbleLoop() {
    while (true) {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      showSpeechBubble(phrase);

      await new Promise((res) => setTimeout(res, 10000)); // Show 10s
      hideSpeechBubble();

      await new Promise((res) => setTimeout(res, 2000));  // Hide 2s
    }
  }

  // Start on load
  window.addEventListener("load", () => {
    pickNewTarget();
    animate();
    startBubbleLoop();
  });

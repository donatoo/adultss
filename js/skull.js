


    const miniJemss = {


    phrases: [
  "Love them the way back.",
  "Let their love teach you.",
  "Grow into the love offered.",
  "Stay because they stayed first.",
  "Show up like they did.",
  "Meet love with soft hands.",
  "Choose them like they chose.",
  "Return what was given freely.",
  "Love back with open heart.",
  "Give what you once received.",
  "Love is built, not found.",
  "Catch up with their love.",
  "Be gentle, they were first.",
  "Their patience deserves your presence.",
  "They waited—make it worth.",
  "Match their steady, silent love.",
  "Offer what you once feared.",
  "They stayed—now walk toward them.",
  "Love slowly, but love surely.",
  "You’re ready—let them know.",
  "Respond with care, not rush.",
  "Follow the love they offered.",
  "Let kindness shape your return.",
  "They didn’t quit—don’t ignore.",
  "Give the love you learned.",
  "Choose love, even if late.",
  "Don’t waste what was faithful.",
  "Take the hand that waited.",
  "Return to what felt safe.",
  "Love them with both hands.",
  "Now it’s your turn—love.",
  "Grow where they planted roots.",
  "Water the love they gave.",
  "Be the soft place now.",
  "Come back with full heart.",
  "Love back, not just forward.",
  "Give back what healed you.",
  "Be steady like they were.",
  "Let love be your answer.",
  "Don’t delay what’s true love.",
  "Stop hiding—love them clearly.",
  "Make their wait mean something.",
  "You’re loved—now love back.",
  "Love them for who stayed.",
  "They waited—don’t let go.",
  "They gave freely—respond gently.",
  "Show love, not just regret.",
  "Stay soft. Stay honest. Stay.",
  "Choose them without second thoughts.",
  "You’re enough—give love freely.",
  "Stop doubting. Start loving them.",
  "Let love feel like home.",
  "Speak love in small acts.",
  "Meet their love with courage.",
  "Answer with the same patience.",
  "Reflect what they’ve always shown.",
  "Grow where they never left.",
  "Walk toward what stayed still.",
  "You’re safe—return the feeling.",
  "They never left—neither should you.",
  "Let your love catch up.",
  "Give love the way learned.",
  "Match the care they gave.",
  "Don’t waste love’s second chance.",
  "Be present. Be real. Love.",
  "Offer love without old fear.",
  "Love doesn’t wait forever—answer.",
  "They saw you—see them back.",
  "Now you know—act with love.",
  "They didn’t ask much—just love.",
  "Honor their hope with action.",
  "It’s your turn to stay.",
  "Grow love, don’t just accept.",
  "They gave first—return the favor.",
  "They were love—be love now.",
  "Show them they were right.",
  "This love deserves a reply.",
  "Don’t let fear answer love.",
  "Speak in action, not delay.",
  "Let them feel seen too.",
  "Choose softly—like they once did.",
  "Prove love is worth return.",
  "Don’t run—build something instead.",
  "They believed—prove them right.",
  "Show up fully this time.",
  "You’re ready—show them you are.",
  "Don’t waste what waited long.",
  "Now you lead with love.",
  "Give what you always wanted.",
  "Be love’s answer this time.",
  "Respond gently, love patiently too.",
  "Make love feel safe again.",
  "They offered peace—build on it.",
  "You’re held—now hold back.",
  "Give your all—like they did.",
  "Be the home they were.",
  "They led with love—follow.",
  "Don’t leave them waiting more.",
  "Start loving like they taught.",
  "Be honest—love out loud.",
  "Walk into love without fear.",
  "Return with heart, not hesitation.",
  "Bring warmth they once gave.",
  "This time, stay on purpose.",
  "Give softly. Love fiercely. Stay.",
  "You were loved—give love back.",
  "Catch up to their care.",
  "Don’t be late with love.",
  "Let them feel chosen too.",
  "Learn love, then give it."
],
    
    

      
      container: document.getElementById("miniJemss_container"),

      bubble: document.getElementById("miniJemss_bubble"),

      mouth: document.getElementById("miniJemss_mouth")

    };



    function miniJemss_move() {

      const margin = 42;
      const x = Math.random() * (window.innerWidth - 40 - (margin+5) * 2) + margin;
      const y = Math.random() * (window.innerHeight - 50 - margin * 2) + (margin-15);

      miniJemss.container.style.transform = `translate(${x}px, ${y}px)`;

    }



    function miniJemss_speak() {

      const phrase = miniJemss.phrases[Math.floor(Math.random() * miniJemss.phrases.length)];

      miniJemss.bubble.textContent = phrase;

      miniJemss.bubble.classList.add("visible");

      miniJemss.mouth.classList.add("talking");



      setTimeout(() => {

        miniJemss.bubble.classList.remove("visible");

        miniJemss.mouth.classList.remove("talking");

      }, 5000);

    }



    setInterval(miniJemss_move, 7000);

    setInterval(miniJemss_speak, 9000);



    miniJemss_move();

    miniJemss_speak();



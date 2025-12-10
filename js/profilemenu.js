



  async function resetWatched() {
    const user = firebase.auth().currentUser;
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete all your watched episodes?");
    if (!confirmed) return;

    try {
      const watchedRef = db.collection("users").doc(user.uid).collection("watchedEpisodes");
      const snapshot = await watchedRef.get();

      const batch = db.batch();
      snapshot.forEach(doc => batch.delete(doc.ref));

      await batch.commit();
      alert("✅ All watched episodes have been deleted.");
    } catch (error) {
      console.error("Error resetting watched episodes:", error);
      alert("❌ Failed to reset watched episodes.");
    }
  }



  document.addEventListener("DOMContentLoaded", () => {
      const loginBtn = document.getElementById('login-btn');
      const profile = document.getElementById('profile');
      const profileCircle = document.getElementById('profile-circle');
      const profileMenu = document.getElementById('profile-menu');

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          loginBtn.style.display = 'none';
          profile.style.display = 'inline-block';

          try {
            const doc = await db.collection('users').doc(user.uid).get();
           const username = doc.exists ? doc.data().username : '?';
profileCircle.textContent = username.charAt(0).toUpperCase();

// ✅ Show username in the dropdown
document.getElementById('profile-username').textContent = `Hello, ${username}`;


           profileCircle.onclick = () => {
              profileMenu.style.display = profileMenu.style.display === 'none' ? 'block' : 'none';
            };
          } catch (e) {
            console.error("Failed to fetch user:", e);
          }
        } else {
          loginBtn.style.display = 'inline-block';
          profile.style.display = 'none';
        }
      });
    });

    async function logout() {
      await auth.signOut();
      location.reload();
    }

    async function changeUsername() {
      const user = auth.currentUser;
      const newUsername = document.getElementById('new-username').value;
      if (user && newUsername.trim()) {
        await db.collection('users').doc(user.uid).update({ username: newUsername });
        alert('Username updated!');
        location.reload();
      }
    }
  

  

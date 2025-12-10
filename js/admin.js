let currentUserIsAdmin = false;
let currentUserIsViva = false;

auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    const doc = await firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .collection('roles')
      .doc(user.uid)
      .get();

    if (doc.exists) {
      const roleData = doc.data();
      console.log("Role document found:", roleData);

      // ✅ Check for admin
      if (roleData.role === "admin") {
        currentUserIsAdmin = true;
        console.log("✅ You are admin!");
        addAdminServerOption();
      } else {
        console.log("⚠️ You are not an admin.");
      }

      // ✅ Check for isviva === true
      if (roleData.isviva === "true") {
        currentUserIsViva = true;
        console.log("🎉 You are a Viva user!");
        const vivamax = await fetchVivamax();
        displayList(vivamax, 'vivamax-list');
      }

      

    } else {
      console.log("❌ No role document found.");
    }

  } catch (err) {
    console.error("🔥 Failed to fetch role:", err.message);
  }
});


 function addAdminServerOption() {
  const serverDropdown = document.getElementById("server");

  const adminOption1 = document.createElement("option");
  adminOption1.value = "admin-server1";
  adminOption1.textContent = "🛡️ No Ads Server 1 (admin)";
  serverDropdown.appendChild(adminOption1);

const adminOption2 = document.createElement("option");
  adminOption2.value = "admin-server2";
  adminOption2.textContent = "🛡️ No Ads Server 2 (admin)";
  serverDropdown.appendChild(adminOption2);

  const adminOption3 = document.createElement("option");
  adminOption3.value = "admin-server3";
  adminOption3.textContent = "🛡️ No Ads Server 3 (admin)";
  serverDropdown.appendChild(adminOption3);


const adminOption4 = document.createElement("option");
  adminOption4.value = "admin-server4";
  adminOption4.textContent = "🛡️ No Ads Server 4 (admin)";
  serverDropdown.appendChild(adminOption4);

const adminOption5 = document.createElement("option");
  adminOption5.value = "admin-server5";
  adminOption5.textContent = "🛡️ No Ads Server 5 (admin)";
  serverDropdown.appendChild(adminOption5);



}


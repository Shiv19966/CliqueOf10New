// admin.js

document.addEventListener("DOMContentLoaded", () => {
  const usersContainer = document.getElementById("users");

  const fetchUsers = async () => {
    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      console.log(baseUrl, 9)
      const response = await fetch(`${baseUrl}/users`);
      console.log(response, 11)
      const users = await response.json();
      console.log(users, 13);
      displayUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const displayUsers = (users) => {
    usersContainer.innerHTML = "";
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
          <p>${user.displayName} (${user.email}) - Role: ${user.role}</p>
          <button onclick="setAdmin('${user.id}', true)">Set as Admin</button>
          <button onclick="setAdmin('${user.id}', false)">Remove Admin</button>
        `;
      usersContainer.appendChild(userDiv);
    });
  };

  window.setAdmin = async (userId, isAdmin) => {
    try {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      await fetch(`${baseUrl}/setAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, isAdmin }),
      });
      fetchUsers(); 
    } catch (error) {
      console.error("Error setting admin role:", error);
    }
  };

  fetchUsers();
});

document.addEventListener("DOMContentLoaded", () => {
  const changeNameBtn = document.getElementById("change-name");

  function showGreetingNotification(name) {
    if (Notification.permission === "granted") {
      new Notification(`Привет, ${name}! 👋`, {
        body: "Рада тебя снова видеть на сайте!",
        icon: "https://cdn-icons-png.flaticon.com/512/5269/5269070.png"
      });
    }
  }

  if (Notification.permission === "granted") {
    let username = localStorage.getItem("name");
    if (!username) {
      username = prompt("Как тебя зовут?");
      if (username) {
        localStorage.setItem("name", username);
        showGreetingNotification(username);
      }
    } else {
      showGreetingNotification(username);
    }
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        let username = localStorage.getItem("name");
        if (!username) {
          username = prompt("Как тебя зовут?");
          if (username) {
            localStorage.setItem("name", username);
            showGreetingNotification(username);
          }
        } else {
          showGreetingNotification(username);
        }
      }
    });
  }

  let username = localStorage.getItem("name");
  if (!username) {
    username = prompt("Как тебя зовут?");
    if (username) {
      localStorage.setItem("name", username);
      showGreetingNotification(username);
    }
  }

  function updateGreeting() {
    const titleElement = document.querySelector(".title");
    if (titleElement) {
      titleElement.textContent = "Добро пожаловать, " + username;
    }
  }

  updateGreeting();

  if (changeNameBtn) {
    changeNameBtn.addEventListener("click", () => {
      const newName = prompt("Введите новое имя:");
      if (newName) {
        username = newName;
        localStorage.setItem("name", username);
        updateGreeting();
        showGreetingNotification(username);
      }
    });
  }
});


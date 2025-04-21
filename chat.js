document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector("#chat-input");
    const chatBox = document.querySelector("#chat-box");
  
    if (!chatInput || !chatBox) {
      console.error("Не удалось найти элементы чата");
      return;
    }
  
    loadMessages();
  
    chatInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && chatInput.value.trim() !== "") {
        const userMessage = chatInput.value;
        chatInput.value = ""; 
  
        displayMessage(userMessage, "user");
  
        setTimeout(() => {
          const botResponse = generateBotResponse(userMessage);
          displayMessage(botResponse, "bot");
        }, 1000);
  
        saveMessages(userMessage, "user");
        setTimeout(() => {
          const botResponse = generateBotResponse(userMessage);
          saveMessages(botResponse, "bot");
        }, 1000);
      }
    });
  
    function displayMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.classList.add(sender === "bot" ? "bot-message" : "user-message");
      messageElement.textContent = message;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight; 
    }
  
    function generateBotResponse(userMessage) {
      const lowerCaseMessage = userMessage.toLowerCase();
  
      if (lowerCaseMessage.includes("привет") || lowerCaseMessage.includes("здравствуй")) {
        return "Привет! Как я могу помочь?";
      } else if (lowerCaseMessage.includes("как дела")) {
        return "Я в порядке, спасибо! А ты как?";
      } else if (lowerCaseMessage.includes("кто ты")) {
        return "Я — твой AI-помощник, всегда готов помочь!";
      } else if (lowerCaseMessage.includes("что ты умеешь")) {
        return "Я могу отвечать на вопросы, помогать с задачами, переводить текст и много другое!";
      } else if (lowerCaseMessage.includes("пока")) {
        return "До свидания! Буду рад помочь снова.";
      } else if (lowerCaseMessage.includes("хорошо")) {
        return "Рад слышать, что всё хорошо!";
      } else if (lowerCaseMessage.includes("хм") || lowerCaseMessage.includes("не знаю")) {
        return "Не переживай, мы все иногда задумываемся!";
      } else if (lowerCaseMessage.includes("а ты можешь отвечать на все вопросы") || lowerCaseMessage.includes("не знаю")) {
        return "Я попытаюсь ответить на все возможные вопросы ";
      } else if (lowerCaseMessage.includes("нормально") || lowerCaseMessage.includes("не знаю")) {
        return "Отлично! Я рада что у тебя всё хорошо ";
      } else {
        return "Интересный вопрос! Но я пока учусь. Попробуй спросить что-то другое.";
      }
    }
  
    function saveMessages(message, sender) {
      const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
      messages.push({ message, sender });
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  
    function loadMessages() {
      const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
      messages.forEach(msg => {
        displayMessage(msg.message, msg.sender);
      });
    }
  });
  
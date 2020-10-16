export const getRandomRobotMessage = (author) => {
    const allRobotMessages = [
      `Очень интересно, ${author}`,
      `Что еще расскажешь, ${author}?`,
      `Невероятно, ${author}`,
      `Ты такой интересный собеседник, ${author}`,
      `Хорошо, ${author}`,
    ];
    return allRobotMessages[Math.floor(Math.random() * allRobotMessages.length)];
  };
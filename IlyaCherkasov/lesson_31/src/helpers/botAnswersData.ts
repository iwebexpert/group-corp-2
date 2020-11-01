export const getRandomRobotMessage = (author: string): string => {
  const allRobotMessages: string[] = [
    `Очень интересно, ${author}`,
    `Что еще расскажешь, ${author}?`,
    `Невероятно, ${author}`,
    `Ты такой интересный собеседник, ${author}`,
    `Хорошо, ${author}`,
  ];
  return allRobotMessages[Math.floor(Math.random() * allRobotMessages.length)];
};
type CreateMessage = (
  text: IMessage['text'],
  username: IMessage['username'],
  chatId: IMessage['chatId']
) => IMessage;

type CreateBotMessage = (
  sender: IMessage['username'],
  receiver: string,
  chatId: IMessage['chatId']
) => IMessage;

type ValidateInput = (text: string) => boolean;

type ValidateNewChat = (chats: Array<IChat>, newReceiver: string) => boolean;

type MessageShorter = (message: IMessage['text']) => string;

type FindChatByReceiver = (chats: Array<IChat>, receiver: string) => IChat;

type FindChatIdByReceiver = (chats: Array<IChat>, receiver: string) => string;

type NavbarItemMessage = {
    id: string;
    author: string;
    message: string;
    image: string;
    chatId: number;
};

type NavbarListChat = {
    id: number;
    title: string;
    fire: boolean;
    image: string;
    messages: Array<NavbarItemMessage>
}

type Message = {
    id: string,
    author: string,
    message: string,
    image: string
}

type Person = {
    name: string;
    status: string;
    image: string;
}
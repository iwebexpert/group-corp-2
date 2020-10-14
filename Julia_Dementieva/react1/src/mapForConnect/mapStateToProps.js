
export const mapStateToProps = (component) => {
    switch(component){
        case 'HeaderContainer':
        case 'AboutContainer': {
            return function (state, ownProps){
                const {loading, entries, ready} = state.about;

                let infoPerson = (ready) ? entries : null;
                
                return {
                    infoPerson,
                    isLoading: loading,
                };
            };
        };

        case 'ChatsListContainer': {
            return function (state, ownProps){
                const {ready, entries, loading, fireChatsId} = state.chats;
                let chatsLoad = (ready) ? entries : null;
                let lastChatId = (ready) ? Object.keys(chatsLoad).length : null;
                let fireListId = (ready) ? fireChatsId : null;

                return {
                    chatsLoad,
                    lastChatId,
                    fireListId,
                    isLoading: loading,
                };
            };
        };

        case 'MessengerContainer': {
            return function (state, ownProps){
                const chats = state.chats.entries;
                const {match} = ownProps;
                const {ready, entries} = state.about;

                let messages, authorChat, avatarChat = null;

                let namePerson = (ready) ? entries.name : null;

                let nameRobot = (state.robot.loading) ? state.robot.entries.nameRobot : null;
                let answerRobot = (state.robot.loading) ? state.robot.entries.answerRobot : null;

                if(match && chats[match.params.id]){
                    messages = chats[match.params.id].messages;
                    authorChat = chats[match.params.id].author;
                    avatarChat = chats[match.params.id].avatar;
                }
                
                return {
                    messages,
                    chatId: match ? match.params.id: null,
                    authorChat,
                    avatarChat,
                    namePerson,
                    nameRobot,
                    answerRobot,
                    isLoading: state.chats.loading,
                };
            };
        };

        default:
            return null;
    }
};
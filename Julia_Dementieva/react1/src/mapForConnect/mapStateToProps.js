
export const mapStateToProps = (component) => {
    switch(component){
        case 'HeaderContainer':
        case 'AboutContainer': {
            return function (state, ownProps){
                const {loading, entries} = state.about;

                let infoPerson = (loading) ? entries : null;
                
                return {
                    infoPerson
                };
            };
        };

        case 'ChatsListContainer': {
            return function (state, ownProps){
                const {ready, entries, loading, fireChatsId} = state.chats;
                console.log('list100',state)
                let chatsLoad = (ready) ? entries : null;
                let lastChatId = (ready) ? Object.keys(chatsLoad).length : null;
                let fireListId = (ready) ? fireChatsId : null;
                console.log('list45',chatsLoad)

                return {
                    chatsLoad,
                    lastChatId,
                    fireListId,
                    isLoading: state.chats.loading,
                };
            };
        };

        case 'MessengerContainer': {
            return function (state, ownProps){
                const chats = state.chats.entries;
                const {match} = ownProps;
                const {loading, entries} = state.about;

                let messages, authorChat, avatarChat = null;

                let namePerson = (loading) ? entries.name : null;

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
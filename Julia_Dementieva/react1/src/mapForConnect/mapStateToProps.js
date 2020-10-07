
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
                const {entries, loading} = state.chats;

                let chatsLoad = (loading) ? entries : null;

                return {
                    chatsLoad,
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
                };
            };
        };

        default:
            return undefined;
    }
};
export const mapStateToProps = (component) => {
  switch (component) {
    case "HeaderContainer":
    case "ProfileContainer": {
      return function (state, ownProps) {
        const { loading, entries } = state.profile;

        let infoProfile = loading ? entries : null;

        return {
          infoProfile,
        };
      };
    }

    case "ChatsListContainer": {
      return function (state, ownProps) {
        const { entries, loading, fireChatsId } = state.chats;

        let chatsLoad = loading ? entries : null;
        let lastChatId = loading ? Object.keys(chatsLoad).length : null;
        let fireListId = loading ? fireChatsId : null;

        return {
          chatsLoad,
          lastChatId,
          fireListId,
        };
      };
    }

    case "MessengerContainer": {
      return function (state, ownProps) {
        const chats = state.chats.entries;
        const { match } = ownProps;
        const { loading, entries } = state.profile;

        let messages,
          authorChat,
          avatarChat = null;

        let nameProfile = loading ? entries.name : null;

        let nameRobot = state.robot.loading
          ? state.robot.entries.nameRobot
          : null;
        let answerRobot = state.robot.loading
          ? state.robot.entries.answerRobot
          : null;

        if (match && chats[match.params.id]) {
          messages = chats[match.params.id].messages;
          authorChat = chats[match.params.id].author;
          avatarChat = chats[match.params.id].avatar;
        }

        return {
          messages,
          chatId: match ? match.params.id : null,
          authorChat,
          avatarChat,
          nameProfile,
          nameRobot,
          answerRobot,
        };
      };
    }

    default:
      return null;
  }
};

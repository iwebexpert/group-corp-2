export const mapStateToProps = (component) => {
  switch (component) {
    case "HeaderContainer":
    case "ProfileContainer": {
      return function (state, ownProps) {
        const { loadStatus, entries } = state.profile;
        switch (loadStatus) {
          case "loaded":
          case "loading":
            let infoProfile = entries;
            return { infoProfile, loadStatus };
          default:
            infoProfile = null;
            return { infoProfile, loadStatus };
        }
      };
    }

    case "ChatsListContainer":
      return function (state, ownProps) {
        const { entries, loadStatus, fireChatsId } = state.chats;
        switch (loadStatus) {
          case "loading":
          case "loaded":
            let chatsLoad = entries;
            let lastChatId = Object.keys(chatsLoad).length;
            let fireListId = fireChatsId;
            return {
              chatsLoad,
              lastChatId,
              fireListId,
              loadStatus,
            };
          default:
            chatsLoad = null;
            lastChatId = null;
            fireListId = null;
            return {
              chatsLoad,
              lastChatId,
              fireListId,
              loadStatus,
            };
        }
      };

    case "MessengerContainer": {
      return function (state, ownProps) {
        const chats = state.chats.entries;
        const { loadStatus } = state.chats;
        const { match } = ownProps;
        const { loading, entries } = state.profile;

        let messages,
          title,
          avatarChat = null;

        switch (loadStatus) {
          case "loading":
          case "loaded":
            let nameProfile = entries.name;
            let nameRobot = state.robot.entries.nameRobot;
            let answerRobot = state.robot.entries.answerRobot;
            if (match && chats[match.params.id]) {
              messages = chats[match.params.id].messages;
              title = chats[match.params.id].title;
              avatarChat = chats[match.params.id].avatar;
            }
            return {
              messages,
              chatId: match ? match.params.id : null,
              title,
              avatarChat,
              nameProfile,
              nameRobot,
              answerRobot,
              loadStatus,
            };
          default:
            return {
              messages,
              chatId: match ? match.params.id : null,
              title,
              avatarChat,
              nameProfile,
              nameRobot,
              answerRobot,
              loadStatus,
            };
        }

        // let nameProfile = loading ? entries.name : null;

        // let nameRobot = state.robot.loading
        //   ? state.robot.entries.nameRobot
        //   : null;
        // let answerRobot = state.robot.loading
        //   ? state.robot.entries.answerRobot
        //   : null;

        // if (match && chats[match.params.id]) {
        //   messages = chats[match.params.id].messages;
        //   title = chats[match.params.id].title;
        //   avatarChat = chats[match.params.id].avatar;
        // }

        // return {
        //   messages,
        //   chatId: match ? match.params.id : null,
        //   title,
        //   avatarChat,
        //   nameProfile,
        //   nameRobot,
        //   answerRobot,
        //   loadStatus,
        // };
      };
    }

    default:
      return null;
  }
};

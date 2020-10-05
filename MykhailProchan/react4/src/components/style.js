export default {
  mainLayout: {
    maxWidth: '1000px',
    margin: '0 auto',
    height: '100vh'
  },

  siderLayout: {
    textAlign: 'center',

    siderHeaderText: {
      margin: '13px 0 19px 0',
      color: 'white',
      display: 'block'
    }
  },

  contentLayout: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#dddddd',

    contentHeader: {
      marginTop: '13px',
      color: 'white',
    },

    messageList: {
      overflowY: 'scroll',
      display: 'flex',
      flexDirection: 'column-reverse',
      height: '100%'
    }
  },
}
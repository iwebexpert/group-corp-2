export default {
  mainLayout: {
    maxWidth: '1000px',
    margin: '0 auto',
    height: '100vh',
    boxShadow: '0px 3px 5px 3px rgba(0,0,0,0.17)'
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
    backgroundColor: 'rgb(230 246 255)',

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
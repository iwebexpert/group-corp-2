// import React from 'react';
// import ReactDom from 'react-dom';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import '../public/index.css';

// import Layout from './pages/Main';
// import About from './pages/About';
// import Error from './pages/Error';

// class AppRouting extends React.Component {
//   state = {
//     route: this.route,
//   };

//   get route() {
//     return window.location.hash.substr(1);
//   }

//   get ComponentChild() {
//     switch (this.state.route) {
//       case '':
//       case '/':
//         return Layout;
//       case '/about':
//         return About;
//       default:
//         return Error;
//     }
//   }

//   handleRouteChange = () => {
//     this.setState({
//       route: this.route,
//     });
//   };

//   componentDidMount() {
//     window.addEventListener('hashchange', this.handleRouteChange);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('hashchange', this.ComponentChild);
//   }

//   render() {
//     const Child = this.ComponentChild;

//     return (
//       <div>
//         <ul>
//           <li>
//             <a href="#/">Главная страница</a>
//           </li>
//           <li>
//             <a href="#/about">О нас</a>
//           </li>
//           <li>
//             <a href="#/pagenotfound">Страница с ошибкой</a>
//           </li>
//         </ul>
//         <div>
//           <Child />
//         </div>
//       </div>
//     );
//   }
// }

// ReactDom.render(<AppRouting />, document.querySelector('.root'));

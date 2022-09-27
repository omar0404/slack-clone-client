import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import Routes from './routes';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: JSON.parse(localStorage.getItem('token')),
    refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Routes />
    <ToastContainer />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

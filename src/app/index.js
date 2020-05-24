import React from 'react';
import styles from './app.module.scss';
import logo from '../../public/logo192.png';
const hello = name => `Hello, ${name}`;
const App = props => {
  //const num = 56;
  return (
    <main className={ styles.app }>
      <img src={logo} alt="512" />
      <h1 className={ styles.app__title }>React Boilerplate</h1>
      { 
        hello("Anshuman")
      }
      <img src="./logo192.png" alt="logo" />
    </main>
  );
};

export default App;

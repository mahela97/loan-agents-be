const { initializeApp } = require('firebase/app');

const firebaseConfig = {
    apiKey: 'AIzaSyDCRnEuLjAidNPWe9y4xcdIo3C6laAH3Kw',
    authDomain: 'loan-agents.firebaseapp.com',
    projectId: 'loan-agents',
    storageBucket: 'loan-agents.appspot.com',
    messagingSenderId: '952165638578',
    appId: '1:952165638578:web:d16e6e819a0288c07184ab'
};

const initializeFirebaseAuth = () => {
    return initializeApp(firebaseConfig);
};

module.exports = initializeFirebaseAuth;

import React from 'react';
import './App.css';
import HomeNavigationTools from "./HomeNavigationTools";
import CheckRegistrationValidity from './Header/CheckRegistrationValidity';

const  Home = () => (
      <div>
        {/* <HomeNavigationTools /> */}
         <CheckRegistrationValidity />
      </div>
    );

export default Home;
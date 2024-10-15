// src/components/Home.js
import React from 'react';
import Header from './header'; // Import Header component
import ProfileCom from './profileCom'; 
import SkillCom from './skillCom'; 
import Story from './story';
import NewpostUploader from './NewpostUploader';
import Post from './post';
import Recent from './Recent';

const Home = ({ toggleTheme, theme }) => {
    const user = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        url: '', // User profile image URL
      };
      
  return (
    <div>
      <Header toggleTheme={toggleTheme} theme={theme}  user={user}/> {/* Pass props to Header */}
      <div className="w-full flex items-start justify-center">
      {/* Left side components */}

      <div className="hidden lg:flex items-center justify-center flex-col p-4 w-0 md:w-1/4 sticky left-0 top-16">
      <ProfileCom theme={theme}/>
      <SkillCom theme={theme}/>
      </div>

      {/* Center side components */}

      <div className="flex items-center justify-center flex-col  p-3 w-full lg:w-1/2">
       <Story theme={theme}/>
       <NewpostUploader  theme={theme}/>
       <Post theme={theme}/>
      </div>

      {/* Right side components */}

      <div className="hidden lg:flex items-start justify-start flex-col  p-3 w-1/4 sticky right-0 top-16">
      <Recent/>
      </div>
    </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'; // Import ThemeProvider
import { GlobalStyles, lightTheme, darkTheme } from './GlobalStyles'; // Import global styles and themes
import Login from './components/login';
import Register from './components/register';
import OTPForm from './components/OTPForm';
import Home from './components/home'; // Import Home component
import ResetPassword from './components/resetPassword';
import ForgetPassEmail from './components/forgetpasswordEmail';

// Custom hook for dark/light mode
export const useDarkMode = () => { // Export the hook
  const [theme, setTheme] = React.useState('light');

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === 'dark' ? setMode('light') : setMode('dark');
  };

  React.useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme ? setTheme(localTheme) : setMode('dark');
  }, []);

  return [theme, toggleTheme];
};

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}> {/* Apply the selected theme */}
      <GlobalStyles /> {/* Apply global styles for light/dark theme */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgetPassEmail />} />
          <Route path="/home" element={<Home toggleTheme={toggleTheme} theme={theme} />} /> {/* Pass toggleTheme and theme */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

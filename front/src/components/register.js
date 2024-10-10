import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Importer react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles de Toastify
import register from '../images/register.png'; // Ajuster le chemin de l'image
import { Link, redirect,useNavigate  } from 'react-router-dom';
import { registerApi } from '../api/userApi/api';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'; // You can import your preferred icons


// Fonction pour appeler l'API d'inscription

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const { status, data } = await registerApi(username, email, password, location, "user", occupation);
      if (status === 200) {
        toast.success('Registration successful!'); 
  setTimeout(() => {
        navigate('/otp'); 
      }, 2000); 
            } else {
        setError(data.message || 'Registration failed.');
        toast.error('Registration failed.'); 
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.'); 
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Partie gauche : Formulaire d'inscription */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 bg-white">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Saisie du nom d'utilisateur */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Saisie de l'email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Saisie du mot de passe */}
          <div className="mb-4">
      <label htmlFor="password" className="block text-gray-600">Password</label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          required
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 pr-10"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeOffIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
          {/* Saisie de la localisation */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-600">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          {/* Saisie du rôle */}
         
          {/* Saisie de l'occupation */}
          <div className="mb-4">
            <label htmlFor="occupation" className="block text-gray-600">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>

          <label className="block text-gray-600 mt-4 text-center">
            Have an account? <Link to="/" className="text-blue-500">Login</Link>
          </label>
        </form>
      </div>

      {/* Partie droite : Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={register}
          alt="Register"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Toast Container pour afficher les messages */}
      <ToastContainer />
    </div>
  );
}

export default Register;

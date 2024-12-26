

export const loginApi = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        // Check if response is OK (status in the 2xx range)
        if (!response.ok) {
            throw new Error(`Login failed with status: ${response.status}`);
        }

        const data = await response.json();
        return { status: response.status, data }; 
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const registerApi = async (username, email, password, location, role, occupation) => {
    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, location, role, occupation }),
        });

        const data = await response.json();

        // If the status is not 2xx, throw an error to handle suggestions or failure cases
        if (!response.ok) {
            const errorMessage = data?.message || `Registration failed with status: ${response.status}`;
            const suggestions = data?.suggestions || [];

            // Re-throw the error with the message and suggestions
            throw { message: errorMessage, suggestions };
        }

        return { status: response.status, data }; // Return successful registration data

    } catch (error) {
        console.error('Error during registration API call:', error); // Log for debugging

        // Re-throw the error to the calling code to handle appropriately
        throw error;
    }
};


export const resetPasswordApi = async (token, newPassword) => {
    try {
        const response = await fetch('http://localhost:3000/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        });

        // Check if response is OK (status in the 2xx range)
        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data?.message || `Password reset failed with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { status: response.status, data }; // Return the API response on success

    } catch (error) {
        console.error('Error resetting password:', error); // Log the error for debugging
        throw error; // Re-throw to handle in the calling code
    }
};
export const forgetPasswordApi = async (email) => {
    try {
        const response = await fetch('http://localhost:3000/auth/forget-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        // Check if response is OK (status in the 2xx range)
        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data?.message || `Request failed with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { status: response.status, data }; // Return the API response on success

    } catch (error) {
        console.error('Error sending password reset email:', error); // Log the error for debugging
        throw error; // Re-throw to handle in the calling code
    }
};

export const verificationCodeApi = async (email, code) => {
    try {
        const response = await fetch('http://localhost:3000/auth/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        });

        // if (!response.ok) {
        //     const errorMessage = await response.text(); 
        //     throw new Error(Verification failed with status: ${response.status}. ${errorMessage});
        // }

        const data = await response.json(); 
        return { status: response.status, data }; 
    } catch (error) {
        console.error('Error during verification code API call:', error); // Log for debugging
        return { error: error.message }; // Retourner l'erreur
    }
};



export const resendCodeApi = async (email) => {
    try {
        const response = await fetch(`http://localhost:3000/auth/resend-code/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Vérifier si la réponse est OK (statut 2xx)
        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data?.message || `Resending code failed with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { status: response.status, data }; // Retourner la réponse de l'API en cas de succès

    } catch (error) {
        console.error('Error resending verification code:', error); // Journaliser l'erreur pour débogage
        throw error; // Rejeter pour gérer dans le code appelant
    }

};
export const getAllUsers = async (currentUserId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/all/${currentUserId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.message || `Request failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      return { status: response.status, data }; // Retourner la réponse avec le statut et les données
  
    } catch (error) {
      // Gérer l'erreur
      console.error('Error fetching users:', error);
      return { status: 'error', message: error.message }; // Retourner un message d'erreur
    }
  };
  


export const getUserById = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data?.message || `Request failed with status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { status: response.status, data };

    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


export const followUser= async (followedId,userId) => {
    try {
        const response = await fetch(`http://localhost:3000/followers/follow/${followedId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const data = await response.json();
            const errorMessage = data?.message || `Request failed with status: ${response.status}`;
            throw new Error(errorMessage);
        }
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
};
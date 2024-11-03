

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



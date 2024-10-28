

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



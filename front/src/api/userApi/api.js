// API for logging in
export const loginApi = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/auth/login', {
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

// API for registering
export const registerApi = async (username, email, password, location, role, occupation) => {
    try {
        const response = await fetch('http://localhost:5000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, location, role, occupation }),
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Registration failed with status: ${response.status}`);
        }

        const data = await response.json();
        return { status: response.status, data }; 
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

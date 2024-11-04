

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

        if (!response.ok) {
            const errorMessage = data?.message || `Registration failed with status: ${response.status}`;
            const suggestions = data?.suggestions || [];

            throw { message: errorMessage, suggestions };
        }

        return { status: response.status, data }; // Return successful registration data

    } catch (error) {
        console.error('Error during registration API call:', error); // Log for debugging

        throw error;
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
        //     throw new Error(`Verification failed with status: ${response.status}. ${errorMessage}`);
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

        if (!response.ok) {
            throw new Error(`Failed to resend code with status: ${response.status}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error during resend code API call:', error); 
    }
}

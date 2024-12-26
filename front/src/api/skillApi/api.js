export const createSkill = async (userId, skillId) => {
    try {
        const response = await fetch(`http://localhost:3000/user-skills/add-skill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, skillId }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create skill: ${errorText}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error(`Error creating skill for user ${userId} with skill ${skillId}:`, error.message);
        throw error; 
    }
};



export const getSkillsByUserId = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user-skills/user/${userId}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get skills: ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting skills:', error.message);
        throw error;
    }
};


export const getAllSkills = async () => {
    try {
        const response = await fetch('http://localhost:3000/skills');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get skills: ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting skills:', error.message);
        throw error;
    }
};
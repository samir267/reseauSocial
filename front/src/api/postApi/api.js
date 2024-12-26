export const uploadPostApi = async (image, text, userId) => {
    try {
        // Vérifier que l'image est bien un fichier
        if (!(image instanceof File)) {
            throw new Error('Provided image is not a valid file');
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('text', text);
        formData.append('userId', userId);

        const response = await fetch('http://localhost:3000/posts/upload', {
            method: 'POST',
            body: formData, 
        });

        if (!response.ok) {
            // Lire la réponse sous forme de texte pour obtenir plus d'informations en cas d'échec
            const errorText = await response.text();
            throw new Error(`Upload failed with status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error uploading post:', error);
        throw error;
    }
};


export const getUserPosts = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/posts/user/${userId}`, {
            method: 'GET',  // Méthode GET pour récupérer des données
        });

        if (!response.ok) {
            // Si la réponse n'est pas ok, afficher l'erreur
            const errorText = await response.text();
            throw new Error(`Failed to fetch posts for user ${userId}: ${errorText}`);
        }

        // Parse la réponse en JSON
        const data = await response.json();
        return data;  // Retourne les données obtenues (par exemple, une liste de posts)
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;  // Relancer l'erreur après l'avoir loggée
    }
};


export const getPosts=async () => {
    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'GET',  
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get posts: ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
}

export const newPost=async (postId, userId) => {
    try {
        const response = await fetch(`http://localhost:3000/likes/add/${userId}/${postId}`, {
            method: 'POST',  

        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to add post: ${errorText}`);
        }
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const getLikesByPostId = async (postId) => {
    try {
        const response = await fetch(`http://localhost:3000/likes/get/${postId}`, {
            method: 'GET',  
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get likes for post ${postId}: ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting likes for post:', error);
        throw error;
    }
};

export const removeLike = async (userId,postId) => {
    try {
        const response = await fetch(`http://localhost:3000/likes/remove/${userId}/${postId}`, {
            method: 'DELETE',  
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to remove like for post ${postId}: ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing like for post:', error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await fetch(`http://localhost:3000/comments/comments/get/${postId}`, {
            method: 'GET',  
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get comments for post ${postId}: ${errorText}`);
        }
        const data = await response.json();
        console.log("data",data);
        return data;
    } catch (error) {
        console.error('Error getting comments for post:', error);
        throw error;
    }
};

export const createComment = async (content, userId, postId) => {
    // Validez les entrées
    if (!content || !userId || !postId) {
        throw new Error("Content, userId, and postId are required to create a comment.");
    }

    try {
        const response = await fetch(`http://localhost:3000/comments/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez ici un token d'autorisation si nécessaire
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ content, userId, postId }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create comment: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating comment:', error.message);
        throw error;
    }
};

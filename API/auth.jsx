const API_URL = "http://localhost:3000";

export const auth = {
    login: async (data) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            const responseText = await res.text();
            let responseData;
            
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error("Failed to parse JSON:", responseText);
                throw new Error("Invalid server response");
            }

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || `Login failed with status ${res.status}`);
            }
            
            return responseData;
        } catch (error) {
            console.error("Login error details:", error);
            throw error;
        }
    },

    register: async (newProfile) => {
        try {
            console.log("Sending registration request:", newProfile);
            
            const res = await fetch(`${API_URL}/create-account`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newProfile),
            });

            const responseText = await res.text();
            console.log("Registration response:", responseText);
            
            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                console.error("Failed to parse JSON response:", responseText);
                throw new Error("Invalid server response format");
            }

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || `Registration failed with status ${res.status}`);
            }
            
            return responseData;
        } catch (error) {
            console.error("Registration error details:", error);
            throw error;
        }
    }
};
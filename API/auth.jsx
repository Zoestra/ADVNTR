const API_URL = "http://localhost:3000";

export const auth = {
    login: async (data) => {
        try {
            console.log("Login attempt with:", data);
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            });

            const responseText = await res.text();
            console.log("Login response status:", res.status);
            console.log("Login raw response:", responseText);
            
            // Try to parse JSON
            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
                console.log("Login parsed response:", responseData);
            } catch (_) {  // Changed to underscore
                console.error("Failed to parse login JSON. Raw response:", responseText);
                throw new Error(`Invalid server response format: ${responseText.substring(0, 100)}`);
            }

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || `Login failed with status ${res.status}`);
            }
            
            return responseData;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    register: async (newProfile) => {
        try {
            console.log("Registration attempt with:", newProfile);
            
            const res = await fetch(`${API_URL}/create-account`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newProfile),
            });

            const responseText = await res.text();
            console.log("Registration response status:", res.status);
            console.log("Registration raw response:", responseText);
            
            // Try to parse JSON
            let responseData;
            try {
                responseData = responseText ? JSON.parse(responseText) : {};
                console.log("Registration parsed response:", responseData);
            } catch (_) {  // Changed to underscore
                console.error("Failed to parse registration JSON. Raw response:", responseText);
                throw new Error(`Invalid server response format: ${responseText.substring(0, 100)}`);
            }

            if (!res.ok) {
                throw new Error(responseData.error || responseData.message || `Registration failed with status ${res.status}`);
            }
            
            return responseData;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
};
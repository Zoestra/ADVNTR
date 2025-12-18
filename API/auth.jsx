const API_URL = "http://localhost:3000";

export const auth = {
login: async (data) => {
    try {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include", // ✅ REQUIRED
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(data),
    });

    const responseText = await res.text();

    let responseData = {};
    if (responseText) {
        try {
        responseData = JSON.parse(responseText);
        } catch {
        throw new Error("Invalid JSON response from server");
        }
    }

    if (!res.ok) {
        throw new Error(
        responseData.error ||
        responseData.message ||
        `Login failed (${res.status})`
        );
    }

    return responseData;
    } catch (error) {
    console.error("Login error:", error);
    throw error;
    }
},

register: async (newProfile) => {
    try {
    const res = await fetch(`${API_URL}/create-account`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(newProfile),
    });

    const responseText = await res.text();

    let responseData = {};
    if (responseText) {
        try {
        responseData = JSON.parse(responseText);
        } catch {
        throw new Error("Invalid JSON response from server");
        }
    }

    if (!res.ok) {
        throw new Error(
        responseData.error ||
        responseData.message ||
        `Registration failed (${res.status})`
        );
    }

    return responseData;
    } catch (error) {
    console.error("Registration error:", error);
    throw error;
    }
}
};

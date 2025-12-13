const url = "http://localhost:3000";

export const auth = {
    login: async(data) => {
        try{
            const res = await fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`POST failed with status ${res.status}`);
                }
            return await res.json();
        }catch(error){
            console.error("login error:", error);
        }
    },
    register: () => {}
}
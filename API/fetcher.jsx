const url = "http://localhost:3000";

export const fetcher = {
    campaign: async() => {
           
        try{
            const res = await fetch(`${url}/campaigns`);
            
            if(!res.ok){
                throw new Error(`Something went wrong with campaigns: ${res.status}`);
            }

            return await res.json();
        }catch(error){
            console.error("An error occurred fetching campaigns:", error);
            throw error;
        }
    },
    dm: async() => {
        try{
            const res = await fetch(`${url}/users?role=DM`);

            if(!res.ok){
                throw new Error(`Something went wrong with DMs: ${res.status}`);
            }

            return await res.json();
        }catch(error){
            console.error("An error occurred fetching DMs:", error);
            throw error;
        }
    },
    player: async() => {
        try{
            const res = await fetch(`${url}/users?role=Player`);

            if(!res.ok){
                throw new Error(`Something went wrong with players: ${res.status}`);
            }

            return await res.json();
        }catch(error){
            console.error("An error occurred fetching players:", error);
            throw error;
        }
    }
}
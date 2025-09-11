import { createClient } from './supabase/client';

class APIClient {
    constructor() {
        this.supabase = createClient();
    }

    async getHeaders() {
        const { data: { session } } = await this.supabase.auth.getSession();
        
        return {
            'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
            'x-user-id': session?.user?.id || '',
            'Content-Type': 'application/json'
        };
    }

    async request(url, options = {}) {
        const headers = await this.getHeaders();
        
        const response = await fetch(url, {
            ...options,
            headers: {
                ...headers,
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async get(url) {
        return this.request(url, { method: 'GET' });
    }

    async post(url, data) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(url, data) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(url) {
        return this.request(url, { method: 'DELETE' });
    }
}

export default new APIClient();
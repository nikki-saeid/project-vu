export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, { ...options });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.message || 'Request failed');
    }

    return data?.data;
}

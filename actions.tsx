"use server";
export async function Upload(formData: FormData): Promise<string> {
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    const res = await fetch(`${process.env.BASE_URL}`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        return res.json();
    }
    return res.text();
}

export async function Fetch(uuid: string): Promise<string | Blob> {
    const res = await fetch(`${process.env.BASE_URL}/${uuid}`, { method: 'GET' });
    if (!res.ok) {
        if (res.status === 404) {
            return Promise.resolve("invalid");
        }
        return res.text();
    }
    const status = res.headers.get('Task-Status')
    if (status === 'completed') {
        const blob = await res.blob();
        return blob;
    }

    const js = await res.json()
    return Promise.resolve(js.status || "error from server");
}
export async function sendEmail(to:string, subject:string, text:string) {
    const res = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text })
    });

    const data = await res.json();
}

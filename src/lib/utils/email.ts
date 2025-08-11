export async function sendEmail(to:string, subject:string, text:string) {
    const res = await fetch('/api/send_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text })
    });

    const data = await res.json();
    console.log(data);
}

// <input bind:value={to} placeholder="Recipient" />
// <input bind:value={subject} placeholder="Subject" />
// <textarea bind:value={text} placeholder="Message"></textarea>
// <button on:click={sendEmail}>Send Email</button>

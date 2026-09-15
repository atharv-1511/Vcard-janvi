document.addEventListener('DOMContentLoaded', () => {
    // Flip card logic
    const flipCard = document.getElementById('flip-card');
    flipCard.addEventListener('click', () => {
        flipCard.classList.toggle('is-flipped');
    });

    // Save contact logic (generates and downloads a .vcf file)
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const contact = {
                name: "Janvi Daryanani",
                phone: "+971529005504",
                email: "janvi.daryananibusiness@gmail.com",
                url: "https://janvidaryanani.com/",
                title: "Property Advisor"
            };

            const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TITLE:${contact.title}
TEL;TYPE=WORK,VOICE:${contact.phone}
EMAIL;TYPE=WORK:${contact.email}
URL:${contact.url}
END:VCARD`;

            const blob = new Blob([vcfData], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Janvi_Daryanani.vcf';
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        });
    }

    // Share logic using Web Share API
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Janvi Daryanani | Property Advisor',
                        text: 'Connect with Janvi Daryanani, Property Advisor in Dubai.',
                        url: window.location.href,
                    });
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy link:', err);
                }
            }
        });
    }
});

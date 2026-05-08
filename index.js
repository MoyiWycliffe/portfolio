document.addEventListener("DOMContentLoaded", function() {
    //function to send page visit data to the backend
    async function sendPageVisit() {
        try{
            const response = await fetch("http://localhost:8000/visit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pageurl: window.location.href ?? null,
                    statuscode: 200 ?? null,
                    useragent: navigator.userAgent ?? null,
                    referrer: document.referrer ?? null
                })
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
        }
        catch(error){
            console.error("Error sending page visit data:", error);
        }
    }
    sendPageVisit();
});
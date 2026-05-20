document.addEventListener("DOMContentLoaded", function() {
    //function to send page visit data to the backend
    async function sendPageVisit() {
        try{
            const response = await fetch("https://portfolio-2-xfzn.onrender.com/visit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pageurl: window.location.href ?? null,
                    statuscode: 200,
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
    //get hostname and pathname of the current page
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    //check if the current page is the portfolio page
    console.log(hostname);
    console.log(pathname);
    //get head element to add adsense code
    const headTag = document.getElementsByTagName("head")[0];

    //check if the host is vercel then call the sendPageVisit function

    if(hostname.includes("vercel.app")){
        sendPageVisit();

        console.log("Page visit data sent to the backend");
        const existingScript = document.querySelector(
            'script[src*="googlesyndication"]'
            );

            if (!existingScript) {

                const adsenseScript = document.createElement("script");

                adsenseScript.src =
                "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5875551558410781";

                adsenseScript.async = true;

                adsenseScript.crossOrigin = "anonymous";

                headTag.appendChild(adsenseScript);
            }
    }

    console.log(headTag);
    //current yesr
    document.getElementById("currentYear").textContent = new Date().getFullYear();
});
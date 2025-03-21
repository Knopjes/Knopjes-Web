document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Voorkomt standaard gedrag

        // Formuliergegevens ophalen
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basisvalidatie
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Gelieve alle velden in te vullen.");
            return;
        }

        // Formuliergegevens naar Formspree sturen (of backend)
        const formData = new FormData(form);

        fetch("https://formspree.io/f/xjkykkjn", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    confirmationMessage.classList.remove("hidden");
                    confirmationMessage.innerHTML = "Bedankt! Jouw bericht is verzonden.";

                    // Bevestigingsbericht na 15 seconden verbergen
                    setTimeout(() => {
                        confirmationMessage.classList.add("hidden");
                    }, 10000);

                    // Formulier resetten
                    form.reset();
                } else {
                    alert("Er is iets misgegaan. Probeer het later opnieuw.");
                }
            })
            .catch(error => {
                console.error("Fout bij verzenden:", error);
                alert("Er is een probleem opgetreden bij het verzenden.");
            });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("policy-popup");
    const websiteContent = document.getElementById("website-content");

    // Controleer of de gebruiker al akkoord is gegaan
    if (localStorage.getItem("policyAccepted") === "true") {
        popup.style.display = "none"; // Popup verbergen
        websiteContent.classList.remove("blurred"); // Blur verwijderen
    } else {
        popup.style.display = "flex"; // Toon popup
        websiteContent.classList.add("blurred"); // Blur de website
    }

    // Als de gebruiker op "Akkoord" klikt
    document.getElementById("accept-policy").addEventListener("click", function () {
        localStorage.setItem("policyAccepted", "true"); // Opslaan in localStorage
        popup.style.display = "none";
        websiteContent.classList.remove("blurred");
    });

    // Als de gebruiker op "Weigeren" klikt
    document.getElementById("decline-policy").addEventListener("click", function () {
        alert("Je moet akkoord gaan om deze website te gebruiken.");
        window.close(); // Sluit de website
    });
});
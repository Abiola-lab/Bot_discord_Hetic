document.addEventListener("DOMContentLoaded", () => {
    const boutonAjouter = document.getElementById("ajouterTuto");
    const messageDiv = document.getElementById("message");

    boutonAjouter.addEventListener("click", async () => {
        const url = document.getElementById("url").value.trim();
        const titre = document.getElementById("titre").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!url || !titre) {
            messageDiv.textContent = "L'URL et le titre sont obligatoires.";
            messageDiv.style.color = "red";
            return;
        }

        const data = { titre, url, description };

        try {
            const response = await fetch("http://localhost:4000/tutos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageDiv.textContent = "Tutoriel ajouté avec succès !";
                messageDiv.style.color = "green";

                // Réinitialiser les champs après ajout
                document.getElementById("url").value = "";
                document.getElementById("titre").value = "";
                document.getElementById("description").value = "";
            } else {
                messageDiv.textContent = "Erreur lors de l'ajout du tutoriel.";
                messageDiv.style.color = "red";
            }
        } catch (error) {
            console.error("Erreur :", error);
            messageDiv.textContent = "Impossible de contacter l'API.";
            messageDiv.style.color = "red";
        }
    });
});

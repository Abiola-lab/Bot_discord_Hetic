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
    });
});

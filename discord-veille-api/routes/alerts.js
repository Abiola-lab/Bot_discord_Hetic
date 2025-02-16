router.post('/', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: "Message requis" });
    }
    console.log(`Alerte reçue : ${message}`);
    res.json({ message: "Alerte envoyée" });
});
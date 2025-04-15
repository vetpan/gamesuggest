const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
// Mogelijk later nodig voor API calls:
// const axios = require("axios"); // We installeren axios nog niet

// TODO: Voeg later je RAWG API Key hier veilig toe (via environment variables)
// const RAWG_API_KEY = "JOUW_RAWG_API_KEY";

// Definieer een HTTPS Cloud Function genaamd 'getGameSuggestions'
// Gebruik v1 'onCall' voor nu, dat matcht de frontend code.
exports.getGameSuggestions = functions.https.onCall(async (data, context) => {
    // Log de ontvangen data (vanuit de frontend)
    logger.info("getGameSuggestions aangeroepen. Ontvangen data:", data);

    // Haal de geselecteerde genres en platforms uit de data
    const genres = data.genres || []; // bv. ['Action', 'RPG']
    const platforms = data.platforms || []; // bv. ['PC']

    logger.info("Geselecteerde genres:", genres);
    logger.info("Geselecteerde platforms:", platforms);

    // === HIER KOMEN STRAKS DE ECHTE API AANROEPEN ===
    // ... (stappen voor RAWG en Gemini komen hier) ...

    // === Voor NU: Geef gewoon dummy data terug ===
    const dummySuggestions = [
        { id: 1, name: "Dummy Game 1 (Action)", rating: 4.5, advice: "Dit is een placeholder." },
        { id: 2, name: "Dummy Game 2 (PC)", rating: 4.0, advice: "Advies komt later via Gemini." },
        { id: 3, name: "Nog een Dummy", rating: 3.8, advice: "Test 123." }
    ];

    logger.info("Dummy suggesties worden teruggestuurd.");

    // Stuur de dummy data terug naar de frontend
    return {
        message: "Suggesties (dummy data)",
        suggestions: dummySuggestions,
        receivedGenres: genres, // Stuur terug ter controle
        receivedPlatforms: platforms // Stuur terug ter controle
    };
});

// We verwijderen de helloWorld export
// exports.helloWorld = ...
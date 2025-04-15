// --- Firebase SDK Imports ---
// Gebruik ES Module imports voor moderne browsers en de Firebase SDK v9+ stijl
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";

// --- Firebase Configuration ---
// Jouw gekopieerde configuratie:
const firebaseConfig = {
  apiKey: "AIzaSyCs5zquM0PToFNy-EAsXwa8AtSWtndmIQM", // Jouw API Key
  authDomain: "gamesuggestions-4df1a.firebaseapp.com",
  projectId: "gamesuggestions-4df1a",
  storageBucket: "gamesuggestions-4df1a.appspot.com", // Let op: je had .firebasestorage.app, maar .appspot.com is gebruikelijker hier. Check dit in je console!
  messagingSenderId: "727898298558",
  appId: "1:727898298558:web:4a469e5db4260500c966ef"
  // measurementId is optioneel, voeg toe als je Analytics gebruikt
};

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app); // Initialiseer Cloud Functions

// --- Event Listener for DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Icon Selection Logic ---
    const iconChoices = document.querySelectorAll('.icon-choice');
    let selectedGenres = [];
    let selectedPlatforms = [];

    iconChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            const category = choice.dataset.category;
            const value = choice.dataset.value;
            choice.classList.toggle('selected');

            if (choice.classList.contains('selected')) {
                if (category === 'genre' && !selectedGenres.includes(value)) {
                    selectedGenres.push(value);
                } else if (category === 'platform' && !selectedPlatforms.includes(value)) {
                    selectedPlatforms.push(value);
                }
            } else {
                if (category === 'genre') {
                    selectedGenres = selectedGenres.filter(item => item !== value);
                } else if (category === 'platform') {
                    selectedPlatforms = selectedPlatforms.filter(item => item !== value);
                }
            }
            console.clear();
            console.log("Geselecteerde Genres:", selectedGenres);
            console.log("Geselecteerde Platforms:", selectedPlatforms);
        });
    });

    // --- Button Click Logic ---
    const getSuggestionsButton = document.getElementById('get-suggestions-btn');
    getSuggestionsButton.addEventListener('click', () => {
        console.log("Knop geklikt! Roep Cloud Function aan...");
        console.log("Stuur genres:", selectedGenres);
        console.log("Stuur platforms:", selectedPlatforms);

        // Roep de Cloud Function aan
        const getGameSuggestions = httpsCallable(functions, 'getGameSuggestions');
        getGameSuggestions({ genres: selectedGenres, platforms: selectedPlatforms })
            .then((result) => {
                // Verwerk het resultaat van de Cloud Function
                console.log("Antwoord van Cloud Function:", result.data);
                const suggestions = result.data.suggestions; // Haal de suggesties op (nu nog dummy)
                alert(`Suggesties ontvangen (dummy): ${JSON.stringify(suggestions)}`); // Toon resultaat (tijdelijk)

                // TODO: Toon de 'suggestions' netjes op de webpagina
            })
            .catch((error) => {
                // Handel fouten af
                console.error("Fout bij aanroepen Cloud Function:", error);
                alert(`Fout: ${error.message}`);
            });

    }); // Einde button click listener

}); // Einde DOMContentLoaded listener
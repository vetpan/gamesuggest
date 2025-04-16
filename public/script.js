// Wacht tot de volledige HTML-pagina geladen is voordat we iets doen
document.addEventListener('DOMContentLoaded', () => {

  // Zoek alle elementen (divs) met de class "icon-choice"
  const iconChoices = document.querySelectorAll('.icon-choice');

  // Houd bij welke genres en platforms zijn geselecteerd
  let selectedGenres = [];
  let selectedPlatforms = [];

  // Loop door elk gevonden icoon-blok heen
  iconChoices.forEach(choice => {
    // Voeg een 'event listener' toe: voer een functie uit als er geklikt wordt
    choice.addEventListener('click', () => {
      // Haal de categorie (genre/platform) en waarde (Action/PC) op
      const category = choice.dataset.category; // Leest data-category="..."
      const value = choice.dataset.value;     // Leest data-value="..."

      // Kijk of dit icoon al geselecteerd WAS
      const isSelected = choice.classList.contains('selected');

      // --- Logica voor Selecteren/Deselecteren ---

      if (isSelected) {
        // Het WAS geselecteerd, dus nu DESELECTEREN:
        choice.classList.remove('selected'); // Verwijder 'selected' class

        // Verwijder uit de bijhoud-lijstjes
        if (category === 'genre') {
          selectedGenres = selectedGenres.filter(item => item !== value);
        } else if (category === 'platform') {
          selectedPlatforms = selectedPlatforms.filter(item => item !== value);
        }

      } else {
        // Het was NIET geselecteerd, dus nu SELECTEREN:
        choice.classList.add('selected'); // Voeg 'selected' class toe

        // Voeg toe aan de bijhoud-lijstjes (als het er nog niet in zit)
        if (category === 'genre' && !selectedGenres.includes(value)) {
          selectedGenres.push(value);
        } else if (category === 'platform' && !selectedPlatforms.includes(value)) {
          selectedPlatforms.push(value);
        }
      }

      // Laat in de console zien wat er geselecteerd is (voor debugging)
      console.log("Geselecteerde Genres:", selectedGenres);
      console.log("Geselecteerde Platforms:", selectedPlatforms);

      // TODO LATER: Update UI of doe iets met de selectie...
    });
  });

  // --- Voeg hier later code toe voor de 'Vind mijn game!' knop ---
  const suggestButton = document.getElementById('get-suggestions-btn');
  if (suggestButton) {
    suggestButton.addEventListener('click', () => {
      console.log("Knop geklikt! Geselecteerd:");
      console.log("Genres:", selectedGenres);
      console.log("Platforms:", selectedPlatforms);
      // TODO LATER: Stuur selectie naar backend (Supabase Edge Function)
      alert("Suggestie functie nog niet ingebouwd!");
    });
  }

}); // Einde van DOMContentLoaded listener
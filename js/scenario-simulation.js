document.addEventListener('DOMContentLoaded', () => {
    const scenarioCards = document.querySelectorAll('.scenario-card[id^="scenario-"]');

    scenarioCards.forEach(card => {
        const scenarioId = card.id; // e.g., "scenario-av"
        const scenarioShortId = scenarioId.replace('scenario-', ''); // e.g., "av"
        
        const choiceButtons = card.querySelectorAll(`.scenario-choice-button[data-scenario="${scenarioShortId}"]`);
        const resultsPlaceholder = card.querySelector(`#${scenarioId}-results-placeholder`);
        const resultDivs = card.querySelectorAll(`[id^="${scenarioId}-result-"]`);

        choiceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const choice = button.dataset.choice;
                const themeColor = button.dataset.themeColor || 'sky'; // Default theme color

                // Hide placeholder
                if (resultsPlaceholder) {
                    resultsPlaceholder.classList.add('hidden');
                }

                // Hide all result divs for this scenario
                resultDivs.forEach(div => {
                    div.classList.add('hidden');
                });

                // Show the selected result div
                const targetResultDiv = card.querySelector(`#${scenarioId}-result-${choice}`);
                if (targetResultDiv) {
                    targetResultDiv.classList.remove('hidden');
                }

                // Update button active states for this scenario
                choiceButtons.forEach(btn => {
                    const btnThemeColor = btn.dataset.themeColor || 'sky';
                    // Remove active state styling (ring)
                    btn.classList.remove(`ring-${btnThemeColor}-400`, `ring-2`, `ring-offset-1`);
                    
                    // Reset to base style if a more complex toggle is needed, e.g. for background color changes
                    // For this implementation, we rely on hover for non-active, and explicit ring for active.
                });
                
                // Apply active state styling (ring) to the clicked button
                button.classList.add(`ring-${themeColor}-400`, `ring-2`, `ring-offset-1`);
            });
        });
    });
});

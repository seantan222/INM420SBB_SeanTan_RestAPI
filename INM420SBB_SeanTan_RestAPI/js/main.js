document.getElementById('dictionaryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let term = document.getElementById('searchTerm').value.trim();
    if (term !== '') {
        fetchDefinition(term);
    }
});

async function fetchDefinition(term) {
    const apiKey = 'cf40c63b-b483-44ed-9ed6-0dfc2d1ce9fa';
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${term}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response was not ok.');
        }
        const data = await response.json();
        displayDefinition(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayDefinition(data) {
    const definitionResult = document.getElementById('definitionResult');
    if (Array.isArray(data) && data.length > 0) {
        const firstDefinition = data[0].shortdef[0];
        definitionResult.innerHTML = `<p><strong>Definition of the word:</strong> ${firstDefinition}</p>`;
    } else {
        definitionResult.innerHTML = '<p>No definition found. Please try again!</p>';
    }
}
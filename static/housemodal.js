// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('/get-properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: 'your_query_here' }) // replace with the actual query
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in cards
async function renderData() {
    const container = document.querySelector('.container');
    const data = await fetchData();
    if (!data) {
        return;
    }
    data.forEach(item => {
        item.title="Atithi"
        item.description="Furnished Clean House"
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('h2');
        
        title.textContent = item.title;
        const description = document.createElement('p');
        description.textContent = item.description;
        const featuresList = document.createElement('ul');
        item.features.forEach(feature => {
            const featureListItem = document.createElement('li');
            featureListItem.textContent = feature;
            featuresList.appendChild(featureListItem);
        });
        const rent = document.createElement('h2');
        rent.textContent = `Rent: ₹ ${item.rent}/month`;
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(featuresList);
        card.appendChild(rent);
        container.appendChild(card);
    });
}

// Call the renderData function to display data
renderData();
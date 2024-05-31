// script.js

let components = [];
let filteredComponents = [];

// Fetch components from JSON file
fetch('components.json')
    .then(response => response.json())
    .then(data => {
        components = data;
        filteredComponents = components;
        displayComponents(components);
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

// Display components
function displayComponents(components) {
    const componentList = document.getElementById('component-list');
    componentList.innerHTML = '';

    components.forEach(component => {
        const componentDiv = document.createElement('div');
        componentDiv.classList.add('component');
        componentDiv.innerHTML = `
            <img src="${component.image}" alt="${component.name}">
            <h2>${component.name}</h2>
            <p><strong>Quantity:</strong> ${component.quantity}</p>
            <p><strong>Description:</strong> ${component.description}</p>
            <a href="${component.courseLink}">Course Link</a>
        `;
        componentList.appendChild(componentDiv);
    });
}

// Filter components by category
function filterComponents(category) {
    if (category === 'All') {
        filteredComponents = components;
    } else {
        filteredComponents = components.filter(component => component.category === category);
    }
    displayComponents(filteredComponents);
}

// Search components
document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const searchedComponents = filteredComponents.filter(component =>
        component.name.toLowerCase().includes(searchTerm) ||
        component.description.toLowerCase().includes(searchTerm)
    );
    displayComponents(searchedComponents);
});

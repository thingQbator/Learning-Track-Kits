document.addEventListener('DOMContentLoaded', () => {
    let components = [];
    let filteredComponents = [];

    // Fetch components from JSON file
    fetch('components.json')
        .then(response => response.json())
        .then(data => {
            components = data;
            filteredComponents = components;
            displayComponents(filteredComponents);
        });

    // Display components
    function displayComponents(components) {
        const componentList = document.getElementById('component-list');
        componentList.innerHTML = '';
        components.forEach(component => {
            const componentDiv = document.createElement('div');
            componentDiv.className = 'component';
            componentDiv.innerHTML = `
                <img src="${component.image}" alt="${component.name}">
                <h2>${component.name}</h2>
                <p><strong>Category:</strong> ${component.category}</p>
                <p>${component.description}</p>
                <a href="${component.link}" target="_blank">Learn More</a>
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

    // Add event listener to search bar
    document.getElementById('search-bar').addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const searchedComponents = filteredComponents.filter(component =>
            component.name.toLowerCase().includes(searchTerm) ||
            component.category.toLowerCase().includes(searchTerm) ||
            component.description.toLowerCase().includes(searchTerm)
        );
        displayComponents(searchedComponents);
    });

    // Toggle filters with animation
    function toggleFilters() {
        const filters = document.getElementById('filters');
        if (filters.style.display === 'none' || filters.style.display === '') {
            filters.style.display = 'flex';
            filters.style.animation = 'slideDown 0.3s forwards';
        } else {
            filters.style.animation = 'slideUp 0.3s forwards';
            setTimeout(() => {
                filters.style.display = 'none';
            }, 300);
        }
    }

    // Attach the filterComponents and toggleFilters functions to the window
    window.filterComponents = filterComponents;
    window.toggleFilters = toggleFilters;
});

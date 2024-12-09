// Theme switching
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
}

// Age calculation
function calculateAge() {
    const dob = document.getElementById('dob').value;
    
    if (!dob) {
        alert('Please select a date of birth');
        return;
    }

    fetch('/calculate_age', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dob: dob })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('years').textContent = data.years;
        document.getElementById('months').textContent = data.months;
        document.getElementById('days').textContent = data.days;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while calculating age');
    });
} 
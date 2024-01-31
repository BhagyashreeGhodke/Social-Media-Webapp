// public/scripts/main.js

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const usernameInput = document.getElementById('usernameInput');
            if (usernameInput) {
                const username = usernameInput.value.trim();
                if (username) {
                    // Send an AJAX request or use fetch API to add the user
                    fetch('/add-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `username=${encodeURIComponent(username)}`,
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        // Optionally, update the UI or perform any other actions
                    })
                    .catch(error => {
                        console.error('Error adding user:', error);
                    });
                } else {
                    console.error('Username cannot be empty');
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const welcomeUsernameSpan = document.getElementById('welcomeUsername');
    const logoutButton = document.getElementById('logoutButton');
    const privateContactsList = document.getElementById('privateContactsList'); // Added for example

    // 1. Check if the user is logged in (Authentication Guard)
    const storedUsername = localStorage.getItem('loggedInUser');  
    if (!storedUsername) {
        // If not logged in, redirect to the main page
        window.location.href = 'index.html';
        return; // Stop further execution of this script
    }

    // Display the username
    welcomeUsernameSpan.textContent = storedUsername;

    // 2. Logout Functionality
    logoutButton.addEventListener('click', () => {
        // Clear authentication state from localStorage
        localStorage.removeItem('loggedInUser');
        // You might also want to remove a 'token' if you store one
        // localStorage.removeItem('authToken');

        // Redirect back to the main page
        window.location.href = 'index.html';
    });

    // 3. Example: Fetching and displaying private contacts (requires a backend API for this!)
    // If you have a backend API to fetch user-specific data (like private contacts)
    // you would make a fetch request here, typically including an authorization header.
    // For now, this is just a placeholder example:

    // async function fetchPrivateContacts(username) {
    //     try {
    //         // Assuming your backend has an endpoint like /api/user/contacts that
    //         // returns contacts for the logged-in user.
    //         // This would require a token in headers for authorization.
    //         const response = await fetch(`https://portfolio-backend-rp78.onrender.com/api/user/${username}/contacts`, {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}` // If you store a token
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             privateContactsList.innerHTML = ''; // Clear existing list
    //             if (data.contacts && data.contacts.length > 0) {
    //                 data.contacts.forEach(contact => {
    //                     const li = document.createElement('li');
    //                     li.textContent = `Contact: ${contact.name} (${contact.email})`;
    //                     privateContactsList.appendChild(li);
    //                 });
    //             } else {
    //                 privateContactsList.innerHTML = '<li>No private contacts found.</li>';
    //             }
    //         } else {
    //             console.error('Failed to fetch private contacts:', data.detail || data.message);
    //             privateContactsList.innerHTML = '<li>Error loading contacts.</li>';
    //         }
    //     } catch (error) {
    //         console.error('Network error fetching private contacts:', error);
    //         privateContactsList.innerHTML = '<li>Network error.</li>';
    //     }
    // }

    // Call this if you implement a backend endpoint for private contacts
    // fetchPrivateContacts(storedUsername);
});
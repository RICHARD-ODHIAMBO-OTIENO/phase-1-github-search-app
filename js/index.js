
// Event listener for the form submission
document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submit behavior
    const userQuery = document.getElementById('search').value;
    searchGitHubUsers(userQuery); // Function to search users
});

// Function to search GitHub users
function searchGitHubUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(response => response.json())
    .then(data => {
        displayUsers(data.items); // Function to display user results
    })
    .catch(error => console.error('Error:', error));
}

// Function to display users in the user-list
function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${user.login}
            <button onclick="fetchUserRepos('${user.login}')">View Repos</button>
        `; // Adding a button to view user repos
        userList.appendChild(li);
    });
}

// Function to fetch and display repositories of a specific user
function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(response => response.json())
    .then(repos => {
        displayRepos(repos); // Function to display repos
    })
    .catch(error => console.error('Error:', error));
}

// Function to display repositories in the repos-list
function displayRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = ''; // Clear previous results

    repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name; // Display repo name
        reposList.appendChild(li);
    });
}

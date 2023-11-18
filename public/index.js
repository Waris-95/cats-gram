window.onload = function() {
    // Container for the cat
    const mainContainer = document.createElement('div');
    mainContainer.id = 'main-container';
    document.body.appendChild(mainContainer);

    const catImage = document.createElement('img');
    catImage.alt = 'A cute cat';
    catImage.style.maxWidth = '100%';
    mainContainer.appendChild(catImage);

    let catImages = [];

    function fetchCatImages() {
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(data => {
            catImages = data;
            displayRandomCatImage();
            resetInteractions(); // Reset interactions whenever new images are fetched
        })
        .catch(error => console.error('Error fetching cat images:', error));
    }

    function displayRandomCatImage() {
        if (catImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * catImages.length);
            catImage.src = catImages[randomIndex].url;
        }
    }

    fetchCatImages();

    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Show another cat';
    refreshButton.onclick = displayRandomCatImage;
    mainContainer.appendChild(refreshButton);

    // Setting a score
    let score = 0;
    const scoreDisplay = document.createElement('p');
    mainContainer.appendChild(scoreDisplay); // Attach the score display to the main container

    // Upvote button
    const upvoteButton = document.createElement('button');
    upvoteButton.textContent = 'Upvote';
    upvoteButton.onclick = function() {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    };
    mainContainer.appendChild(upvoteButton);

    // Downvote button
    const downvoteButton = document.createElement('button');
    downvoteButton.textContent = 'Downvote';
    downvoteButton.onclick = function() {
        score--;
        scoreDisplay.textContent = `Score: ${score}`;
    };
    mainContainer.appendChild(downvoteButton);

    // Div to hold comments
    const commentsContainer = document.createElement('div');
    mainContainer.appendChild(commentsContainer);

    // Input field for entering comments
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment';
    mainContainer.appendChild(commentInput);

    // Create a button to submit comments
    const commentSubmitButton = document.createElement('button');
commentSubmitButton.textContent = 'Post Comment';
commentSubmitButton.onclick = function() {
    // Check if the comment input is not empty
    if (commentInput.value.trim() !== '') {
        const comment = document.createElement('div');
        const commentText = document.createElement('p');
        commentText.textContent = commentInput.value;

        // Button to delete the comment
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        deleteButton.onclick = function() {
            commentsContainer.removeChild(comment);
        };

        comment.appendChild(commentText);
        comment.appendChild(deleteButton);
        commentsContainer.appendChild(comment);
        commentInput.value = ''; // Clear the input field
    }
};

mainContainer.appendChild(commentSubmitButton);

// Define a function to reset interactions
function resetInteractions() {
    score = 0; // Reset the score
    scoreDisplay.textContent = `Score: ${score}`; // Update the score display
    commentsContainer.innerHTML = ''; // Clear all comments
};
}

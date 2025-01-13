document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("Fitness-form");
    const resultsDiv = document.getElementById("results");
    const loadingIndicator = document.getElementById("loading");
    const submitButton = document.querySelector("button");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Collect and validate user inputs
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const activityLevel = document.getElementById("activity").value;
        const language = document.getElementById("language").value;

        // Simple validation for required fields
        if (isNaN(weight) || isNaN(height) || !activityLevel) {
            resultsDiv.textContent = "Please enter valid weight, height, and activity level.";
            return;
        }

        const requestData = { weight, height, activityLevel, language };

        // Show loading indicator and disable button
        loadingIndicator.style.display = "block";
        submitButton.disabled = true;

        try {
            const response = await fetch("http://localhost:3000/api/fitness", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Log the response to check its structure
            console.log("API response:", data);

            // Display the results
            if (data) {
                displayResults(data);
            } else {
                resultsDiv.textContent = "No recommendations available.";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            resultsDiv.textContent = "There was an error getting the AI recommendation. Please try again.";
        } finally {
            // Hide loading indicator and enable button
            loadingIndicator.style.display = "none";
            submitButton.disabled = false;
        }
    });

    // Function to display the results
    function displayResults(data) {
        // Clear previous results
        resultsDiv.innerHTML = '';

        // Display the new results
        resultsDiv.innerHTML = `
            <h2>AI Recommendations</h2>
            <p><strong>Calorie Intake:</strong> ${data.calorieIntake || "N/A"} kcal</p>
            <p><strong>Suggested Activities:</strong> ${data.suggestedActivities || "N/A"}</p>
            <p><strong>Additional Tips:</strong> ${data.tips || "No tips available."}</p>
        `;
    }
});

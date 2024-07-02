function toggleMenu() {
    var menu = document.getElementById("menu-bar").getElementsByTagName("ul")[0];
    var overlay = document.getElementById("overlay");

    if (menu.style.display === "block") {
        menu.style.display = "none";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Start fading out
        markCurrentPage(); // Mark the current page when closing the menu
        setTimeout(() => {
            overlay.style.display = "none";
        }, 300); // Wait for the transition to complete before hiding the overlay
    } else {
        menu.style.display = "block";
        overlay.style.display = "block";
        setTimeout(() => {
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        }, 150); // Wait for the transition to complete before hiding the overlay
    }
}

function markCurrentPage() {
    var menuItems = document.querySelectorAll("#menu-bar ul li a");
    var currentPageUrl = window.location.href;

    menuItems.forEach(function (menuItem) {
        var menuItemUrl = menuItem.href;

        // Check if the current page URL matches the menu item URL
        if (currentPageUrl === menuItemUrl) {
            // Add a class to mark the current page
            menuItem.parentElement.classList.add("current-page");
        } else {
            // Remove the class if it was applied to another menu item
            menuItem.parentElement.classList.remove("current-page");
        }
    });
}

// Call markCurrentPage when the page loads
document.addEventListener("DOMContentLoaded", markCurrentPage);

function filterProjects(category) {
    const gridItems = document.querySelectorAll('.grid-item');
    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.classList.remove('active');
    });

    categoryButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (category === 'all' && buttonText === 'all categories') {
            button.classList.add('active');
        } else if (buttonText === category.toLowerCase()) {
            button.classList.add('active');
        }
    });

    let visibleItems = Array.from(gridItems).filter(item => {
        return category === 'all' || item.dataset.category === category;
    });

    gridItems.forEach(item => {
        if (visibleItems.includes(item)) {
            item.classList.remove('collapsed');
        } else {
            item.classList.add('collapsed');
        }
    });

    // Calculate and set the grid positions for visible items
    let gridColumn = 1;
    let gridRow = 1;
    visibleItems.forEach(item => {
        item.style.gridArea = `${gridRow} / ${gridColumn}`;
        gridColumn++;
        if (gridColumn > 3) {
            gridColumn = 1;
            gridRow++;
        }
    });
}


const xValues = ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "SQL", "React"];
const yValues = ["", "Beginner", "     Intermediate", "Advanced", "Mastery"];
const barColors = ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: [4, 4, 3, 2, 2, 3, 2]  // Adjusted data to represent skill levels directly
    }]
  },
  options: {
    legend: { display: false },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                stepSize: 1,
                callback: function (value, index, values) {
                    return yValues[value];
                },
                fontColor: 'white', // Set the color of the y-axis labels
                fontSize: 18,
                fontFamily: 'Poppins'
            },
            scaleLabel: {
                display: false,
                labelString: 'Skill Level',
                fontColor: 'white' // Set the color of the y-axis label
            }
        }],
        xAxes: [{
            ticks: {
                fontColor: 'white', // Set the color of the x-axis labels
                fontSize: 18,
                fontFamily: 'Poppins'
            },
            scaleLabel: {
                display: false,
                labelString: 'Programming Language',
                fontColor: 'white' // Set the color of the x-axis label
            }
        }]
    },
    title: {
        display: false,
        text: "Web Development Skills",
        fontColor: 'white', // Set the color of the chart title
        fontSize: 12,
        fontFamily: 'Poppins'
    }
}
});
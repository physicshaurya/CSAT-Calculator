function addRow() {
    var table = document.getElementById("scenarioTable");
    var lastRow = table.rows[table.rows.length - 1];
    var lastCasesCount = lastRow.cells[0].getElementsByTagName('input')[0].value;
    var lastPointsAchieved = lastRow.cells[1].getElementsByTagName('input')[0].value;

    if (lastCasesCount === "" || lastPointsAchieved === "") {
        alert("Please fill in the last row's fields before adding a new row.");
        return;
    }

    var row = table.insertRow(-1);
    var casesCell = row.insertCell(0);
    var pointsCell = row.insertCell(1);
    var actionCell = row.insertCell(2);

    casesCell.innerHTML = '<input type="number" class="casesCount" min="0" step="1" />';
    pointsCell.innerHTML = '<input type="number" class="pointsAchieved" min="0" step="1" />';
    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
}

var checked = true;

document.getElementById("isDecimalPointAllowed").addEventListener('change', function() {
    checked = this.checked;
    // Check if the checkbox is checked
    if (this.checked) {
        // If checked, set the step size to 0.1
        document.querySelector('.pointsAchieved').step = 0.1;
    } else {
        // If not checked, set the step size to 1
        document.querySelector('.pointsAchieved').step = 1;
    }
});


function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function calculateMinCases() {
    const desiredValue = parseFloat(document.getElementById('desiredValue').value);
    const rows = document.querySelectorAll('#scenarioTable tr:not(:first-child)');
    let totalCases = 0;
    let totalPoints = 0;

    rows.forEach(row => {
        const casesCount = parseInt(row.querySelector('.casesCount').value);
        row.querySelector('.pointsAchieved').value = checked ? parseFloat(row.querySelector('.pointsAchieved').value) : parseInt(row.querySelector('.pointsAchieved').value);
        const pointsAchieved = row.querySelector('.pointsAchieved').value
        totalCases += casesCount;
        totalPoints += casesCount * pointsAchieved;
    });

    console.log('Total Cases ',totalCases);
    console.log('Total Points ',totalPoints);


    const currentAverage = totalPoints / totalCases;

    console.log('Average ',currentAverage);

    document.getElementById('currentAverage').textContent = Math.round(currentAverage*100)/100;

    if (isNaN(currentAverage) || isNaN(desiredValue)) {
        document.getElementById('minCases').textContent = 'N/A';
        return;
    }

    minCases = computeMinCases(desiredValue,totalCases,totalPoints)

    document.getElementById('minCases').textContent = minCases;
}

//It computes the minimum cases required
function computeMinCases(desiredValue,totalCases,totalPoints){
    let numerator = (desiredValue*totalCases - totalPoints);
    let denominator = (5 - desiredValue);

    if(denominator!==0){
        return Math.ceil(numerator/denominator)>=0?Math.ceil(numerator/denominator):0;
    }
    else{
        return 'N/A';
    }
}

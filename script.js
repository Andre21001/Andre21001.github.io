//V1.0
// Add this utility function at the top of the file
function parseFloatInput(value) {
    if (!value) return 0;
    if (typeof value === 'string') {
        // Handle both comma and dot, and multiple instances
        const normalized = value.replace(/,/g, '.').replace(/[^\d.-]/g, '');
        return parseFloat(normalized) || 0;
    }
    return parseFloat(value) || 0;
}

// Function to switch tabs and display only the selected content
function openTab(evt, tabID) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (const tabContent of tabContents) {
        tabContent.style.display = "none";
    }
    const tabButtons = document.getElementsByClassName("tab-button");
    for (const tabButton of tabButtons) {
        tabButton.classList.remove("active");
    }

    document.getElementById(tabID).style.display = "block";
    evt.currentTarget.classList.add("active");

    enablePasteToTable(tabID); // Enable paste functionality for the active tab
}

// Enable paste functionality for adding multiple rows at once via copy-paste
function enablePasteToTable(tabID) {
    const descriptionInput = document.getElementById(`description-${tabID}`);
    descriptionInput.onpaste = (event) => {
        event.preventDefault();

        const pasteData = event.clipboardData.getData('text');
        const rows = pasteData.split('\n').map(row => row.trim()).filter(row => row);

        rows.forEach(row => {
            const columns = row.split('\t');
            if (columns.length >= 2) { // Ensure we have at least two columns (Part Number and Description)
                const partNumber = columns[0];
                const description = columns[1];
                addRowFromPaste(tabID, description, partNumber);
            }
        });
    };
}

// Add row directly from pasted data (bypassing the input fields)
function addRowFromPaste(tabID, description, partNumber) {
    const quantity = 1; // Default quantity for pasted items
    const pricePerPcs = 0; // Default price; can be edited later if needed
    const total = (quantity * pricePerPcs).toFixed(2);

    const tableBody = document.getElementById(`serviceTable-${tabID}`).getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td contenteditable="true">${description}</td>
        <td contenteditable="true">${partNumber}</td>
        <td contenteditable="true" oninput="updateTotal('${tabID}', this)">${quantity}</td>
        <td contenteditable="true" oninput="updateTotal('${tabID}', this)">${pricePerPcs}</td>
        <td>${total}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
}

// Dummy suggestion data for localpurchase and consummable
const dataSuggestions = {
    localpurchase: [
        { description: 'AFNAC COOLANT', partNumber: 'CGS-001-AFN001', price: 9460000 },
        { description: 'GENERAL SPRAYER PLASTIK', partNumber: 'CGS-001-GEN015', price: 75000 },
        { description: 'GENERAL SPRAYER PLASTIK', partNumber: 'CGS-001-GEN015', price: 75000 },
        { description: 'HEO ENGINE OIL SAE 15W40 CF4', partNumber: 'CGS-001-HEO003', price: 7731000 },
        { description: 'TURALIK OIL 48', partNumber: 'CGS-001-TRK001', price: 43550 },
        { description: 'ARCAIR KAWAT LAS COUGING ARCAIR 6MM', partNumber: 'CGS-002-ARR001', price: 380000 },
        { description: 'ATL KWT LAS 3.2MM CHH 308-E8018-B2 @5KG', partNumber: 'CGS-002-ATL007', price: 44680 },
        { description: 'ATL KWT LAS 3.2MM CHH 308-E8018-B2 @5KG', partNumber: 'CGS-002-ATL007', price: 45332 },
        { description: 'ATL KWT LAS 4.0MM CHH 308-E8018-B2 @5KG', partNumber: 'CGS-002-ATL008', price: 38500 },
        { description: 'ATL KWT LAS 4.0MM CHH 308-E8018-B2 @5KG', partNumber: 'CGS-002-ATL008', price: 38500 },
        { description: 'GRADE 700 6x1550x6000', partNumber: '1H4-0060-155600', price: 8986668 },
        { description: 'GRADE 700 6x1550x6096', partNumber: '1H4-0060-155609', price: 8461750 },
        { description: 'GRADE 700 6x1800x2980', partNumber: '1H4-0060-180298-X', price: 7105700 },
        { description: 'GRADE 700 6x1800x6020', partNumber: '1H4-0060-180602-X', price: 14223500 },
        { description: 'GRADE 700 6x2000x8000', partNumber: '1H4-0060-200800', price: 27500000 },
        { description: 'GRADE 700 6X2100X8400', partNumber: '1H4-0060-210840', price: 23687731 },
        { description: 'GRADE 700 6x2450x6700', partNumber: '1H4-0060-245670-X', price: 17070810 },
        { description: 'GRADE 700 6x2485x6000', partNumber: '1H4-0060-248600', price: 14747481 },
        { description: 'GRADE 700 6x2485x8000', partNumber: '1H4-0060-248800-X', price: 15463973 },
        { description: 'GRADE 700 6x2500x6000', partNumber: '1H4-0060-250600', price: 16386887 },
        { description: 'GRADE 700 6x2500x6000', partNumber: '1H4-0060-250600-X', price: 27229176 },
        { description: 'GRADE 700 6x2500x6000', partNumber: '1H4-0060-250600-X', price: 20674245 },
        { description: 'GRADE 700 6x2500x8000', partNumber: '1H4-0060-250800-X', price: 29076196 },
        { description: 'GRADE 700 6x1800x2980', partNumber: '1H4-0060-180298', price: 7105700 },
        { description: 'GRADE 700 6x1800x6020', partNumber: '1H4-0060-180602', price: 14223500 },
        { description: 'GRADE 700 6x2000x6000', partNumber: '1H4-0060-200600', price: 10059223 },
        { description: 'GRADE 700 6x2450x6700', partNumber: '1H4-0060-245670', price: 17070810 },
        { description: 'GRADE 700 6x2485x8000', partNumber: '1H4-0060-248800', price: 15463975 },
        { description: 'GRADE 700 6x2485x8000', partNumber: '1H4-0060-248800-S', price: 14824724 },
        { description: 'GRADE 700 6x2500x8000', partNumber: '1H4-0060-250800', price: 25465055 },
        { description: 'GRADE 700 8x2500x6000', partNumber: '1H4-0080-250600', price: 20091473 },
        { description: 'GRADE 700 8x2500x6000', partNumber: '1H4-0080-250600', price: 33912000 },
        { description: 'GRADE 700 8x2500x6500', partNumber: '1H4-0080-250650', price: 18002584 }
    ],
    consummable: [
        { description: 'Consummable Item X', partNumber: 'C789', price: 8.75 },
        { description: 'Consummable Item Y', partNumber: 'C012', price: 5.5 }
    ],
    labour: [
        { description: 'Electrical Work', partNumber: '', price: 50 },
        { description: 'Plumbing', partNumber: '', price: 45 },
        { description: 'Carpentry', partNumber: '', price: 40 },
        { description: 'Painting', partNumber: '', price: 35 },
        { description: 'Masonry', partNumber: '', price: 45 },
        { description: 'Cleaning', partNumber: '', price: 25 }
    ]
};

// Autocomplete function for descriptions
function showDescriptionSuggestions(tabID) {
    const input = document.getElementById(`description-${tabID}`);
    const suggestionsBox = document.getElementById(`description-suggestions-${tabID}`);
    const suggestions = dataSuggestions[tabID] || [];  // Add fallback for undefined

    if (!input || !suggestionsBox) return; // Guard clause

    const filtered = suggestions.filter(item =>
        item.description.toLowerCase().includes(input.value.toLowerCase())
    );
    suggestionsBox.innerHTML = '';
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = item.description;
        div.onclick = () => {
            input.value = item.description;
            document.getElementById(`partNumber-${tabID}`).value = '';
            autocompletePartNumber(tabID, item.partNumber, item.price);
        };
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = filtered.length ? 'block' : 'none';
}

// Autocomplete for part number once description is chosen
function autocompletePartNumber(tabID, partNumber, price) {
    const partNumberInput = document.getElementById(`partNumber-${tabID}`);
    const priceInput = document.getElementById(`pricePerPcs-${tabID}`);
    partNumberInput.oninput = () => showPartNumberSuggestions(tabID);
    partNumberInput.value = partNumber;
    priceInput.value = price.toFixed(2); // Set price per PCS based on selected item
    partNumberInput.readOnly = false; // Allow manual entry if user chooses to overwrite
}

// Show suggestions for part number
function showPartNumberSuggestions(tabID) {
    const partNumberInput = document.getElementById(`partNumber-${tabID}`);
    const suggestionsBox = document.getElementById(`partNumber-suggestions-${tabID}`);
    const suggestions = dataSuggestions[tabID];
    const filtered = suggestions.filter(item =>
        item.partNumber.toLowerCase().includes(partNumberInput.value.toLowerCase())
    );
    suggestionsBox.innerHTML = '';
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = item.partNumber;
        div.onclick = () => {
            partNumberInput.value = item.partNumber;
            document.getElementById(`pricePerPcs-${tabID}`).value = item.price.toFixed(2);
            calculateTotal(tabID);
        };
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = filtered.length ? 'block' : 'none';
}

// Modify calculateTotal function
function calculateTotal(tabID) {
    const quantity = parseFloatInput(document.getElementById(`quantity-${tabID}`).value);
    const pricePerPcs = parseFloatInput(document.getElementById(`pricePerPcs-${tabID}`).value);
    const total = (quantity * pricePerPcs).toFixed(2);

    const calculatedTemp = document.getElementById(`calculated-temp-${tabID}`);
    if (calculatedTemp) {
        calculatedTemp.value = total;
    } else {
        console.error(`Calculated temp element not found for tab: ${tabID}`);
    }
    return total;
}

// Add row to table for Local Purchase or Consummable
function addRow(tabID) {
    if (tabID === 'labour') {
        addLabourRow(); // Use the specific labour function
        return;
    }

    const description = document.getElementById(`description-${tabID}`).value;
    const partNumber = document.getElementById(`partNumber-${tabID}`).value;
    const quantity = parseFloat(document.getElementById(`quantity-${tabID}`).value) || 0;
    const pricePerPcs = parseFloat(document.getElementById(`pricePerPcs-${tabID}`).value) || 0;
    const total = calculateTotal(tabID);
    const tableBody = document.getElementById(`serviceTable-${tabID}`).getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td contenteditable="true">${description}</td>
        <td contenteditable="true">${partNumber}</td>
        <td contenteditable="true" oninput="updateTotal('${tabID}', this)">${quantity}</td>
        <td contenteditable="true" oninput="updateTotal('${tabID}', this)">${pricePerPcs}</td>
        <td>${total}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
    `;
    clearInputs(tabID);
}

// Modify updateTotal function
function updateTotal(tabID, element) {
    const row = element.parentNode;
    const quantity = parseFloatInput(row.cells[2].innerText);
    const pricePerPcs = parseFloatInput(row.cells[3].innerText);
    row.cells[4].innerText = (quantity * pricePerPcs).toFixed(2);
}

// Delete row function
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function clearInputs(tabID) {
    document.getElementById(`description-${tabID}`).value = '';
    document.getElementById(`partNumber-${tabID}`).value = '';
    document.getElementById(`quantity-${tabID}`).value = '1';
    document.getElementById(`pricePerPcs-${tabID}`).value = '0';
}

// Hide suggestion box when clicking outside or losing focus
document.addEventListener('click', function (event) {
    const suggestions = document.querySelectorAll('.autocomplete-suggestions');
    suggestions.forEach(suggestionBox => {
        if (!suggestionBox.contains(event.target)) {
            suggestionBox.innerHTML = ''; // Clear suggestions
            suggestionBox.style.display = 'none'; // Hide suggestion box
        }
    });
});

// Also hide suggestion boxes when input loses focus
const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        const suggestionsBox = input.nextElementSibling; // Assuming suggestions are immediately after the input
        if (suggestionsBox) {
            suggestionsBox.innerHTML = ''; // Clear suggestions
            suggestionsBox.style.display = 'none'; // Hide suggestion box
        }
    });
});


//LABOUR

// Labour-specific suggestion data
const labourSuggestions = [
    { service: 'Electrical Work', rate: 50 },
    { service: 'Plumbing', rate: 45 },
    { service: 'Carpentry', rate: 40 },
    { service: 'Painting', rate: 35 },
    { service: 'Masonry', rate: 45 },
    { service: 'Cleaning', rate: 25 }
];

// Show suggestions for labour services
function showLabourSuggestions() {
    const input = document.getElementById('description-labour');
    const suggestionsBox = document.getElementById('description-suggestions-labour');

    const filtered = input.value.trim() === '' ?
        labourSuggestions :
        labourSuggestions.filter(item =>
            item.service.toLowerCase().includes(input.value.toLowerCase())
        );

    suggestionsBox.innerHTML = '';
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = item.service;
        div.onclick = () => {
            input.value = item.service;
            document.getElementById('pricePerPcs-labour').value = item.rate;
            calculateLabourTotal();
            suggestionsBox.style.display = 'none';
        };
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = filtered.length ? 'block' : 'none';
}

// Modify calculateLabourTotal function
function calculateLabourTotal() {
    const rate = parseFloatInput(document.getElementById('pricePerPcs-labour').value);
    const duration = parseFloatInput(document.getElementById('duration-labour').value);
    const workers = parseFloatInput(document.getElementById('quantity-labour').value);
    const total = (rate * duration * workers).toFixed(2);

    const calculatedTemp = document.getElementById('calculated-temp-labour');
    if (calculatedTemp) {
        calculatedTemp.value = total;
    }
    return total;
}

// Add row to labour table
function addLabourRow() {
    const description = document.getElementById('description-labour').value;
    const rate = parseFloat(document.getElementById('pricePerPcs-labour').value) || 0;
    const duration = parseFloat(document.getElementById('duration-labour').value) || 0;
    const workers = parseFloat(document.getElementById('quantity-labour').value) || 0;
    const total = calculateLabourTotal();

    if (!description) {
        alert("Service description cannot be empty!");
        return;
    }

    const tableBody = document.getElementById('serviceTable-labour').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td contenteditable="true">${description}</td>
        <td contenteditable="true" oninput="updateLabourTotal(this)">${rate}</td>
        <td contenteditable="true" oninput="updateLabourTotal(this)">${duration}</td>
        <td contenteditable="true" oninput="updateLabourTotal(this)">${workers}</td>
        <td>${total}</td>
        <td><button onclick="deleteLabourRow(this)">Delete</button></td>
    `;

    clearLabourInputs();
}

// Modify updateLabourTotal function
function updateLabourTotal(element) {
    const row = element.parentNode;
    const rate = parseFloatInput(row.cells[1].innerText);
    const duration = parseFloatInput(row.cells[2].innerText);
    const workers = parseFloatInput(row.cells[3].innerText);
    row.cells[4].innerText = (rate * duration * workers).toFixed(2);
}

// Clear labour inputs
function clearLabourInputs() {
    document.getElementById('description-labour').value = '';
    document.getElementById('pricePerPcs-labour').value = '0';
    document.getElementById('duration-labour').value = '1';
    document.getElementById('quantity-labour').value = '1';
    document.getElementById('calculated-temp-labour').value = '0';
}

// Delete labour row
function deleteLabourRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Add event listener for labour description input focus
document.addEventListener('DOMContentLoaded', function () {
    const labourInput = document.getElementById('description-labour');
    if (labourInput) {
        labourInput.addEventListener('focus', showLabourSuggestions);
        labourInput.addEventListener('input', showLabourSuggestions);
    }

    // Add real-time calculation for all tabs
    ['localpurchase', 'consummable', 'labour'].forEach(tabID => {
        const inputs = [
            `quantity-${tabID}`,
            `pricePerPcs-${tabID}`
        ];

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => calculateTotal(tabID));
                input.addEventListener('change', () => calculateTotal(tabID));
            }
        });
    });

    // For labour-specific inputs
    const labourInputs = ['duration-labour'];
    labourInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateLabourTotal);
            input.addEventListener('change', calculateLabourTotal);
        }
    });
});

// Update calculateLabourTotal function to always update the display
function calculateLabourTotal() {
    const rate = parseFloatInput(document.getElementById('pricePerPcs-labour').value);
    const duration = parseFloatInput(document.getElementById('duration-labour').value);
    const workers = parseFloatInput(document.getElementById('quantity-labour').value);
    const total = (rate * duration * workers).toFixed(2);

    const calculatedTemp = document.getElementById('calculated-temp-labour');
    if (calculatedTemp) {
        calculatedTemp.value = total;
    }
    return total;
}

//-----------------MATERIAL MANUFACTURING-----------------//

// Update material configurations with the new formulas
const materialConfigurations = {
    'plate-besi': {
        name: 'Plate Besi',
        fields: ['length', 'width', 'thickness'],
        formula: '7.85 × Panjang(m) × Lebar(m) × Tebal(m)',
        calculateWeight: (dims) => {
            return 7.85 * dims.length * dims.width * dims.thickness;
        },
        example: 'Contoh: 7.85 × 6m × 2.4m × 0.006m = 678.24 Kg'
    },
    'hexagon': {
        name: 'Besi Hexagon',
        fields: ['diameter', 'length'],
        formula: 'Diameter(m) × Diameter(m) × Panjang(m) × 0.0068',
        calculateWeight: (dims) => (dims.diameter * dims.diameter * dims.length * 0.0068),
        example: 'Contoh: 0.08m × 0.08m × 6m × 0.0068 = 261.12 Kg'
    },
    'angle-sama-kaki': {
        name: 'Angle Sama Kaki',
        fields: ['width', 'thickness', 'length'],
        formula: '(Lebar(m) × 2 - Tebal(m)) × Tebal(m) × 0.00785 × Panjang(m)',
        calculateWeight: (dims) => ((dims.width * 2 - dims.thickness) * dims.thickness * 0.00785 * dims.length),
        example: 'Contoh: (0.075m×2-0.009m) × 0.009m × 0.00785 × 6m = 59.77 Kg'
    },
    'angle-beda-kaki': {
        name: 'Angle Tidak Sama Kaki',
        fields: ['width1', 'width2', 'thickness', 'length'],
        formula: '(Lebar1(m) + Lebar2(m) - Tebal(m)) × Tebal(m) × 0.0076 × Panjang(m)',
        calculateWeight: (dims) => ((dims.width1 + dims.width2 - dims.thickness) * dims.thickness * 0.0076 * dims.length),
        example: 'Contoh: (0.075m + 0.05m - 0.006m) × 0.006m × 0.0076 × 6m = 32.56 Kg'
    },
    'square-bar': {
        name: 'Besi Empat Persegi',
        fields: ['width', 'length'],
        formula: 'Lebar(m) × Lebar(m) × Panjang(m) × 0.00785',
        calculateWeight: (dims) => (dims.width * dims.width * dims.length * 0.00785),
        example: 'Contoh: 0.08m × 0.08m × 6m × 0.00785 = 301.44 Kg'
    },
    'plat-aluminium': {
        name: 'Plat Aluminium',
        fields: ['thickness', 'width', 'length'],
        formula: '0.00171 × Tebal(m) × Lebar(m) × Panjang(m)',
        calculateWeight: (dims) => (0.00171 * dims.thickness * dims.width * dims.length),
        example: 'Berat dalam Kg'
    },
    'besi-beton': {
        name: 'Besi Beton (Tanpa Ulir)',
        fields: ['diameter', 'length'],
        formula: 'Diameter(m) × Diameter(m) × Panjang(m) × 0.006165',
        calculateWeight: (dims) => (dims.diameter * dims.diameter * dims.length * 0.006165),
        example: 'Berat dalam Kg (0.006165 = 3.14/4 × 7854/1000000)'
    },
    'hollow': {
        name: 'Besi Hollow',
        fields: ['width', 'thickness', 'length'],
        formula: 'Lebar(m) × 4 × Tebal(m) × 0.00785 × Panjang(m)',
        calculateWeight: (dims) => (dims.width * 4 * dims.thickness * 0.00785 * dims.length),
        example: 'Contoh: 0.08m × 4 × 0.006m × 0.00785 × 6m = 90.432 Kg'
    },
    'octagonal': {
        name: 'Besi Bersegi Delapan',
        fields: ['length', 'width'],
        formula: 'Panjang(m) × Lebar Across(m) × Lebar Across(m) × 0.0065',
        calculateWeight: (dims) => (dims.length * dims.width * dims.width * 0.0065),
        example: 'Berat dalam Kg'
    },
    'flat-bar': {
        name: 'Flat Bar',
        fields: ['width', 'thickness', 'length'],
        formula: 'Lebar(m) × Tebal(m) × Panjang(m) × 0.00785',
        calculateWeight: (dims) => (dims.width * dims.thickness * dims.length * 0.00785),
        example: 'Contoh: 0.065m × 0.0045m × 6m × 0.00785 = 13.778 Kg'
    },
    'round-bar': {
        name: 'Round Bar (Besi Bulat)',
        fields: ['diameter', 'length'],
        formula: '(π × (Diameter(m)/2)² × Panjang(m) × 7.85)',
        calculateWeight: (dims) => {
            const radius = dims.diameter / 2;
            return (Math.PI * radius * radius * dims.length * 7.85);
        },
        example: 'Contoh: Diameter 0.05m × 6m = 92.37 Kg'
    }
};

// Add this function to get the appropriate label for each field
function getFieldLabel(field) {
    const labels = {
        'length': 'Panjang',
        'width': 'Lebar',
        'width1': 'Lebar 1',
        'width2': 'Lebar 2',
        'thickness': 'Tebal',
        'diameter': 'Diameter'
    };
    return labels[field] || field;
}

// Update the updateDimensionFields function to handle new fields
function updateDimensionFields(materialType) {
    const config = materialConfigurations[materialType];
    if (!config) return;

    // Hide all possible dimension containers
    const allFields = ['length', 'width', 'width1', 'width2', 'thickness', 'diameter'];
    allFields.forEach(field => {
        const container = document.getElementById(`${field}-container`);
        if (container) container.style.display = 'none';
    });

    // Show required fields for selected material type
    config.fields.forEach(field => {
        const container = document.getElementById(`${field}-container`);
        if (container) {
            container.style.display = 'block';
            const label = container.querySelector('label');
            if (label) {
                label.textContent = `${getFieldLabel(field)} (m):`;
            }
        }
    });

    // Update formula display
    const formulaDisplay = document.getElementById('formula-display');
    if (formulaDisplay) {
        formulaDisplay.innerHTML = `
            <strong>Rumus:</strong> ${config.formula}<br>
            <strong>${config.example}</strong>
        `;
    }

    clearDimensionInputs();
    calculateWeight();
}

// Helper function to get units
function getUnit(field) {
    switch (field) {
        case 'length': return 'm';
        case 'width': return 'm';
        case 'thickness': return 'm';
        case 'diameter': return 'm';
        default: return '';
    }
}

// Update the calculateWeight function
function calculateWeight() {
    const materialType = document.getElementById('material-type').value;
    const config = materialConfigurations[materialType];
    if (!config) return;

    const dimensions = {};
    config.fields.forEach(field => {
        const value = parseFloatInput(document.getElementById(field).value);
        dimensions[field] = value; // Keep the input in meters
    });

    const weight = config.calculateWeight(dimensions);
    document.getElementById('weight').value = weight.toFixed(3);
    calculateMaterialCost();
}

// Clear dimension inputs
function clearDimensionInputs() {
    ['length', 'width', 'thickness', 'diameter'].forEach(field => {
        const input = document.getElementById(field);
        if (input) input.value = '';
    });
}

// Add dummy data for grade material suggestions with their corresponding densities
const gradeMaterialSuggestions = [
    { grade: 'ASTM A36', description: 'mildSteel', density: 7.85, price: 15000 },
    { grade: 'AISI 304', description: 'stainlessSteel', density: 8.00, price: 45000 },
    { grade: 'AISI 316', description: 'stainlessSteel', density: 8.00, price: 55000 },
    { grade: 'GRADE 700', description: 'highGradeHardened', density: 7.85, price: 25000 },
    { grade: 'ST37', description: 'mildSteel', density: 7.85, price: 12000 },
    { grade: 'ST52', description: 'highGradeHardened', density: 7.85, price: 14000 },
    { grade: 'S45C', description: 'highGradeHardened', density: 7.85, price: 16000 },
    { grade: 'SS400', description: 'mildSteel', density: 7.85, price: 13500 },
    { grade: 'A516 Gr.70', description: 'mildSteel', density: 7.85, price: 22000 },
    { grade: 'A283 Gr.C', description: 'mildSteel', density: 7.85, price: 13000 }
];

// Add function to show grade material suggestions
function showGradeSuggestions() {
    const input = document.getElementById('grade-material');
    const suggestionsBox = document.getElementById('grade-suggestions');
    
    if (!input || !suggestionsBox) return;

    const filtered = input.value.trim() === '' ? 
        gradeMaterialSuggestions : 
        gradeMaterialSuggestions.filter(item =>
            item.grade.toLowerCase().includes(input.value.toLowerCase()) ||
            item.description.toLowerCase().includes(input.value.toLowerCase())
        );

    suggestionsBox.innerHTML = '';
    filtered.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = `${item.grade} - ${item.description} (${item.price.toLocaleString()} /kg)`;
        div.onclick = () => {
            input.value = item.grade;
            document.getElementById('density').value = item.density;
            document.getElementById('material-price').value = item.price;
            calculateWeight();
            calculateMaterialCost();
            suggestionsBox.style.display = 'none';
        };
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = filtered.length ? 'block' : 'none';
}

// Add function to calculate material cost
function calculateMaterialCost() {
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const materialPrice = parseFloat(document.getElementById('material-price').value) || 0;
    const nesting = parseFloat(document.getElementById('nesting').value) || 1;
    const quantity = parseFloat(document.getElementById('quantity').value) || 1;

    // Calculate price per piece including nesting
    const pricePerPiece = (weight * materialPrice) / nesting;
    document.getElementById('price-per-pcs').value = pricePerPiece.toFixed(2);

    // Calculate total cost
    const totalCost = pricePerPiece * quantity;
    document.getElementById('calculated-cost-material').value = totalCost.toFixed(2);
}

// Add event listener for grade material input
document.addEventListener('DOMContentLoaded', function() {
    const gradeInput = document.getElementById('grade-material');
    if (gradeInput) {
        gradeInput.addEventListener('focus', showGradeSuggestions);
        gradeInput.addEventListener('input', showGradeSuggestions);
    }
});

// Update event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ...existing event listeners...

    // Add listeners for material cost calculation
    ['weight', 'material-price', 'nesting', 'quantity'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', calculateMaterialCost);
            element.addEventListener('change', calculateMaterialCost);
        }
    });
});

// Function to add material row to table
function addMaterialRow() {
    const description = document.getElementById('description-material').value;
    const grade = document.getElementById('grade-material').value;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const nesting = parseFloat(document.getElementById('nesting').value) || 1;
    const pricePerPcs = parseFloat(document.getElementById('price-per-pcs').value) || 0;
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const totalCost = parseFloat(document.getElementById('calculated-cost-material').value) || 0;

    // Validation
    if (!description || !grade) {
        alert('Description and Grade Material are required!');
        return;
    }

    const tableBody = document.getElementById('materialTable').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${description}</td>
        <td>${grade}</td>
        <td>${weight.toFixed(2)}</td>
        <td>${nesting.toFixed(2)}</td>
        <td>${pricePerPcs.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>${totalCost.toFixed(2)}</td>
        <td>
            <button onclick="editMaterialRow(this)">Edit</button>
            <button onclick="deleteMaterialRow(this)">Delete</button>
        </td>
    `;

    clearMaterialInputs();
    populateMaterialDropdown(); // Refresh the material dropdown
}

// Function to edit material row
function editMaterialRow(button) {
    const row = button.parentNode.parentNode;
    document.getElementById('description-material').value = row.cells[0].innerText;
    document.getElementById('grade-material').value = row.cells[1].innerText;
    document.getElementById('weight').value = row.cells[2].innerText;
    document.getElementById('nesting').value = row.cells[3].innerText;
    document.getElementById('price-per-pcs').value = row.cells[4].innerText;
    document.getElementById('quantity').value = row.cells[5].innerText;
    document.getElementById('calculated-cost-material').value = row.cells[6].innerText;

    // Remove the row being edited
    row.parentNode.removeChild(row);
}

// Update the updateMaterialRow function for correct pejal calculations
function updateMaterialRow(element) {
    const row = element.parentNode;
    
    const weight = parseFloatInput(row.cells[2].innerText);
    const nesting = parseFloatInput(row.cells[3].innerText) || 1;
    const pricePerPcs = parseFloatInput(row.cells[4].innerText);
    const quantity = parseFloatInput(row.cells[5].innerText);

    // Calculate total cost
    const totalCost = (weight * pricePerPcs * quantity) / nesting;
    row.cells[6].innerText = totalCost.toFixed(2);
}

// Function to delete material row
function deleteMaterialRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Function to clear material inputs
function clearMaterialInputs() {
    document.getElementById('description-material').value = '';
    document.getElementById('grade-material').value = '';
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';
    document.getElementById('thickness').value = '';
    document.getElementById('diameter').value = '';
    document.getElementById('density').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('nesting').value = '1';
    document.getElementById('material-price').value = '';
    document.getElementById('price-per-pcs').value = '';
    document.getElementById('quantity').value = '1';
    document.getElementById('calculated-cost-material').value = '';
}

// Add this helper function to calculate price per piece
function calculatePricePerPcs() {
    const weight = parseFloatInput(document.getElementById('weight').value);
    const materialPrice = parseFloatInput(document.getElementById('material-price').value);
    const nesting = parseFloatInput(document.getElementById('nesting').value) || 1;
    
    const pricePerPiece = (weight * materialPrice) / nesting;
    document.getElementById('price-per-pcs').value = pricePerPiece.toFixed(2);
    calculateMaterialCost();
}

// Update the DOM ready event listener to initialize material type
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Initialize material type fields
    const materialTypeSelect = document.getElementById('material-type');
    if (materialTypeSelect) {
        updateDimensionFields(materialTypeSelect.value);
        materialTypeSelect.addEventListener('change', function() {
            updateDimensionFields(this.value);
        });
    }

});

// -----------------MANUFACTURING-----------------//

// Update DOM ready event listener
document.addEventListener('DOMContentLoaded', function() {
    const materialTypeSelect = document.getElementById('material-type');
    if (materialTypeSelect) {
        // Clear existing options
        materialTypeSelect.innerHTML = '';
        
        // Add new options from configurations
        Object.entries(materialConfigurations).forEach(([value, config]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = config.name;
            materialTypeSelect.appendChild(option);
        });

        // Initialize fields for default selection
        updateDimensionFields(materialTypeSelect.value);
        
        // Add change event listener
        materialTypeSelect.addEventListener('change', function() {
            updateDimensionFields(this.value);
        });
    }
});

// Function to populate material dropdown in manufacturing tab
function populateMaterialDropdown() {
    const materialDropdown = document.getElementById('material-dropdown');
    const materialTable = document.getElementById('materialTable').getElementsByTagName('tbody')[0];
    const manufacturingTable = document.getElementById('manufacturingTable').getElementsByTagName('tbody')[0];
    materialDropdown.innerHTML = ''; // Clear existing options

    const addedMaterials = Array.from(manufacturingTable.rows).map(row => row.cells[0].innerText);

    for (const row of materialTable.rows) {
        const materialDescription = row.cells[0].innerText;
        if (!addedMaterials.includes(materialDescription)) {
            const option = document.createElement('option');
            option.value = materialDescription; // Use description as value
            option.textContent = materialDescription;
            materialDropdown.appendChild(option);
        }
    }

    // Trigger change event to update fields for the first material
    if (materialDropdown.options.length > 0) {
        materialDropdown.selectedIndex = 0;
        updateManufacturingFields();
    }
}

// Function to update manufacturing fields based on selected material
function updateManufacturingFields() {
    const materialDropdown = document.getElementById('material-dropdown');
    const selectedMaterial = materialDropdown.value;
    const materialTable = document.getElementById('materialTable').getElementsByTagName('tbody')[0];

    for (const row of materialTable.rows) {
        if (row.cells[0].innerText === selectedMaterial) {
            document.getElementById('description-manufacturing').value = row.cells[0].innerText;
            document.getElementById('weight-manufacturing').value = row.cells[2].innerText;
            document.getElementById('grade-manufacturing').value = row.cells[1].innerText;
            const selectedGrade = gradeMaterialSuggestions.find(item => item.grade === row.cells[1].innerText);
            document.getElementById('type-manufacturing').value = selectedGrade ? selectedGrade.description : '';
            document.getElementById('quantity-manufacturing').value = row.cells[5].innerText; // Set quantity based on material tab
            document.getElementById('quantity-manufacturing').readOnly = true; // Make quantity read-only
            break;
        }
    }
}

// Call populateMaterialDropdown on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    populateMaterialDropdown();
    const materialDropdown = document.getElementById('material-dropdown');
    if (materialDropdown) {
        materialDropdown.addEventListener('change', updateManufacturingFields);
    }
});

// ...existing code...

const labourManufacturingServices = [
    { serviceName: "Cutting Mild Steel", costPerKg: 3000 },
    { serviceName: "Cutting High Grade Hardened", costPerKg: 3000 },
    { serviceName: "Cutting Stainless Steel", costPerKg: 4500 },
    { serviceName: "Bending Mild Steel", costPerKg: 2500 },
    { serviceName: "Bending High Grade Hardened", costPerKg: 4500 },
    { serviceName: "Bending Stainless Steel", costPerKg: 4500 },
    { serviceName: "Roll Mild Steel", costPerKg: 3500 },
    { serviceName: "Roll High Grade Hardened", costPerKg: 4500 },
    { serviceName: "Roll Stainless Steel", costPerKg: 4500 },
    { serviceName: "Machining Mild Steel", costPerKg: 3500 },
    { serviceName: "Machining High Grade Hardened", costPerKg: 6000 },
    { serviceName: "Machining Stainless Steel", costPerKg: 6000 } // Tidak ada data untuk Stainless Steel
];

// Function to show manufacturing service suggestions
function showManufacturingServiceSuggestions(index) {
    const input = document.getElementById(`service-type-${index}`);
    const suggestionsBox = document.getElementById(`service-suggestions-${index}`);
    const materialType = document.getElementById('grade-manufacturing').value.toLowerCase();

    const filtered = labourManufacturingServices.filter(service =>
        service.serviceName.toLowerCase().includes(input.value.toLowerCase())
    );

    suggestionsBox.innerHTML = '';
    filtered.forEach(service => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = service.serviceName;
        div.onclick = () => {
            input.value = service.serviceName;
            const rate = service.costPerKg || 0;
            document.getElementById(`service-rate-${index}`).value = rate;
            calculateTotalManufacturingCost();
            suggestionsBox.style.display = 'none';
        };
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = filtered.length ? 'block' : 'none';
}

// Function to calculate total manufacturing cost
function calculateTotalManufacturingCost() {
    const quantity = parseFloatInput(document.getElementById('quantity-manufacturing').value);
    let totalCost = 0;

    document.querySelectorAll('.service-row').forEach((row, index) => {
        const rate = parseFloatInput(document.getElementById(`service-rate-${index}`).value);
        totalCost += rate * quantity;
    });

    document.getElementById('calculated-cost-manufacturing').value = totalCost.toFixed(2);
}

//function collapsible
function toggleCollapsible(button) {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

// Function to add a new service row
function addServiceRow() {
    const index = document.querySelectorAll('.service-row').length;
    const container = document.getElementById('services-container');

    const newRow = document.createElement('div');
    newRow.classList.add('service-row');

    const collapsibleButton = document.createElement('button');
    collapsibleButton.classList.add('collapsible');
    collapsibleButton.textContent = `Service ${index + 1}`;
    collapsibleButton.onclick = function() { toggleCollapsible(this); };

    const collapsibleContent = document.createElement('div');
    collapsibleContent.classList.add('collapsible-content');
    collapsibleContent.style.display = 'none'; // Initially hide the content
    collapsibleContent.innerHTML = `
        <label for="service-type-${index}">Jenis Jasa:</label>
        <input type="text" id="service-type-${index}" placeholder="Enter service type" oninput="showManufacturingServiceSuggestions(${index})">
        <div id="service-suggestions-${index}" class="autocomplete-suggestions"></div>

        <label for="service-rate-${index}">Rate per PCS:</label>
        <input type="number" id="service-rate-${index}" step="0.01" placeholder="Rate per PCS" oninput="calculateTotalManufacturingCost()">
    `;

    newRow.appendChild(collapsibleButton);
    newRow.appendChild(collapsibleContent);
    container.appendChild(newRow);
}

// Function to add manufacturing row to table
function addManufacturingRow() {
    const description = document.getElementById('description-manufacturing').value;
    const weight = parseFloat(document.getElementById('weight-manufacturing').value) || 0;
    const quantity = parseFloat(document.getElementById('quantity-manufacturing').value) || 0;
    const totalCost = parseFloat(document.getElementById('calculated-cost-manufacturing').value) || 0;

    const serviceDetails = Array.from(document.querySelectorAll('.service-row')).map((row, index) => {
        const serviceType = document.getElementById(`service-type-${index}`).value;
        const serviceRate = parseFloat(document.getElementById(`service-rate-${index}`).value) || 0;
        return `- ${serviceType} ${serviceRate.toFixed(2)}`;
    }).join('<br>'); // Join with line breaks

    const tableBody = document.getElementById('manufacturingTable').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${description}</td>
        <td>${weight.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>${serviceDetails}</td>
        <td>${totalCost.toFixed(2)}</td>
        <td>
            <button onclick="editManufacturingRow(this)">Edit</button>
            <button onclick="deleteManufacturingRow(this)">Delete</button>
        </td>
    `;

    clearManufacturingInputs();
    resetServiceRows();
    populateMaterialDropdown(); // Refresh the material dropdown
}

// Function to reset service rows to default
function resetServiceRows() {
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = ''; // Clear existing service rows

    // Add default service row
    addServiceRow();
}

// Function to clear manufacturing inputs
function clearManufacturingInputs() {
    document.getElementById('description-manufacturing').value = '';
    document.getElementById('weight-manufacturing').value = '';
    document.getElementById('grade-manufacturing').value = '';
    document.getElementById('type-manufacturing').value = '';
    document.getElementById('quantity-manufacturing').value = '1';
    document.getElementById('calculated-cost-manufacturing').value = '';

    document.querySelectorAll('.service-row').forEach((row, index) => {
        document.getElementById(`service-type-${index}`).value = '';
        document.getElementById(`service-rate-${index}`).value = '';
    });
}

// Function to edit manufacturing row
function editManufacturingRow(button) {
    const row = button.parentNode.parentNode;
    document.getElementById('description-manufacturing').value = row.cells[0].innerText;
    document.getElementById('weight-manufacturing').value = row.cells[1].innerText;
    document.getElementById('quantity-manufacturing').value = row.cells[2].innerText;
    document.getElementById('calculated-cost-manufacturing').value = row.cells[4].innerText;

    // Populate the service rows
    const serviceDetails = row.cells[3].innerHTML.split('<br>');
    const servicesContainer = document.getElementById('services-container');
    servicesContainer.innerHTML = ''; // Clear existing service rows

    serviceDetails.forEach((detail, index) => {
        const serviceTypeMatch = detail.match(/- (.+) \d+\.\d{2}/);
        const serviceRateMatch = detail.match(/(\d+\.\d{2})$/);
        if (serviceTypeMatch && serviceRateMatch) {
            const serviceType = serviceTypeMatch[1];
            const serviceRate = serviceRateMatch[1];

            const newRow = document.createElement('div');
            newRow.classList.add('service-row');

            const collapsibleButton = document.createElement('button');
            collapsibleButton.classList.add('collapsible');
            collapsibleButton.textContent = `Service ${index + 1}`;
            collapsibleButton.onclick = function() { toggleCollapsible(this); };

            const collapsibleContent = document.createElement('div');
            collapsibleContent.classList.add('collapsible-content');
            collapsibleContent.style.display = 'none'; // Initially hide the content
            collapsibleContent.innerHTML = `
                <label for="service-type-${index}">Jenis Jasa:</label>
                <input type="text" id="service-type-${index}" value="${serviceType}" placeholder="Enter service type" oninput="showManufacturingServiceSuggestions(${index})">
                <div id="service-suggestions-${index}" class="autocomplete-suggestions"></div>

                <label for="service-rate-${index}">Rate per PCS:</label>
                <input type="number" id="service-rate-${index}" step="0.01" value="${serviceRate}" placeholder="Rate per PCS" oninput="calculateTotalManufacturingCost()">
            `;

            newRow.appendChild(collapsibleButton);
            newRow.appendChild(collapsibleContent);
            servicesContainer.appendChild(newRow);
        }
    });

    // Remove the row being edited
    row.parentNode.removeChild(row);
}

// Function to delete manufacturing row
function deleteManufacturingRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// ...existing code...


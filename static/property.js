/*
const propertyForm = document.getElementById('propertyForm');
const errorMessage = document.getElementById('errorMessage');
const imageUpload = document.getElementById('imageUpload');
const propertyImage = document.getElementById('propertyImage');
const imagePreview = document.getElementById('imagePreview');
const addButton = document.getElementById('addButton');

let propertyData = [];

// Function to validate form input
function validateForm() {
    const propertyName = document.getElementById('propertyName').value;
    const address = document.getElementById('address').value;
    const rentMonthly = document.getElementById('rentMonthly').value;

    if (propertyName === '' || address === '' || rentMonthly === '') {
        errorMessage.textContent = 'Please fill in all required fields.';
        return false;
    } else if (propertyImage.value === '') {
        errorMessage.textContent = 'Please upload a property image.';
        return false;
    }

    errorMessage.textContent = '';
    return true;
}

// Function to handle image upload
imageUpload.addEventListener('click', () => {
    propertyImage.click();
});

propertyImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Property Image">`;
    };

    reader.readAsDataURL(file);
});

// Function to add property data to array
function addPropertyData() {
    if (validateForm()) {
        const propertyName = document.getElementById('propertyName').value;
        const facilities = document.getElementById('facilities').value;
        const address = document.getElementById('address').value;
        const contactDetails = document.getElementById('contactDetails').value;
        const rentMonthly = document.getElementById('rentMonthly').value;
        const propertyImage = document.getElementById('propertyImage').files[0];

        const propertyData = {
            "Property Name": propertyName,
            "facilities": facilities,
            "Address": address,
            "Contact Details": contactDetails,
            "Rent/Monthly": rentMonthly,
            "Property Image": propertyImage
        };

        // Send data to API (using fetch or AJAX)
        // ...

        console.log('Property added:', propertyData);
        // Clear the form after adding the data
        propertyForm.reset();
        imagePreview.innerHTML = '';
    }
}
*/

const property = document.getElementById("propertyForm");

property.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(property);
    formData.append("owner","abhay")
    formData.forEach((val ,key)=> console.log(val,key))
    const response = await fetch(
        "https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.repl.co/add-property",
        {
            method: "POST",
            headers: {
                Name: "Content-Type", 
                Direction: "In", 
                Type: "String",
                Value: "multipart/form-data"
                //"Content-Type": "multipart/form-data",
            },
            body: formData,
        },
    );

    const status = response.status;

    const result = await response.json();
    if (status == 201)
        location.replace(
            "https://a3cd395f-a873-4cc8-863d-5937166f1d15-00-1rs47bgtx64wq.pike.repl.co/home",
        );
    else alert(result.error);
});

const propertyImage = document.getElementById('propertyImage');
const imagePreview = document.getElementById('imagePreview');

propertyImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Property Image">`;
    };

    reader.readAsDataURL(file);
});
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://crjbnntjyydsdolxymzu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyamJubnRqeXlkc2RvbHh5bXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzAyNDEsImV4cCI6MjAzMTEwNjI0MX0.BHXwbU261z-oi4oTNjMG44XSSPFwU4Jeh5AcXlloPx8');

document.addEventListener('DOMContentLoaded', function() {
    const searchPeople = document.querySelector('#searchPeople');
    const searchVehicle = document.querySelector('#searchVehicle');
    const addVehicleBtn = document.querySelector('#addVehicle');
    const addOwnerBtn = document.querySelector('#addOwner');

    if (searchPeople) {
        searchPeople.addEventListener('click', fetchPeople);
    }
    if (searchVehicle) {
        searchVehicle.addEventListener('click', fetchVehicle);
    }
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', addVehicle);
    }
    if (addOwnerBtn) {
        addOwnerBtn.addEventListener('click', addOwner);
    }
});

async function fetchPeople() {
    const nameInput = document.getElementById('name').value;
    const licenseInput = document.getElementById('license').value;

    let search = supabase.from('People').select();
    
    if (nameInput) {
        search = search.ilike('Name', `%${nameInput}%`);
    }

    if (licenseInput) {
        search = search.ilike('LicenseNumber', `%${licenseInput}%`);
    }

    if (nameInput && licenseInput){
        document.getElementById('message').innerText = 'Error';
        console.error('Failed to fetch data:', error);
    }

    if (!nameInput && !licenseInput){
        document.getElementById('message').innerText = 'Error';
        console.error('Failed to fetch data:', error);

    }


    try {
        const { data, error } = await search;

        if (error) throw error;

        const resultElement = document.querySelector('#results');
        resultElement.innerHTML = '';

        if (data.length === 0) {
            document.getElementById('message').innerText = 'Error:No result found';
        } else {
            data.forEach(person => {
                const personDiv = document.createElement('div');
                personDiv.id = 'resultsbox';
                const htmlContent = `
                    <p>Person ID: ${person.PersonID}</p>
                    <p>Name: ${person.Name}</p>
                    <p>Address: ${person.Address}</p>
                    <p>DOB: ${person.DOB}</p>
                    <p>License Number: ${person.LicenseNumber}</p>
                    <p>Expiry Date: ${person.ExpiryDate}</p>
                `;
                personDiv.innerHTML = htmlContent;
                resultElement.appendChild(personDiv);
            });
            document.getElementById('message').innerText = 'Search successful';
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        document.getElementById('message').innerText = 'Error: Failed to fetch data';
    }
}


async function fetchVehicle() {
    const regInput = document.getElementById('rego').value;

    let search = supabase.from('Vehicles').select();

    if (regInput) {
        search = search.ilike('VehicleID', `%${regInput}%`);
    }

    if (!regInput){
        document.getElementById('message').innerText = 'Error';
        console.error('Failed to fetch data:', error);
    }


    try {
        const { data, error } = await search;

        if (error) throw error;

        const resultElement = document.querySelector('#results');
        resultElement.innerHTML = ''; 

        if (data.length === 0) {
            document.getElementById('message').innerText = 'Error:No result found';
        } else {
            data.forEach(vehicle => {
                const vehicleDiv = document.createElement('div');
                vehicleDiv.id = 'resultbox';
                const htmlContent = `
                    <p>vehicleid: ${vehicle.VehicleID}</p>
                    <p>make: ${vehicle.Make}</p>
                    <p>model: ${vehicle.Model}</p>
                    <p>colour: ${vehicle.Colour}</p>
                    <p>ownerid: ${vehicle.OwnerID}</p>
                `;
                vehicleDiv.innerHTML = htmlContent;
                resultElement.appendChild(vehicleDiv);
            });
            document.getElementById('message').innerText = 'Search successful';
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        document.getElementById('message').innerText = 'Error: Failed to fetch data';
    }
}

window.addVehicle = addVehicle;

async function addVehicle() {
    const rego = document.getElementById('rego').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const colour = document.getElementById('colour').value;
    const owner = document.getElementById('owner').value;

    if (!rego || !make || !model || !colour || !owner) {
        document.getElementById('message').innerText = 'Error: All fields must be filled.';
        return;
    }

    const { error: vehicleError } = await supabase
        .from('Vehicles')
        .insert([
            { VehicleID: rego, Make: make, Model: model, Colour: colour, OwnerID: owner }
        ]);

    if (vehicleError) {
        document.getElementById('message').innerText = 'Error adding vehicle.';
    } else {
        document.getElementById('message').innerText = 'Vehicle added successfully.';
    }

    const { data, error } = await supabase
        .from('People')
        .select('*')
        .eq('Name', owner);

    if (error || data.length === 0) {
        // Display the owner form if the owner doesn't exist
        document.getElementById('ownerForm').style.display = 'block';
    } else {
        const person = data[0];
        console.log('Person details:', person);
        document.getElementById('message').innerText = 'Owner exists. Vehicle added successfully.';
    }
}

window.addOwner = addOwner;
async function addOwner() {
    const personid = document.getElementById('personid').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const dob = document.getElementById('dob').value;
    const license = document.getElementById('license').value;
    const expire = document.getElementById('expire').value;
    const messageElement = document.getElementById('message');

    if (!personid || !name || !address || !dob || !license || !expire) {
        messageElement.innerText = 'Error: All fields must be filled.';
        return;
    }

    const { data, error } = await supabase
        .from('People')
        .insert([
            { PersonID: personid, Name: name, Address: address, DOB: dob, LicenseNumber: license, ExpiryDate: expire }
        ]);

    if (data) {
        messageElement.innerText = 'Error adding owner';
    } else {
        messageElement.innerText = 'Vehicle added successfully';
        document.getElementById('ownerForm').style.display = 'none';
    }
}

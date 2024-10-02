const apiUrl = "https://crudcrud.com/api/e4215ee942e94a4da0119a8b485d0e23/booking";

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const userDetails = {
        name: event.target.name.value,
        seat: event.target.seat.value,
    };

    try {
        const response = await axios.post(apiUrl, userDetails);
        displayUserOnScreen(response.data);
        updateTotalBookings();
    } catch (error) {
        console.error("Error submitting the form:", error);
    }
    event.target.name.value = "";
    event.target.seat.value = "";
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get(apiUrl);
        response.data.forEach((user) => displayUserOnScreen(user));
        updateTotalBookings();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

async function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(document.createTextNode(`${userDetails.name} - ${userDetails.seat}`));

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", async function (event) {
        userList.removeChild(event.target.parentElement);

        try {
            await axios.delete(`${apiUrl}/${userDetails._id}`);
            updateTotalBookings();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    });

    editBtn.addEventListener("click", async function (event) {
        userList.removeChild(event.target.parentElement);
        document.getElementById("name").value = userDetails.name;
        document.getElementById("seat").value = userDetails.seat;

        try {
            await axios.delete(`${apiUrl}/${userDetails._id}`);
            updateTotalBookings(); 
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    });
}


document.getElementById("findBooking").addEventListener("click", async () => {
    const searchValue = document.getElementById("search").value;
    if (!searchValue) return;

    try {
        const response = await axios.get(apiUrl);
        const foundUser = response.data.find(user => user.seat === searchValue);

        const userList = document.querySelector("ul");
        userList.innerHTML = "";
        
        if (foundUser) {
            displayUserOnScreen(foundUser);
        } else {
            alert("No booking found with that seat number.");
        }
    } catch (error) {
        console.error("Error finding the booking:", error);
    }
});


async function updateTotalBookings() {
    try {
        const response = await axios.get(apiUrl);
        const totalBooking = response.data.length;
        document.getElementById("totalBooking").textContent = totalBooking;
    } catch (error) {
        console.log(error);
    }
}

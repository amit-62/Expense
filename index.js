const form = document.querySelector("form");

function handleFormSubmit(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  const expense = {
    amount: amount,
    description: description,
    category: category,
  };

  const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  existingExpenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(existingExpenses));
  console.log("Expense saved:", expense);

  const newItem = `${amount}-${description}-${category}`;
  console.log(newItem);

  const ulItems = document.getElementById("ul");
  const listItem = document.createElement("li");
  listItem.textContent = newItem;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Expenses";
  listItem.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function () {
    const updatedExpenses = existingExpenses.filter(
      (item) =>
        !(
          item.amount === amount &&
          item.description === description &&
          item.category === category
        )
    );

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    ulItems.removeChild(listItem);
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expenses";
  listItem.appendChild(editBtn);

  editBtn.addEventListener("click", function () {
	ulItems.removeChild(listItem);
    const updatedExpenses = existingExpenses.filter(
      (item) =>
        !(
          item.amount === amount &&
          item.description === description &&
          item.category === category
        )
    );

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;
  });

  ulItems.appendChild(listItem);

  event.target.reset();
}

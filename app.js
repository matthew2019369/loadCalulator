document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", function(e) {
    document.getElementById("results").style.display = "none";
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 2000);
    e.preventDefault();
  });

function calculateResults() {
  console.log("Calculating....");

  clearError();
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  const principal = parseFloat(amount.value);

  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  if (principal <= 0 || calculatedInterest <= 0 || calculatedPayment <= 0) {
    showError("only positive numbers are allowed to insert");
  } else {
    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayment).toFixed(2);
      totalInterest.value = (monthly * calculatedPayment - principal).toFixed(
        2
      );
      document.getElementById("results").style.display = "block";
    } else {
      showError("Please check your number");
    }
  }
  document.getElementById("loading").style.display = "none";
}

function showError(err) {
  const errDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  errDiv.className = "alert alert-danger";
  errDiv.appendChild(document.createTextNode(err));
  card.insertBefore(errDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  if (document.querySelector(".alert") != null) {
    document.querySelector(".alert").remove();
  }
}

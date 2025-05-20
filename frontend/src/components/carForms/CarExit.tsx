<h2>Car Exit Form</h2>
<form action="/vehicles/exit" method="POST">
  <label for="plateNumber">Plate Number:</label><br>
  <input type="text" id="plateNumber" name="plateNumber" required><br><br>

  <label for="exitDateTime">Exit Date & Time:</label><br>
  <input type="datetime-local" id="exitDateTime" name="exitDateTime" required><br><br>

  <label for="chargedAmount">Charged Amount (RWF):</label><br>
  <input type="number" id="chargedAmount" name="chargedAmount" required><br><br>

  <button type="submit">Register Exit</button>
</form>

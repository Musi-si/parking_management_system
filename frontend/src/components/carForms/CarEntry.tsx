
<h2>Car Entry Form</h2>
<form action="/vehicles/add" method="POST">
  <label for="plateNumber">Plate Number:</label><br>
  <input type="text" id="plateNumber" name="plateNumber" required><br><br>

  <label for="parkingCode">Parking Code (optional):</label><br>
  <input type="text" id="parkingCode" name="parkingCode"><br><br>

  <label for="entryDateTime">Entry Date & Time:</label><br>
  <input type="datetime-local" id="entryDateTime" name="entryDateTime" required><br><br>

  <button type="submit">Register Entry</button>
</form>

$(document).ready(function() {


// ========================================== START CODING BELOW!!

  // Initialize Firebase
  var config = {
    apiKey: "“AIzaSyB5v8AH08siTi4mAGFGhS-7-rKaR8XYgOo",
    authDomain: "employment-management-7c176.firebaseapp.com",
    databaseURL: "https://employment-management-7c176.firebaseio.com",
    projectId: "employment-management-7c176",
    storageBucket: "",
    messagingSenderId: "644842313209"
  };

  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Initial Values
  var employeeName = "";
  var role = "";
  var startDate = 0;
  var monthlyRate = "";

  // Capture Button Click
  $("#submit").on("click", function(event) {
    console.log("clicked")
    event.preventDefault();

    // Grabbed values from text boxes
    employeeName = $("#employee-name").val().trim();
    role = $("#role").val().trim();
    startDate = $("#date-started").val().trim();
    monthlyRate = $("#monthly-rate").val().trim();

    // Code for handling the push
    lastPushed = database.ref().push({
      employeeName: employeeName,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


  });

  // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.employeeName);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);

   //prepends new row to table
   $("#employee-table").append(`<tr><td>${sv.employeeName}</td><td>${sv.role}</td><td>${sv.startDate}</td><td>${sv.monthlyRate}</td>
   </tr>`)

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});


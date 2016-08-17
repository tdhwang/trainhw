
  var config = {
    apiKey: "AIzaSyB8nUztT3_OglSFu9gBdqcJxutdvt9_ez8",
    authDomain: "my-first-firebase-projec-f1382.firebaseapp.com",
    databaseURL: "https://my-first-firebase-projec-f1382.firebaseio.com",
    storageBucket: "my-first-firebase-projec-f1382.appspot.com",
  };
  firebase.initializeApp(config);


    var database = firebase.database();

   
    $("#submitButton").on("click", function(){
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("X");
      var frequency = $("#frequencyInput").val().trim();

      

      console.log(firstTrain)
      
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      })

     
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainTimeInput").val("");
      $("#frequencyInput").val("");

      
      return false;

    });

 
  database.ref().on("child_added", function(childSnapshot) {


    var fireName = childSnapshot.val().trainName;
    var fireDestination = childSnapshot.val().destination;
    var fireFirstTrain = childSnapshot.val().firstTrain;
    var fireFrequency = childSnapshot.val().frequency;


    var minutesAway = "";


    var nextArrival = "";


    var firstTimeConverted = moment(fireFirstTrain,"hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemainder = diffTime % fireFrequency; 
    var timeMinutesTillTrain = fireFrequency - timeRemainder;
    var nextTrain = moment().add(timeMinutesTillTrain, "minutes").format("hh:mm")

    $("#trainTable > tbody").append("<tr class='active'><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + "Every " + fireFrequency + " Minutes" + "</td><td>" + nextTrain + "</td><td>" + timeMinutesTillTrain + "</td></tr>");

  });

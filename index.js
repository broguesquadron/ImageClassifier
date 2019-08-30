let net;

// Load a sample image to classify
let imgEl = document.getElementById('img');

// Status text
let status = document.getElementById("modelStatus");

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
  status.innerText = "Prediction Imminent...";

  // Make a prediction through the model on our image. 
  const result = await net.classify(imgEl);
  console.log(result);
  
  //put new predictions in a table for display
  const table = document.getElementById("outputTable");
  const tableBody = document.getElementById("outputTable_tbody");
  tableBody.innerHTML = ""; //this seems like a crude way to empty the table but better than a loop?  
  for(var i = 0; i < result.length; i++){
      //extract data from result object
      let rawPrediction = result[i].className;
      let prediction = rawPrediction.toString().split(",").join("\n");
      let probability = result[i].probability;
      //prepare data table row
      let row = tableBody.insertRow(i);
      let predictionCell = row.insertCell(0);
      let probabilityCell = row.insertCell(1);
      //insert data into data table row
      predictionCell.innerText = prediction;
      probabilityCell.innerText = probability;
  }
  table.hidden = false;
  status.innerText = "";
}

app();

window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to file url
            //img.onload = imageIsLoaded; // optional onload event listener
            app();
        }
    });
});
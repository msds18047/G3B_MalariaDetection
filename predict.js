$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
});

$("#loadModel-button").click(function () {
    loadModel($("#model-selector").val());
});

let model;
async function loadModel(name) {
    $(".progress-bar").show();
    model = undefined;

      //model = await tf.loadLayersModel('C:/Users/rsarmad/Documents/MS/DL/Project/denset/tfweight-20200705T195054Z-001/tfweight/model.json');
       const uploadJSONInput = document.getElementById('upload-json');
       const uploadWeightsInput = document.getElementById('upload-weights');
	   var browseData=[uploadJSONInput.files[0]]
	   
	   for (var i=0 ;  i < uploadWeightsInput.files.length; i++)
	   {
		   browseData.push(uploadWeightsInput.files[i])
		   
	   }
	   
	   // browseData = browseData.concat(
	   
	   // [uploadWeightsInput.files[0],uploadWeightsInput.files[1],uploadWeightsInput.files[2],uploadWeightsInput.files[3],uploadWeightsInput.files[4],uploadWeightsInput.files[5],uploadWeightsInput.files[6],	uploadWeightsInput.files[7],uploadWeightsInput.files[8],uploadWeightsInput.files[9],uploadWeightsInput.files[10],uploadWeightsInput.files[11],uploadWeightsInput.files[12],uploadWeightsInput.files[13] ,uploadWeightsInput.files[14],uploadWeightsInput.files[15],uploadWeightsInput.files[16] ,uploadWeightsInput.files[17]
	  // ,uploadWeightsInput.files[18],uploadWeightsInput.files[19]
	 // ]
	   
	   // )
       model = await tf.loadModel(tf.io.browserFiles(browseData));
       //[uploadJSONInput.files[0]
	  //,uploadWeightsInput.files
	  //,uploadWeightsInput.files[0],uploadWeightsInput.files[1],uploadWeightsInput.files[2],uploadWeightsInput.files[3],uploadWeightsInput.files[4],uploadWeightsInput.files[5],uploadWeightsInput.files[6],	uploadWeightsInput.files[7],uploadWeightsInput.files[8],uploadWeightsInput.files[9],uploadWeightsInput.files[10],uploadWeightsInput.files[11],uploadWeightsInput.files[12],uploadWeightsInput.files[13] ,uploadWeightsInput.files[14],uploadWeightsInput.files[15],uploadWeightsInput.files[16] ,uploadWeightsInput.files[17]
	  //,uploadWeightsInput.files[18],uploadWeightsInput.files[19]
	  //,uploadWeightsInput.files[20]
	  //,uploadWeightsInput.files[21],uploadWeightsInput.files[22],uploadWeightsInput.files[23],uploadWeightsInput.files[24],	uploadWeightsInput.files[25],uploadWeightsInput.files[26],uploadWeightsInput.files[27],uploadWeightsInput.files[28],uploadWeightsInput.files[29],uploadWeightsInput.files[30],uploadWeightsInput.files[31] ,uploadWeightsInput.files[32],uploadWeightsInput.files[33],uploadWeightsInput.files[34]   ,uploadWeightsInput.files[35]
	  //,uploadWeightsInput.files[36],uploadWeightsInput.files[37],uploadWeightsInput.files[38],uploadWeightsInput.files[39],uploadWeightsInput.files[40],uploadWeightsInput.files[41],uploadWeightsInput.files[42],	uploadWeightsInput.files[43],uploadWeightsInput.files[44],uploadWeightsInput.files[45],uploadWeightsInput.files[46],uploadWeightsInput.files[47],uploadWeightsInput.files[48],uploadWeightsInput.files[49] ,uploadWeightsInput.files[50],uploadWeightsInput.files[51]
//]));




    $(".progress-bar").hide();
}

$("#predict-button").click(async function () {
    let image = $("#selected-image").get(0);
    let modelName = $("#model-selector").val();
    let tensor = tf.fromPixels(image)
    .resizeNearestNeighbor([100,100])
    .expandDims();

    

    let predictions = await model.predict(tensor).data();
    let top2 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability: p,
                className: MALARIA_CLASSES[i]
            };
        }).sort(function (a, b) {
            return b.probability - a.probability;
        }).slice(0, 2);

    $("#prediction-list").empty();
    top2.forEach(function (p) {
        $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });
});
//function preprocessImage(image, modelName) {
//    let tensor = tf.fromPixels(image)
//        .resizeNearestNeighbor([224, 224])
//        .toFloat();
//
//    if (modelName === "Cancer") {
//        return tensor.expandDims();
//    }
//
//    else {
//        throw new Error("Unknown model name");
//    }
//}

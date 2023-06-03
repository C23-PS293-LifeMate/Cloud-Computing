// Import TensorFlow.js library
const tf = require ('@tensorflow/tfjs-node');

// Load the model
async function loadModel(body) {
  const model = await tf.loadLayersModel('file://bmiModel.json');
  if (body.gender === 'laki-laki'){
    body.gender = '1';
  }
  if (body.gender === 'perempuan'){
    body.gender = '0';
  }
  const valuesArray = Object.entries(body).map(([key, value]) => value);
  const bmiIndexs = [7, 1, 2];
  const bmiInput = bmiIndexs.map(index => array[index]);
  console.log(bmiInput);
}

// Call the loadModel function
module.exports = {
    loadModel
};

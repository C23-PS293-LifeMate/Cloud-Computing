// Import TensorFlow.js library
const tf = require ('@tensorflow/tfjs-node');
const bmiModels = require ('./bmiModel')

// Load the model
async function loadModel(body) {
  if (body.gender === 'laki-laki'){
    body.gender = '1';
  }
  if (body.gender === 'perempuan'){
    body.gender = '0';
  }
  const valuesArray = Object.entries(body).map(([key, value]) => value);
  const bmiIndexs = [7, 1, 2];
  const bmiInput = bmiIndexs.map(index => valuesArray[index]);
  const bmiOutput = bmiModels.bmiPredict(bmiInput)
  const stressOutput = 5 
  const predictOutput = {
    bmiOutput: bmiOutput,
    stressOutput: stressOutput
  }
  return predictOutput
}

// Call the loadModel function
module.exports = {
    loadModel
};

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
  const scaler = 
  {
    minValue : 569.27,
    maxValue : 754.196
  }
  const model = await tf.loadLayersModel('file://src/models/stressModel.json');
  const valuesArray = Object.entries(body).map(([key, value]) => value);
  const bmiIndexs = [7, 1, 2];
  const stressIndexs = [4, 5, 3, 6];
  const bmiInput = bmiIndexs.map(index => valuesArray[index]);
  var stressInputRaw = stressIndexs.map(index => valuesArray[index]);
  const stressInput = tf.tensor2d(stressInputRaw, [1,4], 'float32')
  const bmiOutput = bmiModels.bmiPredict(bmiInput)
  const stressOutput = await (11 - ((model.predict(stressInput).arraySync()[0][0] - scaler.minValue)/(scaler.maxValue - scaler.minValue) * 9 + 1).toFixed(2))
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

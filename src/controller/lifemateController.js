const lifemateService = require("../services/lifemateService");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const result = await lifemateService.register(req.body);
    res.json(result);
  } catch (err) {
    if(err.code == 23505){
      const message = { message: "Email Already Registered",}
      res.json(message)
    }
    else{
      res.json(err.detail);
    }
    }
}

async function login(req, res) {
  try {
    const result = await lifemateService.login(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function testProtected(req,res){
  try {
    const result = await lifemateService.testProtected(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getUserById(req,res){
  try {
    const result = await lifemateService.getUserById(req.params);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function insertRecord(req,res){
  try {
    const result = await lifemateService.insertRecord(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function deleteRecord(req,res){
  try {
    const result = await lifemateService.deleteRecord(req.params);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function getRecordById(req,res){
  try {
    const result = await lifemateService.getRecordById(req.params);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function changePassword(req, res) {
  try {
    const result = await lifemateService.changePassword(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

async function updateUser(req, res) {
  try {
    const result = await lifemateService.updateUser(req.body);
    res.json(result);
  } catch (err) {
    res.json(err.detail);
  }
}

module.exports = {
  register,
  login,
  testProtected,
  getUserById,
  insertRecord,
  deleteRecord,
  getRecordById,
  changePassword,
  updateUser,
};
const express = require("express");
const Stripe = require("stripe");
//initializing express and stripe 
const app = express();

let pay = document.getElementById("payment");

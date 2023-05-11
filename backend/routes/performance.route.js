const t0 = performance.now();
  // your code to handle the request goes here
const express = require("express");
const router = express.Router();

router.get("/performance/getPerformance", (req,res)=>{
    const t1 = performance.now();
    const responseTime = t1 - t0;
    res.status(201).json({message:responseTime});
});

module.exports = router;

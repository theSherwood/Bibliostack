const express = require("express");
const router = express.Router();
const passport = require("passport");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

// Load User Schema
const User = mongoose.model("users");

/*
  Ebay Site IDs and Abrreviations
  
    Site Name         | Global ID      | Site ID
    ----------------------------------------------
    United States     | EBAY-US        |  0
    Canada(english)   | EBAY-ENCA      |  2
    United Kingdom    | EBAY-GB        |  3
    Australia         | EBAY-AU        |  15
*/

const countriesSet = new Set("EBAY-US EBAY-ENCA EBAY-GB EBAU-AU".split(" "));

// Create a JavaScript array of the item filters you want to use in your request
function constructFilterArray(maxPrice, currency) {
  return [
    {
      name: "MaxPrice",
      value: maxPrice,
      paramName: "Currency",
      paramValue: currency
    },
    { name: "FreeShippingOnly", value: "true", paramName: "", paramValue: "" },
    {
      name: "ListingType",
      value: ["AuctionWithBIN", "FixedPrice"],
      paramName: "",
      paramValue: ""
    }
  ];
}

// @route     POST /api/books/book
// @desc      Search for book on ebay
// @access    Public
router.post("/book", (req, res) => {
  let { title, author, budget, results, country } = req.body;
  title = title.trim();
  author = author.trim();
  budget = budget.trim();
  results = results.trim();
  budget = !isNaN(parseFloat(budget)) && isFinite(budget) ? budget : "100000";
  results = !isNaN(parseInt(results)) && isFinite(budget) ? results : "3";
  country = countriesSet.has(country) ? country : "EBAY-US";
  let searchTerm = title + " " + author;
  if (!searchTerm.trim()) {
    return res.send([]);
  }

  const filterarray = constructFilterArray(budget, "USD");

  fetch("https://svcs.ebay.com/services/search/FindingService/v1", {
    method: "POST",
    headers: {
      "X-EBAY-SOA-OPERATION-NAME": "findItemsAdvanced",
      "X-EBAY-SOA-SECURITY-APPNAME": process.env.EBAY_ID,
      "X-EBAY-SOA-REQUEST-DATA-FORMAT": "JSON",
      "X-EBAY-SOA-GLOBAL-ID": country
    },
    body: JSON.stringify({
      findItemsAdvancedRequest: {
        categoryId: "267",
        paginationInput: { entriesPerPage: results },
        itemFilter: [{ name: "MaxPrice", value: budget }],
        keywords: title + " " + author
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      const results = data.findItemsAdvancedResponse[0].searchResult[0].item;
      return res.json(results);
    })
    .catch(err => console.log(err));
});

// @route     POST /api/books/bookstack
// @desc      Save books to database
// @access    Private
router.post(
  "/bookstack",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        user.bookstack = req.body.bookstack;
        user.save().then(() => res.json({ succes: "true" }));
      })
      .catch(err => res.send(err));
  }
);

// @route     GET /api/books/bookstack
// @desc      Get books from database
// @access    Private
router.get(
  "/bookstack",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        res.json(user.bookstack);
      })
      .catch(err => res.send(err));
  }
);

module.exports = router;

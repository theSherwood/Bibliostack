const express = require("express");
const router = express.Router();
const passport = require("passport");
const fetch = require("node-fetch");

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

// Generates an indexed URL snippet from the array of item filters
function buildURLArray(filterarray) {
  // Define global variable for the URL filter
  let urlfilter = "";
  // Iterate through each filter in the array
  for (var i = 0; i < filterarray.length; i++) {
    // Index each item filter in filterarray
    var itemfilter = filterarray[i];
    // Iterate through each parameter in each item filter
    for (var index in itemfilter) {
      // Check to see if the paramter has a value (some don't)
      if (itemfilter[index] !== "") {
        if (itemfilter[index] instanceof Array) {
          for (var r = 0; r < itemfilter[index].length; r++) {
            var value = itemfilter[index][r];
            urlfilter +=
              "&itemFilter(" + i + ")." + index + "(" + r + ")=" + value;
          }
        } else {
          urlfilter +=
            "&itemFilter(" + i + ")." + index + "=" + itemfilter[index];
        }
      }
    }
  }
  return urlfilter;
}

// Construct the request
function constructURL(urlfilter, searchTerm, siteLocationCode, numEntries) {
  let url = "https://svcs.ebay.com/services/search/FindingService/v1";
  url += "?OPERATION-NAME=findItemsByKeywords";
  url += "&SERVICE-VERSION=1.0.0";
  url += "&SECURITY-APPNAME=AdamSher-Booksear-PRD-38dd99240-7ddfbe7a";
  url += `&GLOBAL-ID=EBAY-${siteLocationCode}`;
  url += "&RESPONSE-DATA-FORMAT=JSON";
  url += "&REST-PAYLOAD";
  url += `&keywords=${searchTerm}`;
  url += `&paginationInput.entriesPerPage=${numEntries}`;
  url += urlfilter;

  return url;
}

// @route     POST /api/books/book
// @desc      Return books
// @access    Private
router.post(
  "/book",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { title } = req.body;
    title = encodeURIComponent(title);
    // console.log(title);

    const filterarray = constructFilterArray("5", "USD");
    const urlfilter = buildURLArray(filterarray);
    const url = constructURL(urlfilter, title, "US", "3");

    fetch(url)
      .then(ebayResponse => {
        return ebayResponse.text();
      })
      .then(text => {
        const parsedResponse = JSON.parse(text);
        const results =
          parsedResponse.findItemsByKeywordsResponse[0].searchResult[0].item;
        return res.json(results);
      });
  }
);

module.exports = router;

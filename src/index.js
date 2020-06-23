// data
import { retriever, createDataset } from "./data/dataTransformer.js";
import { $2019, $2019_searchTerms, $2019_splitQueries } from "./data/terms.js";

// d3 chart
import { chartA } from "./chart/chartA.js";

import '../dist/assets/styles/styles.scss';

// // to illustrate svg path mini-language
// // const illustration = svg.append("path")
//     // .attr("d", "M1, 5L20, 20L40, 10L60, 40L80, 5L100, 60")

// // stretch data values from 0 to the svg's width

// // const yScale = d3.scaleLinear().rangeRound([height, 0]);

document.addEventListener("DOMContentLoaded", function () {
  
  console.log("index.js content has loaded");
  
  //// console.log("search terms", searchTerms)

  const [$2019_querySubsets, $2019_queriesArray, $2019_termsArray] = $2019_splitQueries;

  const $2019_retrieverPromises = retriever($2019_querySubsets);
  
  // CALL DRAW CHART FUNCTION
  
  createDataset($2019_queriesArray, $2019_termsArray, $2019_retrieverPromises)
  .then((d) => {
      console.log("index.js dataset", d)
      d3.select("#container").datum(d).call(chartA())
  })

  // createDataset($2019_queriesArray, $2019_termsArray, $2019_retrieverPromises)
  // .then((d) => {
  //     console.log("dataset", d)
  //     d3.select("#container").datum(d).call(chartTemplate())
  // })


  
    

  // simple_example();
  // test_function();

});


  
  
//   // //----------------------------[interactive]POINTS------------------------------//

//   // lines.selectAll("points")
//   //   .data(function (d) { return d.values })
//   //   .enter()
//   //   .append("circle")
//   //   .attr("cx", function (d) { return xScale(d.date); })
//   //   .attr("cy", function (d) { return yScale(d.point); })
//   //   .attr("r", 1)
//   //   .attr("class", "point")
//   //   .style("opacity", 1);



// const test = require('./assets/test.csv')

document.addEventListener("DOMContentLoaded", function () {
    console.log("example.js content has loaded");

    const width = 960;
    const height = 500;
    const margin = 5;
    const padding = 5;
    const adj = 30;

    // we are appending SVG first
    const svg = d3.select("#container").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " -"
            + adj + " "
            + (width + adj * 3) + " "
            + (height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);

    //-----------------------------DATA------------------------------//

    const timeConv = d3.timeParse("%d-%b-%Y");
    // const timeConv = d3.timeParse("%B %-d, %Y");
    const dataset = d3.csv("./dist/assets/test.csv");
    // const dataset = d3.json("./dist/assets/vscoGirl.json");

    dataset.then(function (data) {
        console.log("data", data)
        const slices = data.columns.slice(1).map(function (id) {
            return {
                id: id,
                values: data.map(function (d) {
                    return {
                        date: timeConv(d.date),
                        measurement: +d[id]
                    };
                })
            };
        });


        //    console.log("Column headers", data.columns);
        //  console.log("Column headers without date", data.columns.slice(1));
        //    // returns the sliced dataset
        console.log("Slices", slices);
        //    // returns the first slice
        //    console.log("First slice",slices[0]);
        //    // returns the array in the first slice
        //    console.log("A array",slices[0].values);
        //    // returns the date of the first row in the first slice
        //    console.log("Date element",slices[0].values[0].date);
        //    // returns the array's length
        //    console.log("Array length",(slices[0].values).length);


        //----------------------------SCALES-----------------------------//

        // stretch data values from 0 to the svg's width
        const xScale = d3.scaleTime().range([0, width]);
        const yScale = d3.scaleLinear().rangeRound([height, 0]);

        xScale.domain(
            d3.extent(data, function (d) {
                return timeConv(d.date);
            })
        );

        yScale.domain([0,
            d3.max(slices, function (c) {
                return d3.max(c.values, function (d) {
                    return d.measurement + 4;
                });
            })
        ]);

        // const testx = d3.extent(data, function (d) {
        //   return timeConv(d.date);
        // });

        // const testy = d3.max(slices, function (c) {
        //   return d3.max(c.values, function (d) {
        //     return d.measurement + 4;
        //   });
        // });

        // console.log(testx, testy);
        console.log("xScale", xScale());


        //-----------------------------AXES------------------------------//

        const yaxis = d3.axisLeft().ticks(slices[0].values.length).scale(yScale);

        const xaxis = d3
            .axisBottom()
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%b %d"))
            .scale(xScale);

        //----------------------------LINES------------------------------//

        const line = d3.line()
            .x(function (d) { return xScale(d.date); })
            .y(function (d) { return yScale(d.measurement); });

        let id = 0;
        const ids = function () {
            return "line-" + id++;
        }


        //-------------------------2. DRAWING----------------------------//

        //-----------------------------AXES------------------------------//


        svg
            .append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xaxis);

        svg
            .append("g")
            .attr("class", "axis")
            .call(yaxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", "0.75em")
            .attr("y", 6)
            .style("text-anchor", "end")
            .text("Frequency");

        //----------------------------LINES------------------------------//

        const lines = svg.selectAll("lines")
            .data(slices)
            .enter()
            .append("g");

        lines.append("path")
            .attr("d", function (d) { return line(d.values); });


    });

});
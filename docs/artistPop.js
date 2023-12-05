var interact = interact || {};

interact.digDown2 = function() {
    console.log("Dig down 2")
}

interact.digUp2 = function() {
    console.log("Dig Up 2")
}

d3.csv("artistPop.csv").then(
    function(dataset){

        var dimensions = {
            width:  650,
            height: 400,
            margin: {
                top: 50,
                bottom: 50,
                right: 10,
                left: 50
            }
        }
        //console.log(dataset)

        //ensuring these vars are read as numbers
        dataset.forEach(d => {
            d.artist_id = +d.artist_id;
            d.total_artist_pop = +d.total_artist_pop;
        });

        var parseDate = d3.timeParse('%Y');

        // Parse the 'date' column as a date
        dataset.forEach(function(d) {
            d.year = parseDate(d.year);
        });

        var artistMaxPop = d3.rollup(
            dataset,
            v => d3.max(v, d => d.total_artist_pop),
            d => d.artist_id
        )

        var artistMaxPopArray = Array.from(artistMaxPop, ([artist_id, maxPop]) => ({ artist_id, maxPop }))

        var svg = d3.select("#ArtistPopularity")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleTime()
                       .domain(d3.extent(dataset, d => d.year))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yScale = d3.scaleLinear()
                       .domain([0, d3.max(artistMaxPopArray, d => d.maxPop)])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        var dataByDecade = d3.group(dataset, d => Math.floor(d.year/10) * 10);

        var colorScale = d3.scaleOrdinal()
                       .domain(Array.from(dataByDecade.keys()))
                       .range(["#e15759","#76b7b2","#59a14f","#edc949","#4e79a7","#f28e2c"]);
                       //#76b7b2 -> teal
                       //#59a14f -> green
                       //#edc949 -> yellow
                       //#f28e2c -> orange
                       //#4e79a7 -> blue
                       //#e15759 -> red

        let clicked = false;
        var tooltip = d3.select(".tooltip")


        const linearRegression = d3.regressionLinear()
            .x((d) => xScale(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year))
            .y((d) => yScale(d.maxPop));

        const regressionLine = linearRegression(artistMaxPopArray);

            // Define a line generator for the regression line
        const lineGenerator = d3.line()
              .x((d) => d[0])
              .y((d) => d[1]);

            // Draw the regression line
        svg.append("path")
              .datum(regressionLine)
              .attr("fill", "none")
              .attr("stroke", "black") // Adjust line color as needed
              .attr("stroke-width", 3) // Adjust line width as needed
              .attr("opacity", 0.5)
              .attr("d", lineGenerator);

        var dots = svg.selectAll("circle")
                      .data(artistMaxPopArray)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year))
                      .attr("cy", d => yScale(d.maxPop))
                      .attr("r", 5)
                      .style("cursor", "pointer")
                      .attr("fill", d => colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10))
                      .on("mouseover", function(event, d) {
                        if(!clicked)
                        {
                            var [mouseX, mouseY] = [event.pageX, event.pageY]

                            tooltip
                                .style("display", "block")
                                .html(`<strong>Artist:</strong> ${dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).artist}`)
                                .style("left", mouseX + 20 + "px")
                                .style("top", mouseY - 30 + "px")

                            tooltip.html(`<strong>Artist:</strong> ${dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).artist}<br><strong>Peak Year: </strong>${(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10}`)
                                .style("left", (event.pageX + 5) + "px")
                                .style("top", (event.pageY - 28) + "px");

                            d3.select(this)
                                .raise()
                                .transition().duration(100)
                                .attr("fill", d => d3.color(colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10)).darker(2))
                                .attr("r", d => 7)
                        }
                      })
                      .on("mouseout", function() {
                        tooltip.style("display", "none");
                        d3.select(this)
                        .transition().duration(100)
                        .attr("fill", d => colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10))
                        .attr("r", 5)
                      })
                      .on("click", function(event, d) {
                        interact.digDown1((Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10).toString().slice(-2), colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10))
                        console.log((Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10).toString().slice(-2))
                        console.log(colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10))
                      })

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)

        var xLabel = svg.append("g")
                        .append("text")
                        .text("Year")
                        .attr("x", (dimensions.width - dimensions.margin.right - dimensions.margin.left)/2 + dimensions.margin.left)
                        .attr("y", dimensions.height - dimensions.margin.bottom/6)
                        .attr("fill", "dimgray")
                        .style("font-size", "14px")
                        .style("font-family", "Poppins")
                        .attr("text-anchor", "middle")

        var yLabel = svg.append("g")
                        .append("text")
                        .text("Total Popularity Score")
                        .attr("transform", "rotate(-90)")
                        .attr("y", dimensions.height/50 + 8)
                        .attr("x", -dimensions.height/2)
                        .attr("fill", "dimgray")
                        .style("font-size", "14px")
                        .style("font-family", "Poppins")
                        .attr("text-anchor", "middle")

        var title = svg.append("g")
                        .append("text")
                        .text("Top Artists' Peak Popularity Throughout Time")
                        .attr("x", dimensions.margin.left/2 - 5)
                        .attr("y", dimensions.margin.top/2 + 5)
                        .attr("fill", "dimgray")
                        .style("font-size", "22px")
                        .style("font-family", "Poppins")
                        .style("font-weight", "bold")
    }
)


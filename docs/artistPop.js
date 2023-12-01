d3.csv("artistPop.csv").then(
    function(dataset){

        var dimensions = {
            width:  1000,
            height: 700,
            margin: {
                top: 10,
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
                       .range(["yellow", "green", "blue", "purple", "red", "orange"]);

        // var tooltip = d3.select("#ArtistPopularity").append("div")
        //                 .attr("class", "tooltip")
        //                 .style("opacity", 0);
        // function getName(artist_id) {
        //     var selectedData = dataset.find(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).artist)
        //     return selectedData
        // }

        let clicked = false;
        var tooltip = d3.select(".tooltip")

        var dots = svg.selectAll("circle")
                      .data(artistMaxPopArray)
                      .enter()
                      .append("circle")
                      .attr("cx", d => xScale(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year))
                      .attr("cy", d => yScale(d.maxPop))
                      .attr("r", 5)
                      .attr("fill", d => colorScale(Math.floor(dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).year.getFullYear() / 10) * 10))
                      .attr("stroke", "black")
                      .attr("stroke-width", 1)
                      .on("mouseover", function(event, d) {
                        if(!clicked)
                        {
                            var [mouseX, mouseY] = [event.pageX, event.pageY]

                            tooltip
                                .style("display", "block")
                                .html(`<strong>Artist:</strong> ${dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).artist}`)
                                .style("left", mouseX + 20 + "px")
                                .style("top", mouseY - 30 + "px")

                            tooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            tooltip.html(`Artist: ${dataset.find(e => e.artist_id === d.artist_id && e.total_artist_pop === d.maxPop).artist}<br>Popularity: ${d.maxPop}`)
                                .style("left", (event.pageX + 5) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        }
                      })
                      .on("mouseout", function() {
                        tooltip.transition()
                               .duration(500)
                               .style("opacity", 0);
                      })
        
        // var line = d3.line()
        //              .x(function(d) {return xScale(d.year)})
        //              .y(function(d) {return yScale(d.total_artist_pop)});
                 
        // var color = d3.scaleOrdinal(d3.schemeCategory10);

        // function getName(artist_id) {
        //     var selectedData = dataset.find(d => d.artist_id === artist_id)
        //     return selectedData.artist
        // }

        // let clicked = false;
        // var tooltip = d3.select(".tooltip")

        // var lines = svg.append("g")
        //                .selectAll('.line')
        //                .data(groupedData)
        //                .enter()
        //                .append('path')
        //             .on('mouseover', function(event, d) {
        //                 if(!clicked) {

        //                 selectedArtist = d[0]

        //                 var [mouseX, mouseY] = [event.pageX, event.pageY]

        //                 tooltip
        //                     .style("display", "block")
        //                     .html(`<strong>Artist:</strong> ${getName(d[0])}`)
        //                     .style("left", mouseX + 20 + "px")
        //                     .style("top", mouseY - 30 + "px")

        //                 d3.selectAll('.line')
        //                 .transition().duration(100)
        //                 .attr('opacity', 0.1);

        //                 d3.select(this)
        //                 .raise()
        //                 .transition().duration(100)
        //                 .attr('opacity', 1)
        //                 .attr('stroke-width', 4);
        //                 }
        //             })
        //             .on('mouseout', function(event, d) {
        //                 if(!clicked) {
        //                 tooltip.style("display", "none");

        //                 d3.selectAll('.line')
        //                 .transition().duration(100)
        //                 .attr('stroke-width', 2)
        //                 .attr('opacity', 1);
        //                 }
        //             })
        //             .on('click', function(event, d) {
        //                 clicked = true;
        //                 //selectedArtist = d[0];
                        
        //                 d3.selectAll('.line')
        //                 .transition().duration(100)
        //                 .attr('opacity', 0.1);
                    
        //                 d3.select(this)
        //                 .raise()
        //                 .transition().duration(100)
        //                 .attr('opacity', 1)
        //                 .attr('stroke-width', 4);
                    
        //                 //showArtistName(d[0]);
        //             })
        //                .attr('class', 'line')
        //                .attr('d', d => line(d[1]))
        //                .attr('stroke', (_, i) => color(i))
        //                .attr('stroke-width', 2)
        //                .attr('fill', 'none')
        //                .attr('opacity', 1)


        // svg.on('click', function(event, d){
        //     if(!(lines.nodes().includes(event.target))) {
        //         clicked = false;
        //         tooltip.style("display", "none");
        //         d3.selectAll('.line')
        //         .transition().duration(100)
        //         .attr('stroke-width', 2)
        //         .attr('opacity', 1);

        //     }
        // })

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
                        .attr("y", dimensions.height/50)
                        .attr("x", -dimensions.height/2)
                        .attr("fill", "dimgray")
                        .style("font-size", "14px")
                        .style("font-family", "Poppins")
                        .attr("text-anchor", "middle")
    }
)

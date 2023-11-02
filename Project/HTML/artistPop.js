d3.csv("artistPop.csv").then(
    function(dataset){

        var dimensions = {
            width:  2000,
            height: 700,
            margin: {
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }
        console.log(dataset)

        xAccessor = d => +d.year
        yAccessor = d => +d.pop_score_y

        var svg = d3.select("#ArtistPopularity")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain(d3.extent(dataset, xAccessor))
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yScale = d3.scaleLinear()
                       .domain([0, d3.max(dataset, yAccessor)])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        var line = d3.line()
                     .x(d => xScale(xAccessor(d)))
                     .y(d => yScale(yAccessor(d)));
    
        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    
        var artists = Array.from(d3.group(dataset, d => d.artist_id).values());
    
        svg.selectAll(".line")
           .data(artists)
           .enter()
           .append("path")
           .attr("class", "line")
           .attr("d", d => line(Array.from(d[1])))
           .style("stroke", (d, i) => colorScale(i))
           .style("stroke-width", 2)
           .style("fill", "none");

        // var line = d3.line()
        //              .x(d => xScale(+d.year))
        //              .y(d => yScale(+d.pop_score_y));

        // // var lines = svg.append("path")
        // //                .datum(dataset)
        // //                .attr("fill", "none")
        // //                .attr("stroke", "steelblue") // Adjust the color as needed.
        // //                .attr("stroke-width", 2)
        // //                .attr("d", line);

        // var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // var lines = svg.selectAll(".line")
        //                .data(dataset)
        //                .enter()
        //                .append("path")
        //                .attr("class", "line")
        //                .attr("d", d => line(+d.line))
        //                .style("stroke", d => colorScale(d.artist_id))
        //                .style("stroke-width", 2)
        //                .style("fill", "none");

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                       .selectAll("text")
                       .style("text-anchor", "end")
                       .style("transform", "rotate(-65deg)")

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                       .call(yAxisGen)
                       .style("transform", `translateX(${dimensions.margin.left}px)`)
                       
    }
)
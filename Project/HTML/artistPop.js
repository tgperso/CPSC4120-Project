d3.csv("artistPop.csv").then(
    function(dataset){

        var dimensions = {
            width:  1400,
            height: 700,
            margin: {
                top: 10,
                bottom: 50,
                right: 10,
                left: 50
            }
        }
        console.log(dataset)

        dataset.forEach(d => {
            d.artist_id = +d.artist_id;
            d.pop_score_y = +d.pop_score_y;
            d.year = +d.year;
        });

        var svg = d3.select("#ArtistPopularity")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain([d3.min(dataset, d => d.year), d3.max(dataset, d => d.year)])
                       .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])

        var yScale = d3.scaleLinear()
                       .domain([0, d3.max(dataset, d => d.pop_score_y)])
                       .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        var line = d3.line()
                     .x(d => xScale(d.year))
                     .y(d => yScale(d.pop_score_y));

        var groupedData = d3.groups(dataset, d => d.artist_id);
                 
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var lines = svg.append("g")
                       .selectAll('.line')
                       .data(groupedData)
                       .enter()
                       .append('path')
                       .attr('class', 'line')
                       .attr('d', d => line(d[1]))
                       .attr('stroke', (_, i) => color(i))
                       .attr('stroke-width', 2)
                       .attr('fill', 'none');

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
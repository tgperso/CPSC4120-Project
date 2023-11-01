d3.csv("topArtists.csv").then(
    function(init_data) {

        var era = '60'
        new_data = filterData(era, init_data)
        console.log("Filtered Data:", new_data);
        updateSVG(new_data)
        d3.select("#button60").style("background-color", "lightgray")


        d3.select("#button60")
            .on("click", function() {
                if(era != '60') {
                    era = '60'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button70").style("background-color", "white")
                    d3.select("#button80").style("background-color", "white")
                    d3.select("#button90").style("background-color", "white")
                    d3.select("#button00").style("background-color", "white")
                    d3.select("#button10").style("background-color", "white")
                }
            }
        )

        d3.select("#button60")
            .on("mouseover", function(){
                d3.select("#button60").style("background-color", "#007BFF")
            })

        d3.select("#button60")
            .on("mouseout", function(){
                if(era == '60') {
                    d3.select("#button60").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button60").style("background-color", "white")
                }
            })

        d3.select("#button70")
            .on("click", function() {
                if(era != '70') {
                    era = '70'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button60").style("background-color", "white")
                    d3.select("#button80").style("background-color", "white")
                    d3.select("#button90").style("background-color", "white")
                    d3.select("#button00").style("background-color", "white")
                    d3.select("#button10").style("background-color", "white")
                }
            }
        )

        d3.select("#button70")
            .on("mouseover", function(){
                d3.select("#button70").style("background-color", "#007BFF")
        })

        d3.select("#button70")
            .on("mouseout", function(){
                if(era == '70') {
                    d3.select("#button70").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button70").style("background-color", "white")
                }
        })

        d3.select("#button80")
            .on("click", function() {
                if(era != '80') {
                    era = '80'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button70").style("background-color", "white")
                    d3.select("#button60").style("background-color", "white")
                    d3.select("#button90").style("background-color", "white")
                    d3.select("#button00").style("background-color", "white")
                    d3.select("#button10").style("background-color", "white")
                }
            }
        )

        d3.select("#button80")
            .on("mouseover", function(){
                d3.select("#button80").style("background-color", "#007BFF")
        })

        d3.select("#button80")
            .on("mouseout", function(){
                if(era == '80') {
                    d3.select("#button80").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button80").style("background-color", "white")
                }
        })

        d3.select("#button90")
            .on("click", function() {
                if(era != '90') {
                    era = '90'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button70").style("background-color", "white")
                    d3.select("#button80").style("background-color", "white")
                    d3.select("#button60").style("background-color", "white")
                    d3.select("#button00").style("background-color", "white")
                    d3.select("#button10").style("background-color", "white")
                }
            }
        )

        d3.select("#button90")
            .on("mouseover", function(){
                d3.select("#button90").style("background-color", "#007BFF")
        })

        d3.select("#button90")
            .on("mouseout", function(){
                if(era == '90') {
                    d3.select("#button90").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button90").style("background-color", "white")
                }
        })

        d3.select("#button00")
            .on("click", function() {
                if(era != '00') {
                    era = '00'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button70").style("background-color", "white")
                    d3.select("#button80").style("background-color", "white")
                    d3.select("#button90").style("background-color", "white")
                    d3.select("#button60").style("background-color", "white")
                    d3.select("#button10").style("background-color", "white")
                }
            }
        )

        d3.select("#button00")
            .on("mouseover", function(){
                d3.select("#button00").style("background-color", "#007BFF")
        })

        d3.select("#button00")
            .on("mouseout", function(){
                if(era == '00') {
                    d3.select("#button00").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button00").style("background-color", "white")
                }
        })

        d3.select("#button10")
            .on("click", function() {
                if(era != '10') {
                    era = '10'
                    new_data = filterData(era, init_data)
                    console.log("Filtered Data:", new_data);
                    updateSVG(new_data)
                    d3.select("#button70").style("background-color", "white")
                    d3.select("#button80").style("background-color", "white")
                    d3.select("#button90").style("background-color", "white")
                    d3.select("#button00").style("background-color", "white")
                    d3.select("#button60").style("background-color", "white")
                }
            }
        )

        d3.select("#button10")
            .on("mouseover", function(){
                d3.select("#button10").style("background-color", "#007BFF")
        })

        d3.select("#button10")
            .on("mouseout", function(){
                if(era == '10') {
                    d3.select("#button10").style("background-color", "lightgray")
                }
                else {
                    d3.select("#button10").style("background-color", "white")
                }
        })

        function filterData(era, data) {
            data = data.filter(function(item) {
                return item.era === era
            })
            return data
        }      
    }
)
function updateSVG(data) {

        var dim = {
            width: 1000,
            height: 800
        }

        var margin = {
            left: dim.width/5,
            right: dim.width/10,
            top: dim.height/10,
            bottom: dim.height/8
        }

        var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffd92f","#b15928"].reverse()
        
        var pop = d => parseFloat(d.total_track_pop)

        data.sort((a, b) => a.total_artist_pop - b.total_artist_pop)
        var artists = [...new Set(data.map(d => d.artist))]

        var svg = d3.select('#TopArtists')
                    .style("width", dim.width)
                    .style("height", dim.height)

        // Remove old lines
        svg.selectAll("line").remove();

        // Remove old circles
        svg.selectAll("circle")
            .transition().duration(1200).attr("r", 0)
            .remove();

        // Remove old text
        svg.selectAll("text")
            .transition().duration(500).style("opacity", 0)
            .remove();

        // Remove old xAxis
        svg.select(".x-axis").remove();

        var xScale = d3.scaleLinear()
                    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([1,600])
                    .range([margin.left,dim.width - margin.right])

        var yScale = d3.scaleBand()
                    .domain(artists)
                    .range([dim.height - margin.bottom, margin.top])

        var radScale = d3.scaleLinear()
                    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([1,600])
                    .range([dim.height/200,dim.height/70])

        var colorScale = d3.scaleOrdinal()
                    .domain(artists)
                    .range(colors)

        
        data.forEach(function(d) {
            d.x = xScale(d.total_track_pop); // Set the x position based on the data
            d.y = yScale(d.artist); // Set the y position based on the data
        });

        var simulation = d3.forceSimulation(data)
                    .force('pop', d3.forceX(d => xScale(d.total_track_pop)))
                    .force('artist', d3.forceY(d => yScale(d.artist)))
                    .force('collision', d3.forceCollide(d => radius(d)))
                    .on('tick', ticked)

        var horizLines = svg.append("g")
                .selectAll("line")
                .data(artists)
                .enter()
                .append("line")
                .attr("x1", margin.left - 5)
                .attr("y1", d => yScale(d))
                .attr("x2", dim.width - margin.right - 10)
                .attr("y2", d => yScale(d))
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("opacity", 0.1)

        var tooltip = d3.select(".tooltip")
        
        var nodes = svg.append("g")
               .selectAll("circle")
               .data(data).enter()
               .append("circle")
               .on("mouseover", function(event, d){
                    var [mouseX, mouseY] = [event.pageX, event.pageY]

                    tooltip
                    .style("display", "block")
                    .html(`<strong>Title:</strong> ${d.title}`)
                    .style("left", mouseX + 20 + "px")
                    .style("top", mouseY - 30 + "px")

                    d3.select(this)
                    .raise()
                    .transition().duration(100)
                    .attr("fill", d => d3.color(colorScale(d.artist)).darker(2))
                    .attr("r", d => radius(d)+2)
                })
                .on("mouseout", function(){
                    tooltip.style("display", "none");

                    d3.select(this)
                    .transition().duration(100)
                    .attr("fill", d => colorScale(d.artist))
                    .attr("r", d => radius(d))
                })
               .attr("cx", d => d.x)
               .attr("cy", d => d.y)
               .attr("fill", d => colorScale(d.artist))
               .attr("r", 0)
               .transition().duration(500)
               .attr("r", d => radius(d))

        var text = svg.append("g")
                .selectAll("text")
                .data(artists)
                .enter()
                .append("text")
                .text(d => d)
                .attr("x", margin.left - 15)
                .attr("y", d => yScale(d))
                .attr("text-anchor", "end")
                .attr("fill", "dimgray")
                .style("font-size", "14px")
                .style("font-family", "Poppins")
                .style("opacity", 0)
                .transition()
                .duration(500)
                .text(d => d)
                .attr("x", margin.left - 15)
                .attr("y", d => yScale(d))
                .attr("text-anchor", "end")
                .attr("fill", "dimgray")
                .style("font-size", "14px")
                .style("font-family", "Poppins")
                .style("opacity", 1)

        var xLabel = svg.append("g")
                .append("text")
                .text("Song Popularity Score")
                .attr("x", (dim.width - margin.right - margin.left)/2 + margin.left)
                .attr("y", dim.height - margin.bottom/3)
                .attr("fill", "dimgray")
                .style("font-size", "14px")
                .style("font-family", "Poppins")
                .attr("text-anchor", "middle")

        var vertLine = svg.append("g")
                .append("line")
                .attr("x1", margin.left - 5)
                .attr("y1", dim.height - margin.bottom)
                .attr("x2", margin.left - 5)
                .attr("y2", margin.top/2)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("opacity", 0.5)

        var horizLineBottom = svg.append("g")
                .append("line")
                .attr("x1", margin.left - 5)
                .attr("y1", dim.height - margin.bottom)
                .attr("x2", dim.width - margin.right + 5)
                .attr("y2", dim.height - margin.bottom)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("opacity", 0.5)

        function radius(d) {
            return radScale(d.total_track_pop)
        }

        var xAxisGen = d3.axisBottom().scale(xScale)

        var xAxis = svg.append("g")
                .call(xAxisGen)
                .style("transform", `translateY(${dim.height-margin.bottom}px)`)
                .style("opacity", 0.4)
                .attr("class", "x-axis")
                .selectAll(".tick text").style("font-size", "14px")

        function ticked() {
            svg.selectAll("circle")
            .attr("cx", function(d) {return d.x = Math.max(radius(d) + margin.left, Math.min(dim.width - radius(d) - margin.right, d.x))})
            .attr("cy", function(d) {return d.y = Math.max(radius(d), Math.min(dim.height - radius(d), d.y))})
        }

        ticked()
        
}
d3.csv("topArtists.csv").then(
    function(init_data) {
        updateSVG(init_data)
    }
)

function updateSVG(data) {
    var dim = {
        width: 1000,
        height: 800
    }

    var margin = {
        left: dim.width/10,
        right: dim.width/10,
        top: dim.height/10,
        bottom: dim.height/10
    }

    //var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffd92f","#b15928"]
    var colors = ["red", "orange", "yellow", "green", "blue", "purple"]

    //ensures the popularity var is read as a float
    var pop = d => parseFloat(d.total_track_pop);

    var eras = [...new Set(data.map(d => d.era))];

    //create SVG
    var svg = d3.select('#SongsByDecade')
            .style("width", dim.width)
            .style("height", dim.height);

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

    var yScale = d3.scaleLinear()
    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([1,600])
                    .range([dim.height - margin.bottom,margin.top])

    var xScale = d3.scaleBand()
                    .domain(eras)
                    .range([margin.left, dim.width - margin.right])

    var colorScale = d3.scaleOrdinal()
                    .domain(eras)
                    .range(colors)

    var radScale = d3.scaleLinear()
                    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([1,600])
                    .range([dim.height/700,dim.height/100]);

    data.forEach(function(d) {
        d.x = xScale(d.era); // Set the x position based on the data
        d.y = yScale(d.total_track_pop); // Set the y position based on the data
    });


    var simulation = d3.forceSimulation(data)
        .force('pop', d3.forceY(dim.height/2 + margin.top - margin.bottom).strength(0.01))
        //.force('pop', d3.forceY(d => yScale(d.total_track_pop)))
        .force('era', d3.forceX((d => xScale(d.era) + (dim.width + margin.left - margin.right)/15)).strength(0.5))
        .force('collision', d3.forceCollide(d => radius(d) + 0.5))
        .on('tick', ticked)

    simulation.alpha(1).alphaDecay(0.08);

    var nodes = svg.append("g")
        .selectAll("circle")
        .data(data).enter()
        .append("circle")
        /*.on("mouseover", function(event, d){
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
         })*/
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", d => colorScale(d.era))
        .attr("r", 0)
        .transition().duration(500)
        .attr("r", d => radius(d));

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    function ticked() {
        svg.selectAll("circle")
        .attr("cx", function(d) {return d.x = Math.max(radius(d) + margin.left, Math.min(dim.width - radius(d) - margin.right, d.x))})
        .attr("cy", function(d) {return d.y = Math.max(radius(d) + margin.top/2 + 5, Math.min(dim.height - radius(d) - margin.bottom, d.y))})
    }

    ticked()
}
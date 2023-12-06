var width = 700
var height = 375


d3.csv("topArtists.csv").then(
    function(data) {   
        updateSVGBubbles(data)  
    }
)

function updateSVGBubbles(data) {
    var colors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]

    var eras = [...new Set(data.map(d => d.era))];
    
    var colorScale = d3.scaleOrdinal()
        .domain(eras)
        .range(colors)

    var top_tracks = function(d, n) {
        data.sort(function(a, b) {
            return b['total_track_pop'] - a['total_track_pop'];
        })
        return data.slice(0, n);
    }

    var top_tracks_200 = top_tracks(data, 200);
    var top_tracks_max = top_tracks_200[0]['total_track_pop']; 
    var top_tracks_min = top_tracks_200[199]['total_track_pop'];

    var radScale = d3.scaleLinear()
        .domain([top_tracks_min, top_tracks_max])
        .range([6,height/15]);

    var svg = d3.select("#bubble-graph")
        .style("width", width)
        .style("height", height)

    var title = svg.append("g")
        .append("text")
        .attr("x", 22)
        .attr("y", 30)
        .attr("fill", "dimgray")
        .style("font-size", "22px")
        .style("font-family", "Poppins")
        .style("font-weight", "bold")
        .style("margin-bottom", "30px")
        .text("Top 200 Tracks by All-Time Popularity")

    const tooltip = d3.select(".tooltip")

    var node = svg.append("g")
        .selectAll("circle")
        .data(top_tracks_200)
        .enter()
        .append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", d => d3.color(colorScale(d.era)))
            .attr("r", d => radScale(d.total_track_pop))
            .on("mouseover", function(event, d) {
                const [mouseX, mouseY] = [event.pageX, event.pageY];
            
                tooltip
                .style("display", "block")
                .html(`<strong>Track:</strong> ${d.title} <br><strong>Artist:</strong> ${d.artist}<br><strong>Popularity:</strong> ${parseInt(d.total_track_pop)}`)
                .style("left", mouseX + 20 + "px")
                .style("top", mouseY - 30 + "px");
                
                d3.select(this)
                .attr("r", d => radScale(d.total_track_pop)+4)
                .style("transition", "all 0.1s ease")
                .attr("fill", d => d3.color(colorScale(d.era)).darker(2))
                .raise()
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                d3.select(this)
                    .attr("r", d => radScale(d.total_track_pop))
                    .style("transition", "all 0.1s ease")
                    .attr("fill", d => d3.color(colorScale(d.era)))
            })

    var simulation = d3.forceSimulation(top_tracks_200)

    simulation
        .force("center", d3.forceCenter().x(width / 2).y(height / 2 + 20).strength(0.9))
        .force("charge", d3.forceManyBody().strength(0.9))
        .force("collide", d3.forceCollide().strength(0.6)
        .radius(function(d){ return radScale(d.total_track_pop)+0.5; })
        .iterations(1))
        .on("tick", function(d){
            node
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
        })
}

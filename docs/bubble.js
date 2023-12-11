var interact = interact || {};

d3.csv("topArtists.csv").then(
    function(data) {
        updateSVGBubbles(data)
    }
)

interact.digDown3 = function(era, color) {
    d3.csv("topArtists.csv").then(
        function(init_data) {
            updateSVGBubblesDecade(init_data, era, color)
        }
    )
}

interact.digUp3 = function() {
    d3.csv("topArtists.csv").then(
        function(init_data) {
            updateSVGBubbles(init_data)
        }
    )
}

var width = 700
var height = 375
var colorBool = false;

function updateSVGBubbles(data) {
    var simDone = false

    var margin = {
        left: width/10,
        right: width/10,
        top: height/10,
        bottom: height/10
    }

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

    var customOrder = ["60", "70", "80", "90", "00", "10"];

    // Create a custom sorting function
    function customSort(a, b) {
        return customOrder.indexOf(a.era) - customOrder.indexOf(b.era);
    }
    
    // Sort the dataset using the custom sorting function
    top_tracks_200.sort(customSort);

    var radScale = d3.scaleLinear()
        .domain([top_tracks_min, top_tracks_max])
        .range([6,height/15]);

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    var svg = d3.select("#bubble-graph")
        .style("width", width)
        .style("height", height)

    svg.selectAll("circle")
        .transition().duration(50).attr("r", 0)
        .remove();

    // Remove old text
    svg.selectAll("text")
        .transition().duration(150).style("opacity", 0)
        .remove();

    svg.selectAll("rect")
        .transition().duration(150).style("opacity", 0)
        .remove();

    var title = svg.append("g")
        .append("text")
        .attr("x", 45)
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
            .style("cursor", "pointer")
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
            .on("click", function(event, d){
                if(simDone){ updateSVGBubblesDecade(data, d.era, colorScale(d.era));
                interact.digDown1(d.era, colorScale(d.era));}
            })

    top_tracks_200.forEach(function(d) {
                d.x = width/2; // Set the x position based on the data
                d.y = height/2; // Set the y position based on the data
    });

    var simulation = d3.forceSimulation(top_tracks_200)

    simulation
        .force("center", d3.forceCenter().x(width / 2).y(height / 2 + 20))
        //.force("charge", d3.forceManyBody().strength(-30))
        .force("collide", d3.forceCollide(d => radius(d)).strength(0.7))
        .alpha(1).alphaDecay(0.05)
        .on("tick", ticked)
        .on("end", function() {
            simDone = true
        })

    function ticked() {
            node
                .attr("cx", function(d) {
                    return d.x = Math.max(radius(d) + margin.left, Math.min(width - radius(d) - margin.right, d.x));
                })
                .attr("cy", function(d) {
                    return d.y = Math.max(radius(d) + margin.top, Math.min(height - radius(d) - margin.bottom, d.y));
                });
    }
        
    ticked()
}

function updateSVGBubblesDecade(init_data, era, color) {
    var simDone = false

    var margin = {
        left: width/10,
        right: width/10,
        top: height/10,
        bottom: height/10
    }

    var data = filterData(era, init_data)

    var colors = ["#edc949","#4e79a7","#e15759","#76b7b2","#59a14f","#f28e2c","#af7aa1","#ff9da7","#9c755f","#bab0ab"]
    //var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffd92f","#b15928"].reverse()

    data.sort((a, b) => a.total_artist_pop - b.total_artist_pop)
    var artists = [...new Set(data.map(d => d.artist))]

    var top_tracks = function(d, n) {
        data.sort(function(a, b) {
            return b['total_track_pop'] - a['total_track_pop'];
        })
        return data.slice(0, n);
    }

    var top_tracks_100 = top_tracks(data, 100);
    var top_tracks_max = top_tracks_100[0]['total_track_pop']; 
    var top_tracks_min = top_tracks_100[99]['total_track_pop'];

    var svg = d3.select("#bubble-graph")
        .style("width", width)
        .style("height", height)

    svg.selectAll("circle")
        .transition().duration(50).attr("r", 0)
        .remove();

    // Remove old text
    svg.selectAll("text")
        .transition().duration(150).style("opacity", 0)
        .remove();

    svg.selectAll("rect")
        .transition().duration(150).style("opacity", 0)
        .remove();

    var colorScale = d3.scaleOrdinal()
        .domain(artists)
        .range(colors)

    var radScale = d3.scaleLinear()
        .domain([top_tracks_min, top_tracks_max])
        .range([6,height/15]);

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    var title = svg.append("g")
        .append("text")
        .attr("x", 45)
        .attr("y", 30)
        .attr("fill", "dimgray")
        .style("font-size", "22px")
        .style("font-family", "Poppins")
        .style("font-weight", "bold")
        .style("margin-bottom", "30px")
        .text("Top 100 Tracks by Popularity of the " + getDecadeDate(era))

    const tooltip = d3.select(".tooltip")

    top_tracks_100.forEach(function(d) {
        d.x = width/2; // Set the x position based on the data
        d.y = height/2; // Set the y position based on the data
    });

    var node = svg.append("g")
        .selectAll("circle")
        .data(top_tracks_100)
        .enter()
        .append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("fill", d => getColor(d))
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
                .attr("fill", d => d3.color(getColor(d)).darker(2))
                .raise()
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                d3.select(this)
                    .attr("r", d => radScale(d.total_track_pop))
                    .style("transition", "all 0.1s ease")
                    .attr("fill", d => d3.color(getColor(d)))
            })

    function getColor(d) {
        var index = 0;
        for(var i = 0; i < artists.length; i++) {
            if(d.artist === artists[i]) index = i;
        }
        if(index % 2 === 0) return color;
        else return d3.color(color).darker(0.5)
    }

    function getDecadeDate(era){
        if(era == '00' || era == '10') return '20' + era + "'s";
        else return '19' + era + "'s";}

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    var simulation = d3.forceSimulation(top_tracks_100)
    .force("center", d3.forceCenter().x(width / 2).y(height / 2))
    //.force("charge", d3.forceManyBody().strength(1))
    .force("collide", d3.forceCollide(d => radius(d)).strength(0.7))
    .alpha(1).alphaDecay(0.05)
    .on("tick", ticked)
    .on("end", function() {
        simDone = true;
        colorBool = true;})

    var backButton = svg.append("g")
            .attr("transform", "translate(10, 10)")
            .style("cursor", "pointer") // Add a pointer cursor to indicate it's clickable
            .on("click", function() {
                if(simDone) {
                    interact.digUp1();
                    interact.digUp3(); 
                }
            });
          
    backButton.append("rect")
            .attr("width", 30)
            .attr("height", 30)
            .attr("fill", "#ccc");
          
    backButton.append("text")
            .text("<<")
            .attr("x", 15)
            .style("font-family", "Poppins")
            .attr("y", 22)
            .attr("text-anchor", "middle")
            .attr("fill", "dimgray");


    function ticked() {
            node
                .attr("cx", function(d) {
                    return d.x = Math.max(radius(d) + margin.left, Math.min(width - radius(d) - margin.right, d.x));
                })
                .attr("cy", function(d) {
                    return d.y = Math.max(radius(d) + margin.top + 5, Math.min(height - radius(d) - margin.bottom, d.y));
                });
        }
        
    ticked()
}


function filterData(era, data) {
    data = data.filter(function(item) {
        return item.era === era
    })
    return data
} 

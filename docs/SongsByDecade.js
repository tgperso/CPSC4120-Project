var interact = interact || {};

d3.csv("topArtists.csv").then(
    function(init_data) {
        updateSVG(init_data)
    }
)

interact.digDown1 = function(era, color) {
    d3.csv("topArtists.csv").then(
        function(init_data) {
            updateSVGDecade(init_data, era, color)
        }
    )
}

interact.digUp1 = function() {
    console.log("Dig Up 1")
}

function updateSVG(data) {
    var dim = {
        width: 600,
        height: 700
    }

    var margin = {
        left: dim.width/10,
        right: dim.width/10,
        top: dim.height/10,
        bottom: dim.height/10
    }

    var simDone = false

    //var colors = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffd92f","#b15928"]
    var colors = ["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]

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
            .transition().duration(50).attr("r", 0)
            .remove();

    // Remove old text
    svg.selectAll("text")
            .transition().duration(150).style("opacity", 0)
            .remove();

    // Remove old xAxis
    svg.select(".x-axis").remove();

    // Remove old xAxis
    svg.selectAll("rect").remove();

    var yScale = d3.scaleLinear()
    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([0,600])
                    .range([dim.height - margin.bottom,margin.top - 5])

    var xScale = d3.scaleBand()
                    .domain(eras)
                    .range([margin.left, dim.width - margin.right])

    var colorScale = d3.scaleOrdinal()
                    .domain(eras)
                    .range(colors)

    var radScale = d3.scaleLinear()
                    //.domain([d3.min(data, pop),d3.max(data, pop)])
                    .domain([1,600])
                    .range([dim.height/500,dim.height/100]);

    data.forEach(function(d) {
        d.x = xScale(d.era); // Set the x position based on the data
        d.y = yScale(d.total_track_pop); // Set the y position based on the data
    });


    var simulation = d3.forceSimulation(data)
        .force('pop', d3.forceY(dim.height/2 + margin.top - margin.bottom).strength(0.01))
        //.force('pop', d3.forceY(d => yScale(d.total_track_pop)))
        .force('era', d3.forceX((d => xScale(d.era) + (dim.width + margin.left - margin.right)/15)).strength(0.5))
        .force('collision', d3.forceCollide(d => radius(d) + 0.5))
        .alpha(1).alphaDecay(0.08)
        .on('tick', ticked)
        .on("end", function() {
            simDone = true
        })

    var tooltip = d3.select(".tooltip")
    
    var vertLines = svg.append("g")
        .selectAll("line")
        .data(eras)
        .enter()
        .append("line")
        .attr("x1", d => xScale(d) + (dim.width + margin.left - margin.right)/15)
        .attr("y1", dim.height - margin.bottom)
        .attr("x2", d => xScale(d) + (dim.width + margin.left - margin.right)/15)
        .attr("y2", margin.top + 20)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("opacity", 0.1);

    var nodes = svg.append("g")
        .selectAll("circle")
        .data(data).enter()
        .append("circle")
        .on("mouseover", function(event, d){
             var [mouseX, mouseY] = [event.pageX, event.pageY]

             tooltip
             .style("display", "block")
             .html(`<strong>Track:</strong> ${d.title}<br><strong>Artist:</strong> ${d.artist}`)
             .style("left", mouseX + 20 + "px")
             .style("top", mouseY - 30 + "px")

             d3.select(this)
             .raise()
             .transition().duration(100)
             .attr("fill", d => d3.color(colorScale(d.era)).darker(2))
             .attr("r", d => radius(d)+2)
         })
         .on("mouseout", function(){
             tooltip.style("display", "none");

             d3.select(this)
             .transition().duration(100)
             .attr("fill", d => colorScale(d.era))
             .attr("r", d => radius(d))
         })
         .on("click", function(event, d){
                if(simDone){ updateSVGDecade(data, d.era, colorScale(d.era));
                interact.digDown2();}
         })
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", d => colorScale(d.era))
        .attr("r", 0)
        .style("cursor", "pointer")
        .transition().duration(800)
        .attr("r", d => radius(d));

    var text = svg.append("g")
        .selectAll("text")
        .data(eras)
        .enter()
        .append("text")
        .text(function(d){if(d == '00' || d == '10') {return "20" + d + "'s"} else return "19" + d + "'s"})
        .attr("x", d => xScale(d) + (dim.width + margin.left - margin.right)/15)
        .attr("y", dim.height - margin.bottom/2)
        .attr("text-anchor", "end")
        .attr("fill", "dimgray")
        .style("font-size", "14px")
        .style("font-family", "Poppins")
        .style("opacity", 1)
        .attr("text-anchor", "middle")

    var labelrotation = `rotate(-90, ${margin.left/2}, ${dim.height/2})`
    var xLabel = svg.append("g")
        .append("text")
        .text("Song Popularity")
        .attr("x", margin.left/2)
        .attr("y", dim.height/2)
        .attr("fill", "dimgray")
        .style("font-size", "16px")
        .style("font-family", "Poppins")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .attr("transform", labelrotation)

    var title = svg.append("g")
        .append("text")
        .text("Distribution of Top Artists' Song Popularity Throughout Time")
        .attr("x", margin.left/2 - 5)
        .attr("y", margin.top/2 + 5)
        .attr("fill", "dimgray")
        .style("font-size", "18px")
        .style("font-family", "Poppins")
        .style("font-weight", "bold")

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    function ticked() {
        svg.selectAll("circle")
        .attr("cx", function(d) {return d.x = Math.max(radius(d) + margin.left, Math.min(dim.width - radius(d) - margin.right, d.x))})
        .attr("cy", function(d) {return d.y = Math.max(radius(d) + margin.top/2 + 5, Math.min(dim.height - radius(d) - margin.bottom - 5, d.y))})
    }

    ticked()
}

function updateSVGDecade(init_data, era, color) {
    var data = filterData(era, init_data)

    var simDone = false

    console.log(color)


    var dim = {
        width: 600,
        height: 700
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

    var svg = d3.select('#SongsByDecade')
                .style("width", dim.width)
                .style("height", dim.height)

    // Remove old lines
    svg.selectAll("line").remove();

    // Remove old circles
    svg.selectAll("circle")
        .transition().duration(50).attr("r", 0)
        .remove();

    // Remove old text
    svg.selectAll("text")
        .transition().duration(150).style("opacity", 0)
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
                .range([dim.height/230,dim.height/80])

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
                .alpha(1).alphaDecay(0.05)
                .on('tick', ticked)
                .on("end", function() {
                    simDone = true
                ;})

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
                .attr("fill", d => d3.color(getColor(d)).darker(2))
                .attr("r", d => radius(d)+2)
            })
            .on("mouseout", function(){
                tooltip.style("display", "none");

                d3.select(this)
                .transition().duration(100)
                .attr("fill", d => getColor(d))
                .attr("r", d => radius(d))
            })
           .attr("cx", d => d.x)
           .attr("cy", d => d.y)
           .attr("fill", d => getColor(d))
           .attr("r", 0)
           .transition().duration(400)
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
            .style("font-weight", "bold")

    var yAxLabel = "Top Artists of the " + getDecadeDate(era)

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

    var yLabel = svg.append("g")
            .append("text")
            .text(yAxLabel)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2 - 5)
            .attr("fill", "dimgray")
            .style("font-size", "14px")
            .style("font-family", "Poppins")
            .attr("text-anchor", "front")
            .style("font-weight", "bold")

    var vertLine = svg.append("g")
            .append("line")
            .attr("x1", margin.left - 5)
            .attr("y1", dim.height - margin.bottom)
            .attr("x2", margin.left - 5)
            .attr("y2", margin.top/2)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("opacity", 0.3)

    var horizLineBottom = svg.append("g")
            .append("line")
            .attr("x1", margin.left - 5)
            .attr("y1", dim.height - margin.bottom)
            .attr("x2", dim.width - margin.right + 5)
            .attr("y2", dim.height - margin.bottom)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("opacity", 0.3)

    var horizLineTop = svg.append("g")
            .append("line")
            .attr("x1", margin.top/2)
            .attr("y1", margin.top/2)
            .attr("x2", dim.width - margin.right + 5)
            .attr("y2", margin.top/2)
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("opacity", 0.3)

    function radius(d) {
        return radScale(d.total_track_pop)
    }

    var xAxisGen = d3.axisBottom().scale(xScale)

    var xAxis = svg.append("g")
            .call(xAxisGen)
            .style("transform", `translateY(${dim.height-margin.bottom}px)`)
            .style("opacity", 0.3)
            .attr("class", "x-axis")
            .selectAll(".tick text").style("font-size", "14px");

    var backButton = svg.append("g")
            .attr("transform", "translate(10, 10)")
            .style("cursor", "pointer") // Add a pointer cursor to indicate it's clickable
            .on("click", function() {
                if(simDone) {updateSVG(init_data); interact.digUp2()};
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
        svg.selectAll("circle")
        .attr("cx", function(d) {return d.x = Math.max(radius(d) + margin.left, Math.min(dim.width - radius(d) - margin.right, d.x))})
        .attr("cy", function(d) {return d.y = Math.max(radius(d) + margin.top/2 + 5, Math.min(dim.height - radius(d) - margin.bottom, d.y))})
    }

    ticked()
    
}

function filterData(era, data) {
    data = data.filter(function(item) {
        return item.era === era
    })
    return data
} 

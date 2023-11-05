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

        function showArtistName(artistId) {
            const selectedData = dataset.find(d => d.artist_id === artistId);
          
            if (selectedData) {
              const artistNameElement = document.getElementById('artist-name');
              artistNameElement.innerText = selectedData.artist;
            }   
        }

        var lines = svg.append("g")
                       .selectAll('.line')
                       .data(groupedData)
                       .enter()
                       .append('path')
                       .attr('class', 'line')
                       .attr('d', d => line(d[1]))
                       .attr('stroke', (_, i) => color(i))
                       .attr('stroke-width', 2)
                       .attr('fill', 'none')
                       .on('click', function(event, d) {
                            selectedArtist = d[0];
                        
                            d3.selectAll('.line')
                            .attr('opacity', 0.1);
                        
                            d3.select(this)
                            .attr('opacity', 1);
                        
                            showArtistName(d[0]);
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
                        .attr("y", dimensions.height/50)
                        .attr("x", -dimensions.height/2)
                        .attr("fill", "dimgray")
                        .style("font-size", "14px")
                        .style("font-family", "Poppins")
                        .attr("text-anchor", "middle")

        const resetButton = document.getElementById('reset-button');

        resetButton.addEventListener('click', function() {
            selectedArtist = null;

            d3.selectAll('.line')
            .attr('opacity', 1);
    
            clearArtistName();
        });
        
        function clearArtistName() {
            const artistNameElement = document.getElementById('artist-name');
            artistNameElement.innerText = 'Artist Name will appear here when clicked.';
        }       
    }
)
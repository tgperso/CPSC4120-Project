// Get viewport size
viewportWidth = window.innerWidth || document.documentElement.clientWidth;
viewportHeight = window.innerHeight || document.documentElement.clientHeight;

// Define maximum width
maxWidth = 1000; // Change this value to your desired maximum width

// Adjust SVG size based on viewport size
margin = { top: 20, right: 20, bottom: 40, left: 40 };
width = Math.min(maxWidth, viewportWidth) - margin.left - margin.right;
height = viewportHeight - margin.top - margin.bottom;

// Create an SVG container for the density graph
svg = d3
  .select("#distro-vis")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from "num1ArtistsByYear.csv" asynchronously
fetch("num1Artists.csv").then(response => response.text()).then(data => {
  // Parse CSV data
  data = d3.csvParse(data);
  
  var artists = [...new Set(data.map(d => d.artist))]

  var colors = function(){
    var arr = []
    for (var i = 0; i < artists.length; i++) {
      arr.push(d3.interpolateRainbow(i / artists.length))
    }
    return arr
  }()

  let maxPercentage = d3.max(data, d => d.percentage_of_year);

  let opacityScale = d3.scaleLinear()
    .domain([0, maxPercentage])
    .range([0, 1]);

  var colorScale = d3.scaleOrdinal()
    .domain(artists)
    .range(colors)

  // Define x and y scales based on your data
  const xScale = d3
    .scaleLinear()
    .domain([1950,2030])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 60]) // Adjust the domain to range from 0 to 60
    .range([height, 0]);

  // Create a defs element to define filters
  const defs = svg.append("defs");

  defs
    .append("filter")
    .attr("id", "stroke-blur-3")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic") // Apply the blur to the entire shadow circle
    .attr("stdDeviation", 3); // Adjust the standard deviation for the desired blur amount

  defs
    .append("filter")
    .attr("id", "stroke-blur-2")
    .append("feGaussianBlur")
    .attr("in", "SourceGraphic") // Apply the blur to the entire shadow circle
    .attr("stdDeviation", 2); // Adjust the standard deviation for the desired blur amount

  const tooltip = d3.select(".tooltip")
  const radius = 15;
  let clicked = false;

  // Plot circles for the density graph with blurred stroke
  const circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.percentage_of_year))
    .attr("r", radius)
    // .style("stroke", "black")
    .attr("opacity", d => opacityScale(d.percentage_of_year))
    .style("fill", d => d3.color(colorScale(d.artist)))
    .style("overflow", "clip")
    .on("mouseover", function(event, d) {
      if (!clicked) {
      // if (this.cy >= yScale(.25)) { // Check if popularity is greater than 25%
        // console.log(d)
        const [mouseX, mouseY] = [event.pageX, event.pageY];
    
        tooltip
          .style("display", "block")
          .html(`<strong>Artist:</strong> ${d.artist}<br><strong>Year:</strong> ${d.year}<br><strong>Popularity:</strong> ${d.percentage_of_year}%`)
          .style("left", mouseX + 20 + "px")
          .style("top", mouseY - 30 + "px");
        
        d3.select(this)
          .attr("r", (d) => radius + 2)
          .style("transition", "all 0.1s ease")
          .raise()
          .style("opacity", 1)
      }
    })
    .on("mouseout", function() {
      if (!clicked) {
        tooltip.style("display", "none");
        d3.select(this)
          .attr("r", radius)
          .style("transition", "all 0.1s ease")
          .style("opacity", d => opacityScale(d.percentage_of_year))
      }
    })
    .on("click", function(event, d) {
      clicked = !clicked
      if(clicked) {
        d3.select(this)
          .raise()
          .transition()
          .duration(100)
          .style("opacity", 1)
          .style("opacity", d => opacityScale(d.percentage_of_year))
      }
    });
    // .style("filter", "url(#stroke-blur)"); // Apply the Gaussian blur filter to the stroke

  // Create a tooltip element to display artist name, percentage, and year



  circles.append("circle")
  // .on("mouseover", function(event, d) {
  //   if (this.cy >= 500) { // Check if popularity is greater than 25%
  //     const [mouseX, mouseY] = [event.pageX, event.pageY];
  
  //     tooltip
  //       .style("display", "block")
  //       .html(`<strong>Artist:</strong> ${d.artist}<br><strong>Year:</strong> ${d.year}<br><strong>Popularity:</strong> ${d.percentage_of_year}%`)
  //       .style("left", mouseX + 20 + "px")
  //       .style("top", mouseY - 30 + "px");
  
  //     d3.select(this)
  //       .raise()
  //       .transition()
  //       .duration(100)
  //       .attr("fill", (d) => d3.color(colorScale(d.artist)).darker(2))
  //       .attr("r", (d) => radius(d) + 2);
  //   }
  // })
  // .on("mouseout", function() {
  //   tooltip.style("display", "none");
  
  //   d3.select(this)
  //     .transition()
  //     .duration(100)
  //     .attr("fill", (d) => colorScale(d.artist))
  //     .attr("r", (d) => radius(d));
  // });

  // Create x and y axes using d3.axis and append them to the SVG
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(""));
  const yAxis = d3.axisLeft(yScale);

  svg.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`).call(xAxis);
  svg.append("g").attr("class", "y-axis").call(yAxis);

  // You can add labels, legends, or other elements as needed
  const polynomialRegression = d3.regressionPoly()
  .x((d) => xScale(d.year))
  .y((d) => yScale(d.percentage_of_year))
  .order(2); // Adjust the polynomial order as needed

  const regressionLine = polynomialRegression(data);

  // Define a line generator for the regression line
  const lineGenerator = d3.line()
    .x((d) => d[0])
    .y((d) => d[1]);

  // Draw the regression line
  svg.append("path")
    .datum(regressionLine)
    .attr("fill", "none")
    .attr("stroke", "black") // Adjust line color as needed
    .attr("stroke-dasharray", "10,10")
    .attr("stroke-width", 4) // Adjust line width as needed
    .attr("d", lineGenerator);

});

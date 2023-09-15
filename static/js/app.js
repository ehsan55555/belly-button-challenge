// Create a function to initialize the dashboard
function init() {
    // Use D3 to read the samples.json data from the given URL
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Extract data for dropdown menu options
      let names = data.names;
  
      // Populate the dropdown menu with options

      // Select the dropdown menu element with the ID "selDataset."
      let dropdown = d3.select("#selDataset");
      // Loop through each name in the "names" array and add it as an option in the dropdown
      names.forEach(name => {
        // Create an <option> element, set its text content to the name, and set its value attribute to the name
        dropdown.append("option").text(name).property("value", name);
      });
  
      // Initial chart rendering

      // Call the buildCharts function with the first name in the "names" array as the argument
      buildCharts(names[0]);
      // Call the displayMetadata function with the first name in the "names" array as the argument
      displayMetadata(names[0]);
    });
  }
  
  // Create a function to build the horizontal bar chart
  function buildCharts(sample) {
      // Fetch JSON data from the provided URL asynchronously
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Filter the data for the selected individual (sample)
      let sampleData = data.samples.find(s => s.id === sample);
  
      // Get the top 10 OTUs

      // Get the top 10 OTUs by taking the first 10 elements of otu_ids array, formatting them as "OTU {otu_id}", and reversing the order
      let topOTUs = sampleData.otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse();
      // Get the top 10 sample values by taking the first 10 elements of sample_values array and reversing the order
      let topValues = sampleData.sample_values.slice(0, 10).reverse();
      // Get the top 10 OTU labels by taking the first 10 elements of otu_labels array and reversing the order
      let topLabels = sampleData.otu_labels.slice(0, 10).reverse();
  
      // Create the horizontal bar chart
      let trace = {
        type: 'bar',    // Set the chart type to bar
        orientation: 'h', // Set the orientation to horizontal
        x: topValues,   // Use the top sample values for the x-axis
        y: topOTUs,     // Update to use otu_ids as labels
        text: topLabels // Update to use otu_labels as tooltips
      };
      // Define the layout for the horizontal bar chart
      let layout = {
        title: `Top 10 OTUs for Sample ${sample}`, // Set the chart title
        xaxis: { title: 'Sample Values' }, // Set the x-axis title
        yaxis: { title: 'OTU ID' } // Set the y-axis title
      };
  
      // Create the data array for the horizontal bar chart, containing our trace
      var data = [trace];
  
      // Create the horizontal bar chart using Plotly
      Plotly.newPlot('bar', data, layout);
    });
  
    // Create the bubble chart
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      // Filter the data for the selected individual
      let sampleData = data.samples.find(s => s.id === sample);
  
      // Create the bubble chart

      // Create the data array for the bubble chart, containing our trace
      let bubbleData = [{
        x: sampleData.otu_ids, // X-axis data using OTU IDs
        y: sampleData.sample_values, // Y-axis data using sample values
        text: sampleData.otu_labels, // Tooltip text using OTU labels
        mode: 'markers', // Set the chart mode to markers
        marker: {
          size: sampleData.sample_values, // Marker size based on sample values
          color: sampleData.otu_ids, // Marker color based on OTU IDs
          colorscale: 'Earth' // Use Earth colorscale for markers
        }
      }];
      
      // Create the layout object for the bubble chart
      let bubbleLayout = {
        title: `Bubble Chart for Sample ${sample}`, // Set the chart title
        xaxis: { title: 'OTU ID' }, // X-axis title
        yaxis: { title: 'Sample Values' }, // Y-axis title
        showlegend: false // Disable the legend
      };
      
      // Create the bubble chart using Plotly
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
  
    // Create the gauge chart

    // Fetch data from an external JSON file (samples.json) hosted on Amazon S3 and handle it asynchronously using a Promise
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
    // The data variable now contains the JSON data from the specified URL, which can be accessed and processed further.    
    
      // Get the washing frequency
      let metadata = data.metadata.find(meta => meta.id == sample);
      let washFrequency = metadata ? metadata.wfreq : 0; // Get the washing frequency
  
      // Create the gauge chart with the updated steps for color ranges
      let gaugeData = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: washFrequency, // Set the value to the washing frequency
          title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" }, // Set the chart title
          gauge: {
            axis: { range: [0, 9], tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, // Define the gauge axis and tick values
            steps: [
              { range: [0, 1], color: "lightgray" },
              { range: [1, 2], color: "lightyellow" },
              { range: [2, 3], color: "lightgreen" },
              { range: [3, 4], color: "lightblue" },
              { range: [4, 5], color: "lightpurple" },
              { range: [5, 6], color: "lightorange" },
              { range: [6, 7], color: "lightred" },
              { range: [7, 8], color: "yellow" },
              { range: [8, 9], color: "green" }
            ], // Define color ranges and thresholds for the gauge chart
            threshold: {
              line: { color: "red", width: 5 }, // Set the threshold line color and width
              thickness: 0.75, // Set the threshold thickness
              value: washFrequency // Set the threshold value based on the washing frequency
            }
          }
        }
      ];
      
      // Define the layout options for the gauge chart
      let gaugeLayout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
      // Create a new gauge chart using Plotly with the specified data and layout
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
  }
  
  // Create a function to display sample metadata
  function displayMetadata(sample) {
    // Fetch data from an external JSON file (samples.json) hosted on Amazon S3 and handle it asynchronously using a Promise
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
      
      // Display the sample metadata
      
      // Find the metadata for the selected sample based on its ID
      let metadata = data.metadata.find(meta => meta.id == sample);
      // Select the HTML element with the ID "sample-metadata" using D3
      let metadataPanel = d3.select("#sample-metadata");
  
      // Clear any existing metadata
      metadataPanel.html("");
  
      // Check if metadata exists before appending key-value pairs
      if (metadata) {
        // Append key-value pairs from metadata to the panel
        Object.entries(metadata).forEach(([key, value]) => {
          metadataPanel.append("p").text(`${key}: ${value}`);
        });
      } else {
        // Handle the case where metadata is not found
        metadataPanel.append("p").text("Metadata not available for this sample.");
      }
    });
  }
  
  // Create a function to update the charts and metadata when a new sample is selected from the dropdown
  function optionChanged(newSample) {
    // Call the buildCharts function with the newly selected sample to update the charts
    buildCharts(newSample);
    // Call the displayMetadata function with the newly selected sample to update the metadata display
    displayMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();

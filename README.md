# Belly Button Biodiversity Dashboard

## This interactive dashboard allows you to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species, also known as operational taxonomic units (OTUs), are present in more than 70% of people, while the rest are relatively rare.


# Directory Structure

- belly-button-challenge (root directory)
  - README.md
  - index.html
  - StarterCode (folder)
    - samples.json
  - static (folder)
    - js (folder)
      - app.js


README.md: This file provides an overview of the project.

index.html: The main HTML file for the dashboard.

StarterCode (folder): Contains the samples.json file, which is the source of data for the dashboard.

static (folder): Contains static assets for the project.

js (folder): Contains the JavaScript code for the dashboard in app.js.


# Features

## Bar Chart

- The bar chart displays the top 10 OTUs found in a selected individual.
- It uses sample_values as the values for the bar chart.
- It uses otu_ids as the labels for the bar chart.
- It displays otu_labels as hovertext for the chart.
- The chart updates when you select a new individual from the dropdown menu.

## Bubble Chart

- The bubble chart displays each sample.
- It uses otu_ids for the x-axis values.
- It uses sample_values for the y-axis values.
- Marker size is determined by sample_values.
- Marker colors are based on otu_ids.
- Tooltip text values are derived from otu_labels.
- The chart updates when you select a new individual from the dropdown menu.

## Metadata

- The dashboard displays the demographic information of the selected individual.
- Key-value pairs from the metadata JSON object are shown on the page.
- The metadata updates when you select a new individual from the dropdown menu.


## Weekly Washing Frequency Gauge (Advanced Challenge - Optional)

- A gauge chart plots the weekly washing frequency of the individual.
- The chart accounts for values ranging from 0 through 9.
- It updates whenever a new sample is selected.


# How to Use

## 1. Visit the Belly Button Biodiversity Dashboard.
## 2. Use the dropdown menu to select an individual from the dataset.
## 3. Explore the bar chart, bubble chart, and demographic information for the selected individual.
## 4. Optionally, view the washing frequency gauge chart to see how often the individual washes their belly button.

# Technologies Used

- JavaScript
- D3.js
- Plotly.js


# Data Source

## The data for this dashboard is sourced from the Belly Button Biodiversity dataset.

## This dashboard is a demonstration of data visualization using D3.js and Plotly.js.

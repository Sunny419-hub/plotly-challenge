
d3.json('data/samples.json').then((data) => {
    var select = d3.select('#selDataset');
    console.log(data);
    select.selectAll("option")
        .data(data.names)
        .enter()
            .append("option")
            .attr("value", function (d){return d})
            .text(function(d){return d})
});

function optionChanged(value){
    console.log(value);
    var sample = '';
    var metadata= '';
    d3.json('data/samples.json').then((data) => {
        data.samples.forEach(element => {            
            if(element.id == value){
               sample = element;                
            }
        });
        /*var otus_ids = sample.otu_ids;
        var sorted = otus_ids.sort((a, b) => a - b);
        var sliced = sorted.slice(0, 10);
        console.log(sliced);*/
        var otus_ids = sample.otu_ids;
        var sliced_ids = otus_ids.slice(0, 10);
        var otus_labels = sample.otu_labels;
        var sliced_labels = otus_labels.slice(0,10);
        var sample_values = sample.sample_values;
        var sv_sliced = sample_values.slice(0,10);
        // Trace1 for the Greek Data
        var trace1 = {
            x: sv_sliced.map(object => object),
            y: sliced_ids.map(object => 'OTN '+object),
            text: sliced_labels.map(object => object),
            name: "OTU",
            type: "bar",
            orientation: "h"
        };
        
        // data
        var data2 = [trace1];
        
        // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 operational taxonomic units (OTUs)",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
            }
        };
        
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data2, layout);

        var trace1 = {
            x: sample.otu_ids.map(object => object),
            y: sample.sample_values.map(object => object),
            mode: 'markers',
            marker:{ 
                size: sample.sample_values,
                color: sample.otu_ids
            }
          };
          
          data2 = [trace1];
          
          layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data2, layout);
    });
    d3.json('data/samples.json').then((data) => {
        data.metadata.forEach(element => {            
            if(element.id == value){
               sample = element;                
            }
        });
        var div = d3.select("#sample-metadata");
        for (const [key, value] of Object.entries(sample)) {
            div.append('p').text(key+': ' +value+'\n');
        }
        
    });
    
}


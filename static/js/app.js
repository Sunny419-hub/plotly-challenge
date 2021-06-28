
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
    d3.json('data/samples.json').then((data) => {
        data.samples.forEach(element => {            
            if(element.id == value){
               sample = element;                
            }
        });
        var otus_ids = sample.otu_ids;
        var sorted = otus_ids.sort((a, b) => b - a);
        var sliced = sorted.slice(0, 10);
        console.log(sliced);
    });
    
}

function filterSample(values){
    
    return values.samples.id = select.node().value;
}
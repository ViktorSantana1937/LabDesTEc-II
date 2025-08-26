import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

const cities = [
    {name:"Amieirinha",population:4812946},
    {name:"Kinshasa",population:1027499},
    {name:"Blantyre",population:1992831},
    {name:"Pueblo Nuevo Viñas",population:6106658},
    {name:"Ko Si Chang",population:1258350},
    {name:"Rabak",population:5611054},
    {name:"Port-Cartier",population:2014142},
    {name:"Detroit",population:8927289},
    {name:"Medeiros Neto",population:6847563},
    {name:"Kushchëvskaya",population:4160962}
]

const svgHeight = 400;  // subí un poco para más espacio
const svgWidth = 600;

const textTop = 15;
const gap = 20;    
const chartTop = textTop + gap;
const chartHeight = svgHeight - chartTop - 10; // espacio para barras dentro del SVG

const numBars = cities.length;
const barSpacing = 15; 
const barWidth = (svgWidth - barSpacing * (numBars + 12)) / numBars; 

// Escala lineal proporcional para altura de barras
const yScale = d3.scaleLinear()
    .domain([1, d3.max(cities, d => d.population)])
    .range([0, chartHeight]); // ahora la barra más grande cabe en el SVG

const svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Dibujar etiquetas arriba
svg.select(".labels")
    .selectAll("text")
    .data(cities)
    .join("text")
    .attr("x", (d, i) => barSpacing + i * (barWidth + barSpacing) + barWidth / 0.2 + 10)

    .attr("y", textTop)
    .attr("text-anchor", "end")
    .text(d => d.name)
    .style("font-size", "5px");

// Dibujar barras
svg.select(".bars")
    .selectAll("rect")
    .data(cities)
    .join("rect")
    .attr("width", barWidth)
    .attr("x", (d, i) => barSpacing + i * (barWidth + barSpacing))
    .attr("y", chartTop)
    .attr("height", d => yScale(d.population));

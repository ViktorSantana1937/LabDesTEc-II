// Los archivos geojson fueron obtenidos del siguiente repositorio: 
// https://github.com/caracena/chile-geojson/blame/master/regiones.json

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const width = 500, height = 500

const projection = d3.geoMercator()
    .fitSize([width, height], data);

const path = d3.geoPath(projection);

// crea una escala de color en base a la población
// (dominio: valores mínimos y máximos de población en tu dataset)
const poblaciones = data.features.map(d => d.properties.Poblacion);
const colorScale = d3.scaleSequential()
    .domain([d3.min(poblaciones), d3.max(poblaciones)])
    .interpolator(d3.interpolateBlues);

// pinta las comunas usando la escala
d3.select('.mapa')
    .attr('transform', 'translate(0, -10)')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', path)
    .attr('fill', d => colorScale(d.properties.Poblacion))
    .attr("stroke", "#333")
    .attr("stroke-width", 1);

// etiqueta de comuna + poblacion
const etiqueta = d3.select('body').append('div')
    .classed('etiqueta', true);

d3.select('.mapa').selectAll('path')
    .on('mouseenter', (e, d) => {
        etiqueta.style('opacity', 1)
            .style('top', e.pageY + 10 + 'px')
            .style('left', e.pageX + 10 + 'px')
            .html(`
                <p><b>${d.properties.Comuna}</b></p>
                <p>Población: ${d.properties.Poblacion.toLocaleString()}</p>
            `);
    })
    .on('mouseout', () => {
        etiqueta.style('opacity', 0);
    });


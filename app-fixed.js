// Fixed D3 Projection Showcase Application
class D3ProjectionShowcase {
    constructor() {
        console.log('Initializing D3ProjectionShowcase...');
        
        this.width = 800;
        this.height = 500;
        this.currentProjection = 'geoNaturalEarth1';
        this.rotation = [0, 0, 0];
        this.scale = 150;
        
        this.svg = d3.select('#map')
            .attr('width', this.width)
            .attr('height', this.height);
            
        this.projection = null;
        this.path = null;
        this.worldData = null;
        
        // Create simple world data immediately
        this.createWorldData();
        
        this.initializeEventListeners();
        this.initializeMap();
        
        console.log('Initialization complete');
    }
    
    createWorldData() {
        console.log('Creating realistic world data...');
        
        // Create realistic but simplified continental outlines
        this.worldData = {
            type: "FeatureCollection",
            features: [
                // North America with realistic coastline
                {
                    type: "Feature",
                    properties: { name: "North America" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-168, 65], [-156, 71], [-140, 70], [-120, 60], [-110, 50], 
                            [-100, 40], [-90, 30], [-85, 25], [-80, 25], [-75, 30], 
                            [-70, 35], [-65, 40], [-60, 45], [-55, 50], [-50, 55], 
                            [-55, 60], [-65, 65], [-80, 70], [-100, 75], [-120, 80], 
                            [-140, 82], [-160, 80], [-168, 65]
                        ]]
                    }
                },
                // South America
                {
                    type: "Feature",
                    properties: { name: "South America" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-82, 12], [-70, 10], [-60, 5], [-55, 0], [-50, -5], 
                            [-45, -10], [-40, -15], [-35, -20], [-35, -30], [-40, -40], 
                            [-45, -50], [-55, -55], [-65, -55], [-75, -50], [-80, -40], 
                            [-82, -30], [-85, -20], [-85, -10], [-82, 0], [-82, 12]
                        ]]
                    }
                },
                // Europe
                {
                    type: "Feature",
                    properties: { name: "Europe" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-10, 35], [0, 40], [10, 45], [20, 50], [30, 55], 
                            [40, 60], [50, 65], [45, 70], [35, 75], [25, 80], 
                            [15, 78], [5, 76], [-5, 74], [-15, 70], [-18, 60], 
                            [-15, 50], [-12, 40], [-10, 35]
                        ]]
                    }
                },
                // Africa
                {
                    type: "Feature",
                    properties: { name: "Africa" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-18, 35], [-10, 30], [0, 25], [10, 20], [20, 15], 
                            [30, 10], [40, 5], [50, 0], [52, -10], [50, -20], 
                            [45, -30], [35, -35], [25, -35], [15, -30], [5, -25], 
                            [-5, -20], [-15, -15], [-20, -5], [-18, 5], [-15, 15], 
                            [-18, 25], [-18, 35]
                        ]]
                    }
                },
                // Asia
                {
                    type: "Feature",
                    properties: { name: "Asia" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [30, 80], [60, 82], [90, 80], [120, 75], [150, 70], 
                            [170, 65], [175, 60], [180, 55], [175, 50], [170, 45], 
                            [160, 40], [150, 35], [140, 30], [130, 25], [120, 20], 
                            [110, 15], [100, 10], [90, 8], [80, 10], [70, 15], 
                            [60, 20], [50, 25], [40, 30], [30, 35], [25, 40], 
                            [22, 45], [20, 50], [22, 55], [25, 60], [28, 65], 
                            [30, 70], [30, 80]
                        ]]
                    }
                },
                // Australia
                {
                    type: "Feature",
                    properties: { name: "Australia" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [113, -10], [125, -12], [135, -15], [145, -20], [150, -25], 
                            [153, -30], [153, -35], [150, -40], [145, -42], [140, -40], 
                            [135, -38], [130, -35], [125, -32], [120, -28], [115, -25], 
                            [113, -20], [112, -15], [113, -10]
                        ]]
                    }
                },
                // Greenland
                {
                    type: "Feature",
                    properties: { name: "Greenland" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-45, 60], [-25, 65], [-15, 70], [-20, 75], [-25, 80], 
                            [-35, 83], [-45, 82], [-55, 80], [-65, 75], [-70, 70], 
                            [-65, 65], [-55, 62], [-45, 60]
                        ]]
                    }
                },
                // Antarctica (simplified)
                {
                    type: "Feature",
                    properties: { name: "Antarctica" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [[
                            [-180, -60], [-120, -65], [-60, -70], [0, -75], [60, -70], 
                            [120, -65], [180, -60], [180, -85], [-180, -85], [-180, -60]
                        ]]
                    }
                }
            ]
        };
        
        console.log('Realistic world data created with', this.worldData.features.length, 'features');
    }
    
    initializeMap() {
        console.log('Initializing map...');
        this.updateProjection();
        this.renderMap();
        this.updateInfo();
    }
    
    updateProjection() {
        console.log('Updating projection to:', this.currentProjection);
        
        // Get the projection constructor with fallback
        let projectionConstructor = this.getProjectionConstructor(this.currentProjection);
        
        // Create the projection
        this.projection = projectionConstructor()
            .scale(this.scale)
            .translate([this.width / 2, this.height / 2])
            .rotate(this.rotation);
            
        // Set up path generator
        this.path = d3.geoPath().projection(this.projection);
        
        console.log('Projection updated successfully');
    }
    
    getProjectionConstructor(projectionName) {
        // Try to get the projection, with fallbacks
        let projection = d3[projectionName];
        
        if (!projection) {
            console.warn('Projection', projectionName, 'not found, trying fallbacks...');
            
            // Try common fallbacks
            if (projectionName.includes('Robinson') && d3.geoRobinson) {
                projection = d3.geoRobinson;
            } else if (projectionName.includes('Winkel') && d3.geoWinkel3) {
                projection = d3.geoWinkel3;
            } else if (projectionName.includes('Eckert') && d3.geoEckert4) {
                projection = d3.geoEckert4;
            } else if (projectionName.includes('Miller') && d3.geoMiller) {
                projection = d3.geoMiller;
            } else {
                // Final fallback
                projection = d3.geoNaturalEarth1 || d3.geoEquirectangular;
                console.warn('Using fallback projection');
            }
        }
        
        return projection;
    }
    
    renderMap() {
        console.log('Rendering map...');
        
        // Clear previous map
        this.svg.selectAll('*').remove();
        
        // Add sphere (outline)
        this.svg.append('path')
            .datum({ type: 'Sphere' })
            .attr('class', 'sphere')
            .attr('d', this.path);
            
        // Add graticule (grid lines)
        const graticule = d3.geoGraticule();
        this.svg.append('path')
            .datum(graticule())
            .attr('class', 'graticule')
            .attr('d', this.path);
        
        // Add countries/continents
        if (this.worldData && this.worldData.features) {
            console.log('Adding countries to map...');
            
            const countries = this.svg.selectAll('.country')
                .data(this.worldData.features)
                .enter().append('path')
                .attr('class', 'countries')
                .attr('d', this.path);
                
            // Add hover effects
            countries
                .on('mouseover', function(event, d) {
                    d3.select(this).style('fill', '#ff6b6b');
                })
                .on('mouseout', function(event, d) {
                    d3.select(this).style('fill', '#e8f4fd');
                })
                .append('title')
                .text(d => d.properties.name);
                
            console.log('Rendered', this.worldData.features.length, 'geographic features');
            
            // Debug: log path data for first feature
            if (this.worldData.features.length > 0) {
                const firstPath = this.path(this.worldData.features[0]);
                console.log('First feature path length:', firstPath ? firstPath.length : 'NULL');
            }
        } else {
            console.error('No world data available for rendering');
        }
        
        console.log('Map rendering complete');
    }
    
    updateInfo() {
        const data = projectionData[this.currentProjection];
        if (!data) {
            console.warn('No info data for projection:', this.currentProjection);
            return;
        }
        
        document.getElementById('projection-name').textContent = data.name;
        
        const infoDiv = document.getElementById('projection-info');
        infoDiv.innerHTML = `
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Creator:</strong> ${data.creator}</p>
            <p><strong>Year:</strong> ${data.year}</p>
            <p><strong>Best Use Case:</strong> ${data.useCase}</p>
        `;
        
        const propertiesList = document.getElementById('properties-list');
        propertiesList.innerHTML = data.properties
            .map(prop => `<li>${prop}</li>`)
            .join('');
    }
    
    initializeEventListeners() {
        console.log('Setting up event listeners...');
        
        // Projection selector
        const projectionSelect = document.getElementById('projection-select');
        projectionSelect.addEventListener('change', (e) => {
            this.currentProjection = e.target.value;
            this.updateProjection();
            this.renderMap();
            this.updateInfo();
        });
        
        // Rotation controls
        const lambdaSlider = document.getElementById('rotation-lambda');
        const phiSlider = document.getElementById('rotation-phi');
        const gammaSlider = document.getElementById('rotation-gamma');
        const scaleSlider = document.getElementById('scale-factor');
        
        if (lambdaSlider) {
            lambdaSlider.addEventListener('input', (e) => {
                this.rotation[0] = +e.target.value;
                document.getElementById('lambda-value').textContent = e.target.value + '°';
                this.updateProjection();
                this.renderMap();
            });
        }
        
        if (phiSlider) {
            phiSlider.addEventListener('input', (e) => {
                this.rotation[1] = +e.target.value;
                document.getElementById('phi-value').textContent = e.target.value + '°';
                this.updateProjection();
                this.renderMap();
            });
        }
        
        if (gammaSlider) {
            gammaSlider.addEventListener('input', (e) => {
                this.rotation[2] = +e.target.value;
                document.getElementById('gamma-value').textContent = e.target.value + '°';
                this.updateProjection();
                this.renderMap();
            });
        }
        
        if (scaleSlider) {
            scaleSlider.addEventListener('input', (e) => {
                this.scale = +e.target.value;
                document.getElementById('scale-value').textContent = e.target.value;
                this.updateProjection();
                this.renderMap();
            });
        }
        
        // Reset button
        const resetButton = document.getElementById('reset-controls');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.rotation = [0, 0, 0];
                this.scale = 150;
                
                if (lambdaSlider) lambdaSlider.value = 0;
                if (phiSlider) phiSlider.value = 0;
                if (gammaSlider) gammaSlider.value = 0;
                if (scaleSlider) scaleSlider.value = 150;
                
                document.getElementById('lambda-value').textContent = '0°';
                document.getElementById('phi-value').textContent = '0°';
                document.getElementById('gamma-value').textContent = '0°';
                document.getElementById('scale-value').textContent = '150';
                
                this.updateProjection();
                this.renderMap();
            });
        }
        
        console.log('Event listeners set up');
    }
    
    handleResize() {
        const container = document.querySelector('.map-container');
        const containerWidth = container.clientWidth - 40;
        
        if (containerWidth < this.width) {
            const scale = containerWidth / this.width;
            this.svg.style('transform', `scale(${scale})`);
            this.svg.style('transform-origin', 'top left');
        } else {
            this.svg.style('transform', 'none');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking requirements...');
    
    // Check if D3 is available
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded!');
        const errorMsg = '<p style="color: red; font-weight: bold;">D3.js failed to load. Please check your internet connection and try refreshing the page.</p>';
        document.getElementById('projection-info').innerHTML = errorMsg;
        return;
    }
    
    console.log('D3.js version:', d3.version);
    
    try {
        const app = new D3ProjectionShowcase();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            app.handleResize();
        });
        
        // Initial resize check
        setTimeout(() => {
            app.handleResize();
        }, 100);
        
        console.log('Application started successfully!');
        
    } catch (error) {
        console.error('Error initializing application:', error);
        const errorMsg = `<p style="color: red;">Failed to initialize: ${error.message}</p>`;
        document.getElementById('projection-info').innerHTML = errorMsg;
    }
});

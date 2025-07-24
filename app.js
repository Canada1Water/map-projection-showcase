// Main application logic
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
            
        console.log('SVG element created:', this.svg.node());
            
        this.projection = null;
        this.path = null;
        this.worldData = null;
        
        this.initializeEventListeners();
        this.loadWorldData();
        console.log('Constructor complete');
    }
    
    async loadWorldData() {
        console.log('Starting to load world data...');
        
        // For now, let's use the fallback world to ensure the map shows up
        console.log('Using fallback world representation...');
        this.createFallbackWorld();
        
        // Optionally try to load real data in the background
        /* 
        try {
            const world = await d3.json('https://unpkg.com/world-atlas@3/countries-110m.json');
            console.log('World data loaded successfully:', world);
            this.worldData = world;
            this.renderMap(); // Re-render with real data
        } catch (error) {
            console.log('External data not available, continuing with fallback');
        }
        */
    }
    
    createFallbackWorld() {
        console.log('Creating fallback world data...');
        // Create a more comprehensive simple representation
        const features = [];
        
        // Create continents as simple polygons
        const continents = [
            // North America
            {
                name: "North America",
                coords: [
                    [[-170, 70], [-50, 70], [-50, 20], [-120, 20], [-170, 30], [-170, 70]]
                ]
            },
            // South America
            {
                name: "South America",
                coords: [
                    [[-85, 15], [-35, 15], [-35, -60], [-85, -60], [-85, 15]]
                ]
            },
            // Europe
            {
                name: "Europe",
                coords: [
                    [[-15, 75], [50, 75], [50, 35], [-15, 35], [-15, 75]]
                ]
            },
            // Africa
            {
                name: "Africa",
                coords: [
                    [[-20, 40], [55, 40], [55, -35], [-20, -35], [-20, 40]]
                ]
            },
            // Asia
            {
                name: "Asia",
                coords: [
                    [[50, 80], [180, 80], [180, 10], [50, 10], [50, 80]]
                ]
            },
            // Australia
            {
                name: "Australia",
                coords: [
                    [[110, -10], [155, -10], [155, -45], [110, -45], [110, -10]]
                ]
            }
        ];
        
        continents.forEach(continent => {
            features.push({
                type: "Feature",
                properties: { name: continent.name },
                geometry: {
                    type: "Polygon",
                    coordinates: continent.coords
                }
            });
        });
        
        this.worldData = {
            type: "FeatureCollection",
            features: features
        };
        
        console.log('Fallback world data created:', this.worldData);
        this.initializeMap();
    }
    
    initializeMap() {
        console.log('Initializing map...');
        this.updateProjection();
        this.renderMap();
        this.updateInfo();
        console.log('Map initialization complete');
    }
    
    updateProjection() {
        console.log('Updating projection to:', this.currentProjection);
        // Get the projection constructor
        const projectionConstructor = this.getProjectionConstructor(this.currentProjection);
        
        if (!projectionConstructor) {
            console.error('Projection not found:', this.currentProjection);
            return;
        }
        
        console.log('Using projection constructor:', projectionConstructor.name);
        
        // Create the projection
        this.projection = projectionConstructor()
            .scale(this.scale)
            .translate([this.width / 2, this.height / 2])
            .rotate(this.rotation);
            
        console.log('Projection created:', this.projection);
            
        // Set up path generator
        this.path = d3.geoPath().projection(this.projection);
        console.log('Path generator created:', this.path);
    }
    
    getProjectionConstructor(projectionName) {
        console.log('Getting projection constructor for:', projectionName);
        
        // Handle built-in D3 projections
        if (d3[projectionName]) {
            console.log('Found built-in projection:', projectionName);
            return d3[projectionName];
        }
        
        // Handle extended projections from d3-geo-projection
        if (typeof d3[projectionName] === 'function') {
            console.log('Found extended projection:', projectionName);
            return d3[projectionName];
        }
        
        // Handle projections that might be in the extended library
        const extendedProjections = {
            geoRobinson: d3.geoRobinson,
            geoWinkel3: d3.geoWinkel3,
            geoEckert1: d3.geoEckert1,
            geoEckert2: d3.geoEckert2,
            geoEckert3: d3.geoEckert3,
            geoEckert4: d3.geoEckert4,
            geoEckert5: d3.geoEckert5,
            geoEckert6: d3.geoEckert6,
            geoVanDerGrinten: d3.geoVanDerGrinten,
            geoWagner4: d3.geoWagner4,
            geoWagner6: d3.geoWagner6,
            geoWagner7: d3.geoWagner7,
            geoBoggs: d3.geoBoggs,
            geoHomolosine: d3.geoHomolosine,
            geoKavrayskiy7: d3.geoKavrayskiy7,
            geoLoximuthal: d3.geoLoximuthal,
            geoMiller: d3.geoMiller,
            geoPatterson: d3.geoPatterson,
            geoTimes: d3.geoTimes
        };
        
        if (extendedProjections[projectionName]) {
            console.log('Found in extended projections:', projectionName);
            return extendedProjections[projectionName];
        }
        
        console.warn('Projection not found, falling back to Natural Earth:', projectionName);
        return d3.geoNaturalEarth1 || d3.geoEquirectangular;
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
            
        // Add graticule
        const graticule = d3.geoGraticule();
        this.svg.append('path')
            .datum(graticule())
            .attr('class', 'graticule')
            .attr('d', this.path);
        
        // Add countries
        if (this.worldData) {
            console.log('Adding world features...', this.worldData);
            let features;
            
            if (this.worldData.objects && this.worldData.objects.countries) {
                // TopoJSON format
                console.log('Using TopoJSON format');
                features = topojson.feature(this.worldData, this.worldData.objects.countries).features;
            } else if (this.worldData.features) {
                // GeoJSON format
                console.log('Using GeoJSON format');
                features = this.worldData.features;
            } else {
                console.error('Unexpected world data format', this.worldData);
                return;
            }
            
            console.log('Features to render:', features.length);
            
            this.svg.selectAll('.country')
                .data(features)
                .enter().append('path')
                .attr('class', 'countries')
                .attr('d', this.path)
                .on('mouseover', function(event, d) {
                    d3.select(this).style('fill', '#ff6b6b');
                })
                .on('mouseout', function(event, d) {
                    d3.select(this).style('fill', '#e8f4fd');
                });
        } else {
            console.error('No world data available for rendering');
        }
        console.log('Map rendering complete');
    }
    
    updateInfo() {
        const data = projectionData[this.currentProjection];
        if (!data) return;
        
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
        
        lambdaSlider.addEventListener('input', (e) => {
            this.rotation[0] = +e.target.value;
            document.getElementById('lambda-value').textContent = e.target.value + '°';
            this.updateProjection();
            this.renderMap();
        });
        
        phiSlider.addEventListener('input', (e) => {
            this.rotation[1] = +e.target.value;
            document.getElementById('phi-value').textContent = e.target.value + '°';
            this.updateProjection();
            this.renderMap();
        });
        
        gammaSlider.addEventListener('input', (e) => {
            this.rotation[2] = +e.target.value;
            document.getElementById('gamma-value').textContent = e.target.value + '°';
            this.updateProjection();
            this.renderMap();
        });
        
        scaleSlider.addEventListener('input', (e) => {
            this.scale = +e.target.value;
            document.getElementById('scale-value').textContent = e.target.value;
            this.updateProjection();
            this.renderMap();
        });
        
        // Reset button
        document.getElementById('reset-controls').addEventListener('click', () => {
            this.rotation = [0, 0, 0];
            this.scale = 150;
            
            lambdaSlider.value = 0;
            phiSlider.value = 0;
            gammaSlider.value = 0;
            scaleSlider.value = 150;
            
            document.getElementById('lambda-value').textContent = '0°';
            document.getElementById('phi-value').textContent = '0°';
            document.getElementById('gamma-value').textContent = '0°';
            document.getElementById('scale-value').textContent = '150';
            
            this.updateProjection();
            this.renderMap();
        });
        
        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleResize() {
        const container = document.querySelector('.map-container');
        const containerWidth = container.clientWidth - 40; // Account for padding
        
        if (containerWidth < this.width) {
            const scale = containerWidth / this.width;
            this.svg.style('transform', `scale(${scale})`);
            this.svg.style('transform-origin', 'top left');
        } else {
            this.svg.style('transform', 'none');
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing application...');
    
    // Check if D3 is available
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded!');
        document.getElementById('projection-info').innerHTML = '<p class="error">D3.js failed to load. Please check your internet connection.</p>';
        return;
    }
    
    console.log('D3.js version:', d3.version);
    
    try {
        const app = new D3ProjectionShowcase();
        
        // Handle initial resize
        setTimeout(() => {
            app.handleResize();
        }, 100);
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
        document.getElementById('projection-info').innerHTML = '<p class="error">Failed to initialize the application: ' + error.message + '</p>';
    }
});

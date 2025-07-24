# D3 Geo Projections Showcase

A comprehensive web application showcasing different D3.js geographic projections with interactive controls and detailed information about each projection.

## Features

- **30+ Projections**: Explore a wide variety of map projections including Mercator, Natural Earth, Orthographic, and many specialized projections
- **Interactive Controls**: Adjust rotation (longitude, latitude, roll) and scale in real-time
- **Detailed Information**: Learn about each projection's properties, creator, year of creation, and best use cases
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Appeal**: Modern, clean interface with smooth transitions

## Projections Included

### Popular Projections
- Natural Earth I
- Mercator
- Orthographic
- Robinson
- Winkel III (Tripel)
- Equal Earth

### Specialized Projections
- Albers Equal-Area Conic
- Azimuthal Equal Area
- Stereographic
- Gnomonic
- Mollweide
- Sinusoidal

### Extended Collection
- Eckert Series (I-VI)
- Wagner Series (IV, VI, VII)
- Van der Grinten
- Boggs Eumorphic
- Goode Homolosine
- And many more...

## Getting Started

### Running Locally

Due to browser security restrictions with local files, you'll need to serve the application through a local web server:

#### Option 1: Using Python (Recommended)
```bash
# Clone or download the repository
cd map-projection-showcase

# Start a local HTTP server
python3 -m http.server 8000

# Or use the npm script
npm start
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 2: Using Node.js
```bash
# Install a simple HTTP server globally
npm install -g http-server

# Navigate to the project directory
cd map-projection-showcase

# Start the server
http-server -p 8000
```

#### Option 3: Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Using the Application

1. Select a projection from the dropdown menu
2. Use the interactive controls to rotate and scale the projection
3. Read about each projection's properties and use cases in the information panel

## Technical Details

- **D3.js v7**: Core mapping library
- **d3-geo-projection**: Extended projection library
- **TopoJSON**: Geographic data format
- **Responsive CSS Grid**: Modern layout
- **Vanilla JavaScript**: No additional frameworks required

## File Structure

```
d3-projection-showcase/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── app.js             # Main application logic
├── projections-data.js # Projection information database
└── README.md          # This file
```

## Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Data Sources

- World topology data from Natural Earth
- Projection implementations from D3.js and d3-geo-projection
- Historical and technical information compiled from cartographic sources

## Educational Use

This showcase is perfect for:
- Geography and cartography education
- Understanding map distortion and projection properties
- Comparing different projection characteristics
- Demonstrating the impact of projection choice on data visualization

## License

This project is open source and available under the MIT License.

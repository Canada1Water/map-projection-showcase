// Comprehensive data about D3 geo projections
const projectionData = {
    geoNaturalEarth1: {
        name: "Natural Earth I",
        description: "The Natural Earth projection is a pseudocylindrical map projection designed by Tom Patterson and first published in 2012. It was designed to be a general-purpose world map that is both pleasing to the eye and useful for thematic mapping.",
        properties: [
            "Pseudocylindrical projection",
            "Neither equal-area nor conformal",
            "Minimal distortion of shapes and areas",
            "Curved meridians",
            "Designed for world maps",
            "Popular for thematic mapping"
        ],
        creator: "Tom Patterson",
        year: "2012",
        type: "Pseudocylindrical",
        useCase: "General world maps, thematic mapping, atlases",
        formula: {
            description: "Natural Earth uses polynomial equations with predefined coefficients for smooth appearance",
            equations: [
                "x = λ × (A₀ + A₁×φ² + A₂×φ⁴)",
                "y = φ × (B₀ + B₁×φ² + B₂×φ⁴)",
                "A₀ = 0.8707, A₁ = -0.131979, A₂ = -0.013791",
                "B₀ = 1.007226, B₁ = 0.015085, B₂ = -0.044475"
            ],
            variables: "λ = longitude (radians), φ = latitude (radians)"
        }
    },
    geoMercator: {
        name: "Mercator",
        description: "The Mercator projection is a cylindrical map projection presented by Flemish geographer and cartographer Gerardus Mercator in 1569. It became the standard map projection for navigation because any straight line drawn on a Mercator map represents a constant compass bearing.",
        properties: [
            "Cylindrical projection",
            "Conformal (preserves angles)",
            "Extreme area distortion at poles",
            "Straight meridians and parallels",
            "Constant compass bearings",
            "Infinite at poles"
        ],
        creator: "Gerardus Mercator",
        year: "1569",
        type: "Cylindrical",
        useCase: "Navigation, web maps (Web Mercator variant)",
        formula: {
            description: "Classic cylindrical projection with logarithmic scaling in y-direction",
            equations: [
                "x = R × λ",
                "y = R × ln(tan(π/4 + φ/2))",
                "Alternative: y = R × ln(tan(φ) + sec(φ))",
                "where R = radius of the Earth"
            ],
            variables: "λ = longitude (radians), φ = latitude (radians)"
        }
    },
    geoOrthographic: {
        name: "Orthographic",
        description: "The orthographic projection is a perspective projection that depicts a hemisphere of the Earth as it would appear from space. It gives the impression of a three-dimensional globe, making it excellent for showing the Earth as it would be seen from space.",
        properties: [
            "Azimuthal projection",
            "Neither equal-area nor conformal",
            "Perspective from infinite distance",
            "Shows hemisphere only",
            "Great visual appeal",
            "Extreme distortion at edges"
        ],
        creator: "Ancient origins",
        year: "Ancient",
        type: "Azimuthal",
        useCase: "Illustrations, showing global perspective, satellite view simulation",
        formula: {
            description: "Perspective projection from infinite distance, showing Earth as seen from space",
            equations: [
                "x = R × cos(φ) × sin(λ - λ₀)",
                "y = R × [cos(φ₁) × sin(φ) - sin(φ₁) × cos(φ) × cos(λ - λ₀)]",
                "Visibility: cos(c) = sin(φ₁) × sin(φ) + cos(φ₁) × cos(φ) × cos(λ - λ₀) ≥ 0"
            ],
            variables: "λ₀ = central longitude, φ₁ = central latitude, R = radius"
        }
    },
    geoStereographic: {
        name: "Stereographic",
        description: "The stereographic projection is a perspective projection that maps the sphere onto a plane. It is conformal, meaning that it preserves angles locally. This projection is particularly useful for mapping polar regions and has been used extensively in crystallography.",
        properties: [
            "Azimuthal projection",
            "Conformal (preserves angles)",
            "Perspective projection",
            "Good for polar regions",
            "Circles map to circles",
            "Used in crystallography"
        ],
        creator: "Hipparchus",
        year: "~150 BC",
        type: "Azimuthal",
        useCase: "Polar maps, crystallography, complex analysis",
        formula: {
            description: "Conformal azimuthal projection that preserves angles and maps circles to circles",
            equations: [
                "k = 2R / (1 + sin(φ₁) × sin(φ) + cos(φ₁) × cos(φ) × cos(λ - λ₀))",
                "x = k × cos(φ) × sin(λ - λ₀)",
                "y = k × [cos(φ₁) × sin(φ) - sin(φ₁) × cos(φ) × cos(λ - λ₀)]"
            ],
            variables: "k = scale factor, φ₁ = central latitude, λ₀ = central longitude"
        }
    },
    geoAlbers: {
        name: "Albers Equal-Area Conic",
        description: "The Albers equal-area conic projection is a conic, equal-area map projection that uses two standard parallels. It is commonly used for maps of regions with a predominantly east-west extent, such as the continental United States.",
        properties: [
            "Conic projection",
            "Equal-area (preserves areas)",
            "Two standard parallels",
            "Good for mid-latitude regions",
            "East-west oriented regions",
            "Minimal distortion between standard parallels"
        ],
        creator: "Heinrich C. Albers",
        year: "1805",
        type: "Conic",
        useCase: "National maps, statistical mapping, thematic maps"
    },
    geoConicEqualArea: {
        name: "Conic Equal Area",
        description: "A conic equal-area projection that preserves area relationships across the map. Like other conic projections, it's well-suited for mapping regions that extend predominantly in an east-west direction.",
        properties: [
            "Conic projection",
            "Equal-area (preserves areas)",
            "Good for mid-latitudes",
            "East-west extent regions",
            "Single or two standard parallels",
            "Area accuracy maintained"
        ],
        creator: "Various developments",
        year: "18th-19th century",
        type: "Conic",
        useCase: "Regional mapping, statistical analysis, area-based studies"
    },
    geoEquirectangular: {
        name: "Equirectangular (Plate Carrée)",
        description: "The equirectangular projection, also known as the plate carrée, is the simplest possible projection. It maps meridians to vertical straight lines of constant spacing, and circles of latitude to horizontal straight lines of constant spacing.",
        properties: [
            "Cylindrical projection",
            "Neither equal-area nor conformal",
            "Simple mathematical relationship",
            "Extreme distortion at poles",
            "Easy to implement",
            "Square pixels for geographic data"
        ],
        creator: "Marinus of Tyre",
        year: "~100 AD",
        type: "Cylindrical",
        useCase: "Simple world maps, data storage, texture mapping",
        formula: {
            description: "The simplest possible projection with direct linear mapping",
            equations: [
                "x = R × (λ - λ₀)",
                "y = R × φ",
                "Scale factor: h = 1/cos(φ)"
            ],
            variables: "λ = longitude, φ = latitude, λ₀ = central meridian, R = radius"
        }
    },
    geoAzimuthalEqualArea: {
        name: "Azimuthal Equal Area (Lambert)",
        description: "The azimuthal equal-area projection preserves area measure, making it useful for statistical and thematic mapping. It can be centered on any point and is particularly good for mapping circular regions around that center point.",
        properties: [
            "Azimuthal projection",
            "Equal-area (preserves areas)",
            "Can be centered anywhere",
            "Good for circular regions",
            "True distances from center",
            "Used in statistical mapping"
        ],
        creator: "Johann Heinrich Lambert",
        year: "1772",
        type: "Azimuthal",
        useCase: "Thematic mapping, statistical analysis, polar mapping"
    },
    geoAzimuthalEquidistant: {
        name: "Azimuthal Equidistant",
        description: "The azimuthal equidistant projection preserves distances from the center point to all other points. This makes it useful for showing true distances and directions from a central location, such as for radio broadcasting coverage maps.",
        properties: [
            "Azimuthal projection",
            "Preserves distances from center",
            "True directions from center",
            "Can be centered anywhere",
            "Used for radio coverage",
            "Great circles from center are straight"
        ],
        creator: "Al-Biruni",
        year: "~1000 AD",
        type: "Azimuthal",
        useCase: "Radio coverage maps, distance calculations, navigation from fixed point"
    },
    geoGnomonic: {
        name: "Gnomonic",
        description: "The gnomonic projection is a perspective projection that projects the Earth from the center of the globe onto a tangent plane. All great circles appear as straight lines on this projection, making it valuable for navigation and geodesy.",
        properties: [
            "Azimuthal projection",
            "Perspective from center",
            "Great circles are straight lines",
            "Cannot show hemisphere",
            "Extreme distortion at edges",
            "Used in navigation"
        ],
        creator: "Thales",
        year: "~580 BC",
        type: "Azimuthal",
        useCase: "Navigation, geodesy, great circle routes"
    },
    geoEqualEarth: {
        name: "Equal Earth",
        description: "The Equal Earth projection is a recent equal-area pseudocylindrical projection designed specifically for world maps. Published in 2018, it was created to provide a visually pleasing alternative to other equal-area projections while maintaining area accuracy.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Visually pleasing",
            "Modern design (2018)",
            "Curved meridians",
            "Good shape preservation"
        ],
        creator: "Bojan Šavrič, Tom Patterson, Bernhard Jenny",
        year: "2018",
        type: "Pseudocylindrical",
        useCase: "Modern world maps, data visualization, educational materials"
    },
    geoRobinson: {
        name: "Robinson",
        description: "The Robinson projection is a pseudocylindrical projection that attempts to balance distortions of area, distance, and direction. It was created for Rand McNally and became popular for world maps due to its pleasing appearance and reasonable compromise between different types of distortion.",
        properties: [
            "Pseudocylindrical projection",
            "Compromise projection",
            "Neither equal-area nor conformal",
            "Curved meridians",
            "Reasonable overall distortion",
            "Popular for world atlases"
        ],
        creator: "Arthur H. Robinson",
        year: "1963",
        type: "Pseudocylindrical",
        useCase: "World atlases, general reference maps, educational materials"
    },
    geoWinkel3: {
        name: "Winkel III (Tripel)",
        description: "The Winkel tripel projection is a modified azimuthal map projection that attempts to minimize distortions of area, direction, and distance. It was adopted by the National Geographic Society as their standard world map projection in 1998.",
        properties: [
            "Modified azimuthal projection",
            "Compromise projection",
            "Minimizes three types of distortion",
            "National Geographic standard",
            "Good overall appearance",
            "Reasonable area and shape"
        ],
        creator: "Oswald Winkel",
        year: "1921",
        type: "Modified Azimuthal",
        useCase: "General world maps, reference atlases, National Geographic"
    },
    geoMollweide: {
        name: "Mollweide",
        description: "The Mollweide projection is an equal-area, pseudocylindrical map projection. It sacrifices accuracy of angle and shape in favor of accurate representation of area. The projection is also known as the Babinet projection or the elliptical projection.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Elliptical shape",
            "Curved meridians",
            "Good for thematic mapping",
            "Shape distortion increases away from center"
        ],
        creator: "Karl Mollweide",
        year: "1805",
        type: "Pseudocylindrical",
        useCase: "Thematic world maps, statistical mapping, equal-area requirements"
    },
    geoHammer: {
        name: "Hammer",
        description: "The Hammer projection is an equal-area map projection described by Ernst Hammer in 1892. It is also known as the Hammer-Aitoff projection, and it's based on the Aitoff projection but modified to preserve area.",
        properties: [
            "Equal-area projection",
            "Elliptical outline",
            "Curved meridians and parallels",
            "Based on Aitoff projection",
            "Good for world maps",
            "Area preservation"
        ],
        creator: "Ernst Hammer",
        year: "1892",
        type: "Pseudocylindrical",
        useCase: "World maps, equal-area thematic mapping, statistical visualization",
        formula: {
            description: "Equal-area modification of the Aitoff projection",
            equations: [
                "x = (2√2 × λ × cos(φ)) / √(1 + cos(φ) × cos(λ/2))",
                "y = (√2 × sin(φ)) / √(1 + cos(φ) × cos(λ/2))"
            ],
            variables: "λ = longitude (radians), φ = latitude (radians)"
        }
    },
    geoSinusoidal: {
        name: "Sinusoidal",
        description: "The sinusoidal projection is an equal-area pseudocylindrical map projection. It shows areas accurately but has significant shape distortion away from the central meridian. It's sometimes called the Sanson-Flamsteed projection.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Sinusoidal meridians",
            "No distortion along central meridian",
            "Increasing distortion away from center",
            "Used for interrupted projections"
        ],
        creator: "Nicolas Sanson",
        year: "1570",
        type: "Pseudocylindrical",
        useCase: "Continental maps, interrupted world maps, area-accurate mapping"
    },
    geoEckert1: {
        name: "Eckert I",
        description: "The first of Max Eckert's six projections, Eckert I is a pseudocylindrical projection with straight meridians. It's neither equal-area nor conformal but provides a reasonable compromise for world mapping.",
        properties: [
            "Pseudocylindrical projection",
            "Straight meridians",
            "Neither equal-area nor conformal",
            "Rectangular outline",
            "Compromise projection",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "General world mapping, educational purposes"
    },
    geoEckert2: {
        name: "Eckert II",
        description: "Eckert II is an equal-area pseudocylindrical projection with straight meridians. It's the second in Max Eckert's series of six projections, designed to preserve area while maintaining a rectangular outline.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Straight meridians",
            "Rectangular outline",
            "Shape distortion away from center",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "Thematic world maps, area-accurate mapping"
    },
    geoEckert3: {
        name: "Eckert III",
        description: "Eckert III is a pseudocylindrical projection that is neither equal-area nor conformal. It features an elliptical outline and curved meridians, providing a visually pleasing representation of the world.",
        properties: [
            "Pseudocylindrical projection",
            "Elliptical outline",
            "Curved meridians",
            "Neither equal-area nor conformal",
            "Compromise projection",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "General world mapping, decorative maps"
    },
    geoEckert4: {
        name: "Eckert IV",
        description: "Eckert IV is an equal-area pseudocylindrical projection with an elliptical outline. It's one of the more popular projections in the Eckert series, balancing area accuracy with visual appeal.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Elliptical outline",
            "Curved meridians",
            "Good shape preservation",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "Thematic world maps, atlas mapping, equal-area visualizations"
    },
    geoEckert5: {
        name: "Eckert V",
        description: "Eckert V is a pseudocylindrical projection that is neither equal-area nor conformal. It has an elliptical outline with sinusoidal meridians, creating a distinctive appearance.",
        properties: [
            "Pseudocylindrical projection",
            "Elliptical outline",
            "Sinusoidal meridians",
            "Neither equal-area nor conformal",
            "Compromise projection",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "General world mapping, artistic cartography"
    },
    geoEckert6: {
        name: "Eckert VI",
        description: "Eckert VI is an equal-area pseudocylindrical projection with an elliptical outline and sinusoidal meridians. It's the last and often considered the best of the Eckert series for its balance of properties.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Elliptical outline",
            "Sinusoidal meridians",
            "Good visual appeal",
            "Part of Eckert series"
        ],
        creator: "Max Eckert",
        year: "1906",
        type: "Pseudocylindrical",
        useCase: "Thematic world maps, atlas production, area-accurate mapping"
    },
    geoVanDerGrinten: {
        name: "Van der Grinten",
        description: "The Van der Grinten projection is a compromise projection that shows the entire world within a circle. It was the standard projection used by the National Geographic Society from 1922 to 1988.",
        properties: [
            "Compromise projection",
            "Circular outline",
            "Neither equal-area nor conformal",
            "Increasing distortion toward edges",
            "Former National Geographic standard",
            "Distinctive circular appearance"
        ],
        creator: "Alphons J. van der Grinten",
        year: "1904",
        type: "Other",
        useCase: "General world maps, historical cartography"
    },
    geoWagner4: {
        name: "Wagner IV",
        description: "Wagner IV is a pseudocylindrical equal-area projection with curved meridians. It's part of Karlheinz Wagner's series of projections designed to improve upon existing pseudocylindrical projections.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Curved meridians",
            "Good shape preservation",
            "Part of Wagner series",
            "Balanced distortion"
        ],
        creator: "Karlheinz Wagner",
        year: "1932",
        type: "Pseudocylindrical",
        useCase: "Thematic world maps, equal-area requirements"
    },
    geoWagner6: {
        name: "Wagner VI",
        description: "Wagner VI is a pseudocylindrical projection that provides a good compromise between area and shape distortion. It's known for its pleasing appearance and reasonable preservation of continental shapes.",
        properties: [
            "Pseudocylindrical projection",
            "Compromise projection",
            "Curved meridians",
            "Good continental shapes",
            "Part of Wagner series",
            "Balanced properties"
        ],
        creator: "Karlheinz Wagner",
        year: "1932",
        type: "Pseudocylindrical",
        useCase: "General world maps, reference mapping"
    },
    geoWagner7: {
        name: "Wagner VII",
        description: "Wagner VII is an equal-area pseudocylindrical projection. It's designed to provide better shape preservation than other equal-area projections while maintaining area accuracy.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Curved meridians",
            "Improved shape preservation",
            "Part of Wagner series",
            "Area accuracy maintained"
        ],
        creator: "Karlheinz Wagner",
        year: "1941",
        type: "Pseudocylindrical",
        useCase: "Thematic mapping, statistical visualization, equal-area analysis"
    },
    geoBoggs: {
        name: "Boggs Eumorphic",
        description: "The Boggs projection is an equal-area pseudocylindrical projection that uses a different mathematical approach to achieve area preservation while attempting to minimize shape distortion.",
        properties: [
            "Pseudocylindrical projection",
            "Equal-area (preserves areas)",
            "Eumorphic design",
            "Curved meridians",
            "Mathematical optimization",
            "Shape distortion minimized"
        ],
        creator: "Samuel Whittemore Boggs",
        year: "1929",
        type: "Pseudocylindrical",
        useCase: "Scientific mapping, equal-area analysis"
    },
    geoHomolosine: {
        name: "Goode Homolosine",
        description: "The Goode homolosine projection is an interrupted, pseudocylindrical, equal-area projection. It combines the Mollweide and sinusoidal projections to reduce distortion by using different projections for different latitudes.",
        properties: [
            "Interrupted projection",
            "Equal-area (preserves areas)",
            "Combines Mollweide and Sinusoidal",
            "Reduces distortion",
            "Good for continental mapping",
            "Pseudocylindrical"
        ],
        creator: "John Paul Goode",
        year: "1923",
        type: "Interrupted",
        useCase: "World atlases, thematic mapping, continental studies"
    },
    geoInterrupt: {
        name: "Interrupted Projection",
        description: "Interrupted projections break the world map into several pieces to reduce distortion. They can be applied to various base projections to create versions with minimal distortion for specific continents or regions.",
        properties: [
            "Interrupted design",
            "Reduces distortion",
            "Multiple map segments",
            "Can be applied to various projections",
            "Good for continental focus",
            "Sacrifices ocean continuity"
        ],
        creator: "Various",
        year: "20th century",
        type: "Interrupted",
        useCase: "Continental mapping, reduced distortion requirements"
    },
    geoKavrayskiy7: {
        name: "Kavrayskiy VII",
        description: "Kavrayskiy VII is a pseudocylindrical projection that represents a compromise between equal-area and conformal properties. It's known for its relatively low distortion and pleasing appearance for world maps.",
        properties: [
            "Pseudocylindrical projection",
            "Compromise projection",
            "Low distortion",
            "Neither equal-area nor conformal",
            "Curved meridians",
            "Good for world mapping"
        ],
        creator: "Vladimir V. Kavrayskiy",
        year: "1939",
        type: "Pseudocylindrical",
        useCase: "General world maps, compromise between different properties"
    },
    geoLoximuthal: {
        name: "Loximuthal",
        description: "The loximuthal projection shows loxodromes (rhumb lines) from a central point as straight lines. This makes it useful for navigation applications where constant compass bearings are important.",
        properties: [
            "Specialized projection",
            "Loxodromes as straight lines",
            "Navigation applications",
            "Constant compass bearings",
            "Can be centered anywhere",
            "Distortion increases with distance"
        ],
        creator: "Karl Siemon and Waldo Tobler",
        year: "1935-1966",
        type: "Other",
        useCase: "Navigation, rhumb line navigation, maritime applications"
    },
    geoMiller: {
        name: "Miller Cylindrical",
        description: "The Miller cylindrical projection is a modified Mercator projection that reduces the extreme polar exaggeration of the standard Mercator. It's neither conformal nor equal-area but provides a reasonable compromise for world maps.",
        properties: [
            "Cylindrical projection",
            "Modified Mercator",
            "Neither equal-area nor conformal",
            "Reduced polar distortion",
            "Straight meridians and parallels",
            "Compromise projection"
        ],
        creator: "Osborn Maitland Miller",
        year: "1942",
        type: "Cylindrical",
        useCase: "General world maps, wall maps, compromise mapping"
    },
    geoPatterson: {
        name: "Patterson Cylindrical",
        description: "The Patterson cylindrical projection is a compromise cylindrical projection designed to be used for general world maps. It provides a balance between the extreme distortions of other cylindrical projections.",
        properties: [
            "Cylindrical projection",
            "Compromise projection",
            "Neither equal-area nor conformal",
            "Balanced distortion",
            "Good for general use",
            "Modern design"
        ],
        creator: "Tom Patterson",
        year: "2014",
        type: "Cylindrical",
        useCase: "General world maps, reference mapping, modern cartography"
    },
    geoTimes: {
        name: "Times",
        description: "The Times projection is a modified Gall stereographic projection that was used by The Times Atlas. It provides a reasonable compromise between different types of distortion for world mapping.",
        properties: [
            "Modified cylindrical projection",
            "Based on Gall stereographic",
            "Neither equal-area nor conformal",
            "Used by The Times Atlas",
            "Compromise projection",
            "Historical significance"
        ],
        creator: "Moir/The Times",
        year: "1965",
        type: "Cylindrical",
        useCase: "Atlas production, general world maps, reference mapping"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectionData;
}

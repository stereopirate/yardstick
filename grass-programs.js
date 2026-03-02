// Yardstick - Grass Programs Database
// Research-backed programs from university extension services

const grassPrograms = {
    // ─────────────────────────────────────────────────────────────────────────
    // TALL FESCUE — Cool Season
    // ─────────────────────────────────────────────────────────────────────────
    tallFescue_zone4: {
        grassType: "Tall Fescue",
        zone: 4,
        description: "Tall fescue maintenance program for Zone 4 - excellent cold tolerance with deep root system",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up winter debris when soil dries",
                    "Begin mowing when grass reaches 4 inches",
                    "Sharpen mower blade"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent for crabgrass (before soil hits 55°F)",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Mow weekly at 3-3.5 inches",
                    "Water 1-1.5 inches per week if dry"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Continue mowing at 3-3.5 inches",
                    "Water as needed",
                    "Spot spray broadleaf weeds if needed"
                ]
            },
            {
                month: "June",
                tasks: [
                    "Raise mowing height to 3.5-4 inches for summer",
                    "Light fertilization: 0.5 lb N per 1,000 sq ft (optional)",
                    "Water deeply: 1-1.5 inches per week",
                    "Monitor for disease"
                ]
            },
            {
                month: "July",
                tasks: [
                    "NO fertilization this month",
                    "Maintain 3.5-4 inch mowing height",
                    "Water 1-1.5 inches per week",
                    "Accept some heat stress (normal)"
                ]
            },
            {
                month: "August",
                tasks: [
                    "NO fertilization",
                    "Continue regular mowing and watering",
                    "Prepare for fall renovation if needed"
                ]
            },
            {
                month: "September",
                importance: "MOST IMPORTANT MONTH",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft (early Sept)",
                    "Core aerate if needed",
                    "Overseed thin areas: 6-8 lbs per 1,000 sq ft",
                    "Soil test every 2-3 years",
                    "Lower mowing back to 3-3.5 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second fall fertilization: 1 lb N per 1,000 sq ft",
                    "Apply lime if pH test showed below 6.0",
                    "Continue overseeding if needed",
                    "Mow weekly"
                ]
            },
            {
                month: "November",
                tasks: [
                    "Final fertilization: 1 lb N per 1,000 sq ft (early Nov)",
                    "Continue mowing until grass stops growing",
                    "Final mowing at 2.5-3 inches",
                    "Clean up leaves"
                ]
            },
            {
                month: "December-February",
                tasks: [
                    "No maintenance needed",
                    "Stay off frozen grass",
                    "Plan spring program"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Tall Fescue Lawn Maintenance Calendar", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Purdue Extension", title: "Cool-Season Grass Care", url: "https://www.purdue.edu/hla/sites/turf/tall-fescue/" }
        ]
    },

    tallFescue_zone5: {
        grassType: "Tall Fescue",
        zone: 5,
        description: "Tall fescue maintenance program for Zone 5 - excellent performance with proper care",
        schedule: [
            {
                month: "March-April",
                tasks: [
                    "Clean up winter debris",
                    "Begin mowing when grass reaches 4 inches",
                    "Apply pre-emergent when soil hits 50-55°F",
                    "First fertilization: 1 lb N per 1,000 sq ft"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Mow weekly at 3-3.5 inches",
                    "Water 1-1.5 inches per week if dry"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing to 3.5-4 inches",
                    "Light summer fertilization: 0.5 lb N (optional)",
                    "Water deeply 1-1.5 inches per week",
                    "Minimal fertilization during heat"
                ]
            },
            {
                month: "September",
                importance: "MOST IMPORTANT",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Core aerate",
                    "Overseed: 6-8 lbs per 1,000 sq ft",
                    "Soil test"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft each month",
                    "Apply lime if needed",
                    "Continue mowing until growth stops",
                    "Final mow at 2.5-3 inches"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Lawn Maintenance Calendar", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Purdue Extension", title: "Cool-Season Lawn Care", url: "https://www.purdue.edu/hla/sites/turf/tall-fescue/" }
        ]
    },

    tallFescue_zone6: {
        grassType: "Tall Fescue",
        zone: 6,
        description: "Tall fescue maintenance program for Zone 6 - reliable performance with moderate heat tolerance",
        schedule: [
            {
                month: "March-April",
                tasks: [
                    "Apply pre-emergent when soil reaches 55°F",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Begin regular mowing at 3-3.5 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Mow weekly",
                    "Water as needed"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing to 3.5-4 inches for heat",
                    "Reduce fertilization (0.5 lb N max in summer)",
                    "Water 1-1.5 inches per week",
                    "Watch for brown patch disease"
                ]
            },
            {
                month: "September",
                importance: "PRIMARY FEEDING SEASON",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Core aerate",
                    "Overseed thin areas",
                    "Soil test"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N each month",
                    "Apply lime if pH below 6.0",
                    "Continue mowing until dormant"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Tall Fescue Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "NC State Extension", title: "Carolina Lawns: Tall Fescue", url: "https://content.ces.ncsu.edu/carolina-lawns" }
        ]
    },

    tallFescue_zone7: {
        grassType: "Tall Fescue",
        zone: 7,
        description: "Tall fescue maintenance for Zone 7 transition zone - heat-tolerant varieties recommended",
        warning: "Zone 7 is transition zone for tall fescue. Use heat-tolerant varieties (Firecracker LS, Mustang 4, Bullseye) for best results.",
        schedule: [
            {
                month: "April",
                tasks: [
                    "Apply pre-emergent when soil hits 55-60°F",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Mow at 3-3.5 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Regular mowing and watering"
                ]
            },
            {
                month: "June-August",
                importance: "CRITICAL - Heat Stress Period",
                tasks: [
                    "RAISE mowing to 4 inches (critical for summer survival)",
                    "Minimize fertilization - 0.5 lb N max if needed",
                    "Water deeply 1.5 inches per week",
                    "Watch for brown patch disease",
                    "Accept some browning - it will recover in fall"
                ]
            },
            {
                month: "September",
                importance: "MOST IMPORTANT MONTH",
                tasks: [
                    "Heavy fertilization: 1.5 lb N per 1,000 sq ft",
                    "Core aerate",
                    "Overseed heavily: 8-10 lbs per 1,000 sq ft (transition zone needs more)",
                    "Soil test"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft each month",
                    "Apply lime if pH below 6.0",
                    "Continue mowing until dormant"
                ]
            }
        ],
        sources: [
            { institution: "NC State Extension", title: "Tall Fescue in the Transition Zone", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Tech Extension", title: "Tall Fescue Management", url: "https://ext.vt.edu/lawn-garden.html" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // KENTUCKY BLUEGRASS — Cool Season
    // ─────────────────────────────────────────────────────────────────────────
    kentuckyBluegrass_zone4: {
        grassType: "Kentucky Bluegrass",
        zone: 4,
        description: "Kentucky Bluegrass program for Zone 4 - thrives in cold climates, the classic northern lawn",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up winter debris when soil firms up",
                    "Dethatch if thatch layer exceeds 0.5 inches",
                    "Soil test every 2-3 years"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent for crabgrass (soil 50-55°F)",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 2.5-3 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Spot treat broadleaf weeds with post-emergent herbicide",
                    "Mow weekly at 2.5-3 inches"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing height to 3-3.5 inches for summer",
                    "Allow summer dormancy if needed — bluegrass recovers in fall",
                    "NO fertilization during dormancy",
                    "Water 1-1.5 inches per week if keeping green"
                ]
            },
            {
                month: "September",
                importance: "MOST IMPORTANT MONTH",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft (early Sept)",
                    "Core aerate — best month for KBG aeration",
                    "Overseed bare/thin areas: 2-4 lbs per 1,000 sq ft",
                    "Soil test and apply lime if pH below 6.5",
                    "Lower mowing height back to 2.5-3 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second fall fertilization: 1 lb N per 1,000 sq ft",
                    "Apply lime if pH below 6.5",
                    "Continue mowing until growth stops"
                ]
            },
            {
                month: "November",
                tasks: [
                    "Winterizer fertilization: 0.75-1 lb N per 1,000 sq ft (early November)",
                    "Final mowing at 2-2.5 inches",
                    "Clean up fallen leaves"
                ]
            },
            {
                month: "December-February",
                tasks: [
                    "Lawn is dormant — no maintenance required",
                    "Stay off frozen turf to prevent crown damage",
                    "Plan spring fertilization and weed program"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Kentucky Bluegrass Lawn Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "University of Minnesota Extension", title: "Kentucky Bluegrass for Northern Climates", url: "https://extension.umn.edu/lawn-care/kentucky-bluegrass" },
            { institution: "Michigan State Extension", title: "Kentucky Bluegrass Care", url: "https://www.canr.msu.edu/turf/kentucky-bluegrass" }
        ]
    },

    kentuckyBluegrass_zone5: {
        grassType: "Kentucky Bluegrass",
        zone: 5,
        description: "Kentucky Bluegrass program for Zone 5 - standard cool-season program delivers excellent results",
        schedule: [
            {
                month: "March-April",
                soilTemp: "50-55°F",
                tasks: [
                    "Clean up winter debris, dethatch if needed",
                    "Apply pre-emergent when soil reaches 50-55°F",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 2.5-3 inches when growing"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Spot treat broadleaf weeds",
                    "Mow weekly, never remove more than 1/3 of blade"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing height to 3-3.5 inches",
                    "Expect and allow summer dormancy — it's normal for KBG",
                    "NO fertilization while dormant",
                    "Water 1-1.5 inches/week only if you choose to keep it green"
                ]
            },
            {
                month: "September",
                importance: "MOST IMPORTANT",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Core aerate",
                    "Overseed thin areas: 2-4 lbs per 1,000 sq ft",
                    "Soil test and apply lime if pH below 6.5"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft",
                    "Apply lime if needed",
                    "Continue mowing until grass stops growing"
                ]
            },
            {
                month: "November",
                tasks: [
                    "Winterizer: 0.75-1 lb N per 1,000 sq ft (early November)",
                    "Final mowing at 2-2.5 inches",
                    "Mulch or remove leaves"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Kentucky Bluegrass Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Purdue Extension", title: "Cool-Season Grass Management", url: "https://www.purdue.edu/hla/sites/turf/" }
        ]
    },

    kentuckyBluegrass_zone6: {
        grassType: "Kentucky Bluegrass",
        zone: 6,
        description: "Kentucky Bluegrass program for Zone 6 - good performance with expected summer dormancy in hot years",
        schedule: [
            {
                month: "March-April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil reaches 50-55°F (early in zone 6)",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Clean up and begin mowing at 2.5-3 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control",
                    "Mow weekly at 2.5-3 inches"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing to 3-3.5 inches for summer heat",
                    "Summer dormancy is expected — do not fertilize during this period",
                    "Water 1-1.5 inches/week if maintaining green, or let go dormant",
                    "Watch for dollar spot and summer patch disease"
                ]
            },
            {
                month: "September",
                importance: "PRIMARY SEASON",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Core aerate",
                    "Overseed bare areas: 2-4 lbs per 1,000 sq ft",
                    "Soil test, apply lime if pH below 6.5"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft in October",
                    "Winterizer: 0.75 lb N in early November",
                    "Apply lime if needed",
                    "Final mowing at 2-2.5 inches"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Kentucky Bluegrass Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Ohio State Extension", title: "Kentucky Bluegrass in the Midwest", url: "https://ohioline.osu.edu/" }
        ]
    },

    kentuckyBluegrass_zone7: {
        grassType: "Kentucky Bluegrass",
        zone: 7,
        description: "Kentucky Bluegrass program for Zone 7 - challenging transition zone; blend with tall fescue for best results",
        warning: "Zone 7 is difficult for Kentucky Bluegrass. Expect significant summer stress and thinning. Consider blending 30-50% tall fescue for better summer survival.",
        schedule: [
            {
                month: "March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent early (soil warms faster in Zone 7)",
                    "First fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Begin mowing at 2.5-3 inches"
                ]
            },
            {
                month: "April-May",
                tasks: [
                    "Second fertilization: 0.75 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control",
                    "Mow weekly — KBG's peak growth window is short in Zone 7"
                ]
            },
            {
                month: "June-September",
                importance: "HIGH STRESS PERIOD",
                tasks: [
                    "Raise mowing to 3.5 inches — heat tolerance is critical",
                    "Expect significant summer thinning and dormancy",
                    "NO fertilization June through August",
                    "Deep water 1.5 inches/week or allow full dormancy",
                    "Light fertilize in early September: 1 lb N per 1,000 sq ft"
                ]
            },
            {
                month: "September-October",
                importance: "RECOVERY WINDOW",
                tasks: [
                    "Core aerate in late September",
                    "Overseed aggressively: 4-6 lbs per 1,000 sq ft to compensate for summer loss",
                    "Fall fertilization: 1 lb N per 1,000 sq ft in October",
                    "Soil test, apply lime if pH below 6.5"
                ]
            },
            {
                month: "November",
                tasks: [
                    "Winterizer: 0.75 lb N per 1,000 sq ft (early Nov)",
                    "Final mowing at 2.5 inches"
                ]
            }
        ],
        sources: [
            { institution: "Virginia Tech Extension", title: "Cool-Season Grasses in Zone 7", url: "https://ext.vt.edu/lawn-garden.html" },
            { institution: "NC State Extension", title: "Kentucky Bluegrass in Transition Zone", url: "https://content.ces.ncsu.edu/carolina-lawns" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PERENNIAL RYEGRASS — Cool Season
    // ─────────────────────────────────────────────────────────────────────────
    perennialRyegrass_zone4: {
        grassType: "Perennial Ryegrass",
        zone: 4,
        description: "Perennial Ryegrass in Zone 4 - marginal cold hardiness; best used in blends with Kentucky Bluegrass for quick germination and traffic tolerance. Winter-kill risk is real — use cold-hardy cultivars (Paragon, Pinnacle IV). Expect to re-seed bare patches after harsh winters.",
        schedule: [
            {
                month: "April-May",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil reaches 50-55°F (often late April in Zone 4)",
                    "First fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Begin mowing at 1.5-2.5 inches once growth is active"
                ]
            },
            {
                month: "June",
                tasks: [
                    "Second fertilization: 0.75 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control if needed",
                    "Mow frequently at 2-2.5 inches — ryegrass grows fast in cool temps"
                ]
            },
            {
                month: "July-August",
                tasks: [
                    "Raise mowing height to 2.5-3 inches for heat stress relief",
                    "Water 1-1.5 inches per week — ryegrass does not tolerate drought well",
                    "Monitor for gray leaf spot and crown rust in humid conditions",
                    "Light fertilization only: 0.5 lb N per 1,000 sq ft if color fades"
                ]
            },
            {
                month: "September",
                importance: "BEST SEEDING MONTH",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Overseed thin and winter-kill patches: 5-8 lbs per 1,000 sq ft (germinates in 5-10 days)",
                    "Core aerate before overseeding for best seed-to-soil contact",
                    "Soil test every 2-3 years — aim for pH 6.0-7.0",
                    "Time carefully: needs 6-8 weeks of establishment before hard frost"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft",
                    "Apply lime if soil pH is below 6.0",
                    "Continue mowing through October; last chance for early-October overseeding only",
                    "Clean up leaves — leaf mat traps moisture and promotes disease"
                ]
            },
            {
                month: "November",
                tasks: [
                    "Final fertilization: 0.5-1 lb N per 1,000 sq ft (early November)",
                    "Final mowing at 2-2.5 inches before dormancy",
                    "Remove leaf debris — critical for preventing snow mold under cover"
                ]
            },
            {
                month: "December-March",
                tasks: [
                    "No maintenance needed",
                    "Stay off frozen and snow-covered turf to prevent crown damage",
                    "Watch for snow mold (pink or gray) when snow melts in spring",
                    "Plan spring program including reseeding any winter-kill patches"
                ]
            }
        ],
        sources: [
            { institution: "University of Minnesota Extension", title: "Lawn Care in Cold Climates", url: "https://extension.umn.edu/lawn-care" },
            { institution: "University of Wisconsin Extension", title: "Perennial Ryegrass in Zone 4", url: "https://wimastergardener.org/article/perennial-ryegrass-lolium-perenne/" },
            { institution: "Michigan State University Extension", title: "Cool-Season Grass Management", url: "https://www.canr.msu.edu/resources/lawn_care" }
        ]
    },

    perennialRyegrass_zone5: {
        grassType: "Perennial Ryegrass",
        zone: 5,
        description: "Perennial Ryegrass program for Zone 5 - best used in blends with KBG for a durable cool-season lawn",
        schedule: [
            {
                month: "March-April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil hits 50-55°F",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 1.5-2.5 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control if needed",
                    "Mow frequently — ryegrass grows fast"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing height to 2.5-3 inches for summer",
                    "Ryegrass can thin or die in heat — do not over-fertilize",
                    "Water 1-1.5 inches per week",
                    "Watch for gray leaf spot and crown rust in humid weather"
                ]
            },
            {
                month: "September",
                importance: "BEST SEEDING MONTH",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Overseed: 5-8 lbs per 1,000 sq ft (germinates in 5-10 days)",
                    "Core aerate before overseeding for best seed contact",
                    "Soil test"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft each month",
                    "Apply lime if pH below 6.0",
                    "Continue mowing through November"
                ]
            }
        ],
        sources: [
            { institution: "Rutgers Cooperative Extension", title: "Perennial Ryegrass Turf Management", url: "https://njaes.rutgers.edu/" },
            { institution: "Penn State Extension", title: "Perennial Ryegrass Maintenance", url: "https://extension.psu.edu/lawn-care" }
        ]
    },

    perennialRyegrass_zone6: {
        grassType: "Perennial Ryegrass",
        zone: 6,
        description: "Perennial Ryegrass program for Zone 6 - performs well in blends; excellent for overseeding and quick repairs",
        schedule: [
            {
                month: "March-April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil reaches 50-55°F",
                    "First fertilization: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 1.5-2.5 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control",
                    "Mow frequently at 2-2.5 inches"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Raise mowing to 2.5-3 inches for heat stress relief",
                    "Expect some thinning in extreme heat — it will recover in fall",
                    "Water 1-1.5 inches per week",
                    "Avoid heavy fertilization in summer heat"
                ]
            },
            {
                month: "September",
                importance: "PRIMARY SEASON",
                tasks: [
                    "Heavy fertilization: 1-1.5 lb N per 1,000 sq ft",
                    "Overseed thin areas: 5-8 lbs per 1,000 sq ft",
                    "Core aerate before seeding",
                    "Soil test"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Fall fertilization: 1 lb N per 1,000 sq ft",
                    "Apply lime if pH below 6.0",
                    "Continue mowing until dormant"
                ]
            }
        ],
        sources: [
            { institution: "Rutgers Cooperative Extension", title: "Perennial Ryegrass in Zone 6", url: "https://njaes.rutgers.edu/" },
            { institution: "Ohio State Extension", title: "Cool-Season Turf in the Midwest", url: "https://ohioline.osu.edu/" }
        ]
    },

    perennialRyegrass_zone7: {
        grassType: "Perennial Ryegrass",
        zone: 7,
        description: "Perennial Ryegrass in Zone 7 - primarily used as winter overseeding for warm-season lawns or in blends",
        schedule: [
            {
                month: "March-April",
                tasks: [
                    "For standalone lawns: apply pre-emergent (soil 50-55°F)",
                    "First fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Begin mowing at 2-2.5 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Second fertilization: 0.75 lb N per 1,000 sq ft",
                    "Ryegrass will struggle as heat builds — water deeply"
                ]
            },
            {
                month: "June-August",
                importance: "HIGH STRESS — May Thin Out",
                tasks: [
                    "Standalone ryegrass may die out in Zone 7 summer heat",
                    "Maintain mowing at 2.5-3 inches",
                    "Water 1.5 inches/week minimum to keep alive",
                    "For winter overseed lawns: warm-season grass is greening up"
                ]
            },
            {
                month: "October",
                importance: "WINTER OVERSEED SEASON",
                tasks: [
                    "Overseed bermuda/zoysia when going dormant: 5-10 lbs per 1,000 sq ft",
                    "Scalp warm-season grass low (0.5-1\") before overseeding",
                    "Keep moist until germination (5-10 days)"
                ]
            },
            {
                month: "November-February",
                tasks: [
                    "Fertilize lightly: 0.5 lb N per 1,000 sq ft to maintain winter color",
                    "Mow at 1.5-2 inches to keep neat",
                    "Water 0.5-0.75 inches per week"
                ]
            },
            {
                month: "March-April",
                tasks: [
                    "Ryegrass will transition out as warm-season grass wakes up",
                    "Raise mowing height to allow warm-season grass to compete",
                    "No fertilizer on ryegrass — feed warm-season grass instead"
                ]
            }
        ],
        sources: [
            { institution: "NC State Extension", title: "Winter Overseeding with Ryegrass", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Tech Extension", title: "Perennial Ryegrass in Zone 7", url: "https://ext.vt.edu/lawn-garden.html" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // BERMUDAGRASS — Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    bermuda_zone6: {
        grassType: "Bermudagrass",
        zone: 6,
        description: "Bermudagrass program for Zone 6 - marginal zone, cold-hardy varieties only (Latitude 36, NorthBridge)",
        warning: "Zone 6 is marginal for Bermudagrass. Only use cold-hardy varieties (Latitude 36, NorthBridge, Riviera). Expect winter damage some years and a shorter active season than zones 7-9.",
        schedule: [
            {
                month: "February-March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil approaches 50-55°F",
                    "Do NOT fertilize yet — wait for full green-up"
                ]
            },
            {
                month: "May",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once fully greened: 0.75-1 lb N per 1,000 sq ft",
                    "Begin mowing at 1-1.5 inches",
                    "Post-emergent broadleaf weed control if needed"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize monthly: 1 lb N per 1,000 sq ft",
                    "Mow every 5-7 days at 1-1.5 inches",
                    "Core aerate in June to reduce compaction"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Last fertilization: 0.5-0.75 lb N (early September — stop 6 weeks before first frost)",
                    "Avoid late fertilization to prevent winterkill risk"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Bermuda goes dormant as temps drop below 55°F",
                    "Stop mowing when growth slows",
                    "Apply potassium (K) to improve cold hardiness if desired"
                ]
            },
            {
                month: "December-February",
                tasks: [
                    "Lawn is dormant — no maintenance needed",
                    "Stay off frozen turf",
                    "Monitor for winter damage from extreme cold"
                ]
            }
        ],
        sources: [
            { institution: "NC State Extension", title: "Bermudagrass in the Transition Zone", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Tech Extension", title: "Bermudagrass Cold Hardiness", url: "https://ext.vt.edu/lawn-garden.html" }
        ]
    },

    bermuda_zone7: {
        grassType: "Bermudagrass",
        zone: 7,
        description: "Bermudagrass program for Zone 7 - excellent summer lawn with cold-hardy varieties; 4-5 months of winter dormancy",
        schedule: [
            {
                month: "February-March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent when soil approaches 50-55°F",
                    "Scalp lawn to 0.5-1 inch to remove dormant material and speed green-up",
                    "Do NOT fertilize until fully greened"
                ]
            },
            {
                month: "April-May",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once fully greened: 1 lb N per 1,000 sq ft (soil must be 65°F)",
                    "Second fertilization: 1 lb N in May",
                    "Post-emergent broadleaf and grassy weed control",
                    "Begin mowing at 1-2 inches"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize monthly: 1 lb N per 1,000 sq ft",
                    "Mow every 5-7 days at 1-2 inches",
                    "Core aerate in June for compaction relief",
                    "Dethatch if thatch exceeds 0.5 inches"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Last heavy fertilization: 0.75-1 lb N (early September)",
                    "Stop fertilizing by mid-September to avoid winterkill",
                    "Optional: overseed with perennial ryegrass for winter color"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Bermuda begins going dormant as nights cool below 55°F",
                    "If overseeding ryegrass: scalp bermuda to 0.5\", sow 5-10 lbs/1,000 sq ft",
                    "Stop mowing bermuda when growth ceases"
                ]
            },
            {
                month: "November-January",
                tasks: [
                    "Bermuda is dormant — no maintenance required",
                    "If ryegrass overseed: mow at 1.5-2\", fertilize lightly 0.5 lb N",
                    "Stay off frozen bermuda"
                ]
            }
        ],
        sources: [
            { institution: "NC State Extension", title: "Bermudagrass Maintenance in Zone 7", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Tech Extension", title: "Bermudagrass Management", url: "https://ext.vt.edu/lawn-garden.html" }
        ]
    },

    bermuda_zone8: {
        grassType: "Bermudagrass",
        zone: 8,
        description: "Bermudagrass program for Zone 8 - bermuda country; excellent performance with aggressive summer growth",
        schedule: [
            {
                month: "February",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent as soil approaches 55°F (often late Feb in Zone 8)",
                    "Do NOT fertilize — wait for full green-up"
                ]
            },
            {
                month: "March",
                soilTemp: "65°F+",
                tasks: [
                    "Scalp lawn to 0.5-1 inch when bermuda begins greening",
                    "First fertilization once 50% greened: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 0.5-2 inches"
                ]
            },
            {
                month: "April-May",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Third fertilization in May: 1 lb N per 1,000 sq ft",
                    "Post-emergent broadleaf weed control",
                    "Core aerate in April for compaction relief"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize monthly: 1 lb N per 1,000 sq ft",
                    "Mow every 5-7 days at 0.5-2 inches (shorter = denser)",
                    "Dethatch if thatch layer exceeds 0.5 inches"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Last main fertilization: 0.75-1 lb N (early September)",
                    "Apply potassium to improve cold hardiness",
                    "Optional: overseed with ryegrass for winter color"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Bermuda slows and goes dormant as temps drop",
                    "If overseeding: scalp to 0.5\", sow 8-10 lbs ryegrass/1,000 sq ft",
                    "Stop mowing bermuda when growth ceases"
                ]
            },
            {
                month: "December-January",
                tasks: [
                    "Bermuda dormant — no maintenance needed",
                    "If ryegrass overseed: maintain mowing and light fertilization"
                ]
            }
        ],
        sources: [
            { institution: "Texas A&M AgriLife Extension", title: "Bermudagrass Management Guide", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "UGA Extension", title: "Bermudagrass Calendar", url: "https://extension.uga.edu/publications/lawn-garden.html" },
            { institution: "NC State Extension", title: "Bermudagrass Maintenance", url: "https://content.ces.ncsu.edu/carolina-lawns" }
        ]
    },

    bermuda_zone9: {
        grassType: "Bermudagrass",
        zone: 9,
        description: "Bermudagrass program for Zone 9 - year-round growing potential with very brief or no dormancy",
        schedule: [
            {
                month: "January-February",
                tasks: [
                    "Apply pre-emergent early (soil stays warm in Zone 9)",
                    "Bermuda may still be semi-active — light fertilization 0.5 lb N if green"
                ]
            },
            {
                month: "February-March",
                soilTemp: "65°F+",
                tasks: [
                    "Scalp lawn to remove any dormant material and speed green-up",
                    "First fertilization: 1 lb N per 1,000 sq ft once fully green",
                    "Begin regular mowing at 0.5-2 inches"
                ]
            },
            {
                month: "April-September",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize every 4-6 weeks: 1 lb N per 1,000 sq ft",
                    "Core aerate in April or May",
                    "Dethatch as needed — bermuda builds thatch fast in Zone 9",
                    "Post-emergent weed control as needed",
                    "Mow every 5-7 days at 0.5-2 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Last main fertilization: 0.75-1 lb N (watch for late-season warm spells)",
                    "Reduce fertilization as growth slows"
                ]
            },
            {
                month: "November-December",
                tasks: [
                    "Bermuda slows significantly; may stay partially green in Zone 9",
                    "Minimal maintenance — mow only if actively growing",
                    "No fertilization needed"
                ]
            }
        ],
        sources: [
            { institution: "Texas A&M AgriLife Extension", title: "Bermudagrass in the Deep South", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "UGA Extension", title: "Bermudagrass for Zone 9", url: "https://extension.uga.edu/publications/lawn-garden.html" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ZOYSIAGRASS — Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    zoysia_zone6: {
        grassType: "Zoysiagrass",
        zone: 6,
        description: "Zoysiagrass program for Zone 6 - marginal zone; use cold-hardy varieties (Meyer, Zenith) for best results",
        warning: "Zone 6 is marginal for zoysia. Use the hardiest varieties (Meyer, Zenith, Crowne). Expect a long dormancy period (October through May) and possibly thin stands after harsh winters.",
        schedule: [
            {
                month: "March-April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent before zoysia greens up (pre-emergent won't hurt dormant zoysia)",
                    "Do NOT fertilize — wait for full green-up in late spring"
                ]
            },
            {
                month: "May-June",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once fully greened (soil 65°F): 0.75-1 lb N per 1,000 sq ft",
                    "Begin mowing at 1-2 inches as growth starts",
                    "Core aerate once actively growing"
                ]
            },
            {
                month: "July-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Second fertilization: 0.75-1 lb N per 1,000 sq ft",
                    "Mow at 1-2 inches every 7-10 days",
                    "Dethatch if thatch layer exceeds 0.5 inches"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Final fertilization: 0.5-0.75 lb N (early September ONLY — stop by Sept 15)",
                    "Late fertilization delays dormancy and increases winterkill risk"
                ]
            },
            {
                month: "October-April",
                tasks: [
                    "Zoysia goes dormant — no maintenance required",
                    "Stay off lawn when frozen",
                    "Dormancy period in Zone 6 can be 6+ months"
                ]
            }
        ],
        sources: [
            { institution: "Kansas State Extension", title: "Zoysiagrass Lawn Care", url: "https://www.bookstore.ksre.ksu.edu/pubs/MF3280.pdf" },
            { institution: "Clemson Extension", title: "Zoysiagrass Maintenance", url: "https://www.clemson.edu/extension/hgic/plants/landscape/lawns/hgic1214.html" }
        ]
    },

    zoysia_zone7: {
        grassType: "Zoysiagrass",
        zone: 7,
        description: "Zoysiagrass program for Zone 7 - excellent transition zone choice with good heat and moderate cold tolerance",
        schedule: [
            {
                month: "March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent while zoysia is still dormant",
                    "Scalp dormant lawn to 0.5-1 inch to remove dead material and speed green-up"
                ]
            },
            {
                month: "April-May",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once 50%+ greened: 0.75-1 lb N per 1,000 sq ft (soil must hit 65°F)",
                    "Begin mowing at 1-2 inches when actively growing",
                    "Post-emergent broadleaf weed control if needed",
                    "Core aerate in May once lawn is fully active"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize every 6-8 weeks: 0.75-1 lb N per 1,000 sq ft",
                    "Mow at 1-2 inches every 7-10 days",
                    "Dethatch if thatch layer exceeds 0.5 inches",
                    "Watch for large patch disease in late summer"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Final fertilization: 0.5-0.75 lb N per 1,000 sq ft (early Sept only — stop by Sept 15)",
                    "Late fertilization increases winterkill risk",
                    "Optional: overseed with ryegrass for winter color"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Zoysia goes dormant — turns golden brown",
                    "If ryegrass overseed: scalp to 0.5\", sow 5-8 lbs/1,000 sq ft",
                    "Stop mowing dormant zoysia"
                ]
            },
            {
                month: "December-February",
                tasks: [
                    "Zoysia is dormant — no maintenance needed",
                    "Stay off frozen turf",
                    "If ryegrass overseed: light maintenance through winter"
                ]
            }
        ],
        sources: [
            { institution: "NC State Extension", title: "Zoysiagrass in the Transition Zone", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Kansas State Extension", title: "Zoysiagrass Care", url: "https://www.bookstore.ksre.ksu.edu/pubs/MF3280.pdf" },
            { institution: "Clemson Extension", title: "Zoysiagrass Maintenance", url: "https://www.clemson.edu/extension/hgic/plants/landscape/lawns/hgic1214.html" }
        ]
    },

    zoysia_zone8: {
        grassType: "Zoysiagrass",
        zone: 8,
        description: "Zoysiagrass program for Zone 8 - excellent performance with a long growing season",
        schedule: [
            {
                month: "February-March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent while zoysia is still dormant",
                    "Scalp lawn to 0.5-1 inch to remove dead material and speed green-up"
                ]
            },
            {
                month: "April",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once fully greened: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 1-2 inches",
                    "Post-emergent weed control"
                ]
            },
            {
                month: "May-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize every 6-8 weeks: 1 lb N per 1,000 sq ft",
                    "Core aerate in May or June",
                    "Dethatch if thatch exceeds 0.5 inches",
                    "Mow at 1-2 inches every 7-10 days"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Final fertilization: 0.75 lb N (early September)",
                    "Stop fertilizing by mid-September to prepare for dormancy"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Zoysia slows and goes dormant",
                    "Stop mowing when growth ceases",
                    "Optional: overseed with ryegrass for winter color"
                ]
            },
            {
                month: "December-January",
                tasks: [
                    "Zoysia dormant — no maintenance needed",
                    "Dormancy period is shorter than zones 6-7"
                ]
            }
        ],
        sources: [
            { institution: "Clemson Extension", title: "Zoysiagrass Maintenance", url: "https://www.clemson.edu/extension/hgic/plants/landscape/lawns/hgic1214.html" },
            { institution: "UGA Extension", title: "Zoysiagrass in Zone 8", url: "https://extension.uga.edu/publications/lawn-garden.html" }
        ]
    },

    zoysia_zone9: {
        grassType: "Zoysiagrass",
        zone: 9,
        description: "Zoysiagrass program for Zone 9 - long active season with minimal dormancy",
        schedule: [
            {
                month: "February",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent (soil warms early in Zone 9)",
                    "Scalp if any dormant material present"
                ]
            },
            {
                month: "March",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once greened: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 1-2 inches"
                ]
            },
            {
                month: "April-September",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize every 6-8 weeks: 1 lb N per 1,000 sq ft",
                    "Core aerate in April or May",
                    "Dethatch regularly — zoysia builds heavy thatch",
                    "Post-emergent weed control as needed",
                    "Mow at 1-2 inches every 7-10 days"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Last fertilization: 0.75 lb N (early October)",
                    "Growth begins slowing noticeably"
                ]
            },
            {
                month: "November-January",
                tasks: [
                    "Zoysia slows considerably; may stay partially green in Zone 9",
                    "Minimal maintenance — mow only if actively growing",
                    "No fertilization needed"
                ]
            }
        ],
        sources: [
            { institution: "Texas A&M AgriLife Extension", title: "Zoysiagrass in Zone 9", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "UGA Extension", title: "Zoysiagrass Care", url: "https://extension.uga.edu/publications/lawn-garden.html" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // ST. AUGUSTINEGRASS — Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    stAugustine_zone8: {
        grassType: "St. Augustinegrass",
        zone: 8,
        description: "St. Augustinegrass program for Zone 8 - good performance in southern Zone 8; protect from hard freezes",
        warning: "St. Augustinegrass cannot be seeded — establish only from sod or plugs. It is sensitive to hard freezes, so protect from temperatures below 25°F.",
        schedule: [
            {
                month: "February-March",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent before grass greens up (and before chinch bug season)",
                    "Do NOT fertilize until soil reaches 65°F and grass is fully green"
                ]
            },
            {
                month: "April",
                soilTemp: "65°F+",
                tasks: [
                    "First fertilization once fully greened: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 3-4 inches",
                    "Start monitoring for chinch bugs (especially in sunny areas)"
                ]
            },
            {
                month: "May-June",
                tasks: [
                    "Second fertilization: 1 lb N per 1,000 sq ft",
                    "Apply iron supplement if yellowing occurs (iron deficiency common)",
                    "Chinch bug monitoring — check margins of lawn near sidewalks/driveways",
                    "Watch for gray leaf spot in warm, wet conditions"
                ]
            },
            {
                month: "July-August",
                importance: "PEST PRESSURE PEAK",
                tasks: [
                    "Third fertilization: 1 lb N per 1,000 sq ft",
                    "Chinch bug monitoring is CRITICAL — treat immediately if spotted",
                    "Watch for gray leaf spot after heavy rain",
                    "Mow at 3.5-4 inches — never scalp"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Final fertilization: 0.75-1 lb N per 1,000 sq ft (early September)",
                    "Stop fertilizing 6-8 weeks before expected first frost"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "St. Augustine slows and may go dormant in Zone 8 hard freezes",
                    "Protect from temperatures below 25°F if possible",
                    "Stop mowing when growth ceases"
                ]
            },
            {
                month: "December-January",
                tasks: [
                    "Lawn is dormant or semi-dormant — no maintenance needed",
                    "Avoid foot traffic on frozen turf"
                ]
            }
        ],
        sources: [
            { institution: "Texas A&M AgriLife Extension", title: "St. Augustinegrass Management", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "Alabama Cooperative Extension", title: "St. Augustinegrass for Zone 8", url: "https://www.aces.edu/" }
        ]
    },

    stAugustine_zone9: {
        grassType: "St. Augustinegrass",
        zone: 9,
        description: "St. Augustinegrass program for Zone 9 - ideal climate; year-round active management with long growing season",
        schedule: [
            {
                month: "January-February",
                tasks: [
                    "Apply pre-emergent early (soil stays warm in Zone 9)",
                    "Light fertilization if lawn is still green: 0.5 lb N per 1,000 sq ft"
                ]
            },
            {
                month: "February-March",
                soilTemp: "65°F+",
                tasks: [
                    "First main fertilization once fully green: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 3-4 inches",
                    "Apply iron if yellowing is present"
                ]
            },
            {
                month: "April-September",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Fertilize every 6-8 weeks: 1 lb N per 1,000 sq ft",
                    "Chinch bug monitoring from April through September — treat if spotted",
                    "Watch for gray leaf spot after heavy rain; apply fungicide if needed",
                    "Apply iron supplement if yellowing occurs",
                    "Mow at 3.5-4 inches every 7-10 days — never scalp"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Final fertilization: 0.75-1 lb N (early October)",
                    "Chinch bug pressure decreases as temperatures drop",
                    "Continue mowing as growth slows"
                ]
            },
            {
                month: "December",
                tasks: [
                    "Minimal maintenance — lawn stays semi-green in Zone 9",
                    "No fertilization needed",
                    "Mow only if actively growing"
                ]
            }
        ],
        sources: [
            { institution: "UF/IFAS Extension", title: "St. Augustinegrass for Florida Lawns", url: "https://edis.ifas.ufl.edu/topic-st-augustinegrass" },
            { institution: "Texas A&M AgriLife Extension", title: "St. Augustinegrass Management", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "LSU AgCenter", title: "St. Augustinegrass Care", url: "https://www.lsuagcenter.com/topics/lawn_garden/lawns" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // FINE FESCUE — Cool Season
    // ─────────────────────────────────────────────────────────────────────────
    fineFescue_zone4: {
        grassType: "Fine Fescue",
        zone: 4,
        description: "Fine fescue program for Zone 4 - cold-hardy and low-input; ideal for shaded and low-maintenance northern lawns",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up winter debris once soil thaws",
                    "Begin mowing when grass reaches 3.5 inches",
                    "Sharpen mower blade"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent for crabgrass before soil hits 55°F",
                    "Optional light fertilization: 0.5 lb N per 1,000 sq ft (fine fescue needs very little)",
                    "Mow at 2.5-3 inches",
                    "Spot spray broadleaf weeds if present"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Mow weekly at 3 inches",
                    "Water if dry — fine fescue needs 0.5-1 inch per week",
                    "Watch for red thread fungus in cool, wet conditions"
                ]
            },
            {
                month: "June",
                tasks: [
                    "Raise mowing height to 3-3.5 inches for summer",
                    "Fine fescue tolerates drought — reduce irrigation as heat increases",
                    "Do NOT fertilize in summer heat"
                ]
            },
            {
                month: "July-August",
                tasks: [
                    "Allow lawn to semi-dormant in extreme heat — it will recover in fall",
                    "Water only during extended drought (2+ weeks without rain)",
                    "Avoid mowing during dormancy stress"
                ]
            },
            {
                month: "September",
                importance: "BEST MONTH",
                tasks: [
                    "Primary fertilization: 0.5-1 lb N per 1,000 sq ft (slow-release preferred)",
                    "Overseed thin or bare areas — ideal germination conditions",
                    "Core aerate before overseeding if soil is compacted",
                    "Resume normal mowing at 2.5-3 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second light fertilization: 0.5 lb N per 1,000 sq ft",
                    "Continue mowing until growth stops",
                    "Rake and remove heavy leaf cover"
                ]
            },
            {
                month: "November-December",
                tasks: [
                    "Final mow at 2.5 inches before first hard freeze",
                    "No fertilization needed",
                    "Avoid compacting frozen turf"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Fine Fescue Lawn Management", url: "https://extension.psu.edu/lawn-care" },
            { institution: "University of Minnesota Extension", title: "Fine Fescue for Low-Maintenance Lawns", url: "https://extension.umn.edu/lawn-care" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue Turf Management", url: "https://njaes.rutgers.edu/" }
        ]
    },

    fineFescue_zone5: {
        grassType: "Fine Fescue",
        zone: 5,
        description: "Fine fescue program for Zone 5 - excellent low-maintenance cool-season option, especially in shade",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up winter debris",
                    "Begin mowing when grass reaches 3.5 inches",
                    "Sharpen mower blade"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent for crabgrass",
                    "Light fertilization optional: 0.5 lb N per 1,000 sq ft",
                    "Begin regular mowing at 2.5-3 inches"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Mow at 3 inches weekly",
                    "Water 0.5-1 inch per week if no rain",
                    "Treat red thread with fungicide only if severe"
                ]
            },
            {
                month: "June",
                tasks: [
                    "Raise to 3-3.5 inches for summer",
                    "Reduce watering — fine fescue is drought tolerant",
                    "Do not fertilize"
                ]
            },
            {
                month: "July-August",
                tasks: [
                    "Allow semi-dormancy in heat — normal for fine fescue",
                    "Water during extreme drought only",
                    "Minimize foot traffic on stressed turf"
                ]
            },
            {
                month: "September",
                importance: "BEST MONTH",
                tasks: [
                    "Primary fertilization: 0.5-1 lb N per 1,000 sq ft",
                    "Overseed thin spots — excellent germination window",
                    "Core aerate if soil is compacted",
                    "Resume mowing at 2.5-3 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second light fertilization: 0.5 lb N per 1,000 sq ft",
                    "Continue mowing until growth stops",
                    "Rake leaves to prevent smothering"
                ]
            },
            {
                month: "November-December",
                tasks: [
                    "Final mow before hard freeze",
                    "No further fertilization",
                    "Winterize equipment"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Fine Fescue Lawn Management", url: "https://extension.psu.edu/lawn-care" },
            { institution: "University of Minnesota Extension", title: "Fine Fescue for Low-Maintenance Lawns", url: "https://extension.umn.edu/lawn-care" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue Turf Management", url: "https://njaes.rutgers.edu/" }
        ]
    },

    fineFescue_zone6: {
        grassType: "Fine Fescue",
        zone: 6,
        description: "Fine fescue program for Zone 6 - good cool-season option especially in shaded sites; watch for summer stress",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up debris; begin mowing when active",
                    "Sharpen blade and check equipment"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent before soil hits 55°F",
                    "Light fertilization: 0.5 lb N per 1,000 sq ft",
                    "Begin mowing at 2.5-3 inches",
                    "Spot spray broadleaf weeds"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Mow at 3 inches weekly",
                    "Water 0.5-1 inch per week",
                    "Monitor for red thread in cool wet weather"
                ]
            },
            {
                month: "June",
                tasks: [
                    "Raise mowing height to 3-3.5 inches",
                    "Reduce irrigation — allow natural semi-dormancy to begin",
                    "Do not fertilize"
                ]
            },
            {
                month: "July-August",
                tasks: [
                    "Fine fescue will semi-dormant in Zone 6 heat — this is normal",
                    "Irrigate only to prevent complete kill (1/2 inch every 2 weeks)",
                    "Avoid heavy foot traffic"
                ]
            },
            {
                month: "September",
                importance: "BEST MONTH",
                tasks: [
                    "Primary fertilization: 0.5-1 lb N per 1,000 sq ft",
                    "Overseed bare and thin spots",
                    "Core aerate if needed",
                    "Resume mowing at 2.5-3 inches"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second fertilization: 0.5 lb N per 1,000 sq ft",
                    "Continue mowing until frost",
                    "Mulch or remove leaves"
                ]
            },
            {
                month: "November-December",
                tasks: [
                    "Final mow at 2.5-3 inches before freeze",
                    "No fertilization"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Fine Fescue Lawn Management", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue Turf Management", url: "https://njaes.rutgers.edu/" },
            { institution: "Virginia Cooperative Extension", title: "Lawn Care Guide for Cool-Season Grasses", url: "https://www.pubs.ext.vt.edu/" }
        ]
    },

    fineFescue_zone7: {
        grassType: "Fine Fescue",
        zone: 7,
        description: "Fine fescue program for Zone 7 - challenging; best used in shaded areas where tall fescue struggles",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Begin mowing as soon as active growth starts",
                    "Clean up winter debris"
                ]
            },
            {
                month: "April",
                soilTemp: "50-55°F",
                tasks: [
                    "Apply pre-emergent before soil warms",
                    "Light fertilization: 0.5 lb N per 1,000 sq ft",
                    "Spot treat broadleaf weeds"
                ]
            },
            {
                month: "May",
                tasks: [
                    "Mow at 3-3.5 inches",
                    "Water 0.75-1 inch per week",
                    "Fine fescue works best in shaded areas — monitor sun-exposed spots for stress"
                ]
            },
            {
                month: "June-August",
                tasks: [
                    "Fine fescue will go dormant in Zone 7 heat — especially in full sun",
                    "Provide deep watering every 2 weeks to prevent permanent damage in shaded areas",
                    "Do not fertilize during dormancy",
                    "Consider overseeding stressed areas with tall fescue in fall"
                ]
            },
            {
                month: "September",
                importance: "BEST MONTH",
                tasks: [
                    "Primary fertilization: 0.5 lb N per 1,000 sq ft",
                    "Overseed any areas lost to summer stress",
                    "Core aerate if soil is compacted"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Second light fertilization: 0.5 lb N per 1,000 sq ft",
                    "Mow at 2.5-3 inches until growth stops"
                ]
            },
            {
                month: "November-December",
                tasks: [
                    "Final mow before frost",
                    "No further fertilization"
                ]
            }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Fine Fescue Lawn Management", url: "https://extension.psu.edu/lawn-care" },
            { institution: "NC State Extension", title: "Carolina Lawns - Cool Season Grasses", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Cooperative Extension", title: "Lawn Care Guide for the Transition Zone", url: "https://www.pubs.ext.vt.edu/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CENTIPEDEGRASS — Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    centipede_zone7: {
        grassType: "Centipedegrass",
        zone: 7,
        description: "Centipedegrass program for Zone 7 - marginal zone; protect from freeze and avoid over-managing",
        schedule: [
            {
                month: "March-April",
                soilTemp: "65°F+",
                tasks: [
                    "Wait for full green-up before any activity (soil must reach 65°F)",
                    "Apply pre-emergent once lawn is fully green",
                    "Do NOT fertilize until fully greened up"
                ]
            },
            {
                month: "May",
                importance: "FIRST FERTILIZATION",
                tasks: [
                    "First fertilization: 0.5 lb N per 1,000 sq ft — use low-phosphorus fertilizer",
                    "Begin mowing at 1.5-2 inches",
                    "Apply iron sulfate if yellowing is present (do not add more nitrogen)"
                ]
            },
            {
                month: "June-July",
                tasks: [
                    "Mow at 1.5-2 inches every 7-10 days",
                    "Water 1 inch per week — centipede has moderate drought tolerance",
                    "Watch for large patch disease — avoid excess fertilizer"
                ]
            },
            {
                month: "August",
                tasks: [
                    "Optional second fertilization: 0.5 lb N per 1,000 sq ft (do not exceed 1 lb total for the year)",
                    "Monitor for thatch — dethatch if over 0.5 inch",
                    "Water as needed"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Stop fertilizing by September 1 — late feeding increases freeze damage risk",
                    "Reduce irrigation as temperatures drop",
                    "Do not core aerate — centipede recovers slowly from disruption"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Lawn goes dormant — reduce mowing as growth slows",
                    "Do not fertilize",
                    "Protect from early hard freezes if possible with light cover"
                ]
            },
            {
                month: "December-February",
                tasks: [
                    "Dormant — no mowing, no fertilization",
                    "Zone 7 freeze risk: watch for extended freezes below 20°F",
                    "Do not walk on frozen turf"
                ]
            }
        ],
        sources: [
            { institution: "Clemson Cooperative Extension", title: "Centipedegrass Maintenance", url: "https://www.clemson.edu/extension/hgic/" },
            { institution: "NC State Extension", title: "Centipedegrass in the Southeast", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "UGA Extension", title: "Centipedegrass Management", url: "https://extension.uga.edu/publications/lawn-garden.html" }
        ]
    },

    centipede_zone8: {
        grassType: "Centipedegrass",
        zone: 8,
        description: "Centipedegrass program for Zone 8 - prime centipede territory; low-input management is key",
        schedule: [
            {
                month: "February-March",
                soilTemp: "65°F+",
                tasks: [
                    "Apply pre-emergent once soil reaches 65°F (late February to early March in Zone 8)",
                    "Do NOT fertilize until lawn is fully green"
                ]
            },
            {
                month: "April",
                importance: "FIRST FERTILIZATION",
                tasks: [
                    "First fertilization once fully green: 0.5-1 lb N per 1,000 sq ft",
                    "Use a low-phosphorus, iron-enhanced fertilizer",
                    "Begin mowing at 1.5-2 inches",
                    "Apply iron sulfate if chlorosis (yellowing) appears"
                ]
            },
            {
                month: "May-June",
                tasks: [
                    "Mow at 1.5-2 inches every 7-10 days",
                    "Water 1 inch per week",
                    "Watch for large patch — fungicide if needed"
                ]
            },
            {
                month: "July-August",
                tasks: [
                    "Optional second fertilization: 0.5 lb N per 1,000 sq ft",
                    "Total annual nitrogen should not exceed 1-2 lbs per 1,000 sq ft",
                    "Continue watering and mowing",
                    "Iron supplement if yellowing occurs"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Final fertilization no later than early September",
                    "Reduce irrigation as growth slows",
                    "Monitor for thatch — dethatch in spring if needed"
                ]
            },
            {
                month: "October-November",
                tasks: [
                    "Lawn enters dormancy — reduce mowing",
                    "No fertilization",
                    "Apply a winterizer only if soil test indicates low potassium"
                ]
            },
            {
                month: "December-January",
                tasks: [
                    "Dormant — no action needed",
                    "Avoid foot traffic on frozen or frost-covered turf"
                ]
            }
        ],
        sources: [
            { institution: "Clemson Cooperative Extension", title: "Centipedegrass Maintenance", url: "https://www.clemson.edu/extension/hgic/" },
            { institution: "NC State Extension", title: "Centipedegrass in the Southeast", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "UGA Extension", title: "Centipedegrass Management", url: "https://extension.uga.edu/publications/lawn-garden.html" }
        ]
    },

    centipede_zone9: {
        grassType: "Centipedegrass",
        zone: 9,
        description: "Centipedegrass program for Zone 9 - near year-round growing season; discipline in low fertilization is critical",
        schedule: [
            {
                month: "February",
                soilTemp: "65°F+",
                tasks: [
                    "Apply pre-emergent by mid-February — soil warms early in Zone 9",
                    "Lawn may begin showing growth; do not fertilize until fully green"
                ]
            },
            {
                month: "March-April",
                importance: "FIRST FERTILIZATION",
                tasks: [
                    "First fertilization: 0.5-1 lb N per 1,000 sq ft with low-phosphorus formula",
                    "Begin mowing at 1.5-2 inches",
                    "Apply iron if any yellowing is present"
                ]
            },
            {
                month: "May-August",
                tasks: [
                    "Mow every 7-10 days at 1.5-2 inches during peak season",
                    "Water 1 inch per week — reduce during rainy periods",
                    "Second fertilization (July): 0.5 lb N per 1,000 sq ft",
                    "Total annual N must not exceed 2 lbs per 1,000 sq ft",
                    "Apply iron supplement as needed for yellowing"
                ]
            },
            {
                month: "September-October",
                tasks: [
                    "Final fertilization no later than September (0.5 lb N per 1,000 sq ft)",
                    "Reduce irrigation as temperatures begin to drop",
                    "Watch for large patch as cooler, wetter weather arrives"
                ]
            },
            {
                month: "November-January",
                tasks: [
                    "Lawn slows significantly in Zone 9 winter but may stay partially green",
                    "No fertilization",
                    "Mow only if actively growing"
                ]
            }
        ],
        sources: [
            { institution: "UF/IFAS Extension", title: "Centipedegrass for Florida Lawns", url: "https://edis.ifas.ufl.edu/" },
            { institution: "LSU AgCenter", title: "Centipedegrass Lawn Care", url: "https://www.lsuagcenter.com/topics/lawn_garden/lawns" },
            { institution: "Clemson Cooperative Extension", title: "Centipedegrass Maintenance", url: "https://www.clemson.edu/extension/hgic/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // BAHIAGRASS — Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    bahia_zone8: {
        grassType: "Bahiagrass",
        zone: 8,
        description: "Bahiagrass program for Zone 8 - low-input warm-season grass; excellent drought tolerance once established",
        schedule: [
            {
                month: "February-March",
                soilTemp: "65°F+",
                tasks: [
                    "Apply pre-emergent once soil reaches 65°F",
                    "Do not fertilize until lawn is actively growing and green"
                ]
            },
            {
                month: "April",
                importance: "FIRST FERTILIZATION",
                tasks: [
                    "First fertilization once green: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 3-4 inches — mow frequently to remove seed heads",
                    "Spot treat broadleaf weeds"
                ]
            },
            {
                month: "May-June",
                tasks: [
                    "Mow every 7-10 days at 3-4 inches — seed heads will be persistent",
                    "Second fertilization in June: 1 lb N per 1,000 sq ft",
                    "Water 0.75-1 inch per week if no rain"
                ]
            },
            {
                month: "July",
                tasks: [
                    "Bahiagrass is at peak growth — mow frequently",
                    "Apply mole cricket bait if tunneling is visible in turf",
                    "Deep water during drought periods"
                ]
            },
            {
                month: "August-September",
                tasks: [
                    "Third fertilization (August): 1 lb N per 1,000 sq ft",
                    "Continue mole cricket monitoring",
                    "Mow at 3-4 inches to maintain density"
                ]
            },
            {
                month: "October",
                tasks: [
                    "Final fertilization: 0.5-1 lb N per 1,000 sq ft (early October only)",
                    "Mowing frequency decreases as growth slows",
                    "Apply pre-emergent for winter weeds"
                ]
            },
            {
                month: "November-January",
                tasks: [
                    "Lawn goes dormant — no fertilization",
                    "Mow only if actively growing",
                    "Dormant overseeding with ryegrass optional for winter color"
                ]
            }
        ],
        sources: [
            { institution: "UF/IFAS Extension", title: "Bahiagrass for Florida Lawns", url: "https://edis.ifas.ufl.edu/" },
            { institution: "LSU AgCenter", title: "Bahiagrass Lawn Care", url: "https://www.lsuagcenter.com/topics/lawn_garden/lawns" },
            { institution: "Texas A&M AgriLife Extension", title: "Bahiagrass Management", url: "https://agrilifeextension.tamu.edu/" }
        ]
    },

    bahia_zone9: {
        grassType: "Bahiagrass",
        zone: 9,
        description: "Bahiagrass program for Zone 9 - prime bahia territory; long growing season with excellent natural drought tolerance",
        schedule: [
            {
                month: "February",
                soilTemp: "65°F+",
                tasks: [
                    "Apply pre-emergent by mid-to-late February",
                    "Lawn begins growing early in Zone 9 — watch for green-up"
                ]
            },
            {
                month: "March-April",
                importance: "FIRST FERTILIZATION",
                tasks: [
                    "First fertilization once fully green: 1 lb N per 1,000 sq ft",
                    "Begin mowing at 3-4 inches",
                    "Spot treat emerging broadleaf weeds"
                ]
            },
            {
                month: "May-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Mow every 7-10 days — remove seed heads frequently",
                    "Fertilize every 6-8 weeks: 1 lb N per 1,000 sq ft",
                    "Apply mole cricket bait in July-August if needed",
                    "Water 0.75-1 inch per week during dry spells",
                    "Treat dollar spot with fungicide if circular brown patches appear"
                ]
            },
            {
                month: "September-October",
                tasks: [
                    "Final fertilization: 1 lb N per 1,000 sq ft (September)",
                    "Pre-emergent reapplication for winter annuals",
                    "Mowing slows as temperatures drop"
                ]
            },
            {
                month: "November-January",
                tasks: [
                    "Lawn enters partial dormancy in Zone 9 — stays semi-green",
                    "No fertilization",
                    "Optional ryegrass overseeding for winter color"
                ]
            }
        ],
        sources: [
            { institution: "UF/IFAS Extension", title: "Bahiagrass for Florida Lawns", url: "https://edis.ifas.ufl.edu/" },
            { institution: "LSU AgCenter", title: "Bahiagrass Lawn Care", url: "https://www.lsuagcenter.com/topics/lawn_garden/lawns" },
            { institution: "Texas A&M AgriLife Extension", title: "Bahiagrass Management", url: "https://agrilifeextension.tamu.edu/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // BUFFALOGRASS — Native Warm Season
    // ─────────────────────────────────────────────────────────────────────────
    buffalograss_zone5: {
        grassType: "Buffalograss",
        zone: 5,
        description: "Buffalograss program for Zone 5 - ultra-low input native grass best suited for dry western climates",
        schedule: [
            {
                month: "March-April",
                tasks: [
                    "Remove winter debris",
                    "Do NOT seed or fertilize until soil reaches 60°F",
                    "Patience required — buffalograss greens up later than other grasses"
                ]
            },
            {
                month: "May",
                soilTemp: "60°F+",
                tasks: [
                    "Lawn begins greening up — begin mowing at 2-4 inches",
                    "First fertilization if needed: 0.5 lb N per 1,000 sq ft (many lawns need none)",
                    "Best time to seed or plug if establishing new areas"
                ]
            },
            {
                month: "June-July",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Mow at 3-4 inches every 2-3 weeks — buffalograss grows slowly",
                    "Water only during extended drought: 0.25-0.5 inches per week",
                    "Do not over-irrigate — promotes crabgrass and broadleaf weed invasion",
                    "Optional second fertilization: 0.5 lb N per 1,000 sq ft (not required)"
                ]
            },
            {
                month: "August",
                tasks: [
                    "Continue minimal irrigation",
                    "Spot treat broadleaf weeds with selective herbicide if needed",
                    "Mow if turf exceeds desired height"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Do NOT fertilize in fall — buffalograss does not benefit from fall feeding",
                    "Lawn begins preparing for dormancy",
                    "Final mow before dormancy if needed"
                ]
            },
            {
                month: "October-April",
                tasks: [
                    "Dormant — no mowing, no fertilization, no irrigation needed",
                    "Buffalograss turns tan/straw during dormancy — this is normal",
                    "Do not walk on frozen turf"
                ]
            }
        ],
        sources: [
            { institution: "Kansas State Extension", title: "Buffalograss Lawn Care for the Plains", url: "https://www.bookstore.ksre.ksu.edu/" },
            { institution: "University of Nebraska Extension", title: "Buffalograss for Low-Maintenance Lawns", url: "https://extension.unl.edu/" },
            { institution: "Texas A&M AgriLife Extension", title: "Buffalograss Management", url: "https://agrilifeextension.tamu.edu/" }
        ]
    },

    buffalograss_zone6: {
        grassType: "Buffalograss",
        zone: 6,
        description: "Buffalograss program for Zone 6 - good in dry western areas; not recommended for humid eastern Zone 6",
        schedule: [
            {
                month: "March-April",
                tasks: [
                    "Remove winter debris",
                    "Wait for consistent soil temps of 60°F before any action",
                    "Buffalograss greens up late — do not rush"
                ]
            },
            {
                month: "May",
                soilTemp: "60°F+",
                tasks: [
                    "Lawn greens up — begin mowing at 2-4 inches",
                    "Optional first fertilization: 0.5 lb N per 1,000 sq ft",
                    "Plant seed or plugs in bare areas"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Mow every 2-3 weeks at 3-4 inches",
                    "Irrigate only during drought: 0.25-0.5 inches per week maximum",
                    "Spot spray broadleaf weeds as needed",
                    "Second fertilization optional: 0.5 lb N per 1,000 sq ft"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Lawn begins slowing — no fertilization",
                    "Final mow before dormancy"
                ]
            },
            {
                month: "October-April",
                tasks: [
                    "Dormant and tan — normal seasonal appearance",
                    "No maintenance needed during dormancy"
                ]
            }
        ],
        sources: [
            { institution: "Kansas State Extension", title: "Buffalograss Lawn Care for the Plains", url: "https://www.bookstore.ksre.ksu.edu/" },
            { institution: "University of Nebraska Extension", title: "Buffalograss for Low-Maintenance Lawns", url: "https://extension.unl.edu/" },
            { institution: "Texas A&M AgriLife Extension", title: "Buffalograss Management", url: "https://agrilifeextension.tamu.edu/" }
        ]
    },

    buffalograss_zone7: {
        grassType: "Buffalograss",
        zone: 7,
        description: "Buffalograss program for Zone 7 - excellent in dry regions of the Great Plains and western states",
        schedule: [
            {
                month: "March",
                tasks: [
                    "Clean up winter debris",
                    "Wait for soil temps to reach 60°F before any activity"
                ]
            },
            {
                month: "April-May",
                soilTemp: "60°F+",
                tasks: [
                    "Lawn greens up — begin mowing at 2-4 inches",
                    "First fertilization if desired: 0.5 lb N per 1,000 sq ft",
                    "Apply pre-emergent to control crabgrass"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Mow every 2-3 weeks at 3-4 inches",
                    "Minimal irrigation — 0.25-0.5 inches per week only if no rain",
                    "Spot treat broadleaf weeds",
                    "Second fertilization optional (0.5 lb N) in early June only"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Growth slows — reduce mowing",
                    "No fertilization in fall",
                    "Final mow at 3 inches before dormancy"
                ]
            },
            {
                month: "October-March",
                tasks: [
                    "Dormant — minimal care needed",
                    "Turf appears tan/straw — completely normal"
                ]
            }
        ],
        sources: [
            { institution: "Kansas State Extension", title: "Buffalograss Lawn Care for the Plains", url: "https://www.bookstore.ksre.ksu.edu/" },
            { institution: "Texas A&M AgriLife Extension", title: "Buffalograss Management", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "University of Nebraska Extension", title: "Buffalograss for Low-Maintenance Lawns", url: "https://extension.unl.edu/" }
        ]
    },

    buffalograss_zone8: {
        grassType: "Buffalograss",
        zone: 8,
        description: "Buffalograss program for Zone 8 - works in dry western Zone 8; bermuda or zoysia often better in humid areas",
        schedule: [
            {
                month: "February-March",
                soilTemp: "60°F+",
                tasks: [
                    "Buffalograss greens up early in Zone 8",
                    "Apply pre-emergent for warm-season weeds",
                    "Begin mowing once actively growing"
                ]
            },
            {
                month: "April-May",
                tasks: [
                    "First fertilization: 0.5 lb N per 1,000 sq ft",
                    "Mow at 3-4 inches every 2-3 weeks",
                    "Spot treat broadleaf weeds"
                ]
            },
            {
                month: "June-August",
                importance: "PEAK GROWING SEASON",
                tasks: [
                    "Irrigate minimally — 0.25-0.5 inches per week in dry periods",
                    "Do not over-water — this promotes bermuda weed invasion",
                    "Mow at 3-4 inches every 2-3 weeks",
                    "Second fertilization optional: 0.5 lb N per 1,000 sq ft"
                ]
            },
            {
                month: "September",
                tasks: [
                    "Lawn begins slowing",
                    "No fall fertilization",
                    "Final mow at 3 inches"
                ]
            },
            {
                month: "October-February",
                tasks: [
                    "Dormant — minimal to no maintenance",
                    "Lawn appearance is tan/straw — normal"
                ]
            }
        ],
        sources: [
            { institution: "Texas A&M AgriLife Extension", title: "Buffalograss Management", url: "https://agrilifeextension.tamu.edu/" },
            { institution: "Kansas State Extension", title: "Buffalograss Lawn Care for the Plains", url: "https://www.bookstore.ksre.ksu.edu/" },
            { institution: "University of Nebraska Extension", title: "Buffalograss for Low-Maintenance Lawns", url: "https://extension.unl.edu/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SUN & SHADE MIX — Cool Season Blend (KBG + Perennial Rye + Fine Fescue)
    // Follow KBG care rates; fine fescue tolerates shade areas
    // ─────────────────────────────────────────────────────────────────────────
    sunShadeMix_zone4: {
        grassType: "Sun & Shade Mix",
        zone: 4,
        description: "Sun & shade blend for Zone 4 — cool northern climate where all three component grasses thrive",
        schedule: [
            { month: "March", tasks: ["Clean up winter debris when soil dries", "Begin mowing when grass reaches 4 inches (3-3.5 inch height)", "Sharpen mower blade"] },
            { month: "April", soilTemp: "50-55°F", tasks: ["Apply pre-emergent before soil hits 55°F", "First fertilization: 0.75 lb N per 1,000 sq ft", "Mow weekly at 3-3.5 inches", "Water 1-1.25 inches per week if dry"] },
            { month: "May", tasks: ["Second fertilization: 0.75 lb N per 1,000 sq ft", "Continue mowing at 3-3.5 inches", "Spot spray broadleaf weeds if needed"] },
            { month: "June-August", tasks: ["Raise mowing height to 3.5-4 inches for summer", "Minimal fertilization during heat — skip if stressed", "Water 1-1.25 inches per week; shade areas need less", "Accept KBG-component summer thinning — it recovers in fall"] },
            { month: "September", importance: "MOST IMPORTANT MONTH", tasks: ["Heavy fertilization: 1 lb N per 1,000 sq ft", "Core aerate if needed", "Overseed thin areas with matching sun/shade blend: 4-6 lbs per 1,000 sq ft", "Lower mowing back to 3-3.5 inches"] },
            { month: "October", tasks: ["Second fall fertilization: 0.75 lb N per 1,000 sq ft", "Apply lime if soil pH below 6.0", "Continue mowing until growth stops"] },
            { month: "November", tasks: ["Final fertilization: 0.75 lb N per 1,000 sq ft (early Nov)", "Final mowing at 2.5-3 inches", "Clean up leaves"] },
            { month: "December-February", tasks: ["No maintenance needed", "Stay off frozen grass", "Plan spring program"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Cool-Season Lawn Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "University of Minnesota Extension", title: "KBG and Fine Fescue Blends", url: "https://extension.umn.edu/lawn-care/kentucky-bluegrass" }
        ]
    },

    sunShadeMix_zone5: {
        grassType: "Sun & Shade Mix",
        zone: 5,
        description: "Sun & shade blend for Zone 5 — excellent performance with consistent fall care",
        schedule: [
            { month: "March-April", soilTemp: "50-55°F", tasks: ["Clean up winter debris", "Apply pre-emergent when soil hits 50-55°F", "First fertilization: 0.75 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "May", tasks: ["Second fertilization: 0.75 lb N per 1,000 sq ft", "Mow weekly", "Spot spray broadleaf weeds if needed"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches for summer heat", "Water 1-1.25 inches per week (shade areas need less)", "Hold fertilization during heat; 0.5 lb N max if lawn looks healthy", "Accept some summer thinning in sunny areas — normal for KBG component"] },
            { month: "September", importance: "MOST IMPORTANT MONTH", tasks: ["Heavy fertilization: 1 lb N per 1,000 sq ft", "Core aerate", "Overseed with matching sun/shade blend: 4-6 lbs per 1,000 sq ft", "Lower mowing back to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Two fall fertilizations: 0.75 lb N each", "Apply lime if pH below 6.0", "Continue mowing until growth stops", "Final mow at 2.5-3 inches"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Cool-Season Lawn Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue and Ryegrass Blends", url: "https://njaes.rutgers.edu/fs1316/" }
        ]
    },

    sunShadeMix_zone6: {
        grassType: "Sun & Shade Mix",
        zone: 6,
        description: "Sun & shade blend for Zone 6 — reliable but requires consistent fall overseeding to maintain density",
        schedule: [
            { month: "March-April", soilTemp: "55°F", tasks: ["Apply pre-emergent when soil reaches 55°F", "First fertilization: 0.75 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "May", tasks: ["Second fertilization: 0.75 lb N per 1,000 sq ft", "Mow weekly at 3-3.5 inches"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches for heat", "Water 1-1.25 inches per week", "Reduce or skip fertilization (0.5 lb N max)", "Watch for brown patch in humid weeks", "Accept thinning in full-sun areas — overseed in fall"] },
            { month: "September", importance: "PRIMARY FEEDING SEASON", tasks: ["Heavy fertilization: 1 lb N per 1,000 sq ft", "Core aerate", "Overseed thin and full-sun areas with matching blend: 5-7 lbs per 1,000 sq ft", "Lower mowing back to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 0.75 lb N per 1,000 sq ft", "Continue mowing until growth stops", "Final mow at 2.5-3 inches"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Cool-Season Lawn Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "NC State Extension", title: "Carolina Lawns: Cool-Season Grasses", url: "https://content.ces.ncsu.edu/carolina-lawns" }
        ]
    },

    sunShadeMix_zone7: {
        grassType: "Sun & Shade Mix",
        zone: 7,
        description: "Sun & shade blend for Zone 7 — best suited for shaded areas; full-sun spots will struggle in summer",
        schedule: [
            { month: "February-March", soilTemp: "55°F", tasks: ["Apply pre-emergent early (soil warms faster here)", "First fertilization: 0.75 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "April-May", tasks: ["Second fertilization: 0.75 lb N per 1,000 sq ft", "Mow weekly", "Water as needed — 1-1.25 inches per week"] },
            { month: "June-August", tasks: ["Raise mowing to 4 inches for heat stress management", "Water deeply 1.25 inches per week — increase if very hot", "NO fertilization in peak summer heat", "Expect significant thinning in full-sun areas — plan fall overseeding", "Shaded areas will look better than sun-exposed areas"] },
            { month: "September", importance: "CRITICAL — RECOVER SUMMER DAMAGE", tasks: ["Heavy fertilization: 1 lb N per 1,000 sq ft (early Sept)", "Core aerate all thinned areas", "Overseed aggressively with matching blend: 6-8 lbs per 1,000 sq ft", "Lower mowing to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 0.75 lb N per 1,000 sq ft", "Mow until growth stops", "Final mow at 3 inches"] }
        ],
        sources: [
            { institution: "NC State Extension", title: "Carolina Lawns: Transition Zone Care", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Cooperative Extension", title: "Lawn Care in the Transition Zone", url: "https://www.pubs.ext.vt.edu/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // DENSE SHADE MIX — Cool Season Blend (Fine Fescue dominant)
    // Very low input — fine fescue thrives on minimal care
    // ─────────────────────────────────────────────────────────────────────────
    denseShade_zone4: {
        grassType: "Dense Shade Mix",
        zone: 4,
        description: "Dense shade blend for Zone 4 — low-input fine fescue program for shaded northern lawns",
        schedule: [
            { month: "March", tasks: ["Gently rake out any matted debris — avoid aggressive raking", "Begin light mowing when grass reaches 4 inches (3-3.5 inch height)"] },
            { month: "April", tasks: ["Light fertilization: 0.5 lb N per 1,000 sq ft (slow-release preferred)", "Mow at 3-3.5 inches — do not mow shorter", "Water only if very dry (shade reduces evaporation)"] },
            { month: "May", tasks: ["Mow weekly as needed", "Spot spray weeds carefully — fine fescue is sensitive to some herbicides", "No additional fertilization needed"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches in summer", "NO fertilization — over-feeding fine fescue causes surge growth and disease", "Water only if extended dry spell (1-2 weeks without rain)", "Lawn may semi-dormant and look tired — this is normal"] },
            { month: "September", tasks: ["Light overseeding with matching dense shade blend if areas are thin: 3-5 lbs per 1,000 sq ft", "Optional very light fertilization: 0.5 lb N per 1,000 sq ft", "Core aerate only if severely compacted — fine fescue is slow to recover"] },
            { month: "October", tasks: ["Second light fertilization: 0.5 lb N per 1,000 sq ft", "Continue mowing until growth stops"] },
            { month: "November", tasks: ["Final mow at 3 inches", "Leaf cleanup — leaves smother fine fescue if left over winter"] },
            { month: "December-February", tasks: ["No maintenance needed", "Stay off frozen grass"] }
        ],
        sources: [
            { institution: "University of Minnesota Extension", title: "Fine Fescue for Low-Maintenance and Shade", url: "https://extension.umn.edu/lawn-care/fine-fescue" },
            { institution: "Penn State Extension", title: "Shade-Tolerant Grass Types", url: "https://extension.psu.edu/lawn-care" }
        ]
    },

    denseShade_zone5: {
        grassType: "Dense Shade Mix",
        zone: 5,
        description: "Dense shade blend for Zone 5 — minimal care program for shaded lawns under trees or structures",
        schedule: [
            { month: "March-April", tasks: ["Gentle cleanup — avoid aggressive raking", "Light fertilization: 0.5 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches when grass reaches 4 inches"] },
            { month: "May-June", tasks: ["Mow as needed (shade slows growth)", "No additional fertilizer", "Water only if 2+ weeks without rain"] },
            { month: "July-August", tasks: ["Raise mowing to 3.5-4 inches", "NO fertilization", "Allow semi-dormancy if hot and dry — fine fescue recovers in fall", "Keep leaves and debris cleared for air circulation"] },
            { month: "September", tasks: ["Overseed thin areas with matching shade blend: 3-5 lbs per 1,000 sq ft", "Light fertilization: 0.5 lb N per 1,000 sq ft", "Aerate only if severely compacted"] },
            { month: "October-November", tasks: ["Second light fertilization: 0.5 lb N per 1,000 sq ft", "Mow until growth stops", "Final mow at 3 inches; clear fallen leaves promptly"] }
        ],
        sources: [
            { institution: "University of Minnesota Extension", title: "Fine Fescue for Low-Maintenance and Shade", url: "https://extension.umn.edu/lawn-care/fine-fescue" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue Turf Management", url: "https://njaes.rutgers.edu/" }
        ]
    },

    denseShade_zone6: {
        grassType: "Dense Shade Mix",
        zone: 6,
        description: "Dense shade blend for Zone 6 — strictly a shaded-area solution; will thin quickly in any sun exposure",
        schedule: [
            { month: "March-April", tasks: ["Light cleanup; begin mowing at 3-3.5 inches", "Light fertilization: 0.5 lb N per 1,000 sq ft"] },
            { month: "May", tasks: ["Mow as needed in shade — growth is slower than sun areas", "No additional fertilizer"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches", "NO fertilization — risk of disease surge in summer heat", "Water minimally — shade retains moisture; water only after 10+ dry days", "Watch for dollar spot and red thread; improve air circulation if possible"] },
            { month: "September", importance: "PRIMARY RECOVERY MONTH", tasks: ["Overseed thin areas with matching shade blend: 3-5 lbs per 1,000 sq ft", "Light fertilization: 0.5 lb N per 1,000 sq ft", "Aerate only if truly compacted"] },
            { month: "October-November", tasks: ["Light fertilization: 0.5 lb N per 1,000 sq ft", "Mow until growth stops; clear fallen leaves — critical in shaded areas", "Final mow at 3 inches"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Shade-Tolerant Grass Types", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Rutgers Cooperative Extension", title: "Fine Fescue Turf Management", url: "https://njaes.rutgers.edu/" }
        ]
    },

    denseShade_zone7: {
        grassType: "Dense Shade Mix",
        zone: 7,
        description: "Dense shade blend for Zone 7 — only viable in true deep shade; expect significant summer stress",
        schedule: [
            { month: "February-March", tasks: ["Light cleanup", "Light fertilization: 0.5 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "April-May", tasks: ["Mow lightly as needed", "No additional fertilization"] },
            { month: "June-August", tasks: ["Raise mowing to 4 inches", "NO fertilization — fine fescue under Zone 7 heat is already stressed", "Water only if 10+ days without rain", "Significant thinning and semi-dormancy is normal and expected", "Do not over-irrigate — this promotes fungal disease in shade"] },
            { month: "September", importance: "CRITICAL RECOVERY WINDOW", tasks: ["Overseed with matching dense shade blend: 4-6 lbs per 1,000 sq ft", "Light fertilization: 0.5 lb N per 1,000 sq ft only", "Lower mowing back to 3-3.5 inches"] },
            { month: "October-November", tasks: ["One additional light fertilization: 0.5 lb N per 1,000 sq ft", "Mow until growth stops", "Clear leaves promptly to prevent smothering"] }
        ],
        sources: [
            { institution: "NC State Extension", title: "Shade-Tolerant Grasses for the Transition Zone", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Cooperative Extension", title: "Lawn Care in the Transition Zone", url: "https://www.pubs.ext.vt.edu/" }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // TALL FESCUE BLEND — Cool Season Blend (90%+ Tall Fescue + small % KBG)
    // Care is essentially identical to pure tall fescue; KBG adds self-repair
    // ─────────────────────────────────────────────────────────────────────────
    tallFescueBlend_zone4: {
        grassType: "Tall Fescue Blend",
        zone: 4,
        description: "Tall fescue blend for Zone 4 — marginal zone; treat like tall fescue with extra cold-hardiness awareness",
        schedule: [
            { month: "March", tasks: ["Clean up winter debris when soil dries", "Begin mowing when grass reaches 4 inches (3-3.5 inch height)", "Sharpen mower blade"] },
            { month: "April", soilTemp: "50-55°F", tasks: ["Apply pre-emergent before soil hits 55°F", "First fertilization: 1 lb N per 1,000 sq ft", "Mow weekly at 3-3.5 inches", "Water 1-1.5 inches per week if dry"] },
            { month: "May", tasks: ["Second fertilization: 1 lb N per 1,000 sq ft", "Continue mowing at 3-3.5 inches", "Spot spray broadleaf weeds if needed"] },
            { month: "June", tasks: ["Raise mowing height to 3.5-4 inches for summer", "Light fertilization: 0.5 lb N per 1,000 sq ft (optional)", "Water deeply: 1-1.5 inches per week"] },
            { month: "July-August", tasks: ["NO fertilization", "Maintain 3.5-4 inch mowing height", "Water 1-1.5 inches per week", "Accept some summer thinning — KBG component will help fill in fall"] },
            { month: "September", importance: "MOST IMPORTANT MONTH", tasks: ["Heavy fertilization: 1-1.5 lb N per 1,000 sq ft", "Core aerate", "Overseed with matching tall fescue blend seed: 5-7 lbs per 1,000 sq ft", "Lower mowing back to 3-3.5 inches"] },
            { month: "October", tasks: ["Second fall fertilization: 1 lb N per 1,000 sq ft", "Apply lime if pH below 6.0", "Continue mowing"] },
            { month: "November", tasks: ["Final fertilization: 1 lb N per 1,000 sq ft (early Nov)", "Final mowing at 2.5-3 inches", "Clean up leaves"] },
            { month: "December-February", tasks: ["No maintenance needed", "Stay off frozen grass"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Tall Fescue Lawn Maintenance Calendar", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Purdue Extension", title: "Cool-Season Lawn Care", url: "https://www.purdue.edu/hla/sites/turf/tall-fescue/" }
        ]
    },

    tallFescueBlend_zone5: {
        grassType: "Tall Fescue Blend",
        zone: 5,
        description: "Tall fescue blend for Zone 5 — excellent performance; same program as pure tall fescue",
        schedule: [
            { month: "March-April", soilTemp: "50-55°F", tasks: ["Clean up winter debris", "Apply pre-emergent when soil hits 50-55°F", "First fertilization: 1 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "May", tasks: ["Second fertilization: 1 lb N per 1,000 sq ft", "Mow weekly at 3-3.5 inches"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches for heat", "Light summer fertilization: 0.5 lb N max (optional)", "Water deeply 1-1.5 inches per week"] },
            { month: "September", importance: "MOST IMPORTANT MONTH", tasks: ["Heavy fertilization: 1-1.5 lb N per 1,000 sq ft", "Core aerate", "Overseed with matching tall fescue blend seed: 5-7 lbs per 1,000 sq ft", "Lower mowing to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 1 lb N per 1,000 sq ft each month", "Apply lime if needed", "Continue mowing until growth stops", "Final mow at 2.5-3 inches"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Lawn Maintenance Calendar", url: "https://extension.psu.edu/lawn-care" },
            { institution: "Purdue Extension", title: "Cool-Season Lawn Care", url: "https://www.purdue.edu/hla/sites/turf/tall-fescue/" }
        ]
    },

    tallFescueBlend_zone6: {
        grassType: "Tall Fescue Blend",
        zone: 6,
        description: "Tall fescue blend for Zone 6 — the ideal zone; consistent fall program keeps this lawn dense year-round",
        schedule: [
            { month: "March-April", soilTemp: "55°F", tasks: ["Apply pre-emergent when soil reaches 55°F", "First fertilization: 1 lb N per 1,000 sq ft", "Begin regular mowing at 3-3.5 inches"] },
            { month: "May", tasks: ["Second fertilization: 1 lb N per 1,000 sq ft", "Mow weekly", "Water as needed"] },
            { month: "June-August", tasks: ["Raise mowing to 3.5-4 inches for heat", "Reduce fertilization (0.5 lb N max in summer)", "Water 1-1.5 inches per week", "Watch for brown patch disease in humid weeks"] },
            { month: "September", importance: "PRIMARY FEEDING SEASON", tasks: ["Heavy fertilization: 1-1.5 lb N per 1,000 sq ft", "Core aerate", "Overseed thin areas with matching tall fescue blend: 5-7 lbs per 1,000 sq ft", "Lower mowing to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 1 lb N per 1,000 sq ft", "Continue mowing until growth stops", "Final mow at 2.5-3 inches"] }
        ],
        sources: [
            { institution: "Penn State Extension", title: "Tall Fescue Lawn Maintenance", url: "https://extension.psu.edu/lawn-care" },
            { institution: "NC State Extension", title: "Carolina Lawns: Tall Fescue", url: "https://content.ces.ncsu.edu/carolina-lawns" }
        ]
    },

    tallFescueBlend_zone7: {
        grassType: "Tall Fescue Blend",
        zone: 7,
        description: "Tall fescue blend for Zone 7 — transition zone; use heat-tolerant varieties and commit to fall recovery",
        schedule: [
            { month: "February-March", soilTemp: "55°F", tasks: ["Apply pre-emergent early (soil warms faster)", "First fertilization: 1 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "April-May", tasks: ["Second fertilization: 1 lb N per 1,000 sq ft", "Mow weekly", "Water 1-1.5 inches per week"] },
            { month: "June-August", tasks: ["Raise mowing to 4 inches for heat stress management", "NO or minimal fertilization (0.5 lb N max)", "Water deeply 1-1.5 inches per week — critical for survival", "Watch for brown patch; apply fungicide if needed", "Expect thinning in hot spots — KBG repairs; overseed remainder in fall"] },
            { month: "September", importance: "CRITICAL RECOVERY MONTH", tasks: ["Heavy fertilization: 1-1.5 lb N per 1,000 sq ft (early Sept)", "Core aerate all thinned areas", "Overseed aggressively with heat-tolerant tall fescue blend: 6-8 lbs per 1,000 sq ft", "Lower mowing to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 1 lb N per 1,000 sq ft", "Mow until growth stops", "Final mow at 3 inches"] }
        ],
        sources: [
            { institution: "NC State Extension", title: "Carolina Lawns: Transition Zone Tall Fescue", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Virginia Cooperative Extension", title: "Tall Fescue in the Transition Zone", url: "https://www.pubs.ext.vt.edu/" }
        ]
    },

    tallFescueBlend_zone8: {
        grassType: "Tall Fescue Blend",
        zone: 8,
        description: "Tall fescue blend for Zone 8 — challenging; only viable with irrigation and ideally some shade",
        schedule: [
            { month: "February", soilTemp: "50-55°F", tasks: ["Apply pre-emergent early — soil warms quickly in Zone 8", "First fertilization: 1 lb N per 1,000 sq ft", "Begin mowing at 3-3.5 inches"] },
            { month: "March-April", tasks: ["Second fertilization: 1 lb N per 1,000 sq ft", "Mow weekly", "Water 1-1.5 inches per week"] },
            { month: "May", tasks: ["Light fertilization: 0.5 lb N (may be last safe feeding until fall)", "Raise mowing to 3.5-4 inches as heat arrives"] },
            { month: "June-August", tasks: ["NO fertilization — lawn is heat-stressed", "Maintain 4 inch mowing height — never go shorter", "Water deeply and consistently: 1.5 inches per week minimum", "Accept significant thinning and browning — tall fescue struggles in Zone 8 summer", "Apply fungicide preventively if brown patch has been an issue"] },
            { month: "September", importance: "MAKE OR BREAK MONTH", tasks: ["Heavy fertilization: 1.5 lb N per 1,000 sq ft as soon as heat breaks", "Core aerate all thinned and damaged areas", "Overseed heavily with matching tall fescue blend: 8-10 lbs per 1,000 sq ft", "Lower mowing to 3-3.5 inches"] },
            { month: "October-November", tasks: ["Fall fertilization: 1 lb N per 1,000 sq ft", "Mow until growth stops", "Final mow at 3 inches"] }
        ],
        sources: [
            { institution: "NC State Extension", title: "Carolina Lawns: Tall Fescue in Warm Climates", url: "https://content.ces.ncsu.edu/carolina-lawns" },
            { institution: "Clemson Cooperative Extension", title: "Tall Fescue in the Southeast", url: "https://www.clemson.edu/extension/hgic/plants/landscape/lawns/" }
        ]
    }
};

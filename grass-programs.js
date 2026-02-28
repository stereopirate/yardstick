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
    }
};

// ─── Yardstick Constants ────────────────────────────────────────────────────
// Shared data loaded as a regular script before any Babel/JSX files.
// Uses `var` so each name is a true global accessible from all scripts.

var PRODUCT_DATABASE = {
    mowers: [
        { id: 'm-other', name: 'Other (Specify)', brand: 'Other', mowerCategory: '', type: 'Custom', deck: '', features: '', maintenanceSchedule: { oilChange: null, note: 'Custom mower - set your own maintenance schedule' } },
        { id: 'wb1', name: 'Honda HRX217VKA', brand: 'Honda', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Variable Speed, Versamow, GCV200', maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 } },
        { id: 'wb2', name: 'Honda HRN216VKA', brand: 'Honda', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: '3-in-1, Auto Choke, Twin Blade', maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 } },
        { id: 'wb3', name: 'Honda HRS216PKA', brand: 'Honda', mowerCategory: 'Walk Behind', type: 'Gas Push', deck: '21"', features: 'Reliable, Side Discharge', maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 } },
        { id: 'wb4', name: 'Toro Recycler 22" SmartStow', brand: 'Toro', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '22"', features: 'Personal Pace, SmartStow, Briggs 150cc', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly' } },
        { id: 'wb5', name: 'Toro Super Recycler 21"', brand: 'Toro', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Personal Pace, PoweReverse, Cast Aluminum', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly' } },
        { id: 'wb6', name: 'Toro Recycler 21" 21352', brand: 'Toro', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs EXi 150cc, All-Wheel Drive', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly' } },
        { id: 'wb7', name: 'Toro TimeMaster 30"', brand: 'Toro', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '30"', features: 'Dual-Force Cutting, Personal Pace, Briggs 223cc', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly', bladeService: 'yearly' } },
        { id: 'wb8', name: 'EGO Power+ LM2142SP', brand: 'EGO', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '56V, 7.5Ah, LED Headlights, Select Cut', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb9', name: 'EGO Power+ LM2135SP', brand: 'EGO', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '56V, 5.0Ah, Touch Drive, Select Cut', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb10', name: 'Husqvarna LC221RH', brand: 'Husqvarna', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Honda GCV160, Rear Wheel Drive, High Wheels', maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 } },
        { id: 'wb11', name: 'Husqvarna LC121P', brand: 'Husqvarna', mowerCategory: 'Walk Behind', type: 'Gas Push', deck: '21"', features: 'Briggs 163cc, 3-in-1', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb12', name: 'Craftsman M215', brand: 'Craftsman', mowerCategory: 'Walk Behind', type: 'Gas Push', deck: '21"', features: 'Briggs & Stratton 140cc, Side Discharge', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb13', name: 'Craftsman M230', brand: 'Craftsman', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs 163cc, Front-Wheel Drive', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb14', name: 'Ryobi 40V RY40190', brand: 'Ryobi', mowerCategory: 'Walk Behind', type: 'Battery Push', deck: '20"', features: '40V Lithium 6Ah, Brushless Motor', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb15', name: 'Ryobi 40V RY401110', brand: 'Ryobi', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '40V Brushless, CrossCut Multi-Blade', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb16', name: 'Greenworks 25223', brand: 'Greenworks', mowerCategory: 'Walk Behind', type: 'Corded Electric', deck: '20"', features: '12 Amp, 3-in-1', maintenanceSchedule: { oilChange: null, note: 'Electric - no oil changes needed' } },
        { id: 'wb17', name: 'Greenworks Pro 80V 21"', brand: 'Greenworks', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '80V 4Ah, Brushless, Steel Deck', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb18', name: 'Makita XML08Z', brand: 'Makita', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '18V X2 (36V) LXT x4, Commercial Grade', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb19', name: 'Troy-Bilt TB330', brand: 'Troy-Bilt', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'TriAction Cutting, Briggs 163cc, Rear-Wheel Drive', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb20', name: 'Milwaukee M18 FUEL 21"', brand: 'Milwaukee', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: 'M18 FUEL, Smart Speed Control', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb21', name: 'DeWalt DCMWSP244U2', brand: 'DeWalt', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21.5"', features: '2x 20V MAX, Rear Wheel Drive', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb22', name: 'Black+Decker BEMW472BH', brand: 'Black+Decker', mowerCategory: 'Walk Behind', type: 'Corded Electric', deck: '15"', features: '10 Amp, Lightweight, 6 Height Settings', maintenanceSchedule: { oilChange: null, note: 'Electric - no oil changes needed' } },
        { id: 'wb23', name: 'Kobalt 80V 21"', brand: 'Kobalt', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '80V 6Ah, Brushless, Quick-Fold Handle', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb24', name: 'Snapper XD 82V', brand: 'Snapper', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '82V Lithium, StepSense Auto Drive', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb25', name: 'Worx WG779', brand: 'Worx', mowerCategory: 'Walk Behind', type: 'Battery Push', deck: '14"', features: '40V Power Share, Compact, Intellicut', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb26', name: 'Ariens LM21S', brand: 'Ariens', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs 159cc, Rear-Wheel Drive, 3-in-1', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb27', name: 'Husqvarna HU800AWDBC', brand: 'Husqvarna', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '22"', features: 'Honda GCV190, AWD, Hi-Wheel, 3-in-1', maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 } },
        { id: 'wb28', name: 'EGO Power+ LM2156SP', brand: 'EGO', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '21"', features: '56V 10Ah, Select Cut XP, Aluminum Deck', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb29', name: 'Troy-Bilt TB370', brand: 'Troy-Bilt', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs 163cc, AWD, TriAction Cutting System', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb30', name: 'Poulan Pro PR675Y22RHP', brand: 'Poulan Pro', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '22"', features: 'Briggs 675EX 190cc, Rear-Wheel Drive', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb31', name: 'Craftsman M275', brand: 'Craftsman', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs 163cc, Rear-Wheel Drive, 3-in-1', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb32', name: 'Snapper SP Series 21"', brand: 'Snapper', mowerCategory: 'Walk Behind', type: 'Gas Self-Propelled', deck: '21"', features: 'Briggs 190cc, Hi-Vac Steel Deck, Rear-Wheel Drive', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'wb33', name: 'Greenworks 40V 20"', brand: 'Greenworks', mowerCategory: 'Walk Behind', type: 'Battery Self-Propelled', deck: '20"', features: '40V 4Ah, Brushless, Folding Handle', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'wb34', name: 'Sun Joe MJ401E', brand: 'Sun Joe', mowerCategory: 'Walk Behind', type: 'Corded Electric', deck: '14"', features: '13 Amp, Lightweight, 3 Height Settings', maintenanceSchedule: { oilChange: null, note: 'Electric - no oil changes needed' } },
        { id: 'wb35', name: 'Cub Cadet SC 100 HW', brand: 'Cub Cadet', mowerCategory: 'Walk Behind', type: 'Gas Push', deck: '21"', features: 'Briggs 150cc, High Wheel, Mulch & Bag', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd1', name: 'John Deere S100', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '17.5 HP Briggs, Hydrostatic, Edge Cutting System', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd2', name: 'John Deere S130', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '22 HP V-Twin Briggs, Hydrostatic', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd3', name: 'John Deere S160', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '48"', features: '24 HP V-Twin ELS, Hydrostatic', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd4', name: 'John Deere S170', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '48"', features: '24 HP V-Twin, Cruise Control, Hydrostatic', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd5', name: 'John Deere X350', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '18.5 HP Kawasaki, Accel Deep Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd6', name: 'Husqvarna YTH18542', brand: 'Husqvarna', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '18.5 HP Briggs, Hydrostatic, Air Induction', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd7', name: 'Husqvarna YTH24V48', brand: 'Husqvarna', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '48"', features: '24 HP Briggs V-Twin, Hydrostatic', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd8', name: 'Husqvarna YTH22V46', brand: 'Husqvarna', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '22 HP Briggs V-Twin, Pedal-Operated', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd10', name: 'Cub Cadet XT1 LT42', brand: 'Cub Cadet', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '18 HP Kohler, Hydrostatic, TightTurn', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd11', name: 'Cub Cadet XT1 LT46', brand: 'Cub Cadet', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '22 HP Kohler V-Twin, Hydrostatic', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd14', name: 'Craftsman T110', brand: 'Craftsman', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '17.5 HP Briggs, Hydrostatic, Turn Tight', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd17', name: 'Troy-Bilt Pony 42"', brand: 'Troy-Bilt', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '15.5 HP Briggs, 7-Speed Manual', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd9',  name: 'Husqvarna TS 142', brand: 'Husqvarna', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '18 HP Briggs, Automatic Drive, SmartSwitch Start', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd12', name: 'Cub Cadet XT2 LX46', brand: 'Cub Cadet', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '22 HP Kohler V-Twin, Hydrostatic, AeroForce Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd13', name: 'Cub Cadet XT2 SLX50', brand: 'Cub Cadet', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '50"', features: '24 HP Kohler V-Twin, AeroForce, Smart Choke', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd15', name: 'Craftsman T135', brand: 'Craftsman', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '18.5 HP Briggs, Hydrostatic, Turn Tight', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd16', name: 'Craftsman T225', brand: 'Craftsman', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '21 HP Briggs V-Twin, Hydrostatic, LED Headlights', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd18', name: 'John Deere E110', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '17.5 HP Briggs, 6-Speed Manual, Edge Cutting System', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd19', name: 'John Deere E150', brand: 'John Deere', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '48"', features: '22 HP ELS Briggs, Hydrostatic, Edge Cutting System', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd20', name: 'Troy-Bilt Bronco 46"', brand: 'Troy-Bilt', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '46"', features: '19 HP Briggs IntelliPower, Hydrostatic, Turn Tight', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd21', name: 'Murray M155-42"', brand: 'Murray', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '17 HP Briggs, 6-Speed Drive, Mulch & Bag', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd22', name: 'Poulan Pro PP19H42', brand: 'Poulan Pro', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '19 HP Briggs, Hydrostatic, Tight Turn', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'rd23', name: 'Ariens Edge 42"', brand: 'Ariens', mowerCategory: 'Riding', type: 'Lawn Tractor', deck: '42"', features: '19 HP Briggs, Hydrostatic, All-Steel Frame', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'rd24', name: 'Ryobi RYAC130-S', brand: 'Ryobi', mowerCategory: 'Riding', type: 'Electric Riding', deck: '30"', features: '50 Ah Battery, Brushless Motor', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'rd25', name: 'EGO Power+ T6', brand: 'EGO', mowerCategory: 'Riding', type: 'Electric Lawn Tractor', deck: '42"', features: '56V, Peak HP, Headlights, USB Port', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'zt1', name: 'John Deere Z335E', brand: 'John Deere', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '42"', features: '20 HP V-Twin, Accel Deep Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt4', name: 'Husqvarna Z254', brand: 'Husqvarna', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '26 HP Kohler, ClearCut Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt5', name: 'Husqvarna Z248F', brand: 'Husqvarna', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '23 HP Kawasaki, Stamped Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt8', name: 'Toro TimeCutter 42"', brand: 'Toro', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '42"', features: '22.5 HP Toro V-Twin, MyRIDE, Smart Speed', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly' } },
        { id: 'zt10', name: 'Cub Cadet Ultima ZT1 42"', brand: 'Cub Cadet', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '42"', features: '22 HP Kohler V-Twin, High-Back Seat', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt13', name: 'Ariens IKON XD 42"', brand: 'Ariens', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '42"', features: '22 HP Kohler, Fabricated Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt16', name: 'EGO Z6 42"', brand: 'EGO', mowerCategory: 'Zero Turn', type: 'Battery ZTR', deck: '42"', features: '56V, e-Steer, Brushless Motors', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'zt2',  name: 'John Deere Z355E 48"', brand: 'John Deere', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '22 HP V-Twin, Accel Deep Deck, CargO Mount Panel', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt3',  name: 'John Deere Z530M 54"', brand: 'John Deere', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '23 HP EFI, MulchControl Kit, Accel Deep Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt6',  name: 'Husqvarna Z254F', brand: 'Husqvarna', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '26 HP Kawasaki, Fabricated ClearCut Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt7',  name: 'Husqvarna MZ54', brand: 'Husqvarna', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '24 HP Briggs V-Twin, High-Back Comfort Seat, ClearCut', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt9',  name: 'Toro TimeCutter 50"', brand: 'Toro', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '50"', features: '23 HP Kawasaki V-Twin, MyRIDE Suspension, Smart Speed', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 'yearly' } },
        { id: 'zt11', name: 'Cub Cadet Ultima ZT1 50"', brand: 'Cub Cadet', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '50"', features: '24 HP Kohler V-Twin, Premium Lap Bar Controls', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt12', name: 'Cub Cadet Ultima ZT2 54"', brand: 'Cub Cadet', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '23 HP Kawasaki V-Twin, Fabricated Deck, Commercial-Style', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt14', name: 'Ariens IKON XD 52"', brand: 'Ariens', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '52"', features: '23 HP Kawasaki, Fabricated Deck, Adjustable Seat', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt15', name: 'Ariens IKON X 52"', brand: 'Ariens', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '52"', features: '23 HP Briggs AX Engine, 3-Year Residential Warranty', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt17', name: 'Ryobi RY48ZTR100', brand: 'Ryobi', mowerCategory: 'Zero Turn', type: 'Battery ZTR', deck: '42"', features: '100 Ah Battery, 2.5 Acres Coverage, Brushless Motors', maintenanceSchedule: { oilChange: null, note: 'Battery-powered - no oil changes needed' } },
        { id: 'zt18', name: 'Craftsman Z525', brand: 'Craftsman', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '46"', features: '23 HP Briggs V-Twin, Lap Bar Controls, 3-in-1 Deck', maintenanceSchedule: { oilChange: 50, airFilter: 'yearly', sparkPlug: 100 } },
        { id: 'zt19', name: 'Bad Boy MZ Magnum 48"', brand: 'Bad Boy Mowers', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '22 HP Kawasaki FR651, Heavy-Duty Welded Frame', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt20', name: 'Gravely ZT HD 48"', brand: 'Gravely', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '23 HP Kawasaki FR691, Fabricated Deck, Smooth Comfort Seat', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt21', name: 'Scag Freedom Z 48"', brand: 'Scag', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '22 HP Kawasaki, Welded Steel Frame, Velocity Plus Deck', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt22', name: 'Exmark Radius X 48"', brand: 'Exmark', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '21.5 HP Kawasaki, UltraCut Deck, EFI Option', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt23', name: 'Ferris IS 600Z 48"', brand: 'Ferris', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '48"', features: '22 HP Kawasaki, Full Suspension System, 3-Year Warranty', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt24', name: 'Snapper 360Z 52"', brand: 'Snapper', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '52"', features: '22 HP Briggs V-Twin, High-Back Seat, Dual Hydro', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
        { id: 'zt25', name: 'Swisher ZTR2454BS', brand: 'Swisher', mowerCategory: 'Zero Turn', type: 'Residential ZTR', deck: '54"', features: '24 HP Briggs V-Twin, 11-Gauge Deck, Tight Turn Radius', maintenanceSchedule: { oilChange: 50, airFilter: 100, sparkPlug: 100 } },
    ],
    spreaders: [
        { id: 'sp1', name: 'Echo RB-60 Spreader', brand: 'Echo', type: 'Broadcast', capacity: '60 lbs', features: 'Edge Guard, Pneumatic Tires', maintenanceSchedule: { cleaning: 'after each use', tires: 'check pressure 15 psi', note: 'Maintenance-free gear case' } },
        { id: 'sp2', name: 'Scotts Elite Spreader', brand: 'Scotts', type: 'Broadcast', capacity: '20000 sq ft', features: 'EdgeGuard, Never Flat Tires', maintenanceSchedule: { cleaning: 'after each use', note: 'No lubrication required' } },
        { id: 'sp3', name: 'Earthway 2150', brand: 'Earthway', type: 'Broadcast', capacity: '50 lbs', features: 'Commercial Grade, EV-N-Spred', maintenanceSchedule: { cleaning: 'after each use', lubrication: 'seasonal' } },
        { id: 'sp4', name: 'Agri-Fab 45-0463', brand: 'Agri-Fab', type: 'Tow-Behind', capacity: '130 lbs', features: 'Universal Hitch, Pneumatic Tires', maintenanceSchedule: { cleaning: 'after each use', lubrication: 'seasonal', tires: 'check pressure' } },
        { id: 'sp5', name: 'Chapin 8706A', brand: 'Chapin', type: 'Broadcast', capacity: '80 lbs', features: 'Auto-Stop, Baffle System', maintenanceSchedule: { cleaning: 'after each use', lubrication: 'before each season' } },
        { id: 'sp6', name: 'Scotts Wizz Hand-Held', brand: 'Scotts', type: 'Hand-Held', capacity: '2500 sq ft', features: 'Battery Powered, EdgeGuard', maintenanceSchedule: { cleaning: 'after each use', battery: 'charge as needed' } },
        { id: 'sp7', name: 'Lesco High Wheel', brand: 'Lesco', type: 'Broadcast', capacity: '80 lbs', features: 'Stainless Steel, Pro-Grade', maintenanceSchedule: { cleaning: 'after each use', lubrication: 'monthly during season' } },
        { id: 'sp10', name: 'Scotts Turf Builder EdgeGuard Mini', brand: 'Scotts', type: 'Broadcast', capacity: '5000 sq ft', features: 'Compact, EdgeGuard', maintenanceSchedule: { cleaning: 'after each use', note: 'Minimal maintenance' } }
    ],
    trimmers: [
        { id: 't-other', name: 'Other (Specify)', brand: 'Other', type: 'Custom', engineType: '', lineSize: '' },
        { id: 't1', name: 'Echo SRM-225', brand: 'Echo', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '21.2cc, 2-Stroke' },
        { id: 't2', name: 'Stihl FS 56 RC-E', brand: 'Stihl', type: 'Gas', engineType: 'Gas', lineSize: '.105"', features: '27.2cc, Easy2Start' },
        { id: 't3', name: 'Husqvarna 128LD', brand: 'Husqvarna', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '28cc, Detachable' },
        { id: 't4', name: 'EGO Power+ ST1521S', brand: 'EGO', type: 'Battery', engineType: 'Electric', lineSize: '.095"', features: '56V, Powerload' },
        { id: 't5', name: 'Makita XRU15Z', brand: 'Makita', type: 'Battery', engineType: 'Electric', lineSize: '.095"', features: '18V LXT' },
        { id: 't6', name: 'DeWalt DCST972X1', brand: 'DeWalt', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '60V Max Flex' },
        { id: 't7', name: 'Ryobi RY40250', brand: 'Ryobi', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '40V Brushless' },
        { id: 't8', name: 'Black+Decker LST136', brand: 'Black+Decker', type: 'Battery', engineType: 'Electric', lineSize: '.065"', features: '40V, Auto-Feed' },
        { id: 't9', name: 'Milwaukee 2825-21ST', brand: 'Milwaukee', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: 'M18 Fuel Quik-Lok' },
        { id: 't10', name: 'Craftsman CMXGTAMD25CC', brand: 'Craftsman', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '25cc, 2-Cycle' },
        { id: 't11', name: 'Stihl FS 91 R', brand: 'Stihl', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '31.4cc, Straight Shaft, Easy2Start, Ergostart' },
        { id: 't12', name: 'Echo SRM-2620T', brand: 'Echo', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '25.4cc, i-30 Starter, 2-Stroke, Speed-Feed Head' },
        { id: 't13', name: 'Husqvarna 525LST', brand: 'Husqvarna', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '25cc, Straight Shaft, E-Tech Engine, Low Vibration' },
        { id: 't14', name: 'Husqvarna 128LDX', brand: 'Husqvarna', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '28cc, Detachable Shaft, Smart Start, Multi-Tool Capable' },
        { id: 't15', name: 'Stihl FS 38', brand: 'Stihl', type: 'Gas', engineType: 'Gas', lineSize: '.065"', features: '27.2cc, Curved Shaft, Entry-Level, Easy Start' },
        { id: 't16', name: 'EGO Power+ ST1623T', brand: 'EGO', type: 'Battery', engineType: 'Electric', lineSize: '.095"', features: '56V, Carbon Fiber Shaft, Powerload Auto-Wind Head' },
        { id: 't17', name: 'Ryobi ONE+ RY4CSS', brand: 'Ryobi', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '18V ONE+, Brushless, Cordless Convenience' },
        { id: 't18', name: 'Greenworks Pro 80V GST80320', brand: 'Greenworks', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '80V, Straight Shaft, Brushless Motor, 13" Cut Path' },
        { id: 't19', name: 'Kobalt 80V Brushless', brand: 'Kobalt', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '80V, Straight Shaft, Auto-Feed Bump Head' },
        { id: 't20', name: 'Worx WG163 20V', brand: 'Worx', type: 'Battery', engineType: 'Electric', lineSize: '.065"', features: '20V PowerShare, Command Feed, Converts to Edger' },
        { id: 't21', name: 'DeWalt DCST920B', brand: 'DeWalt', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '20V Max, Straight Shaft, Auto-Release Spool' },
        { id: 't22', name: 'Stihl FSA 130 R', brand: 'Stihl', type: 'Battery', engineType: 'Electric', lineSize: '.095"', features: 'AK Battery System, Straight Shaft, Kombi Attachment Compatible' },
        { id: 't23', name: 'Troy-Bilt TB685EC', brand: 'Troy-Bilt', type: 'Gas', engineType: 'Gas', lineSize: '.095"', features: '29cc, 4-Cycle, Straight Shaft, No Oil Mixing' },
        { id: 't24', name: 'Toro 60V Flex-Force 51840', brand: 'Toro', type: 'Battery', engineType: 'Electric', lineSize: '.095"', features: '60V Flex-Force, Brushless Motor, Command Feed Head' },
        { id: 't25', name: 'Oregon ST275', brand: 'Oregon', type: 'Battery', engineType: 'Electric', lineSize: '.080"', features: '40V Max, Straight Shaft, Bump Feed Head' }
    ],
    fertilizers: [
        { id: 'f1', name: 'Scotts Turf Builder Lawn Food', brand: 'Scotts', npk: '32-0-4', coverage: '15000 sq ft', type: 'Slow-Release Nitrogen' },
        { id: 'f2', name: 'Milorganite Organic Fertilizer', brand: 'Milorganite', npk: '6-4-0', coverage: '2500 sq ft', type: 'Organic, Slow-Release' },
        { id: 'f3', name: 'Jonathan Green Green-Up', brand: 'Jonathan Green', npk: '29-0-3', coverage: '15000 sq ft', type: 'Professional Grade' },
        { id: 'f4', name: 'Pennington UltraGreen', brand: 'Pennington', npk: '30-0-4', coverage: '12500 sq ft', type: 'Nitrogen Stabilized' },
        { id: 'f5', name: 'GreenView Fairway Formula', brand: 'GreenView', npk: '22-0-4', coverage: '15000 sq ft', type: 'Spring Booster' },
        { id: 'f6', name: 'Lesco Professional 24-0-11', brand: 'Lesco', npk: '24-0-11', coverage: '12500 sq ft', type: 'Balanced Formula' },
        { id: 'f8', name: 'Safer Brand Lawn Restore', brand: 'Safer Brand', npk: '9-0-2', coverage: '5000 sq ft', type: 'Organic, Pet-Safe' },
        { id: 'f10', name: 'Sunday Smart Lawn Care', brand: 'Sunday', npk: '11-0-0', coverage: '5000 sq ft', type: 'Custom Blend, Organic' }
    ],
    seeds: [
        { id: 's1', name: 'Scotts Turf Builder Grass Seed', brand: 'Scotts', type: 'Sun & Shade Mix', coverage: '2800 sq ft', variety: 'Tall Fescue Blend' },
        { id: 's2', name: 'Pennington Smart Seed', brand: 'Pennington', type: 'Dense Shade', coverage: '1200 sq ft', variety: 'Fine Fescue Mix' },
        { id: 's3', name: 'Jonathan Green Black Beauty', brand: 'Jonathan Green', type: 'Ultra Mix', coverage: '5600 sq ft', variety: 'Tall Fescue' },
        { id: 's6', name: 'Perennial Ryegrass Seed', brand: 'Barenbrug', type: 'RPR Technology', coverage: '5000 sq ft', variety: 'Quick Germination' },
        { id: 's7', name: 'Scotts EZ Seed Patch & Repair', brand: 'Scotts', type: 'Mulch Mix', coverage: '225 sq ft', variety: 'All-in-One' },
        { id: 's8', name: 'Zoysia Grass Seed', brand: 'Zenith', type: 'Warm Season', coverage: '2000 sq ft', variety: 'Drought Tolerant' },
        { id: 's9', name: 'Bermuda Grass Seed', brand: 'Outsidepride', type: 'Improved', coverage: '3000 sq ft', variety: 'Southern Lawns' },
        { id: 's10', name: 'Kentucky Bluegrass Mix', brand: 'Jonathan Green', type: 'Premium KBG', coverage: '3000 sq ft', variety: 'Fine Texture' }
    ]
};

var TREATMENT_PRODUCTS = {
    fertilizer: [
        { id: 'f1', name: 'Scotts Turf Builder Lawn Food', brand: 'Scotts', activeIngredient: '32-0-4', rate: 'Per label', timing: 'Spring/Fall', notes: 'Slow-Release Nitrogen' },
        { id: 'f2', name: 'Milorganite Organic Fertilizer', brand: 'Milorganite', activeIngredient: '6-4-0', rate: 'Per label', timing: 'Any season', notes: 'Organic, Slow-Release' },
        { id: 'f3', name: 'Jonathan Green Green-Up', brand: 'Jonathan Green', activeIngredient: '29-0-3', rate: 'Per label', timing: 'Spring/Fall', notes: 'Professional Grade' },
        { id: 'f4', name: 'Pennington UltraGreen', brand: 'Pennington', activeIngredient: '30-0-4', rate: 'Per label', timing: 'Growing season', notes: 'Nitrogen Stabilized' },
        { id: 'f5', name: 'Other (specify)', brand: 'Various', activeIngredient: '', rate: 'See label', timing: '', notes: 'Custom product' }
    ],
    preemergent: [
        { id: 'pre1', name: 'Prodiamine 65 WDG (Yard Mastery)', brand: 'Yard Mastery', activeIngredient: 'Prodiamine 65%', rate: '0.5 oz per 1,000 sq ft', rateValue: 0.5, rateUnit: 'oz', ratePer: 1000, timing: 'When soil hits 50-55°F', notes: 'Premium WDG formulation' },
        { id: 'pre2', name: 'Barricade 4FL', brand: 'Syngenta', activeIngredient: 'Prodiamine 41.7%', rate: '0.5 fl oz per 1,000 sq ft', rateValue: 0.5, rateUnit: 'fl oz', ratePer: 1000, timing: 'Early spring & fall', notes: 'Liquid concentrate' },
        { id: 'pre3', name: 'Dimension 2EW', brand: 'Dow', activeIngredient: 'Dithiopyr 23.3%', rate: '0.5 fl oz per 1,000 sq ft', rateValue: 0.5, rateUnit: 'fl oz', ratePer: 1000, timing: 'Pre & early post-emergent', notes: 'Works on young crabgrass' },
        { id: 'pre4', name: 'Scotts Halts', brand: 'Scotts', activeIngredient: 'Pendimethalin', rate: '2.9 lbs per 1,000 sq ft', rateValue: 2.9, rateUnit: 'lbs', ratePer: 1000, timing: 'Early spring', notes: 'Granular, easy application' },
        { id: 'pre5', name: 'Other (specify)', brand: 'Various', activeIngredient: '', rate: 'See label', timing: '', notes: 'Custom product' }
    ],
    postemergent: [
        { id: 'post1', name: 'Tenacity', brand: 'Syngenta', activeIngredient: 'Mesotrione 40%', rate: '0.25 oz per 1,000 sq ft', rateValue: 0.25, rateUnit: 'oz', ratePer: 1000, target: 'Crabgrass, broadleaf weeds', notes: 'Safe for seeding' },
        { id: 'post2', name: 'Ortho Weed B Gon', brand: 'Ortho', activeIngredient: '2,4-D + Quinclorac', rate: 'Per label', target: 'Broadleaf & grassy weeds', notes: 'Ready-to-spray' },
        { id: 'post3', name: 'Speedzone', brand: 'PBI Gordon', activeIngredient: '2,4-D + others', rate: '1.5 fl oz per 1,000 sq ft', rateValue: 1.5, rateUnit: 'fl oz', ratePer: 1000, target: 'Fast-acting broadleaf', notes: 'Works in cool temps' },
        { id: 'post4', name: 'Quinclorac 75DF', brand: 'Various', activeIngredient: 'Quinclorac 75%', rate: '0.25 oz per 1,000 sq ft', rateValue: 0.25, rateUnit: 'oz', ratePer: 1000, target: 'Crabgrass, clover', notes: 'Selective herbicide' },
        { id: 'post5', name: 'Other (specify)', brand: 'Various', activeIngredient: '', rate: 'See label', target: '', notes: 'Custom product' }
    ],
    fungicide: [
        { id: 'fung1', name: 'Disease Ex (Scotts)', brand: 'Scotts', activeIngredient: 'Azoxystrobin 0.31%', rate: '3 lbs per 1,000 sq ft', rateValue: 3, rateUnit: 'lbs', ratePer: 1000, target: 'Brown patch, dollar spot', notes: 'Granular, preventative' },
        { id: 'fung2', name: 'Azoxystrobin 0.31G', brand: 'Various', activeIngredient: 'Azoxystrobin 0.31%', rate: '3 lbs per 1,000 sq ft', rateValue: 3, rateUnit: 'lbs', ratePer: 1000, target: 'Broad spectrum', notes: 'Generic Disease Ex' },
        { id: 'fung3', name: 'Propiconazole 14.3', brand: 'Various', activeIngredient: 'Propiconazole 14.3%', rate: '1 fl oz per 1,000 sq ft', rateValue: 1, rateUnit: 'fl oz', ratePer: 1000, target: 'Systemic fungicide', notes: 'Liquid concentrate' },
        { id: 'fung5', name: 'Other (specify)', brand: 'Various', activeIngredient: '', rate: 'See label', target: '', notes: 'Custom product' }
    ],
    insecticide: [
        { id: 'ins1', name: 'GrubEx (Scotts)', brand: 'Scotts', activeIngredient: 'Chlorantraniliprole', rate: '2.87 lbs per 1,000 sq ft', rateValue: 2.87, rateUnit: 'lbs', ratePer: 1000, target: 'Grubs (preventative)', notes: 'Apply late spring/early summer' },
        { id: 'ins2', name: 'BioAdvanced Grub Killer', brand: 'BioAdvanced', activeIngredient: 'Imidacloprid', rate: '3 lbs per 1,000 sq ft', rateValue: 3, rateUnit: 'lbs', ratePer: 1000, target: 'Grubs, mole crickets', notes: 'Season-long control' },
        { id: 'ins3', name: 'Dylox 6.2G', brand: 'Bayer', activeIngredient: 'Trichlorfon 6.2%', rate: '3 lbs per 1,000 sq ft', rateValue: 3, rateUnit: 'lbs', ratePer: 1000, target: 'Active grubs', notes: '24-hour curative' },
        { id: 'ins5', name: 'Other (specify)', brand: 'Various', activeIngredient: '', rate: 'See label', target: '', notes: 'Custom product' }
    ],
    soilAmendment: [
        { id: 'soil1', name: 'Pelletized Lime', brand: 'Various', type: 'pH Increase', rate: '50 lbs per 1,000 sq ft', rateValue: 50, rateUnit: 'lbs', ratePer: 1000, effect: 'Raises pH by ~0.5', notes: 'For acidic soils (pH <6.5)' },
        { id: 'soil2', name: 'Elemental Sulfur', brand: 'Various', type: 'pH Decrease', rate: '5–10 lbs per 1,000 sq ft', rateValue: 5, rateMax: 10, rateUnit: 'lbs', ratePer: 1000, effect: 'Lowers pH by ~0.5', notes: 'For alkaline soils (pH >7.0)' },
        { id: 'soil3', name: 'Gypsum', brand: 'Various', type: 'Soil Structure', rate: '40 lbs per 1,000 sq ft', rateValue: 40, rateUnit: 'lbs', ratePer: 1000, effect: 'Improves clay soil', notes: 'Does not change pH' },
        { id: 'soil4', name: 'Humic Acid', brand: 'Various', type: 'Soil Health', rate: '3 fl oz per 1,000 sq ft', rateValue: 3, rateUnit: 'fl oz', ratePer: 1000, effect: 'Improves nutrient uptake', notes: 'Liquid application' },
        { id: 'soil5', name: 'Other (specify)', brand: 'Various', type: '', rate: 'See label', effect: '', notes: 'Custom product' }
    ]
};

var TREATMENT_CATEGORIES = {
    fertilizer:    { label: 'Fertilizer',      icon: '🌾', description: 'NPK nutrients for growth' },
    preemergent:   { label: 'Pre-Emergent',    icon: '🛡️', description: 'Prevent weed seeds' },
    postemergent:  { label: 'Post-Emergent',   icon: '🌿', description: 'Kill existing weeds' },
    fungicide:     { label: 'Fungicide',       icon: '🍄', description: 'Prevent/treat diseases' },
    insecticide:   { label: 'Insecticide',     icon: '🐛', description: 'Control grubs/insects' },
    soilAmendment: { label: 'Soil Amendment',  icon: '🌍', description: 'Adjust pH/improve soil' }
};

var ACTIVITY_TYPES = {
    mowing: {
        name: 'Mowing Lawn', icon: '🌱', imgSrc: 'icon-mowing.svg', color: 'bg-[#367C2B]',
        fields: [
            { name: 'mowerType', label: 'Mower Type', type: 'select', options: ['Walk Behind', 'Riding', 'Zero Turn'] },
            { name: 'mowerUsed', label: 'Mower Model', type: 'product-select', productType: 'mowers', filterBy: 'mowerType', filterProp: 'mowerCategory' },
            { name: 'mowHeight', label: 'Mow Height', type: 'select', options: ['1.5"', '2"', '2.5"', '3"', '3.5"', '4"'] },
            { name: 'clippings', label: 'Clippings', type: 'select', options: ['Bagging', 'Mulching', 'Side Discharge'] },
            { name: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '45' }
        ]
    },
    fertilizer: {
        name: 'Fertilizing', icon: '🌾', imgSrc: 'icon-fertilizer.svg', color: 'bg-orange-500',
        fields: [
            { name: 'product', label: 'Product', type: 'text', placeholder: 'e.g. Scotts Turf Builder' },
            { name: 'npk', label: 'NPK Ratio', type: 'text', placeholder: 'e.g. 32-0-4' },
            { name: 'rate', label: 'Application Rate', type: 'text', placeholder: 'e.g. 4 lbs per 1000 sq ft' },
            { name: 'spreaderSetting', label: 'Spreader Setting', type: 'text', placeholder: 'e.g. 4' }
        ]
    },
    watering: {
        name: 'Watering', icon: '💧', imgSrc: 'icon-watering.svg', color: 'bg-blue-500',
        fields: [
            { name: 'method', label: 'Method', type: 'select', options: ['Sprinkler', 'Drip', 'Hand Watering', 'Rain'] },
            { name: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '30' },
            { name: 'amount', label: 'Amount (inches)', type: 'number', placeholder: '0.5' }
        ]
    },
    seeding: {
        name: 'Seeding', icon: '🌿', imgSrc: 'icon-seeding.svg', color: 'bg-amber-600',
        fields: [
            { name: 'seedType', label: 'Seed Type', type: 'text', placeholder: 'e.g. Tall Fescue' },
            { name: 'seedRate', label: 'Seed Rate (lbs/1000 sq ft)', type: 'number', placeholder: '5' },
            { name: 'method', label: 'Method', type: 'select', options: ['Broadcast', 'Slit Seeding', 'Overseeding', 'Patch Repair'] },
            { name: 'area', label: 'Area (sq ft)', type: 'number', placeholder: '1000' }
        ]
    },
    trimming: {
        name: 'Trimming/Edging', icon: '✂️', imgSrc: 'icon-trimming.svg', color: 'bg-emerald-500',
        fields: [
            { name: 'trimmerUsed', label: 'Trimmer', type: 'product-select', productType: 'trimmers' },
            { name: 'areas', label: 'Areas Trimmed', type: 'select', options: ['Full perimeter', 'Partial', 'Edges only', 'Around obstacles'] },
            { name: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '20' }
        ]
    },
    aeration: {
        name: 'Aeration', icon: '🔧', imgSrc: 'icon-aerating.svg', color: 'bg-purple-500',
        fields: [
            { name: 'type', label: 'Aeration Type', type: 'select', options: ['Core/Plug', 'Spike', 'Liquid'] },
            { name: 'equipment', label: 'Equipment', type: 'text', placeholder: 'e.g. Ryan Lawnaire' },
            { name: 'coverage', label: 'Coverage (sq ft)', type: 'number', placeholder: '5000' }
        ]
    },
    treatment: {
        name: 'Treatment/Spray', icon: '🧴', imgSrc: 'icon-fertilizer.svg', color: 'bg-pink-500',
        fields: [
            { name: 'category', label: 'Treatment Type', type: 'select', options: Object.keys(TREATMENT_CATEGORIES) },
            { name: 'product', label: 'Product', type: 'text', placeholder: 'e.g. Prodiamine 65 WDG' },
            { name: 'activeIngredient', label: 'Active Ingredient', type: 'text', placeholder: 'e.g. Prodiamine 65%' },
            { name: 'rate', label: 'Application Rate', type: 'text', placeholder: 'e.g. 0.5 oz per 1,000 sq ft' },
            { name: 'targetArea', label: 'Target (sq ft)', type: 'number', placeholder: '5000' }
        ]
    },
    maintenance: {
        name: 'Maintenance', icon: '🔩', imgSrc: 'icon-maintenance.svg', color: 'bg-gray-500',
        fields: [
            { name: 'task', label: 'Task', type: 'select', options: ['Oil Change', 'Blade Sharpening', 'Air Filter', 'Spark Plug', 'Dethatch', 'Other'] },
            { name: 'equipment', label: 'Equipment Serviced', type: 'text', placeholder: 'e.g. Honda HRX217' },
            { name: 'notes', label: 'Service Notes', type: 'text', placeholder: 'Parts used, readings, etc.' }
        ]
    },
    general: {
        name: 'General Task', icon: '📋', imgSrc: 'icon-general.svg', color: 'bg-gray-400',
        fields: [
            { name: 'task', label: 'Task Description', type: 'text', placeholder: 'What did you do?' }
        ]
    },
    photo: {
        name: 'Photo Log', icon: '📷', imgSrc: 'icon-gallery.svg', color: 'bg-indigo-50',
        fields: [
            { name: 'subject', label: 'What are you capturing?', type: 'select', options: ['Lawn progress', 'New growth', 'Problem area', 'Before treatment', 'After treatment', 'Seasonal change', 'Achievement', 'Other'] }
        ]
    }
};

var ACTIVITY_COLORS = {
    mowing:      { bg: 'bg-[#367C2B]/10', border: 'border-[#367C2B]', text: 'text-[#367C2B]', hex: '#367C2B' },
    fertilizer:  { bg: 'bg-orange-50',    border: 'border-[#F97316]', text: 'text-[#F97316]', hex: '#F97316' },
    trimming:    { bg: 'bg-emerald-50',   border: 'border-emerald-500', text: 'text-emerald-600', hex: '#10B981' },
    watering:    { bg: 'bg-blue-50',      border: 'border-[#3B82F6]', text: 'text-[#3B82F6]', hex: '#3B82F6' },
    seeding:     { bg: 'bg-amber-50',     border: 'border-[#92400E]', text: 'text-[#92400E]', hex: '#92400E' },
    aeration:    { bg: 'bg-purple-50',    border: 'border-purple-500', text: 'text-purple-600', hex: '#8B5CF6' },
    treatment:   { bg: 'bg-teal-50',      border: 'border-teal-500',   text: 'text-teal-700',   hex: '#0D9488' },
    maintenance: { bg: 'bg-gray-50',      border: 'border-[#6B7280]', text: 'text-[#6B7280]', hex: '#6B7280' },
    photo:       { bg: 'bg-indigo-50',    border: 'border-indigo-400', text: 'text-indigo-600', hex: '#6366F1' }
};

var RESEARCH_SOURCES = [
    { id: 'psu',     name: 'Penn State Extension',             count: 8,  url: 'https://extension.psu.edu/',                        topics: 'Tall Fescue, Kentucky Bluegrass, Cool-Season Care, Fertilization, Mowing Heights' },
    { id: 'purdue',  name: 'Purdue Extension',                 count: 6,  url: 'https://www.purdue.edu/hla/sites/turf/',             topics: 'Cool-Season Grasses, Lawn Establishment, Disease Management' },
    { id: 'ncstate', name: 'NC State Extension',               count: 12, url: 'https://content.ces.ncsu.edu/',                     topics: 'Transition Zone Management, Tall Fescue Heat Tolerance, Bermudagrass, Zoysiagrass, Centipedegrass' },
    { id: 'uga',     name: 'University of Georgia Extension',  count: 10, url: 'https://extension.uga.edu/',                        topics: 'Warm-Season Grasses, Bermudagrass Varieties, St. Augustine Care, Disease Control' },
    { id: 'tamu',    name: 'Texas A&M AgriLife Extension',     count: 9,  url: 'https://agrilifeextension.tamu.edu/',               topics: 'Bermudagrass, St. Augustine, Zoysiagrass, Heat Management, Drought Tolerance' },
    { id: 'msu',     name: 'Michigan State Extension',         count: 5,  url: 'https://www.canr.msu.edu/turf/',                    topics: 'Cool-Season Grasses, Northern Climate Management, Kentucky Bluegrass, Pre-Emergent Timing, Growing Degree Days', features: 'Soil Temp Engine' },
    { id: 'clemson', name: 'Clemson Extension',                count: 7,  url: 'https://www.clemson.edu/extension/',                topics: 'Transition Zone, Centipedegrass, Tall Fescue in Heat, Bermudagrass Spring Dead Spot' },
    { id: 'vt',      name: 'Virginia Tech Extension',          count: 6,  url: 'https://ext.vt.edu/',                               topics: 'Transition Zone Grasses, Tall Fescue Varieties, Bermudagrass Cold Hardiness' },
    { id: 'ufl',     name: 'University of Florida IFAS',       count: 8,  url: 'https://sfyl.ifas.ufl.edu/',                        topics: 'St. Augustine, Bahiagrass, Centipedegrass, Year-Round Management, ET-Based Irrigation Scheduling', features: 'Water Budget' },
    { id: 'kstate',  name: 'Kansas State Extension',           count: 5,  url: 'https://www.bookstore.ksre.ksu.edu/',               topics: 'Bermudagrass Cold Tolerance, Transition Zone, Zoysiagrass' },
    { id: 'umn',     name: 'University of Minnesota Extension', count: 4, url: 'https://extension.umn.edu/',                        topics: 'Kentucky Bluegrass, Cool-Season Grasses, Zone 4 Management' },
    { id: 'lsu',     name: 'LSU AgCenter',                     count: 6,  url: 'https://www.lsuagcenter.com/',                      topics: 'Warm-Season Grasses, Centipedegrass, St. Augustine, High Humidity Management' },
    { id: 'osu',     name: 'Ohio State Extension',             count: 5,  url: 'https://ohioline.osu.edu/',                         topics: 'Cool-Season Grasses, Tall Fescue, Kentucky Bluegrass, Midwest Climate' },
    { id: 'rutgers', name: 'Rutgers Cooperative Extension',    count: 4,  url: 'https://njaes.rutgers.edu/',                        topics: 'Cool-Season Turf, Disease Management, Fine Fescues' },
    { id: 'uark',    name: 'University of Arkansas Extension', count: 4,  url: 'https://www.uaex.uada.edu/',                       topics: 'Transition Zone, Bermudagrass, Zoysiagrass, Tall Fescue' },
    { id: 'uconn',   name: 'UConn Extension',                  count: 3,  url: 'https://extension.uconn.edu/',                     topics: 'Cool-Season Grasses, Fine Fescues, Northeast Climate' },
    { id: 'aces',    name: 'Alabama Cooperative Extension',    count: 5,  url: 'https://www.aces.edu/',                             topics: 'Warm-Season Grasses, Bermudagrass, Centipedegrass, Southeast Climate, Mower Maintenance', features: 'My Garage' },
    { id: 'okstate', name: 'Oklahoma State Extension',         count: 4,  url: 'https://extension.okstate.edu/',                   topics: 'Bermudagrass, Transition Zone, Drought Management' },
    { id: 'umass',   name: 'UMass Extension',                  count: 3,  url: 'https://ag.umass.edu/turf',                        topics: 'Cool-Season Grasses, Sports Turf, Northern Management' },
    { id: 'uky',       name: 'University of Kentucky Extension',   count: 6,  url: 'https://uknowledge.uky.edu/anr_reports/',           topics: 'Turfgrass Disease Management, Fungicide Efficacy, Chemical Control of Turfgrass Diseases, Treatment Timing', features: 'Treatment Calculator' },
    { id: 'missouri',  name: 'University of Missouri Extension',   count: 4,  url: 'https://extension.missouri.edu/',                  topics: 'Disease Identification & Control, Pest Management, Cultural Practices for Disease Prevention', features: 'Treatment Calculator' },
    { id: 'colostate', name: 'Colorado State University Extension', count: 4, url: 'https://extension.colostate.edu/',                 topics: 'ET-Based Irrigation Scheduling, Water Balance Approach, Soil Water Deficit Management', features: 'Water Budget' },
    { id: 'umd',       name: 'University of Maryland Extension',   count: 3,  url: 'https://extension.umd.edu/',                      topics: 'Precision Irrigation, Evapotranspiration & Water Management, Penman-Monteith ET Calculations', features: 'Water Budget' },
    { id: 'uwmadison', name: 'UW-Madison Turfgrass Science',       count: 4,  url: 'https://turf.wisc.edu/',                          topics: 'Crabgrass Pre-Emergence Timing, Growing Degree Day Models, Soil Temperature Thresholds', features: 'Soil Temp Engine' },
    { id: 'illinois',  name: 'University of Illinois Extension',   count: 4,  url: 'https://extension.illinois.edu/lawns/',            topics: 'Mower Maintenance Schedules, Crabgrass Management, Equipment Upkeep for Homeowners', features: 'My Garage' }
];

var GRASS_KEY_MAP = {
    'tall-fescue': 'tallFescue',
    'kentucky-bluegrass': 'kentuckyBluegrass',
    'perennial-ryegrass': 'perennialRyegrass',
    'fine-fescue': 'fineFescue',
    'bermuda': 'bermuda',
    'zoysia': 'zoysia',
    'st-augustine': 'stAugustine',
    'centipede': 'centipede',
    'bahia': 'bahia',
    'buffalograss': 'buffalograss',
    'sun-shade-mix': 'sunShadeMix',
    'dense-shade-mix': 'denseShade',
    'tall-fescue-blend': 'tallFescueBlend'
};

var MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

var GRASS_INFO = {
    'tall-fescue': {
        name: 'Tall Fescue', season: 'Cool Season',
        mowHeight: '3 - 4 inches', mowHeightSummer: '3.5 - 4 inches',
        waterPerWeek: '1 - 1.5 inches', idealSoilPH: '5.8 - 6.5',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Full sun to partial shade (4-6 hrs)',
        fertPerYear: '3 - 4 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'May slow/brown in summer heat',
        bestFeature: 'Deep root system, excellent drought tolerance for a cool-season grass',
        commonIssues: ['Brown patch in humid summers', 'Pythium blight in wet conditions', 'Can thin in heavy shade'],
        keyTips: ['September is the #1 most important month - fertilize heavily and overseed', 'Raise mowing height in summer to reduce heat stress', 'Never remove more than 1/3 of the blade at a time', 'Core aerate in fall for best results'],
        zoneNotes: { '4': 'Excellent choice - very cold hardy. Focus on spring/fall feeding.', '5': 'Ideal zone. Standard cool-season program works perfectly.', '6': 'Great performance. Watch for brown patch in humid summers.', '7': 'Transition zone - use heat-tolerant varieties (Firecracker LS, Mustang 4). Summer stress is real.', '8': 'Challenging - will struggle in summer. Consider warm-season alternatives.', '9': 'Not recommended - too hot. Switch to bermuda, zoysia, or st. augustine.' },
        sources: [{ name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Tall Fescue Lawn Maintenance Calendar' }, { name: 'Purdue Extension', url: 'https://www.purdue.edu/hla/sites/turf/tall-fescue/', topic: 'Tall Fescue Management' }, { name: 'NC State Extension', url: 'https://content.ces.ncsu.edu/carolina-lawns', topic: 'Carolina Lawns: Tall Fescue' }]
    },
    'kentucky-bluegrass': {
        name: 'Kentucky Bluegrass', season: 'Cool Season',
        mowHeight: '2.5 - 3.5 inches', mowHeightSummer: '3 - 3.5 inches',
        waterPerWeek: '1 - 1.5 inches', idealSoilPH: '6.0 - 7.0',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Full sun (6+ hours)',
        fertPerYear: '3 - 5 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'Goes dormant in summer heat (turns brown, recovers in fall)',
        bestFeature: 'Self-repairing via rhizomes - fills in bare spots naturally',
        commonIssues: ['Dollar spot', 'Summer patch', 'Necrotic ring spot', 'Needs more water than fescue'],
        keyTips: ['Needs more sun than fescue - struggles below 6 hours direct sun', 'Will go dormant in summer but bounces back in fall', 'Slow to establish from seed (14-30 days germination)', 'Fall is the best time to seed and fertilize heavily'],
        zoneNotes: { '4': 'Premium choice - thrives in cold climates. The classic northern lawn grass.', '5': 'Excellent. Standard KBG program works great.', '6': 'Good but expect summer dormancy in hot years.', '7': 'Difficult - summer stress is significant. Blend with tall fescue.', '8': 'Not recommended without irrigation and shade.', '9': 'Not viable - too hot.' },
        sources: [{ name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Kentucky Bluegrass Lawn Maintenance' }, { name: 'Michigan State Extension', url: 'https://www.canr.msu.edu/turf/kentucky-bluegrass', topic: 'Kentucky Bluegrass Care' }, { name: 'University of Minnesota Extension', url: 'https://extension.umn.edu/lawn-care/kentucky-bluegrass', topic: 'KBG for Northern Climates' }]
    },
    'perennial-ryegrass': {
        name: 'Perennial Ryegrass', season: 'Cool Season',
        mowHeight: '1.5 - 2.5 inches', mowHeightSummer: '2.5 - 3 inches',
        waterPerWeek: '1 inch', idealSoilPH: '6.0 - 7.0',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Full sun to light shade',
        fertPerYear: '2 - 4 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'Poor heat tolerance - can die in extreme heat',
        bestFeature: 'Fastest germination (5-10 days) - great for quick fill and overseeding',
        commonIssues: ['Gray leaf spot', 'Pythium blight', 'Poor heat/drought tolerance', 'Crown rust'],
        keyTips: ['Best used in blends with KBG or fescue rather than as a standalone', 'Excellent for overseeding warm-season lawns in winter', 'Germinates very fast - great for quick repairs', 'Mow frequently to maintain density'],
        zoneNotes: { '4': 'Good in blends. Can winterkill in extreme cold.', '5': 'Works well in blends with KBG.', '6': 'Good for blends and overseeding.', '7': 'Best as winter overseed for warm-season lawns.', '8': 'Winter overseed only.', '9': 'Winter overseed only.' },
        sources: [{ name: 'Rutgers Cooperative Extension', url: 'https://njaes.rutgers.edu/fs1316/', topic: 'Perennial Ryegrass Turf Management' }, { name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Perennial Ryegrass Maintenance' }]
    },
    'bermuda': {
        name: 'Bermudagrass', season: 'Warm Season',
        mowHeight: '0.5 - 2 inches', mowHeightSummer: '1 - 2 inches',
        waterPerWeek: '1 - 1.25 inches', idealSoilPH: '6.0 - 6.5',
        idealSoilTemp: '65°F+ for active growth', sunNeeds: 'Full sun required (8+ hours ideal)',
        fertPerYear: '3 - 5 lbs N per 1,000 sq ft', peakGrowth: 'Summer (June - August)',
        dormancy: 'Goes dormant and turns brown below 50°F',
        bestFeature: 'Extremely aggressive growth - repairs damage quickly, excellent traffic tolerance',
        commonIssues: ['Spring dead spot', 'Large patch', 'Invasive into flower beds', 'Winter dormancy (brown)'],
        keyTips: ['Do NOT fertilize until fully greened up in spring (soil 65°F+)', 'Mow low and frequently for the best lawn', 'Scalp in early spring to remove brown thatch and speed green-up', 'Apply pre-emergent in late February/early March'],
        zoneNotes: { '4': 'Not viable - too cold.', '5': 'Not recommended - winter damage is likely.', '6': 'Marginal - only cold-hardy varieties (Latitude 36, NorthBridge).', '7': 'Good with cold-hardy varieties. Expect 4-5 months dormancy.', '8': 'Excellent - this is bermuda country.', '9': 'Excellent - thrives with proper management.' },
        sources: [{ name: 'NC State Extension', url: 'https://content.ces.ncsu.edu/carolina-lawns', topic: 'Bermudagrass Maintenance' }, { name: 'Texas A&M AgriLife', url: 'https://agrilifeextension.tamu.edu/bermudagrass/', topic: 'Bermudagrass Management Guide' }, { name: 'UGA Extension', url: 'https://extension.uga.edu/publications/lawn-garden.html', topic: 'Bermudagrass Calendar' }]
    },
    'zoysia': {
        name: 'Zoysiagrass', season: 'Warm Season',
        mowHeight: '1 - 2 inches', mowHeightSummer: '1.5 - 2 inches',
        waterPerWeek: '0.75 - 1 inch', idealSoilPH: '6.0 - 6.5',
        idealSoilTemp: '65°F+ for active growth', sunNeeds: 'Full sun to moderate shade (4+ hours)',
        fertPerYear: '2 - 3 lbs N per 1,000 sq ft', peakGrowth: 'Late Spring - Summer',
        dormancy: 'Goes dormant below 55°F - turns golden brown',
        bestFeature: 'Dense, carpet-like texture with good shade tolerance for a warm-season grass',
        commonIssues: ['Large patch disease', 'Slow to establish', 'Heavy thatch buildup', 'Slow spring green-up'],
        keyTips: ['Patience required - zoysia is slow to spread and fill in', 'Dethatch or core aerate regularly to prevent thatch buildup', "Needs less fertilizer than bermuda - don't over-feed", 'Last to green up in spring and first to go dormant in fall'],
        zoneNotes: { '4': 'Not recommended - too cold.', '5': 'Marginal - only the hardiest varieties (Zenith, Meyer).', '6': 'Good option with cold-hardy varieties. Expect long dormancy.', '7': 'Excellent transition zone choice - good compromise grass.', '8': 'Excellent performance.', '9': 'Good but bermuda or st. augustine may perform better.' },
        sources: [{ name: 'Kansas State Extension', url: 'https://www.bookstore.ksre.ksu.edu/pubs/MF3280.pdf', topic: 'Zoysiagrass Lawn Care' }, { name: 'Clemson Extension', url: 'https://www.clemson.edu/extension/hgic/plants/landscape/lawns/hgic1214.html', topic: 'Zoysiagrass Maintenance' }, { name: 'NC State Extension', url: 'https://content.ces.ncsu.edu/carolina-lawns', topic: 'Zoysiagrass in the Transition Zone' }]
    },
    'st-augustine': {
        name: 'St. Augustinegrass', season: 'Warm Season',
        mowHeight: '3 - 4 inches', mowHeightSummer: '3.5 - 4 inches',
        waterPerWeek: '1 - 1.5 inches', idealSoilPH: '6.0 - 6.5',
        idealSoilTemp: '65°F+ for active growth', sunNeeds: 'Full sun to moderate shade (best warm-season shade tolerance)',
        fertPerYear: '2 - 4 lbs N per 1,000 sq ft', peakGrowth: 'Summer',
        dormancy: 'Goes dormant below 55°F, sensitive to freeze damage',
        bestFeature: 'Best shade tolerance of any warm-season grass - thick, lush growth',
        commonIssues: ['Chinch bugs (major pest)', 'Gray leaf spot', 'SAD virus (St. Augustine Decline)', 'Poor cold tolerance'],
        keyTips: ['Must be established by sod or plugs - no viable seed available', 'Keep mowing height high (3.5-4") for healthiest lawn', 'Watch closely for chinch bug damage in hot, dry periods', 'Do not over-fertilize with nitrogen - increases disease risk'],
        zoneNotes: { '4': 'Not viable.', '5': 'Not viable.', '6': 'Not viable - no cold tolerance.', '7': 'Very risky - freeze damage likely.', '8': 'Good in southern Zone 8. Protect from hard freezes.', '9': 'Excellent - ideal climate for st. augustine.' },
        sources: [{ name: 'UF/IFAS Extension', url: 'https://edis.ifas.ufl.edu/topic-st-augustinegrass', topic: 'St. Augustinegrass for Florida Lawns' }, { name: 'Texas A&M AgriLife', url: 'https://agrilifeextension.tamu.edu/st-augustinegrass/', topic: 'St. Augustinegrass Management' }, { name: 'LSU AgCenter', url: 'https://www.lsuagcenter.com/topics/lawn_garden/lawns', topic: 'St. Augustinegrass Care' }]
    },
    'fine-fescue': {
        name: 'Fine Fescue', season: 'Cool Season',
        mowHeight: '2.5 - 3.5 inches', mowHeightSummer: '3 - 3.5 inches',
        waterPerWeek: '0.5 - 1 inch', idealSoilPH: '5.5 - 6.5',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Shade-tolerant (as little as 2-3 hours direct sun)',
        fertPerYear: '1 - 2 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'Semi-dormant in hot, dry summers — recovers in fall',
        bestFeature: 'Best shade tolerance of all cool-season grasses — grows where others fail',
        commonIssues: ['Red thread disease', 'Dollar spot', 'Thins in heavy foot traffic', 'Summer heat stress in humid regions'],
        keyTips: ['Includes creeping red, chewings, hard, and sheep fescue varieties', 'Requires far less fertilizer than bluegrass or tall fescue — do not over-feed', 'Very drought tolerant once established — allow to go semi-dormant in dry summers', 'Best choice for shaded areas, low-maintenance lawns, or low-input landscapes'],
        zoneNotes: { '4': 'Excellent choice — very cold hardy, ideal for shaded northern lawns.', '5': 'Excellent performance in shade and low-maintenance settings.', '6': 'Good to excellent. Watch for heat stress in humid summers.', '7': 'Best used in shade only. Struggles in full sun in transition zone heat.', '8': 'Not recommended — heat and humidity cause rapid decline.', '9': 'Not viable.' },
        sources: [{ name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Fine Fescue Lawn Management' }, { name: 'University of Minnesota Extension', url: 'https://extension.umn.edu/lawn-care/fine-fescue', topic: 'Fine Fescue for Low-Maintenance Lawns' }, { name: 'Rutgers Cooperative Extension', url: 'https://njaes.rutgers.edu/', topic: 'Fine Fescue Turf Management' }]
    },
    'centipede': {
        name: 'Centipedegrass', season: 'Warm Season',
        mowHeight: '1.5 - 2 inches', mowHeightSummer: '1.5 - 2 inches',
        waterPerWeek: '1 inch', idealSoilPH: '5.0 - 6.0',
        idealSoilTemp: '65°F+ for active growth', sunNeeds: 'Full sun to light shade (4+ hours)',
        fertPerYear: '1 - 2 lbs N per 1,000 sq ft', peakGrowth: 'Summer',
        dormancy: 'Goes dormant below 55°F — turns tan/brown',
        bestFeature: 'Lowest maintenance warm-season grass — slow growth means less mowing and fertilizing',
        commonIssues: ['Iron deficiency (chlorosis — yellowing)', 'Centipede decline', 'Large patch disease', 'Thatch buildup from excess fertilizer'],
        keyTips: ['Do NOT over-fertilize — excess nitrogen damages centipede and causes decline', 'Prefers acidic soil (pH 5.0–6.0); do not lime unless a soil test confirms need', 'Apply iron sulfate if yellowing occurs — do not add extra nitrogen', 'Rarely needs more than 1–2 light fertilizations per year'],
        zoneNotes: { '4': 'Not viable — too cold.', '5': 'Not viable.', '6': 'Not viable.', '7': 'Marginal in warmer parts of Zone 7b only.', '8': 'Excellent — centipede country. Thrives in the Southeast.', '9': 'Good performance, especially in acidic soils.' },
        sources: [{ name: 'Clemson Cooperative Extension', url: 'https://www.clemson.edu/extension/hgic/plants/landscape/lawns/hgic1216.html', topic: 'Centipedegrass Maintenance' }, { name: 'NC State Extension', url: 'https://content.ces.ncsu.edu/carolina-lawns', topic: 'Centipedegrass in the Southeast' }, { name: 'UGA Extension', url: 'https://extension.uga.edu/publications/lawn-garden.html', topic: 'Centipedegrass Management' }]
    },
    'bahia': {
        name: 'Bahiagrass', season: 'Warm Season',
        mowHeight: '3 - 4 inches', mowHeightSummer: '3 - 4 inches',
        waterPerWeek: '0.75 - 1 inch', idealSoilPH: '5.5 - 6.5',
        idealSoilTemp: '65°F+ for active growth', sunNeeds: 'Full sun required (6+ hours)',
        fertPerYear: '2 - 4 lbs N per 1,000 sq ft', peakGrowth: 'Summer',
        dormancy: 'Goes dormant below 55°F — turns light tan/brown',
        bestFeature: 'Extremely deep root system — exceptional drought and traffic tolerance for low-input lawns',
        commonIssues: ['Mole crickets (major pest in Florida)', 'Dollar spot', 'Persistent seed heads requiring frequent mowing', 'Poor cold tolerance'],
        keyTips: ['Produces Y-shaped seed heads frequently — mow often to remove them', 'Extremely drought tolerant once established — needs little irrigation', 'Apply mole cricket bait in late summer if tunneling is visible', 'Argentine and Pensacola are the most common and cold-tolerant varieties'],
        zoneNotes: { '4': 'Not viable.', '5': 'Not viable.', '6': 'Not viable.', '7': 'Not recommended — cold sensitivity causes winter damage.', '8': 'Good in southern areas, especially Florida and Gulf Coast.', '9': 'Excellent — prime bahia territory.' },
        sources: [{ name: 'UF/IFAS Extension', url: 'https://edis.ifas.ufl.edu/topic-bahiagrass', topic: 'Bahiagrass for Florida Lawns' }, { name: 'LSU AgCenter', url: 'https://www.lsuagcenter.com/topics/lawn_garden/lawns', topic: 'Bahiagrass Lawn Care' }, { name: 'Texas A&M AgriLife', url: 'https://agrilifeextension.tamu.edu/', topic: 'Bahiagrass Management' }]
    },
    'buffalograss': {
        name: 'Buffalograss', season: 'Native Warm Season',
        mowHeight: '2 - 4 inches', mowHeightSummer: '3 - 4 inches',
        waterPerWeek: '0.25 - 0.5 inches', idealSoilPH: '6.5 - 7.5',
        idealSoilTemp: '60°F+ for active growth', sunNeeds: 'Full sun required (8+ hours) — no shade tolerance',
        fertPerYear: '0.5 - 2 lbs N per 1,000 sq ft', peakGrowth: 'Late Spring - Summer',
        dormancy: 'Goes dormant below 50°F and in drought — turns tan/straw',
        bestFeature: 'Native North American prairie grass — ultra-low water and fertilizer needs; ideal for sustainable lawns',
        commonIssues: ['Broadleaf weeds invade thinned turf easily', 'Thins and dies in shade', 'Slow to establish from seed or plugs', 'Declines in humid climates'],
        keyTips: ['Requires up to 75% less water than Kentucky bluegrass — do not over-irrigate', 'Do not over-fertilize — promotes weed invasion and disease', 'Performs best in clay soils of the Great Plains and western regions', 'Avoid in humid southeastern climates — bermuda or zoysia perform far better there'],
        zoneNotes: { '4': 'Marginal — can winterkill in extreme cold. Works in protected sites in dry climates.', '5': 'Good in dry western climates. Struggles in humid eastern states.', '6': 'Good in western and central states. Poor choice in humid southeast.', '7': 'Good where heat and drought dominate. Not suited for humid Gulf regions.', '8': 'Works in dry western areas, but bermuda or zoysia outperform in most Zone 8 conditions.', '9': 'Not recommended — too much humidity and competition from other grasses.' },
        sources: [{ name: 'Kansas State Extension', url: 'https://www.bookstore.ksre.ksu.edu/', topic: 'Buffalograss Lawn Care for the Plains' }, { name: 'Texas A&M AgriLife', url: 'https://agrilifeextension.tamu.edu/', topic: 'Buffalograss Management' }, { name: 'University of Nebraska Extension', url: 'https://extension.unl.edu/', topic: 'Buffalograss for Low-Maintenance Lawns' }]
    },
    'sun-shade-mix': {
        name: 'Sun & Shade Mix', season: 'Cool Season Blend',
        mowHeight: '3 - 3.5 inches', mowHeightSummer: '3.5 - 4 inches',
        waterPerWeek: '1 - 1.25 inches', idealSoilPH: '6.0 - 6.5',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Adaptable — 3+ hours (partial shade to full sun)',
        fertPerYear: '2 - 3 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'KBG component may go dormant in summer heat; fine fescue slows — both recover in fall',
        bestFeature: 'Versatile blend that adapts to mixed sun and shade across the same lawn',
        commonIssues: ['Species compete and shift over time — sunnier areas favor KBG, shaded areas favor fine fescue', 'Fine fescue thins in high-traffic sunny spots', 'Inconsistent color and texture across varied light conditions', 'KBG component slow to establish from seed'],
        keyTips: ['Fertilize and mow to match the most demanding species (KBG rates and heights)', 'Fall is the most important season — fertilize and overseed in September', 'Always overseed with the same blend product to maintain mix balance', 'Core aerate in fall to help all species compete evenly'],
        blendBrands: [
            { brand: 'Scotts', product: 'Turf Builder Sun & Shade Mix', note: 'KBG + Perennial Rye + Fine Fescue' },
            { brand: 'Pennington', product: 'Smart Seed Sun & Shade', note: 'Fine Fescue + KBG + Ryegrass' },
            { brand: 'GreenView', product: 'Sun & Shade Grass Seed', note: 'Fine Fescue + KBG blend' },
            { brand: 'Vigoro', product: 'Sun & Shade Grass Seed', note: 'Fine Fescue + KBG + Rye mix' }
        ],
        zoneNotes: { '4': 'Good choice for mixed sun/shade northern lawns. Fine fescue thrives in the cool climate.', '5': 'Excellent performance across varied light conditions. Standard fall program applies.', '6': 'Good to excellent. Full-sun areas may thin in summer — overseed faithfully each fall.', '7': 'Use in shaded or partly shaded settings only. Full-sun areas will stress in transition zone heat.', '8': 'Not recommended — cool-season components struggle in summer heat.', '9': 'Not viable.' },
        sources: [{ name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Cool-Season Grass Blends' }, { name: 'University of Minnesota Extension', url: 'https://extension.umn.edu/lawn-care/kentucky-bluegrass', topic: 'KBG and Fine Fescue Blends' }, { name: 'Rutgers Cooperative Extension', url: 'https://njaes.rutgers.edu/fs1316/', topic: 'Fine Fescue and Ryegrass Blends' }]
    },
    'dense-shade-mix': {
        name: 'Dense Shade Mix', season: 'Cool Season Blend',
        mowHeight: '3 - 3.5 inches', mowHeightSummer: '3.5 - 4 inches',
        waterPerWeek: '0.5 - 1 inch', idealSoilPH: '5.5 - 6.5',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Deep shade tolerant — as little as 2 hours direct sun',
        fertPerYear: '1 - 2 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'Fine fescues semi-dormant in summer heat; thin under prolonged heat stress but recover in fall',
        bestFeature: 'Handles deeper shade than any other cool-season blend — grows where most grasses fail',
        commonIssues: ['Very thin in high-traffic areas — not a play lawn choice', 'Susceptible to dollar spot and red thread disease', 'Declines rapidly in areas that lose shade coverage', 'Does not tolerate compaction well'],
        keyTips: ['Fine fescue dominates this blend — follow its low-input care guidelines', 'Never over-fertilize: more than 2 lbs N/year causes surge growth and disease', 'Less water needed than other blends — shade reduces evaporation significantly', 'Overseed with the same shade blend product to maintain species balance'],
        blendBrands: [
            { brand: 'Scotts', product: 'Turf Builder Dense Shade Mix', note: 'Fine Fescue varieties dominant' },
            { brand: 'Jonathan Green', product: 'Dense Shade Grass Seed', note: 'Creeping Red + Chewings Fescue' },
            { brand: 'Pennington', product: 'Smart Seed Dense Shade', note: 'Fine Fescue blend for deep shade' },
            { brand: 'Barenbrug', product: 'Shade Mixture', note: 'Hard Fescue + Creeping Red Fescue' }
        ],
        zoneNotes: { '4': 'Excellent — fine fescues peak in cool, shaded northern settings.', '5': 'Excellent under trees and north-facing slopes.', '6': 'Good in true shade. Watch for heat stress in dappled light areas in summer.', '7': 'Use in true dense shade only. Combination of heat and any sun causes rapid thinning.', '8': 'Not recommended.', '9': 'Not viable.' },
        sources: [{ name: 'University of Minnesota Extension', url: 'https://extension.umn.edu/lawn-care/fine-fescue', topic: 'Fine Fescue for Low-Maintenance and Shade' }, { name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Shade-Tolerant Grass Types' }, { name: 'Rutgers Cooperative Extension', url: 'https://njaes.rutgers.edu/', topic: 'Fine Fescue Turf Management' }]
    },
    'tall-fescue-blend': {
        name: 'Tall Fescue Blend', season: 'Cool Season Blend',
        mowHeight: '3 - 4 inches', mowHeightSummer: '3.5 - 4 inches',
        waterPerWeek: '1 - 1.5 inches', idealSoilPH: '5.8 - 6.5',
        idealSoilTemp: '50 - 65°F for growth', sunNeeds: 'Full sun to partial shade (4-6 hrs)',
        fertPerYear: '3 - 4 lbs N per 1,000 sq ft', peakGrowth: 'Spring & Fall',
        dormancy: 'May slow and thin in peak summer heat; KBG component helps fill bare spots in fall',
        bestFeature: 'Premium tall fescue with a small KBG component for self-repair — fills bare spots better than pure TF',
        commonIssues: ['Brown patch in humid summers', 'Summer heat stress in Zone 7–8', 'Slight color/texture variation between species', 'KBG component (5-10%) won\'t thrive in dense shade'],
        keyTips: ['Treat like pure tall fescue — TF dominates the blend; KBG is the self-repair component', 'Always overseed with a matching tall fescue blend product, not pure TF seed', 'September is the most critical month — fertilize and overseed heavily', 'Raise mowing height to 3.5–4 inches through summer heat'],
        blendBrands: [
            { brand: 'Jonathan Green', product: 'Black Beauty Original', note: 'The classic TF blend — gold standard for transition zone' },
            { brand: 'Jonathan Green', product: 'Black Beauty Ultra', note: 'Premium blend with endophytes for insect resistance' },
            { brand: 'Scotts', product: 'Turf Builder Tall Fescue Mix', note: 'Tall Fescue + small % KBG' },
            { brand: 'Pennington', product: 'Smart Seed Tall Fescue & KBG', note: 'Drought-resistant TF varieties + KBG' }
        ],
        zoneNotes: { '4': 'Marginal — tall fescue is not ideal this far north. KBG is the better primary choice.', '5': 'Good choice, especially for transitional light conditions (4–6 hours sun).', '6': 'Excellent — the primary recommendation for most Zone 6 lawns.', '7': 'Very good in the transition zone. Use heat-tolerant varieties (Firecracker LS, Mustang 4).', '8': 'Challenging in full summer heat. Shade and irrigation help significantly.', '9': 'Not recommended — too hot for tall fescue through summer.' },
        sources: [{ name: 'Penn State Extension', url: 'https://extension.psu.edu/lawn-care', topic: 'Tall Fescue Lawn Maintenance Calendar' }, { name: 'NC State Extension', url: 'https://content.ces.ncsu.edu/carolina-lawns', topic: 'Carolina Lawns: Tall Fescue' }, { name: 'Purdue Extension', url: 'https://www.purdue.edu/hla/sites/turf/tall-fescue/', topic: 'Tall Fescue Management' }]
    }
};

var ZONE_INFO = {
    '4':  { temp: '-30 to -20°F', climate: 'Northern Cold',     description: 'Long, cold winters. Short growing season. Cool-season grasses only.',                                             lastFrost: { month: 5, day: 10 }, firstFrost: { month: 9, day: 20  }, growingDays: 133 },
    '4a': { temp: '-30 to -25°F', climate: 'Northern Cold',     description: 'Extreme cold winters. Short growing season. Cool-season grasses only.',                                          lastFrost: { month: 5, day: 15 }, firstFrost: { month: 9, day: 15  }, growingDays: 123 },
    '4b': { temp: '-25 to -20°F', climate: 'Northern Cold',     description: 'Very cold winters. Short growing season. Cool-season grasses only.',                                             lastFrost: { month: 5, day: 5  }, firstFrost: { month: 9, day: 25  }, growingDays: 143 },
    '5':  { temp: '-20 to -10°F', climate: 'Northern',          description: 'Cold winters, moderate summers. Ideal for cool-season grasses.',                                                 lastFrost: { month: 4, day: 25 }, firstFrost: { month: 10, day: 5  }, growingDays: 163 },
    '5a': { temp: '-20 to -15°F', climate: 'Northern',          description: 'Cold winters, moderate summers. Ideal for cool-season grasses.',                                                 lastFrost: { month: 4, day: 30 }, firstFrost: { month: 10, day: 1  }, growingDays: 154 },
    '5b': { temp: '-15 to -10°F', climate: 'Northern',          description: 'Cold winters, moderate summers. Ideal for cool-season grasses.',                                                 lastFrost: { month: 4, day: 20 }, firstFrost: { month: 10, day: 10 }, growingDays: 173 },
    '6':  { temp: '-10 to 0°F',   climate: 'Moderate',          description: 'Moderate winters. Good for cool-season grasses, some warm-season with care.',                                   lastFrost: { month: 4, day: 10 }, firstFrost: { month: 10, day: 22 }, growingDays: 195 },
    '6a': { temp: '-10 to -5°F',  climate: 'Moderate',          description: 'Moderate winters, cooler half. Great for cool-season grasses; warm-season marginal.',                          lastFrost: { month: 4, day: 15 }, firstFrost: { month: 10, day: 18 }, growingDays: 186 },
    '6b': { temp: '-5 to 0°F',    climate: 'Moderate',          description: 'Moderate winters, warmer half. Cool-season grasses excel; select warm-season varieties possible.',             lastFrost: { month: 4, day: 5  }, firstFrost: { month: 10, day: 28 }, growingDays: 206 },
    '7':  { temp: '0 to 10°F',    climate: 'Transition Zone',   description: 'The toughest zone for lawns. Both cool and warm-season grasses face challenges.',                              lastFrost: { month: 3, day: 25 }, firstFrost: { month: 11, day: 5  }, growingDays: 225 },
    '7a': { temp: '0 to 5°F',     climate: 'Transition Zone',   description: 'Transition zone, cooler half. Cool-season grasses can struggle in summer heat.',                               lastFrost: { month: 3, day: 30 }, firstFrost: { month: 11, day: 1  }, growingDays: 216 },
    '7b': { temp: '5 to 10°F',    climate: 'Transition Zone',   description: 'Transition zone, warmer half. Warm-season grasses become more reliable.',                                      lastFrost: { month: 3, day: 20 }, firstFrost: { month: 11, day: 10 }, growingDays: 235 },
    '8':  { temp: '10 to 20°F',   climate: 'Southern',          description: 'Mild winters, hot summers. Warm-season grasses thrive here.',                                                  lastFrost: { month: 3, day: 8  }, firstFrost: { month: 11, day: 22 }, growingDays: 259 },
    '8a': { temp: '10 to 15°F',   climate: 'Southern',          description: 'Mild winters, hot summers. Warm-season grasses thrive; cool-season overseeding possible.',                    lastFrost: { month: 3, day: 12 }, firstFrost: { month: 11, day: 18 }, growingDays: 251 },
    '8b': { temp: '15 to 20°F',   climate: 'Southern',          description: 'Mild winters, long hot summers. Warm-season grasses dominate.',                                                lastFrost: { month: 3, day: 3  }, firstFrost: { month: 11, day: 28 }, growingDays: 270 },
    '9':  { temp: '20 to 30°F',   climate: 'Deep South / Gulf', description: 'Very mild winters, long hot summers. Warm-season grasses dominate.',                                           lastFrost: { month: 2, day: 15 }, firstFrost: { month: 12, day: 10 }, growingDays: 298 },
    '9a': { temp: '20 to 25°F',   climate: 'Deep South / Gulf', description: 'Very mild winters, long hot summers. Warm-season grasses dominate.',                                           lastFrost: { month: 2, day: 20 }, firstFrost: { month: 12, day: 6  }, growingDays: 289 },
    '9b': { temp: '25 to 30°F',   climate: 'Deep South / Gulf', description: 'Nearly frost-free, intense heat and humidity. Warm-season grasses only.',                                     lastFrost: { month: 2, day: 8  }, firstFrost: { month: 12, day: 16 }, growingDays: 311 }
};

// ─── Soil Types ─────────────────────────────────────────────────────────────
// Used for profile form and soil-type-aware recommendations
var SOIL_TYPES = {
    sandy: {
        name: 'Sandy',
        description: 'Fast-draining, low water retention',
        wateringNote: 'Water more frequently — sandy soil drains quickly and dries out fast',
        fertilizerNote: 'Use slow-release fertilizers — nutrients leach through sandy soil faster',
        aerationNote: 'Less prone to compaction; standard aeration schedule applies',
        advisoryIcon: '💧',
        wateringMultiplier: 1.3  // 30% more frequent watering
    },
    loam: {
        name: 'Loam',
        description: 'Ideal balance of drainage and water retention',
        wateringNote: 'Balanced drainage — standard watering schedule applies',
        fertilizerNote: 'Good nutrient retention — standard fertilizer rates apply',
        aerationNote: 'Standard aeration schedule applies',
        advisoryIcon: '✅',
        wateringMultiplier: 1.0
    },
    clay: {
        name: 'Clay',
        description: 'Slow-draining, compacts easily',
        wateringNote: 'Water deeply but infrequently — clay holds moisture well but can become waterlogged',
        fertilizerNote: 'Nutrients bind well, but compaction limits root uptake — correct pH and aerate first',
        aerationNote: 'Core aeration is critical — clay compacts under foot and mower traffic',
        advisoryIcon: '🔧',
        wateringMultiplier: 0.8  // 20% less frequent watering
    },
    silt: {
        name: 'Silt',
        description: 'Fine particles, good fertility but can compact',
        wateringNote: 'Moderate drainage — watch for surface crusting that can block water infiltration',
        fertilizerNote: 'Good nutrient retention — standard fertilizer rates apply',
        aerationNote: 'Annual aeration recommended to prevent surface compaction',
        advisoryIcon: '⚠️',
        wateringMultiplier: 0.9
    },
    'sandy-loam': {
        name: 'Sandy Loam',
        description: 'Good drainage with moderate water retention',
        wateringNote: 'Slightly faster drainage than loam — water a bit more frequently in dry spells',
        fertilizerNote: 'Some leaching risk — use split fertilizer applications for best uptake',
        aerationNote: 'Standard aeration schedule applies',
        advisoryIcon: '💧',
        wateringMultiplier: 1.15
    },
    'clay-loam': {
        name: 'Clay Loam',
        description: 'Slower drainage, moderate compaction risk',
        wateringNote: 'Holds moisture well — avoid overwatering and watch for runoff',
        fertilizerNote: 'Good nutrient holding capacity — avoid heavy single applications',
        aerationNote: 'Annual core aeration recommended to manage compaction',
        advisoryIcon: '🔧',
        wateringMultiplier: 0.85
    }
};

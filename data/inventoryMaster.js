export function generateInventoryMaster() {
  const categories = {
    Produce: {
      items: [
        "Romaine lettuce heads", "Iceberg lettuce heads", "Spring mix", "Baby spinach", "Kale bunches",
        "Green cabbage", "Red cabbage", "Yellow onions", "Red onions", "Green onions", "Shallots", "Garlic bulbs",
        "Russet potatoes", "Yukon gold potatoes", "Sweet potatoes", "Red potatoes", "Whole carrots", "Carrot sticks",
        "Celery stalks", "White button mushrooms", "Cremini mushrooms", "Portobello caps", "Cherry tomatoes",
        "Roma tomatoes", "Beefsteak tomatoes", "Cucumbers", "English cucumbers", "Green bell peppers",
        "Red bell peppers", "Yellow bell peppers", "Poblano peppers", "Jalapeño peppers", "Serrano peppers",
        "Zucchini", "Yellow squash", "Asparagus", "Green beans", "Broccoli crowns", "Cauliflower florets",
        "Brussels sprouts", "Sugar snap peas", "Snow peas", "Avocados", "Lemons", "Limes", "Navel oranges",
        "Grapefruits", "Pineapples", "Watermelons", "Cantaloupes", "Honeydew melons", "Red grapes", "Green grapes",
        "Strawberries", "Blueberries", "Blackberries", "Raspberries", "Bananas", "Fresh basil", "Fresh cilantro",
        "Fresh flat leaf parsley", "Fresh curly parsley", "Fresh thyme", "Fresh rosemary", "Fresh mint", "Fresh dill",
        "Ginger root", "Leeks", "Radishes", "Mixed baby greens"
      ],
      unit: "lb",
      storage: "Cooler",
      vendor: "Produce Vendor"
    },
    Meats: {
      items: [
        "Beef tenderloin whole", "Beef ribeye steaks", "Beef striploin steaks", "Beef sirloin steaks", "Beef short ribs",
        "Beef chuck roast", "Ground beef 80-20", "Ground beef 90-10", "Beef brisket flats", "Beef oxtail",
        "Lamb racks frenched", "Lamb loin chops", "Lamb shanks", "Pork loin roasts", "Pork tenderloins",
        "Pork shoulder butts", "Pork belly slabs", "Pork spare ribs", "Pork baby back ribs", "Ground pork",
        "Bone in chicken thighs", "Boneless skinless chicken thighs", "Bone in chicken breasts", "Boneless skinless chicken breasts",
        "Chicken wings party cut", "Whole chickens", "Chicken tenders", "Ground chicken", "Turkey breast roasts",
        "Ground turkey", "Duck breasts", "Whole ducks", "Italian sausage links sweet", "Italian sausage links hot",
        "Breakfast sausage patties", "Andouille sausage", "Chorizo sausage", "Smoked sausage ropes", "Bacon slab",
        "Bacon sliced", "Ham whole bone in", "Ham sliced deli", "Prosciutto", "Genoa salami", "Pastrami",
        "Roast beef deli", "Mortadella", "Pepperoni slices", "Atlantic salmon fillets", "Steelhead trout fillets",
        "Halibut fillets", "Cod loins", "Mahi mahi fillets", "Tilapia fillets", "Sea bass fillets", "Tuna steaks",
        "Shrimp 16-20 peeled deveined", "Shrimp 26-30 peeled deveined", "Bay scallops", "Sea scallops U10",
        "Calamari rings", "Mussels whole shell on", "Littleneck clams", "Lump crab meat", "Snow crab clusters",
        "Lobster tails", "Ground bison", "Veal cutlets", "Chicken livers", "Veal bones for stock"
      ],
      unit: "lb",
      storage: "Cooler",
      vendor: "US Foods"
    },
    "Dry Storage": {
      items: [
        "All purpose flour", "Bread flour", "Cake flour", "Semolina flour", "Granulated sugar", "Light brown sugar",
        "Dark brown sugar", "Confectioners sugar", "Cornmeal fine", "Panko breadcrumbs", "Plain breadcrumbs",
        "Cornstarch", "Baking powder", "Baking soda", "Active dry yeast", "Instant yeast", "Long grain rice",
        "Jasmine rice", "Basmati rice", "Arborio rice", "White quinoa", "Tri color quinoa", "Rolled oats",
        "Steel cut oats", "Dried black beans", "Dried pinto beans", "Dried kidney beans", "Dried chickpeas",
        "Red lentils", "Green lentils", "Spaghetti pasta", "Penne pasta", "Fettuccine pasta", "Macaroni elbows",
        "Lasagna sheets", "Ramen noodles dry", "Egg noodles", "Tortilla chips", "Crackers assorted",
        "Canned crushed tomatoes", "Canned diced tomatoes", "Canned tomato paste", "Canned tomato sauce",
        "Canned corn", "Canned black beans", "Canned kidney beans", "Canned chickpeas", "Canned tuna",
        "Canned salmon", "Canned coconut milk", "Chicken stock concentrate", "Beef stock concentrate",
        "Vegetable stock concentrate", "Evaporated milk", "Sweetened condensed milk", "Peanut butter",
        "Almond butter", "Strawberry jam", "Maple syrup", "Honey", "Granola", "Bread crumbs Italian seasoned",
        "Burger buns shelf stable", "Hot dog buns shelf stable", "Flour tortillas", "Corn tortillas",
        "Cooking spray", "Vegetable oil jug", "Olive oil blended", "Canola oil jug"
      ],
      unit: "ea",
      storage: "Dry",
      vendor: "US Foods"
    },
    Spices: {
      items: [
        "Kosher salt", "Fine sea salt", "Black pepper coarse", "Black pepper fine", "White pepper ground",
        "Paprika sweet", "Smoked paprika", "Cayenne pepper", "Crushed red pepper flakes", "Chili powder blend",
        "Cumin ground", "Coriander ground", "Coriander seeds", "Turmeric ground", "Curry powder", "Oregano dried",
        "Basil dried", "Thyme dried", "Rosemary dried", "Sage rubbed", "Bay leaves", "Italian seasoning blend",
        "Herbes de Provence", "Onion powder", "Garlic powder", "Mustard powder", "Cinnamon ground", "Nutmeg ground",
        "Cloves ground", "Allspice ground", "Ginger ground", "Cardamom ground", "Chinese five spice",
        "Everything bagel seasoning", "Lemon pepper seasoning", "Steak seasoning blend", "Taco seasoning blend",
        "Poultry seasoning blend", "Cajun seasoning blend", "BBQ rub house blend"
      ],
      unit: "oz",
      storage: "Dry",
      vendor: "US Foods"
    },
    Liquor: {
      items: [
        "Vodka", "Gin", "Rum silver", "Rum dark", "Tequila blanco", "Tequila reposado", "Tequila anejo",
        "Bourbon", "Rye whiskey", "Scotch", "Irish whiskey", "Brandy", "Cognac", "Triple sec", "Blue curacao",
        "Coffee liqueur", "Amaretto", "Peach schnapps", "Melon liqueur", "Elderflower liqueur", "Vermouth sweet",
        "Vermouth dry", "Bitters aromatic", "Mezcal", "Spiced rum"
      ],
      unit: "bottle",
      storage: "Bar",
      vendor: "Republic National"
    },
    Wine: {
      items: [
        "Cabernet sauvignon", "Merlot", "Pinot noir", "Malbec", "Zinfandel", "Syrah", "Red blend",
        "Chardonnay", "Sauvignon blanc", "Pinot grigio", "Riesling", "Moscato", "Rosé dry", "Rosé sweet",
        "Champagne brut", "Prosecco", "Cava", "Port wine", "Sherry", "Dessert wine", "Sangiovese",
        "Tempranillo", "Grenache", "Chenin blanc", "Gewurztraminer"
      ],
      unit: "bottle",
      storage: "Wine Cellar",
      vendor: "Wine Vendor"
    }
  };

  const inventory = [];
  let id = 1;

  Object.entries(categories).forEach(([category, config]) => {
    config.items.forEach((itemName, idx) => {
      const parLevel = category === "Liquor" || category === "Wine" ? 12 : 
                      category === "Spices" ? 4 : 
                      category === "Produce" ? 24 : 60;
      const avgDailyUsage = category === "Liquor" || category === "Wine" ? (0.5 + Math.random() * 1.5) :
                           category === "Spices" ? (0.1 + Math.random() * 0.3) :
                           category === "Produce" ? (2 + Math.random() * 8) : (5 + Math.random() * 15);
      const unitCost = category === "Liquor" ? (25 + Math.random() * 30) :
                      category === "Wine" ? (20 + Math.random() * 40) :
                      category === "Spices" ? (2 + Math.random() * 8) :
                      category === "Produce" ? (0.5 + Math.random() * 4) :
                      category === "Meats" ? (8 + Math.random() * 20) : (1 + Math.random() * 5);
      
      inventory.push({
        id: id++,
        name: itemName,
        category,
        unitOfMeasure: config.unit,
        storageLocation: config.storage,
        vendor: config.vendor,
        parLevel: Math.round(parLevel),
        avgDailyUsage: parseFloat(avgDailyUsage.toFixed(2)),
        unitCost: parseFloat(unitCost.toFixed(2)),
        packSize: category === "Liquor" || category === "Wine" ? 1 : category === "Spices" ? 16 : 10,
        preferredSupplier: config.vendor,
        currentOnHand: Math.round(parLevel * (0.5 + Math.random() * 0.8)),
        lastWeekUsage: Math.round(avgDailyUsage * 7 * (0.8 + Math.random() * 0.4)),
        forecastUsage: Math.round(avgDailyUsage * 7 * (0.9 + Math.random() * 0.2)),
        recommendedQty: 0
      });
    });
  });

  inventory.forEach(item => {
    const diff = item.parLevel - item.currentOnHand;
    if (diff > 0) {
      item.recommendedQty = Math.ceil(diff * 1.2);
    }
  });

  return inventory;
}

export const INVENTORY_MASTER = generateInventoryMaster();


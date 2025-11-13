"""
Complete Item Master Generator - Creates 300+ items, 50+ GM items, and 30+ CapEx items
Ready for SQLAlchemy import.
"""
import json

def generate_all_raw_items():
    """Generate complete list of 300+ raw items."""
    items = []
    
    # Template function to add items efficiently
    def add_items(category, subcategory, item_list, defaults):
        for item_data in item_list:
            item = {
                "item_name": item_data[0],
                "category": category,
                "subcategory": subcategory,
                "unit_of_measure": item_data[1] if len(item_data) > 1 else defaults.get("unit", "ea"),
                "storage_type": item_data[2] if len(item_data) > 2 else defaults.get("storage", "Refrigerated"),
                "shelf_life_days": item_data[3] if len(item_data) > 3 else defaults.get("shelf_life", 3),
                "vendor_type": item_data[4] if len(item_data) > 4 else defaults.get("vendor", "US Foods"),
                "estimated_cost": item_data[5] if len(item_data) > 5 else defaults.get("cost", 10.00),
                "use_cases": item_data[6] if len(item_data) > 6 else defaults.get("use_cases", []),
                "yield_percent": item_data[7] if len(item_data) > 7 else defaults.get("yield", 85),
                "waste_percent": item_data[8] if len(item_data) > 8 else defaults.get("waste", 15),
                "allergens": item_data[9] if len(item_data) > 9 else defaults.get("allergens", []),
            }
            items.append(item)
    
    # MEATS - Steaks
    meats_steaks = [
        ("Filet Mignon 8oz", "ea", "Refrigerated", 3, "US Foods", 18.50, ["Steak entrees"], 95, 5, []),
        ("Filet Mignon 12oz", "ea", "Refrigerated", 3, "US Foods", 26.00, ["Steak entrees"], 95, 5, []),
        ("Ribeye 16oz", "ea", "Refrigerated", 3, "US Foods", 24.00, ["Steak entrees"], 90, 10, []),
        ("Ribeye 20oz", "ea", "Refrigerated", 3, "US Foods", 30.00, ["Steak entrees"], 90, 10, []),
        ("New York Strip 14oz", "ea", "Refrigerated", 3, "US Foods", 22.00, ["Steak entrees"], 92, 8, []),
        ("Bone In Ribeye", "lb", "Refrigerated", 3, "US Foods", 16.50, ["Steak entrees"], 75, 25, []),
        ("Wagyu Strip 6oz", "ea", "Refrigerated", 3, "Premium Vendor", 45.00, ["Premium entrees"], 95, 5, []),
        ("Wagyu Ribeye", "lb", "Refrigerated", 3, "Premium Vendor", 85.00, ["Premium entrees"], 90, 10, []),
        ("Ground Beef 80-20", "lb", "Refrigerated", 2, "US Foods", 5.50, ["Burgers", "Meatballs"], 85, 15, []),
    ]
    add_items("Meat", "Beef - Steaks", meats_steaks, {})
    
    # POULTRY
    poultry_items = [
        ("Chicken Breast", "lb", "Refrigerated", 3, "US Foods", 4.25, ["Chicken entrees"], 80, 20, []),
        ("Chicken Thighs", "lb", "Refrigerated", 3, "US Foods", 3.50, ["Chicken entrees"], 85, 15, []),
        ("Chicken Wings", "lb", "Refrigerated", 3, "US Foods", 4.75, ["Appetizers"], 90, 10, []),
    ]
    add_items("Meat", "Poultry", poultry_items, {})
    
    # PORK
    pork_items = [
        ("Pork Belly", "lb", "Refrigerated", 3, "US Foods", 6.50, ["Appetizers", "Entrees"], 70, 30, []),
        ("Bacon Slab", "lb", "Refrigerated", 7, "US Foods", 5.75, ["Breakfast", "Garnish"], 80, 20, []),
        ("Applewood Bacon", "lb", "Refrigerated", 7, "US Foods", 7.25, ["Breakfast", "Garnish"], 80, 20, []),
        ("Italian Sausage", "lb", "Refrigerated", 3, "US Foods", 5.00, ["Pasta", "Pizza"], 90, 10, []),
        ("Chorizo", "lb", "Refrigerated", 3, "US Foods", 5.50, ["Breakfast", "Tacos"], 90, 10, []),
    ]
    add_items("Meat", "Pork", pork_items, {})
    
    # SEAFOOD - Fish
    seafood_fish = [
        ("Salmon Fillet", "lb", "Refrigerated", 2, "Seafood Vendor", 14.00, ["Fish entrees"], 75, 25, ["Fish"]),
        ("Chilean Sea Bass", "lb", "Refrigerated", 2, "Seafood Vendor", 22.00, ["Fish entrees"], 70, 30, ["Fish"]),
        ("Atlantic Cod", "lb", "Refrigerated", 2, "Seafood Vendor", 10.50, ["Fish entrees"], 75, 25, ["Fish"]),
        ("Ahi Tuna", "lb", "Refrigerated", 2, "Seafood Vendor", 18.00, ["Sushi", "Tartare"], 80, 20, ["Fish"]),
    ]
    add_items("Seafood", "Fish", seafood_fish, {})
    
    # SEAFOOD - Shellfish
    seafood_shellfish = [
        ("Shrimp 16-20", "lb", "Frozen", 180, "Seafood Vendor", 12.50, ["Appetizers", "Pasta"], 95, 5, ["Shellfish"]),
        ("Shrimp 21-25", "lb", "Frozen", 180, "Seafood Vendor", 11.00, ["Appetizers", "Pasta"], 95, 5, ["Shellfish"]),
        ("Lobster Tail", "ea", "Frozen", 180, "Seafood Vendor", 18.00, ["Premium entrees"], 60, 40, ["Shellfish"]),
        ("Crab Meat Jumbo Lump", "lb", "Refrigerated", 3, "Seafood Vendor", 28.00, ["Appetizers", "Pasta"], 100, 0, ["Shellfish"]),
        ("King Crab Legs", "lb", "Frozen", 180, "Seafood Vendor", 35.00, ["Premium entrees"], 50, 50, ["Shellfish"]),
        ("Scallops U10", "lb", "Refrigerated", 2, "Seafood Vendor", 24.00, ["Appetizers", "Entrees"], 90, 10, ["Shellfish"]),
        ("Mussels", "lb", "Refrigerated", 2, "Seafood Vendor", 6.50, ["Appetizers", "Pasta"], 40, 60, ["Shellfish"]),
        ("Clams", "lb", "Refrigerated", 2, "Seafood Vendor", 7.00, ["Appetizers", "Pasta"], 40, 60, ["Shellfish"]),
        ("Calamari Tubes", "lb", "Frozen", 180, "Seafood Vendor", 8.50, ["Appetizers"], 85, 15, ["Shellfish"]),
        ("Octopus", "lb", "Refrigerated", 2, "Seafood Vendor", 15.00, ["Appetizers"], 70, 30, ["Shellfish"]),
        ("Oysters", "dozen", "Refrigerated", 3, "Seafood Vendor", 18.00, ["Raw bar"], 90, 10, ["Shellfish"]),
    ]
    add_items("Seafood", "Shellfish", seafood_shellfish, {})
    
    # Continue with remaining categories - I'll create a comprehensive list
    # Due to length constraints, I'll generate the rest programmatically
    
    # PRODUCE - Vegetables (continuing with your list)
    produce_veg = [
        ("Roma Tomatoes", "lb", "Refrigerated", 7, "Produce Vendor", 2.50, ["Sauces", "Salads"], 95, 5, []),
        ("Heirloom Tomatoes", "lb", "Refrigerated", 5, "Produce Vendor", 5.00, ["Salads", "Garnish"], 90, 10, []),
        ("Cherry Tomatoes", "pint", "Refrigerated", 7, "Produce Vendor", 4.50, ["Salads", "Garnish"], 98, 2, []),
        ("Iceberg Lettuce", "head", "Refrigerated", 7, "Produce Vendor", 1.75, ["Salads", "Burgers"], 80, 20, []),
        ("Romaine Hearts", "case", "Refrigerated", 7, "Produce Vendor", 12.00, ["Caesar salad"], 85, 15, []),
        ("Spring Mix", "lb", "Refrigerated", 5, "Produce Vendor", 6.50, ["Salads"], 95, 5, []),
        ("Spinach", "lb", "Refrigerated", 5, "Produce Vendor", 4.00, ["Salads", "Sides"], 90, 10, []),
        ("Arugula", "lb", "Refrigerated", 5, "Produce Vendor", 8.00, ["Salads", "Garnish"], 95, 5, []),
        ("Kale", "bunch", "Refrigerated", 7, "Produce Vendor", 2.50, ["Salads", "Sides"], 85, 15, []),
        ("Carrots", "lb", "Refrigerated", 14, "Produce Vendor", 1.25, ["Sides", "Prep"], 90, 10, []),
        ("Celery", "bunch", "Refrigerated", 10, "Produce Vendor", 2.00, ["Prep", "Sides"], 85, 15, []),
        ("Cucumbers", "lb", "Refrigerated", 7, "Produce Vendor", 1.50, ["Salads"], 90, 10, []),
        ("Red Onions", "lb", "Dry", 30, "Produce Vendor", 1.75, ["Prep", "Garnish"], 95, 5, []),
        ("Yellow Onions", "lb", "Dry", 30, "Produce Vendor", 1.25, ["Prep", "Cooking"], 95, 5, []),
        ("White Onions", "lb", "Dry", 30, "Produce Vendor", 1.50, ["Prep", "Cooking"], 95, 5, []),
        ("Shallots", "lb", "Dry", 30, "Produce Vendor", 4.50, ["Prep", "Garnish"], 95, 5, []),
        ("Garlic Peeled", "lb", "Refrigerated", 14, "Produce Vendor", 5.00, ["Prep", "Cooking"], 98, 2, []),
        ("Ginger", "lb", "Refrigerated", 21, "Produce Vendor", 4.00, ["Prep", "Cooking"], 85, 15, []),
        ("Jalapenos", "lb", "Refrigerated", 7, "Produce Vendor", 3.50, ["Prep", "Garnish"], 90, 10, []),
        ("Serrano Peppers", "lb", "Refrigerated", 7, "Produce Vendor", 4.00, ["Prep", "Garnish"], 90, 10, []),
        ("Bell Peppers Red", "lb", "Refrigerated", 7, "Produce Vendor", 3.00, ["Prep", "Garnish"], 90, 10, []),
        ("Bell Peppers Green", "lb", "Refrigerated", 7, "Produce Vendor", 2.50, ["Prep", "Garnish"], 90, 10, []),
        ("Bell Peppers Yellow", "lb", "Refrigerated", 7, "Produce Vendor", 3.25, ["Prep", "Garnish"], 90, 10, []),
        ("Mushrooms Button", "lb", "Refrigerated", 5, "Produce Vendor", 4.50, ["Sides", "Prep"], 95, 5, []),
        ("Mushrooms Shiitake", "lb", "Refrigerated", 5, "Produce Vendor", 8.00, ["Sides", "Prep"], 95, 5, []),
        ("Mushrooms Portobello", "lb", "Refrigerated", 5, "Produce Vendor", 6.50, ["Entrees"], 90, 10, []),
        ("Mushrooms Cremini", "lb", "Refrigerated", 5, "Produce Vendor", 5.50, ["Sides", "Prep"], 95, 5, []),
        ("Potatoes Russet", "lb", "Dry", 30, "Produce Vendor", 1.00, ["Sides"], 90, 10, []),
        ("Potatoes Yukon Gold", "lb", "Dry", 30, "Produce Vendor", 1.25, ["Sides"], 90, 10, []),
        ("Sweet Potatoes", "lb", "Dry", 30, "Produce Vendor", 1.50, ["Sides"], 90, 10, []),
        ("Asparagus", "lb", "Refrigerated", 5, "Produce Vendor", 4.50, ["Sides"], 85, 15, []),
        ("Broccolini", "lb", "Refrigerated", 5, "Produce Vendor", 5.00, ["Sides"], 85, 15, []),
        ("Cauliflower", "head", "Refrigerated", 7, "Produce Vendor", 3.50, ["Sides"], 80, 20, []),
        ("Zucchini", "lb", "Refrigerated", 5, "Produce Vendor", 2.00, ["Sides"], 90, 10, []),
        ("Squash Yellow", "lb", "Refrigerated", 5, "Produce Vendor", 2.25, ["Sides"], 90, 10, []),
        ("Corn on the Cob", "ea", "Refrigerated", 3, "Produce Vendor", 0.75, ["Sides"], 80, 20, []),
        ("Green Beans", "lb", "Refrigerated", 5, "Produce Vendor", 3.00, ["Sides"], 90, 10, []),
        ("Brussels Sprouts", "lb", "Refrigerated", 7, "Produce Vendor", 3.50, ["Sides"], 85, 15, []),
        ("Avocados", "ea", "Refrigerated", 5, "Produce Vendor", 1.50, ["Garnish", "Salads"], 85, 15, []),
    ]
    add_items("Produce", "Vegetables", produce_veg, {})
    
    # PRODUCE - Fruits
    produce_fruit = [
        ("Lemons", "lb", "Refrigerated", 14, "Produce Vendor", 2.50, ["Garnish", "Prep"], 90, 10, []),
        ("Limes", "lb", "Refrigerated", 14, "Produce Vendor", 2.75, ["Garnish", "Prep"], 90, 10, []),
        ("Oranges", "lb", "Refrigerated", 14, "Produce Vendor", 2.00, ["Garnish", "Juice"], 90, 10, []),
        ("Grapefruits", "lb", "Refrigerated", 14, "Produce Vendor", 2.25, ["Garnish", "Juice"], 85, 15, []),
        ("Pineapple", "ea", "Refrigerated", 5, "Produce Vendor", 3.50, ["Garnish", "Juice"], 60, 40, []),
        ("Strawberries", "pint", "Refrigerated", 5, "Produce Vendor", 4.00, ["Desserts", "Garnish"], 95, 5, []),
        ("Blueberries", "pint", "Refrigerated", 7, "Produce Vendor", 5.00, ["Desserts", "Garnish"], 98, 2, []),
        ("Raspberries", "pint", "Refrigerated", 3, "Produce Vendor", 6.00, ["Desserts", "Garnish"], 95, 5, []),
        ("Apples", "lb", "Refrigerated", 21, "Produce Vendor", 1.75, ["Desserts"], 90, 10, []),
        ("Pears", "lb", "Refrigerated", 7, "Produce Vendor", 2.50, ["Desserts"], 85, 15, []),
        ("Bananas", "lb", "Refrigerated", 5, "Produce Vendor", 0.75, ["Desserts"], 80, 20, []),
    ]
    add_items("Produce", "Fruits", produce_fruit, {})
    
    # HERBS
    herbs = [
        ("Parsley", "bunch", "Refrigerated", 5, "Produce Vendor", 1.50, ["Garnish", "Prep"], 80, 20, []),
        ("Cilantro", "bunch", "Refrigerated", 5, "Produce Vendor", 1.75, ["Garnish", "Prep"], 80, 20, []),
        ("Basil", "bunch", "Refrigerated", 5, "Produce Vendor", 3.00, ["Garnish", "Prep"], 75, 25, []),
        ("Thyme", "bunch", "Refrigerated", 7, "Produce Vendor", 2.50, ["Prep"], 90, 10, []),
        ("Rosemary", "bunch", "Refrigerated", 7, "Produce Vendor", 2.75, ["Prep"], 90, 10, []),
        ("Oregano", "bunch", "Refrigerated", 7, "Produce Vendor", 2.25, ["Prep"], 90, 10, []),
        ("Bay Leaves", "oz", "Dry", 365, "Spice Vendor", 8.00, ["Prep"], 100, 0, []),
        ("Chives", "bunch", "Refrigerated", 5, "Produce Vendor", 2.00, ["Garnish"], 85, 15, []),
        ("Dill", "bunch", "Refrigerated", 5, "Produce Vendor", 2.50, ["Garnish", "Prep"], 80, 20, []),
        ("Mint", "bunch", "Refrigerated", 5, "Produce Vendor", 3.50, ["Garnish", "Cocktails"], 75, 25, []),
    ]
    add_items("Produce", "Herbs", herbs, {})
    
    # DAIRY
    dairy = [
        ("Butter", "lb", "Refrigerated", 30, "US Foods", 4.50, ["Cooking", "Baking"], 100, 0, ["Dairy"]),
        ("Heavy Cream", "qt", "Refrigerated", 14, "US Foods", 5.50, ["Sauces", "Desserts"], 100, 0, ["Dairy"]),
        ("Half and Half", "qt", "Refrigerated", 14, "US Foods", 3.50, ["Coffee"], 100, 0, ["Dairy"]),
        ("Whole Milk", "gal", "Refrigerated", 7, "US Foods", 4.00, ["Cooking", "Baking"], 100, 0, ["Dairy"]),
        ("Parmesan Cheese", "lb", "Refrigerated", 30, "US Foods", 12.00, ["Pasta", "Salads"], 100, 0, ["Dairy"]),
        ("Cheddar Cheese", "lb", "Refrigerated", 21, "US Foods", 5.50, ["Burgers", "Appetizers"], 100, 0, ["Dairy"]),
        ("American Cheese", "lb", "Refrigerated", 30, "US Foods", 4.50, ["Burgers"], 100, 0, ["Dairy"]),
        ("Provolone Cheese", "lb", "Refrigerated", 21, "US Foods", 6.00, ["Sandwiches"], 100, 0, ["Dairy"]),
        ("Swiss Cheese", "lb", "Refrigerated", 21, "US Foods", 7.00, ["Sandwiches"], 100, 0, ["Dairy"]),
        ("Blue Cheese Crumbles", "lb", "Refrigerated", 30, "US Foods", 10.00, ["Salads", "Appetizers"], 100, 0, ["Dairy"]),
        ("Cream Cheese", "lb", "Refrigerated", 30, "US Foods", 4.75, ["Appetizers", "Desserts"], 100, 0, ["Dairy"]),
        ("Gruyere Cheese", "lb", "Refrigerated", 21, "US Foods", 11.00, ["Appetizers"], 100, 0, ["Dairy"]),
        ("Goat Cheese", "lb", "Refrigerated", 14, "US Foods", 9.00, ["Salads", "Appetizers"], 100, 0, ["Dairy"]),
        ("Feta Cheese", "lb", "Refrigerated", 30, "US Foods", 7.50, ["Salads"], 100, 0, ["Dairy"]),
        ("Mozzarella", "lb", "Refrigerated", 7, "US Foods", 5.00, ["Pizza", "Appetizers"], 100, 0, ["Dairy"]),
        ("Eggs Large", "dozen", "Refrigerated", 30, "US Foods", 3.50, ["Breakfast", "Baking"], 100, 0, ["Eggs"]),
        ("Egg Whites", "qt", "Refrigerated", 7, "US Foods", 6.00, ["Breakfast"], 100, 0, ["Eggs"]),
        ("Sour Cream", "lb", "Refrigerated", 21, "US Foods", 3.50, ["Garnish", "Sides"], 100, 0, ["Dairy"]),
        ("Greek Yogurt", "lb", "Refrigerated", 14, "US Foods", 4.50, ["Breakfast", "Sides"], 100, 0, ["Dairy"]),
        ("Mayonnaise", "gal", "Refrigerated", 90, "US Foods", 8.00, ["Sandwiches", "Prep"], 100, 0, ["Eggs"]),
    ]
    add_items("Dairy", "Cheese & Eggs", dairy, {})
    
    # SAUCES & CONDIMENTS
    sauces = [
        ("Dijon Mustard", "bottle", "Refrigerated", 180, "US Foods", 3.50, ["Prep", "Sandwiches"], 100, 0, []),
        ("Yellow Mustard", "bottle", "Dry", 365, "US Foods", 2.50, ["Sandwiches"], 100, 0, []),
        ("Ketchup", "bottle", "Dry", 365, "US Foods", 3.00, ["Burgers", "Fries"], 100, 0, []),
        ("BBQ Sauce", "bottle", "Dry", 365, "US Foods", 4.50, ["Ribs", "Chicken"], 100, 0, []),
        ("Ranch", "bottle", "Refrigerated", 90, "US Foods", 5.00, ["Salads", "Wings"], 100, 0, ["Dairy", "Eggs"]),
        ("Caesar Dressing", "bottle", "Refrigerated", 60, "US Foods", 6.50, ["Salads"], 100, 0, ["Eggs", "Fish"]),
        ("Blue Cheese Dressing", "bottle", "Refrigerated", 60, "US Foods", 6.00, ["Salads", "Wings"], 100, 0, ["Dairy"]),
        ("Balsamic Vinaigrette", "bottle", "Dry", 180, "US Foods", 5.50, ["Salads"], 100, 0, []),
        ("Red Wine Vinegar", "bottle", "Dry", 365, "US Foods", 4.00, ["Prep"], 100, 0, []),
        ("Balsamic Glaze", "bottle", "Dry", 365, "US Foods", 8.00, ["Garnish"], 100, 0, []),
        ("Soy Sauce", "bottle", "Dry", 365, "US Foods", 3.50, ["Prep"], 100, 0, ["Soy"]),
        ("Worcestershire Sauce", "bottle", "Dry", 365, "US Foods", 4.00, ["Prep"], 100, 0, ["Fish"]),
        ("Teriyaki Sauce", "bottle", "Dry", 365, "US Foods", 5.00, ["Prep"], 100, 0, ["Soy"]),
        ("Buffalo Sauce", "bottle", "Dry", 365, "US Foods", 4.50, ["Wings"], 100, 0, []),
        ("Sriracha", "bottle", "Dry", 365, "US Foods", 3.75, ["Garnish"], 100, 0, []),
        ("Chili Oil", "bottle", "Dry", 365, "US Foods", 6.00, ["Garnish"], 100, 0, []),
        ("Sesame Oil", "bottle", "Dry", 365, "US Foods", 8.50, ["Prep"], 100, 0, ["Sesame"]),
        ("Olive Oil Extra Virgin", "bottle", "Dry", 365, "US Foods", 12.00, ["Prep", "Cooking"], 100, 0, []),
        ("Vegetable Oil", "gal", "Dry", 365, "US Foods", 8.00, ["Cooking"], 100, 0, []),
        ("Canola Oil", "gal", "Dry", 365, "US Foods", 7.50, ["Cooking"], 100, 0, []),
        ("Truffle Oil", "bottle", "Dry", 180, "Premium Vendor", 25.00, ["Garnish"], 100, 0, []),
        ("Alfredo Sauce", "jar", "Refrigerated", 30, "US Foods", 6.50, ["Pasta"], 100, 0, ["Dairy"]),
        ("Marinara Sauce", "jar", "Dry", 365, "US Foods", 5.00, ["Pasta", "Pizza"], 100, 0, []),
        ("Demi Glace", "qt", "Frozen", 180, "US Foods", 15.00, ["Sauces"], 100, 0, []),
        ("Beef Stock", "qt", "Refrigerated", 7, "US Foods", 4.50, ["Soups", "Sauces"], 100, 0, []),
        ("Chicken Stock", "qt", "Refrigerated", 7, "US Foods", 3.50, ["Soups", "Sauces"], 100, 0, []),
        ("Fish Stock", "qt", "Refrigerated", 3, "Seafood Vendor", 6.00, ["Soups", "Sauces"], 100, 0, ["Fish"]),
    ]
    add_items("Pantry", "Sauces & Condiments", sauces, {})
    
    # SPICES & SEASONINGS
    spices = [
        ("Salt Kosher", "lb", "Dry", 365, "US Foods", 2.00, ["Prep"], 100, 0, []),
        ("Pepper Black", "lb", "Dry", 365, "US Foods", 8.00, ["Prep"], 100, 0, []),
        ("White Pepper", "lb", "Dry", 365, "US Foods", 10.00, ["Prep"], 100, 0, []),
        ("Paprika", "lb", "Dry", 365, "US Foods", 12.00, ["Prep"], 100, 0, []),
        ("Smoked Paprika", "lb", "Dry", 365, "US Foods", 15.00, ["Prep"], 100, 0, []),
        ("Cajun Seasoning", "lb", "Dry", 365, "US Foods", 10.00, ["Prep"], 100, 0, []),
        ("Old Bay Seasoning", "lb", "Dry", 365, "US Foods", 11.00, ["Seafood"], 100, 0, []),
        ("Garlic Powder", "lb", "Dry", 365, "US Foods", 8.50, ["Prep"], 100, 0, []),
        ("Onion Powder", "lb", "Dry", 365, "US Foods", 7.50, ["Prep"], 100, 0, []),
        ("Cumin", "lb", "Dry", 365, "US Foods", 14.00, ["Prep"], 100, 0, []),
        ("Coriander", "lb", "Dry", 365, "US Foods", 16.00, ["Prep"], 100, 0, []),
        ("Cinnamon", "lb", "Dry", 365, "US Foods", 18.00, ["Desserts"], 100, 0, []),
        ("Nutmeg", "lb", "Dry", 365, "US Foods", 25.00, ["Desserts"], 100, 0, []),
        ("Cloves", "lb", "Dry", 365, "US Foods", 22.00, ["Desserts"], 100, 0, []),
        ("Red Chili Flakes", "lb", "Dry", 365, "US Foods", 12.00, ["Prep"], 100, 0, []),
        ("Curry Powder", "lb", "Dry", 365, "US Foods", 13.00, ["Prep"], 100, 0, []),
        ("Turmeric", "lb", "Dry", 365, "US Foods", 20.00, ["Prep"], 100, 0, []),
        ("Steak Seasoning House Blend", "lb", "Dry", 365, "US Foods", 11.50, ["Steaks"], 100, 0, []),
    ]
    add_items("Pantry", "Spices & Seasonings", spices, {})
    
    # BAKING & PANTRY
    baking = [
        ("Flour AP", "lb", "Dry", 365, "US Foods", 0.75, ["Baking"], 100, 0, ["Wheat", "Gluten"]),
        ("Bread Flour", "lb", "Dry", 365, "US Foods", 0.85, ["Baking"], 100, 0, ["Wheat", "Gluten"]),
        ("Corn Starch", "lb", "Dry", 365, "US Foods", 2.50, ["Thickening"], 100, 0, []),
        ("Baking Soda", "lb", "Dry", 365, "US Foods", 1.50, ["Baking"], 100, 0, []),
        ("Baking Powder", "lb", "Dry", 365, "US Foods", 3.00, ["Baking"], 100, 0, []),
        ("Brown Sugar", "lb", "Dry", 365, "US Foods", 1.25, ["Baking"], 100, 0, []),
        ("Granulated Sugar", "lb", "Dry", 365, "US Foods", 1.00, ["Baking", "Beverages"], 100, 0, []),
        ("Powdered Sugar", "lb", "Dry", 365, "US Foods", 1.50, ["Baking"], 100, 0, []),
        ("Chocolate Chips", "lb", "Dry", 365, "US Foods", 6.00, ["Desserts"], 100, 0, ["Dairy"]),
        ("Cocoa Powder", "lb", "Dry", 365, "US Foods", 8.00, ["Desserts"], 100, 0, []),
        ("Honey", "lb", "Dry", 365, "US Foods", 5.50, ["Baking", "Garnish"], 100, 0, []),
        ("Maple Syrup", "bottle", "Dry", 365, "US Foods", 12.00, ["Breakfast"], 100, 0, []),
        ("Pancake Mix", "lb", "Dry", 365, "US Foods", 2.50, ["Breakfast"], 100, 0, ["Wheat", "Gluten"]),
        ("Bread Crumbs Panko", "lb", "Dry", 365, "US Foods", 4.50, ["Prep"], 100, 0, ["Wheat", "Gluten"]),
        ("Tortilla Chips", "bag", "Dry", 90, "US Foods", 4.00, ["Appetizers"], 100, 0, ["Corn"]),
    ]
    add_items("Pantry", "Baking & Grains", baking, {})
    
    # BREADS
    breads = [
        ("Burger Buns", "dozen", "Dry", 5, "Bakery Vendor", 4.50, ["Burgers"], 100, 0, ["Wheat", "Gluten"]),
        ("Brioche Buns", "dozen", "Dry", 5, "Bakery Vendor", 6.00, ["Premium burgers"], 100, 0, ["Wheat", "Gluten", "Eggs"]),
        ("Slider Buns", "dozen", "Dry", 5, "Bakery Vendor", 3.50, ["Sliders"], 100, 0, ["Wheat", "Gluten"]),
        ("Hot Dog Buns", "dozen", "Dry", 5, "Bakery Vendor", 3.75, ["Hot dogs"], 100, 0, ["Wheat", "Gluten"]),
        ("French Bread Loaf", "ea", "Dry", 3, "Bakery Vendor", 2.50, ["Table bread"], 100, 0, ["Wheat", "Gluten"]),
        ("Brioche Loaf", "ea", "Dry", 3, "Bakery Vendor", 4.00, ["Table bread"], 100, 0, ["Wheat", "Gluten", "Eggs"]),
        ("Croissants", "dozen", "Dry", 3, "Bakery Vendor", 8.00, ["Breakfast"], 100, 0, ["Wheat", "Gluten", "Eggs", "Dairy"]),
        ("Dinner Rolls", "dozen", "Dry", 3, "Bakery Vendor", 4.50, ["Table bread"], 100, 0, ["Wheat", "Gluten"]),
        ("Croutons", "lb", "Dry", 90, "US Foods", 5.50, ["Salads"], 100, 0, ["Wheat", "Gluten"]),
    ]
    add_items("Bakery", "Bread", breads, {})
    
    # PICKLES & GARNISHES
    pickles = [
        ("Burger Pickles", "jar", "Refrigerated", 90, "US Foods", 4.50, ["Burgers"], 100, 0, []),
        ("Sweet Pickles", "jar", "Refrigerated", 90, "US Foods", 4.00, ["Garnish"], 100, 0, []),
        ("Relish", "jar", "Refrigerated", 90, "US Foods", 3.50, ["Hot dogs"], 100, 0, []),
        ("Bar Olives", "jar", "Refrigerated", 180, "US Foods", 6.00, ["Cocktails"], 100, 0, []),
        ("Capers", "jar", "Refrigerated", 365, "US Foods", 8.00, ["Prep"], 100, 0, []),
        ("Pickled Onions", "jar", "Refrigerated", 30, "US Foods", 5.50, ["Garnish"], 100, 0, []),
        ("Pickled Jalapeños", "jar", "Refrigerated", 90, "US Foods", 4.75, ["Garnish"], 100, 0, []),
    ]
    add_items("Pantry", "Pickles & Garnishes", pickles, {})
    
    # GRAINS & PASTA
    grains = [
        ("Rice Long Grain", "lb", "Dry", 365, "US Foods", 1.50, ["Sides"], 100, 0, []),
        ("Jasmine Rice", "lb", "Dry", 365, "US Foods", 2.00, ["Sides"], 100, 0, []),
        ("Risotto Arborio", "lb", "Dry", 365, "US Foods", 4.50, ["Sides"], 100, 0, []),
        ("Pasta Penne", "lb", "Dry", 365, "US Foods", 2.50, ["Pasta"], 100, 0, ["Wheat", "Gluten"]),
        ("Pasta Linguine", "lb", "Dry", 365, "US Foods", 2.50, ["Pasta"], 100, 0, ["Wheat", "Gluten"]),
        ("Pasta Fettuccine", "lb", "Dry", 365, "US Foods", 2.50, ["Pasta"], 100, 0, ["Wheat", "Gluten"]),
        ("Couscous", "lb", "Dry", 365, "US Foods", 3.50, ["Sides"], 100, 0, ["Wheat", "Gluten"]),
        ("Quinoa", "lb", "Dry", 365, "US Foods", 5.00, ["Sides"], 100, 0, []),
        ("French Fries", "lb", "Frozen", 180, "US Foods", 1.75, ["Sides"], 100, 0, []),
        ("Sweet Potato Fries", "lb", "Frozen", 180, "US Foods", 2.50, ["Sides"], 100, 0, []),
        ("Mashed Potato Puree", "lb", "Frozen", 180, "US Foods", 2.25, ["Sides"], 100, 0, []),
        ("Potato Gratin Mix", "lb", "Frozen", 180, "US Foods", 3.00, ["Sides"], 100, 0, ["Dairy"]),
        ("Pizza Dough", "lb", "Frozen", 90, "Bakery Vendor", 2.00, ["Pizza"], 100, 0, ["Wheat", "Gluten"]),
        ("Flatbread Dough", "lb", "Frozen", 90, "Bakery Vendor", 2.25, ["Appetizers"], 100, 0, ["Wheat", "Gluten"]),
        ("Tortillas Flour", "dozen", "Refrigerated", 14, "US Foods", 3.50, ["Tacos"], 100, 0, ["Wheat", "Gluten"]),
        ("Tortillas Corn", "dozen", "Refrigerated", 14, "US Foods", 3.00, ["Tacos"], 100, 0, ["Corn"]),
    ]
    add_items("Pantry", "Grains & Pasta", grains, {})
    
    # BEVERAGES - Non-Alcoholic
    beverages = [
        ("Espresso Coffee Beans", "lb", "Dry", 90, "Coffee Vendor", 12.00, ["Coffee"], 100, 0, []),
        ("Ground Coffee", "lb", "Dry", 90, "Coffee Vendor", 8.00, ["Coffee"], 100, 0, []),
        ("Tea Bags Black", "box", "Dry", 365, "US Foods", 5.00, ["Tea"], 100, 0, []),
        ("Iced Tea Mix", "lb", "Dry", 365, "US Foods", 4.50, ["Iced tea"], 100, 0, []),
        ("Lemonade Mix", "lb", "Dry", 365, "US Foods", 3.50, ["Lemonade"], 100, 0, []),
        ("Coke", "case", "Dry", 365, "Beverage Vendor", 18.00, ["Beverages"], 100, 0, []),
        ("Diet Coke", "case", "Dry", 365, "Beverage Vendor", 18.00, ["Beverages"], 100, 0, []),
        ("Sprite", "case", "Dry", 365, "Beverage Vendor", 18.00, ["Beverages"], 100, 0, []),
        ("Ginger Ale", "case", "Dry", 365, "Beverage Vendor", 18.00, ["Beverages"], 100, 0, []),
        ("Tonic Water", "case", "Dry", 365, "Beverage Vendor", 20.00, ["Cocktails"], 100, 0, []),
        ("Club Soda", "case", "Dry", 365, "Beverage Vendor", 18.00, ["Cocktails"], 100, 0, []),
        ("Orange Juice", "gal", "Refrigerated", 7, "US Foods", 6.00, ["Breakfast", "Juice"], 100, 0, []),
        ("Pineapple Juice", "gal", "Refrigerated", 7, "US Foods", 7.00, ["Juice", "Cocktails"], 100, 0, []),
        ("Cranberry Juice", "gal", "Refrigerated", 7, "US Foods", 6.50, ["Juice", "Cocktails"], 100, 0, []),
        ("Grapefruit Juice", "gal", "Refrigerated", 7, "US Foods", 6.25, ["Juice", "Cocktails"], 100, 0, []),
        ("Apple Juice", "gal", "Refrigerated", 7, "US Foods", 5.50, ["Juice"], 100, 0, []),
        ("Simple Syrup", "bottle", "Dry", 365, "US Foods", 4.00, ["Cocktails"], 100, 0, []),
        ("Grenadine", "bottle", "Dry", 365, "US Foods", 5.00, ["Cocktails"], 100, 0, []),
        ("Agave Syrup", "bottle", "Dry", 365, "US Foods", 8.00, ["Cocktails"], 100, 0, []),
        ("Aromatic Bitters", "bottle", "Dry", 365, "Bar Supply", 12.00, ["Cocktails"], 100, 0, []),
        ("Orange Bitters", "bottle", "Dry", 365, "Bar Supply", 12.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Beverages", "Non-Alcoholic", beverages, {})
    
    # LIQUOR - Vodka
    vodka = [
        ("Vodka Grey Goose", "bottle", "Dry", 365, "Spec's", 45.00, ["Cocktails"], 100, 0, []),
        ("Vodka Tito's", "bottle", "Dry", 365, "Spec's", 28.00, ["Cocktails"], 100, 0, []),
        ("Vodka Ketel One", "bottle", "Dry", 365, "Spec's", 42.00, ["Cocktails"], 100, 0, []),
        ("Well Vodka", "bottle", "Dry", 365, "Spec's", 18.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Liquor", "Vodka", vodka, {})
    
    # LIQUOR - Gin
    gin = [
        ("Gin Bombay Sapphire", "bottle", "Dry", 365, "Spec's", 38.00, ["Cocktails"], 100, 0, []),
        ("Gin Tanqueray", "bottle", "Dry", 365, "Spec's", 35.00, ["Cocktails"], 100, 0, []),
        ("Gin Hendrick's", "bottle", "Dry", 365, "Spec's", 48.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Liquor", "Gin", gin, {})
    
    # LIQUOR - Tequila
    tequila = [
        ("Tequila Don Julio Blanco", "bottle", "Dry", 365, "Spec's", 52.00, ["Cocktails"], 100, 0, []),
        ("Tequila Patron Silver", "bottle", "Dry", 365, "Spec's", 48.00, ["Cocktails"], 100, 0, []),
        ("Tequila Casamigos Reposado", "bottle", "Dry", 365, "Spec's", 55.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Liquor", "Tequila", tequila, {})
    
    # LIQUOR - Rum
    rum = [
        ("Rum Bacardi", "bottle", "Dry", 365, "Spec's", 22.00, ["Cocktails"], 100, 0, []),
        ("Rum Captain Morgan", "bottle", "Dry", 365, "Spec's", 25.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Liquor", "Rum", rum, {})
    
    # LIQUOR - Whiskey/Bourbon
    whiskey = [
        ("Whiskey Jack Daniel's", "bottle", "Dry", 365, "Spec's", 32.00, ["Cocktails"], 100, 0, []),
        ("Bourbon Maker's Mark", "bottle", "Dry", 365, "Spec's", 35.00, ["Cocktails"], 100, 0, []),
        ("Bourbon Woodford Reserve", "bottle", "Dry", 365, "Spec's", 42.00, ["Cocktails"], 100, 0, []),
        ("Bulleit Bourbon", "bottle", "Dry", 365, "Spec's", 32.00, ["Cocktails"], 100, 0, []),
        ("Scotch Johnnie Walker Black", "bottle", "Dry", 365, "Spec's", 65.00, ["Cocktails"], 100, 0, []),
    ]
    add_items("Liquor", "Whiskey & Bourbon", whiskey, {})
    
    # WINE - Red
    wine_red = [
        ("Red Wine Cabernet", "bottle", "Dry", 1095, "Wine Vendor", 25.00, ["Wine service"], 100, 0, []),
        ("Red Wine Pinot Noir", "bottle", "Dry", 1095, "Wine Vendor", 28.00, ["Wine service"], 100, 0, []),
        ("Red Wine Merlot", "bottle", "Dry", 1095, "Wine Vendor", 22.00, ["Wine service"], 100, 0, []),
        ("Red Wine Malbec", "bottle", "Dry", 1095, "Wine Vendor", 24.00, ["Wine service"], 100, 0, []),
    ]
    add_items("Wine", "Red Wine", wine_red, {})
    
    # WINE - White
    wine_white = [
        ("White Wine Chardonnay", "bottle", "Dry", 1095, "Wine Vendor", 24.00, ["Wine service"], 100, 0, []),
        ("White Wine Sauvignon Blanc", "bottle", "Dry", 1095, "Wine Vendor", 22.00, ["Wine service"], 100, 0, []),
        ("White Wine Pinot Grigio", "bottle", "Dry", 1095, "Wine Vendor", 20.00, ["Wine service"], 100, 0, []),
    ]
    add_items("Wine", "White Wine", wine_white, {})
    
    # WINE - Sparkling
    wine_sparkling = [
        ("Champagne Brut", "bottle", "Dry", 1095, "Wine Vendor", 45.00, ["Wine service"], 100, 0, []),
        ("Prosecco", "bottle", "Dry", 1095, "Wine Vendor", 18.00, ["Wine service"], 100, 0, []),
    ]
    add_items("Wine", "Sparkling Wine", wine_sparkling, {})
    
    # BEER
    beer = [
        ("IPA Beer Bottle", "case", "Refrigerated", 180, "Beer Vendor", 28.00, ["Beer service"], 100, 0, ["Gluten"]),
        ("Lager Beer Bottle", "case", "Refrigerated", 180, "Beer Vendor", 24.00, ["Beer service"], 100, 0, ["Gluten"]),
        ("Stout Beer Bottle", "case", "Refrigerated", 180, "Beer Vendor", 30.00, ["Beer service"], 100, 0, ["Gluten"]),
        ("Wheat Beer Bottle", "case", "Refrigerated", 180, "Beer Vendor", 26.00, ["Beer service"], 100, 0, ["Gluten"]),
    ]
    add_items("Beer", "Bottled Beer", beer, {})
    
    # CLEANING SUPPLIES
    cleaning = [
        ("Sanitizing Wipes", "case", "Dry", 365, "Janitorial Supply", 45.00, ["Cleaning"], 100, 0, []),
        ("Food Service Gloves", "box", "Dry", 365, "Janitorial Supply", 25.00, ["Food prep"], 100, 0, []),
        ("Foil Roll", "roll", "Dry", 365, "US Foods", 8.00, ["Food prep"], 100, 0, []),
        ("Plastic Wrap", "roll", "Dry", 365, "US Foods", 6.00, ["Food prep"], 100, 0, []),
        ("Parchment Paper", "roll", "Dry", 365, "US Foods", 5.00, ["Baking"], 100, 0, []),
        ("Takeout Boxes", "case", "Dry", 365, "US Foods", 35.00, ["Takeout"], 100, 0, []),
        ("Paper Soup Cups", "case", "Dry", 365, "US Foods", 28.00, ["Takeout"], 100, 0, []),
        ("Straws Paper", "case", "Dry", 365, "US Foods", 15.00, ["Beverages"], 100, 0, []),
        ("Napkins", "case", "Dry", 365, "US Foods", 22.00, ["Dining"], 100, 0, []),
        ("Coffee Filters", "box", "Dry", 365, "US Foods", 8.00, ["Coffee"], 100, 0, []),
        ("Dishwasher Tablets", "box", "Dry", 365, "Janitorial Supply", 35.00, ["Dishwashing"], 100, 0, []),
        ("Floor Cleaner", "gal", "Dry", 365, "Janitorial Supply", 18.00, ["Cleaning"], 100, 0, []),
        ("Degreaser", "gal", "Dry", 365, "Janitorial Supply", 22.00, ["Cleaning"], 100, 0, []),
        ("Hand Soap", "bottle", "Dry", 365, "Janitorial Supply", 12.00, ["Handwashing"], 100, 0, []),
        ("Paper Towels", "case", "Dry", 365, "Janitorial Supply", 45.00, ["Cleaning"], 100, 0, []),
        ("Trash Bags Large", "roll", "Dry", 365, "Janitorial Supply", 28.00, ["Waste"], 100, 0, []),
        ("Trash Bags Small", "roll", "Dry", 365, "Janitorial Supply", 15.00, ["Waste"], 100, 0, []),
        ("Bleach", "gal", "Dry", 365, "Janitorial Supply", 5.00, ["Cleaning"], 100, 0, []),
        ("Spray Sanitizer", "bottle", "Dry", 365, "Janitorial Supply", 8.00, ["Sanitizing"], 100, 0, []),
    ]
    add_items("Cleaning", "Supplies", cleaning, {})
    
    # OFFICE SUPPLIES
    office = [
        ("Pens", "box", "Dry", 365, "Office Supply", 8.00, ["Office"], 100, 0, []),
        ("Pencils", "box", "Dry", 365, "Office Supply", 5.00, ["Office"], 100, 0, []),
        ("Highlighters", "box", "Dry", 365, "Office Supply", 10.00, ["Office"], 100, 0, []),
        ("Sharpies", "box", "Dry", 365, "Office Supply", 12.00, ["Labeling"], 100, 0, []),
        ("Dry Erase Markers", "box", "Dry", 365, "Office Supply", 15.00, ["Office"], 100, 0, []),
        ("Erasers", "box", "Dry", 365, "Office Supply", 4.00, ["Office"], 100, 0, []),
        ("Receipt Printer Paper", "roll", "Dry", 365, "Office Supply", 25.00, ["POS"], 100, 0, []),
        ("Order Ticket Paper", "roll", "Dry", 365, "Office Supply", 20.00, ["Kitchen"], 100, 0, []),
        ("Menu Paper", "ream", "Dry", 365, "Office Supply", 35.00, ["Menus"], 100, 0, []),
        ("Guest Check Books", "pad", "Dry", 365, "Office Supply", 8.00, ["Service"], 100, 0, []),
        ("Notepads", "pad", "Dry", 365, "Office Supply", 5.00, ["Office"], 100, 0, []),
        ("Clipboards", "ea", "Dry", 365, "Office Supply", 12.00, ["Office"], 100, 0, []),
        ("Staplers", "ea", "Dry", 365, "Office Supply", 15.00, ["Office"], 100, 0, []),
        ("Staples", "box", "Dry", 365, "Office Supply", 4.00, ["Office"], 100, 0, []),
        ("Tape", "roll", "Dry", 365, "Office Supply", 3.00, ["Office"], 100, 0, []),
        ("Tape Dispenser", "ea", "Dry", 365, "Office Supply", 8.00, ["Office"], 100, 0, []),
        ("Folders", "box", "Dry", 365, "Office Supply", 12.00, ["Office"], 100, 0, []),
        ("Envelopes", "box", "Dry", 365, "Office Supply", 8.00, ["Office"], 100, 0, []),
        ("Rubber Bands", "box", "Dry", 365, "Office Supply", 3.00, ["Office"], 100, 0, []),
        ("Calculator", "ea", "Dry", 365, "Office Supply", 25.00, ["Office"], 100, 0, []),
        ("USB Drive", "ea", "Dry", 365, "Office Supply", 15.00, ["Office"], 100, 0, []),
        ("Cleaning Cloths", "case", "Dry", 365, "Janitorial Supply", 30.00, ["Cleaning"], 100, 0, []),
        ("Hand Sanitizer Bottles", "case", "Dry", 365, "Janitorial Supply", 40.00, ["Sanitizing"], 100, 0, []),
        ("Labels Blank", "roll", "Dry", 365, "Office Supply", 12.00, ["Labeling"], 100, 0, []),
        ("Label Printer Tape", "roll", "Dry", 365, "Office Supply", 18.00, ["Labeling"], 100, 0, []),
        ("Inventory Binders", "ea", "Dry", 365, "Office Supply", 20.00, ["Office"], 100, 0, []),
    ]
    add_items("Office", "Supplies", office, {})
    
    print(f"Generated {len(items)} raw items")
    return items

def generate_gm_items():
    """Generate 50+ General Tools and Maintenance items."""
    gm_items = []
    
    # JANITORIAL TOOLS
    janitorial = [
        {"gm_item": "Brooms", "category": "Janitorial", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 25.00, "replacement_cycle_months": 12, "use_cases": ["Floor cleaning"]},
        {"gm_item": "Mops", "category": "Janitorial", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 35.00, "replacement_cycle_months": 12, "use_cases": ["Floor cleaning"]},
        {"gm_item": "Dustpans", "category": "Janitorial", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 12.00, "replacement_cycle_months": 24, "use_cases": ["Floor cleaning"]},
        {"gm_item": "Scrub Brushes", "category": "Janitorial", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 15.00, "replacement_cycle_months": 6, "use_cases": ["Deep cleaning"]},
        {"gm_item": "Utility Carts", "category": "Janitorial", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Equipment Vendor", "estimated_cost": 250.00, "replacement_cycle_months": 60, "use_cases": ["Transport"]},
        {"gm_item": "Squeegees", "category": "Janitorial", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 20.00, "replacement_cycle_months": 12, "use_cases": ["Window cleaning"]},
        {"gm_item": "Step Ladders", "category": "Janitorial", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Equipment Vendor", "estimated_cost": 150.00, "replacement_cycle_months": 120, "use_cases": ["Maintenance"]},
        {"gm_item": "Pot Scrubbers", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 8.00, "replacement_cycle_months": 3, "use_cases": ["Pot cleaning"]},
        {"gm_item": "Grill Brushes", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 6, "use_cases": ["Grill maintenance"]},
        {"gm_item": "Sanitizer Buckets", "category": "Janitorial", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Janitorial Supply", "estimated_cost": 18.00, "replacement_cycle_months": 24, "use_cases": ["Sanitizing"]},
        {"gm_item": "Safety Cones", "category": "Safety", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Safety Supply", "estimated_cost": 35.00, "replacement_cycle_months": 60, "use_cases": ["Safety"]},
        {"gm_item": "Wet Floor Signs", "category": "Safety", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Safety Supply", "estimated_cost": 25.00, "replacement_cycle_months": 60, "use_cases": ["Safety"]},
    ]
    gm_items.extend(janitorial)
    
    # MAINTENANCE TOOLS
    maintenance = [
        {"gm_item": "Tool Kits", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Hardware Store", "estimated_cost": 150.00, "replacement_cycle_months": 120, "use_cases": ["Repairs"]},
        {"gm_item": "Screwdrivers", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Hardware Store", "estimated_cost": 45.00, "replacement_cycle_months": 60, "use_cases": ["Repairs"]},
        {"gm_item": "Wrenches", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Hardware Store", "estimated_cost": 65.00, "replacement_cycle_months": 60, "use_cases": ["Repairs"]},
        {"gm_item": "Hammers", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 25.00, "replacement_cycle_months": 120, "use_cases": ["Repairs"]},
        {"gm_item": "Pliers", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Hardware Store", "estimated_cost": 35.00, "replacement_cycle_months": 60, "use_cases": ["Repairs"]},
        {"gm_item": "Power Drill", "category": "Maintenance", "subcategory": "Power Tools", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 150.00, "replacement_cycle_months": 120, "use_cases": ["Repairs"]},
        {"gm_item": "Drill Bits", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Hardware Store", "estimated_cost": 30.00, "replacement_cycle_months": 24, "use_cases": ["Repairs"]},
        {"gm_item": "Light Bulbs", "category": "Maintenance", "subcategory": "Supplies", "unit_of_measure": "box", "vendor_type": "Hardware Store", "estimated_cost": 45.00, "replacement_cycle_months": 6, "use_cases": ["Lighting"]},
        {"gm_item": "Utility Knives", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 15.00, "replacement_cycle_months": 12, "use_cases": ["Cutting"]},
        {"gm_item": "Flashlights", "category": "Maintenance", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 25.00, "replacement_cycle_months": 24, "use_cases": ["Maintenance"]},
        {"gm_item": "Batteries", "category": "Maintenance", "subcategory": "Supplies", "unit_of_measure": "pack", "vendor_type": "Hardware Store", "estimated_cost": 12.00, "replacement_cycle_months": 3, "use_cases": ["Power"]},
        {"gm_item": "Extension Cords", "category": "Maintenance", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 35.00, "replacement_cycle_months": 60, "use_cases": ["Power"]},
        {"gm_item": "Work Gloves", "category": "Maintenance", "subcategory": "Safety", "unit_of_measure": "pair", "vendor_type": "Safety Supply", "estimated_cost": 18.00, "replacement_cycle_months": 6, "use_cases": ["Safety"]},
        {"gm_item": "Scrapers", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Hardware Store", "estimated_cost": 12.00, "replacement_cycle_months": 12, "use_cases": ["Cleaning"]},
        {"gm_item": "Drain Snakes", "category": "Maintenance", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Plumbing Supply", "estimated_cost": 45.00, "replacement_cycle_months": 60, "use_cases": ["Plumbing"]},
        {"gm_item": "HVAC Filters", "category": "Maintenance", "subcategory": "Supplies", "unit_of_measure": "ea", "vendor_type": "HVAC Supply", "estimated_cost": 35.00, "replacement_cycle_months": 3, "use_cases": ["HVAC"]},
        {"gm_item": "Fryer Filters", "category": "Kitchen", "subcategory": "Supplies", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 1, "use_cases": ["Fryer maintenance"]},
    ]
    gm_items.extend(maintenance)
    
    # KITCHEN TOOLS
    kitchen_tools = [
        {"gm_item": "Squeeze Bottles", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 8.00, "replacement_cycle_months": 12, "use_cases": ["Food prep"]},
        {"gm_item": "Cutting Boards", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 45.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Chef Knives", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 150.00, "replacement_cycle_months": 36, "use_cases": ["Food prep"]},
        {"gm_item": "Butcher Paper", "category": "Kitchen", "subcategory": "Supplies", "unit_of_measure": "roll", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 3, "use_cases": ["Food prep"]},
    ]
    gm_items.extend(kitchen_tools)
    
    # ADDITIONAL GM ITEMS to reach 50+
    additional_gm = [
        {"gm_item": "Measuring Cups", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Measuring Spoons", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "set", "vendor_type": "Kitchen Supply", "estimated_cost": 8.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Kitchen Timers", "category": "Kitchen", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 15.00, "replacement_cycle_months": 36, "use_cases": ["Food prep"]},
        {"gm_item": "Thermometers", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 35.00, "replacement_cycle_months": 12, "use_cases": ["Food safety"]},
        {"gm_item": "Scale Digital", "category": "Kitchen", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 85.00, "replacement_cycle_months": 60, "use_cases": ["Food prep"]},
        {"gm_item": "Whisks", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 12.00, "replacement_cycle_months": 12, "use_cases": ["Food prep"]},
        {"gm_item": "Spatulas", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 10.00, "replacement_cycle_months": 12, "use_cases": ["Food prep"]},
        {"gm_item": "Tongs", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 15.00, "replacement_cycle_months": 12, "use_cases": ["Food prep"]},
        {"gm_item": "Ladles", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 12.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Strainers", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 18.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Colanders", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 36, "use_cases": ["Food prep"]},
        {"gm_item": "Sheet Pans", "category": "Kitchen", "subcategory": "Equipment", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 35.00, "replacement_cycle_months": 24, "use_cases": ["Baking"]},
        {"gm_item": "Mixing Bowls", "category": "Kitchen", "subcategory": "Equipment", "unit_of_measure": "set", "vendor_type": "Kitchen Supply", "estimated_cost": 65.00, "replacement_cycle_months": 60, "use_cases": ["Food prep"]},
        {"gm_item": "Storage Containers", "category": "Kitchen", "subcategory": "Equipment", "unit_of_measure": "set", "vendor_type": "Kitchen Supply", "estimated_cost": 85.00, "replacement_cycle_months": 36, "use_cases": ["Storage"]},
        {"gm_item": "Can Openers", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 25.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
        {"gm_item": "Peelers", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 8.00, "replacement_cycle_months": 12, "use_cases": ["Food prep"]},
        {"gm_item": "Zesters", "category": "Kitchen", "subcategory": "Tools", "unit_of_measure": "ea", "vendor_type": "Kitchen Supply", "estimated_cost": 12.00, "replacement_cycle_months": 24, "use_cases": ["Food prep"]},
    ]
    gm_items.extend(additional_gm)
    
    print(f"Generated {len(gm_items)} GM items")
    return gm_items

def generate_capex_items():
    """Generate 30+ Seasonal CapEx items."""
    capex_items = []
    
    capex = [
        {"capex_item": "Kitchen Equipment Replacement", "category": "Equipment", "season": "fall", "cost_estimate": 50000.00, "replacement_cycle_years": 10, "vendor_type": "Equipment Vendor", "priority_level": "high", "reason": "efficiency"},
        {"capex_item": "Grill Repairs", "category": "Equipment", "season": "spring", "cost_estimate": 5000.00, "replacement_cycle_years": 5, "vendor_type": "Equipment Vendor", "priority_level": "high", "reason": "safety"},
        {"capex_item": "HVAC Service", "category": "HVAC", "season": "spring", "cost_estimate": 3000.00, "replacement_cycle_years": 1, "vendor_type": "HVAC Service", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Refrigeration Maintenance", "category": "Equipment", "season": "summer", "cost_estimate": 4000.00, "replacement_cycle_years": 2, "vendor_type": "Refrigeration Service", "priority_level": "high", "reason": "safety"},
        {"capex_item": "Technology Replacements", "category": "Technology", "season": "winter", "cost_estimate": 15000.00, "replacement_cycle_years": 3, "vendor_type": "Tech Vendor", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Patio Heaters", "category": "Furniture", "season": "fall", "cost_estimate": 8000.00, "replacement_cycle_years": 5, "vendor_type": "Furniture Vendor", "priority_level": "medium", "reason": "guest experience"},
        {"capex_item": "Seasonal Furniture", "category": "Furniture", "season": "spring", "cost_estimate": 12000.00, "replacement_cycle_years": 3, "vendor_type": "Furniture Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Decor Refreshes", "category": "Decor", "season": "winter", "cost_estimate": 10000.00, "replacement_cycle_years": 2, "vendor_type": "Decor Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Plumbing Service", "category": "Plumbing", "season": "summer", "cost_estimate": 2500.00, "replacement_cycle_years": 1, "vendor_type": "Plumbing Service", "priority_level": "high", "reason": "safety"},
        {"capex_item": "Hood Cleaning", "category": "Maintenance", "season": "quarterly", "cost_estimate": 1500.00, "replacement_cycle_years": 0.25, "vendor_type": "Cleaning Service", "priority_level": "high", "reason": "compliance"},
        {"capex_item": "Fire Suppression Maintenance", "category": "Safety", "season": "quarterly", "cost_estimate": 2000.00, "replacement_cycle_years": 0.25, "vendor_type": "Safety Service", "priority_level": "high", "reason": "compliance"},
    ]
    capex_items.extend(capex)
    
    # Add more CapEx items to reach 30+
    additional_capex = [
        {"capex_item": "POS System Upgrade", "category": "Technology", "season": "winter", "cost_estimate": 20000.00, "replacement_cycle_years": 5, "vendor_type": "Tech Vendor", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Kitchen Display System", "category": "Technology", "season": "spring", "cost_estimate": 12000.00, "replacement_cycle_years": 5, "vendor_type": "Tech Vendor", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Walk-in Cooler Replacement", "category": "Equipment", "season": "summer", "cost_estimate": 35000.00, "replacement_cycle_years": 15, "vendor_type": "Equipment Vendor", "priority_level": "high", "reason": "safety"},
        {"capex_item": "Dishwasher Replacement", "category": "Equipment", "season": "fall", "cost_estimate": 18000.00, "replacement_cycle_years": 8, "vendor_type": "Equipment Vendor", "priority_level": "high", "reason": "efficiency"},
        {"capex_item": "Ice Machine Service", "category": "Equipment", "season": "summer", "cost_estimate": 2000.00, "replacement_cycle_years": 1, "vendor_type": "Equipment Service", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Exhaust Fan Replacement", "category": "HVAC", "season": "spring", "cost_estimate": 6000.00, "replacement_cycle_years": 10, "vendor_type": "HVAC Service", "priority_level": "high", "reason": "compliance"},
        {"capex_item": "Lighting Upgrade LED", "category": "Electrical", "season": "winter", "cost_estimate": 8000.00, "replacement_cycle_years": 5, "vendor_type": "Electrical Service", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Security System Upgrade", "category": "Security", "season": "fall", "cost_estimate": 10000.00, "replacement_cycle_years": 5, "vendor_type": "Security Vendor", "priority_level": "medium", "reason": "safety"},
        {"capex_item": "Parking Lot Repaving", "category": "Exterior", "season": "summer", "cost_estimate": 25000.00, "replacement_cycle_years": 10, "vendor_type": "Contractor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Signage Replacement", "category": "Exterior", "season": "spring", "cost_estimate": 5000.00, "replacement_cycle_years": 7, "vendor_type": "Sign Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Window Replacement", "category": "Building", "season": "fall", "cost_estimate": 15000.00, "replacement_cycle_years": 20, "vendor_type": "Contractor", "priority_level": "low", "reason": "efficiency"},
        {"capex_item": "Roof Inspection & Repair", "category": "Building", "season": "spring", "cost_estimate": 8000.00, "replacement_cycle_years": 5, "vendor_type": "Contractor", "priority_level": "high", "reason": "safety"},
        {"capex_item": "Flooring Replacement", "category": "Interior", "season": "winter", "cost_estimate": 20000.00, "replacement_cycle_years": 8, "vendor_type": "Contractor", "priority_level": "medium", "reason": "guest experience"},
        {"capex_item": "Bar Equipment Upgrade", "category": "Equipment", "season": "spring", "cost_estimate": 12000.00, "replacement_cycle_years": 5, "vendor_type": "Equipment Vendor", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Wine Storage System", "category": "Equipment", "season": "fall", "cost_estimate": 15000.00, "replacement_cycle_years": 10, "vendor_type": "Equipment Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Outdoor Seating Furniture", "category": "Furniture", "season": "spring", "cost_estimate": 18000.00, "replacement_cycle_years": 5, "vendor_type": "Furniture Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Sound System Upgrade", "category": "Technology", "season": "winter", "cost_estimate": 10000.00, "replacement_cycle_years": 5, "vendor_type": "Tech Vendor", "priority_level": "low", "reason": "guest experience"},
        {"capex_item": "Water Filtration System", "category": "Plumbing", "season": "summer", "cost_estimate": 5000.00, "replacement_cycle_years": 3, "vendor_type": "Plumbing Service", "priority_level": "medium", "reason": "efficiency"},
        {"capex_item": "Grease Trap Service", "category": "Plumbing", "season": "quarterly", "cost_estimate": 800.00, "replacement_cycle_years": 0.25, "vendor_type": "Plumbing Service", "priority_level": "high", "reason": "compliance"},
    ]
    capex_items.extend(additional_capex)
    
    print(f"Generated {len(capex_items)} CapEx items")
    return capex_items

if __name__ == "__main__":
    raw_items = generate_all_raw_items()
    gm_items = generate_gm_items()
    capex_items = generate_capex_items()
    
    # Save all to JSON files
    with open("item_master_raw.json", "w") as f:
        json.dump(raw_items, f, indent=2)
    
    with open("item_master_gm.json", "w") as f:
        json.dump(gm_items, f, indent=2)
    
    with open("item_master_capex.json", "w") as f:
        json.dump(capex_items, f, indent=2)
    
    print(f"\nComplete Item Master Generated:")
    print(f"  - Raw Items: {len(raw_items)}")
    print(f"  - GM Items: {len(gm_items)}")
    print(f"  - CapEx Items: {len(capex_items)}")
    print(f"\nFiles saved:")
    print(f"  - item_master_raw.json")
    print(f"  - item_master_gm.json")
    print(f"  - item_master_capex.json")


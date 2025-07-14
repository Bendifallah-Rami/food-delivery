"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Search, Filter } from "lucide-react"
import { Beef, Pizza, Cake, IceCreamBowlIcon as Bowl, IceCream, Utensils, Coffee } from "lucide-react"

// Sample data structure - replace with your backend data
const menuData = {
  categories: [
    {
      id: 1,
      name: "Burger",
      icon: Beef,
      count: 12,
      items: [
        {
          id: 1,
          name: "Classic Burger",
          price: 8.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Juicy beef patty with lettuce, tomato, onion, and our special sauce",
          rating: 4.5,
          reviews: 124,
          ingredients: ["Beef Patty", "Lettuce", "Tomato", "Onion", "Special Sauce"],
          calories: 520,
        },
        {
          id: 2,
          name: "Cheese Burger",
          price: 9.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Classic burger with melted cheddar cheese",
          rating: 4.3,
          reviews: 89,
          ingredients: ["Beef Patty", "Cheddar Cheese", "Lettuce", "Tomato"],
          calories: 580,
        },
        {
          id: 13,
          name: "BBQ Burger",
          price: 10.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Smoky BBQ burger with crispy onions and tangy sauce",
          rating: 4.4,
          reviews: 98,
          ingredients: ["Beef Patty", "BBQ Sauce", "Crispy Onions", "Pickles"],
          calories: 610,
        },
        {
          id: 14,
          name: "Chicken Burger",
          price: 9.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Grilled chicken breast with mayo and fresh vegetables",
          rating: 4.2,
          reviews: 76,
          ingredients: ["Chicken Breast", "Mayo", "Lettuce", "Tomato"],
          calories: 480,
        },
        {
          id: 15,
          name: "Veggie Burger",
          price: 8.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Plant-based patty with avocado and sprouts",
          rating: 4.1,
          reviews: 54,
          ingredients: ["Plant Patty", "Avocado", "Sprouts", "Vegan Mayo"],
          calories: 420,
        },
        {
          id: 16,
          name: "Double Burger",
          price: 12.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Two beef patties with double cheese and bacon",
          rating: 4.6,
          reviews: 143,
          ingredients: ["2x Beef Patty", "2x Cheese", "Bacon", "Special Sauce"],
          calories: 780,
        },
        {
          id: 17,
          name: "Bacon Burger",
          price: 11.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Crispy bacon with beef patty and smoky sauce",
          rating: 4.4,
          reviews: 87,
          ingredients: ["Beef Patty", "Crispy Bacon", "Smoky Sauce", "Lettuce"],
          calories: 650,
        },
        {
          id: 18,
          name: "Spicy Burger",
          price: 9.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Hot and spicy burger with jalapeños and pepper jack",
          rating: 4.3,
          reviews: 92,
          ingredients: ["Beef Patty", "Jalapeños", "Pepper Jack", "Spicy Mayo"],
          calories: 590,
        },
        {
          id: 101,
          name: "Mushroom Swiss Burger",
          price: 10.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Sautéed mushrooms with Swiss cheese",
          rating: 4.2,
          reviews: 67,
          ingredients: ["Beef Patty", "Mushrooms", "Swiss Cheese", "Garlic Aioli"],
          calories: 560,
        },
        {
          id: 102,
          name: "Fish Burger",
          price: 9.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Crispy fish fillet with tartar sauce",
          rating: 4.0,
          reviews: 45,
          ingredients: ["Fish Fillet", "Tartar Sauce", "Lettuce", "Pickles"],
          calories: 510,
        },
        {
          id: 103,
          name: "Turkey Burger",
          price: 9.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Lean turkey patty with cranberry sauce",
          rating: 4.1,
          reviews: 38,
          ingredients: ["Turkey Patty", "Cranberry Sauce", "Spinach", "Red Onion"],
          calories: 450,
        },
        {
          id: 104,
          name: "Lamb Burger",
          price: 13.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Premium lamb patty with mint yogurt sauce",
          rating: 4.5,
          reviews: 29,
          ingredients: ["Lamb Patty", "Mint Yogurt", "Cucumber", "Red Onion"],
          calories: 620,
        },
      ],
    },
    {
      id: 2,
      name: "Pizza",
      icon: Pizza,
      count: 15,
      items: [
        {
          id: 3,
          name: "Margherita Pizza",
          price: 12.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Fresh mozzarella, tomato sauce, and basil on thin crust",
          rating: 4.7,
          reviews: 203,
          ingredients: ["Mozzarella", "Tomato Sauce", "Fresh Basil", "Thin Crust"],
          calories: 280,
        },
        {
          id: 4,
          name: "Pepperoni Pizza",
          price: 14.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Classic pepperoni with mozzarella cheese",
          rating: 4.6,
          reviews: 189,
          ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce", "Italian Herbs"],
          calories: 320,
        },
        {
          id: 19,
          name: "Hawaiian Pizza",
          price: 15.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Ham and pineapple with mozzarella cheese",
          rating: 4.2,
          reviews: 134,
          ingredients: ["Ham", "Pineapple", "Mozzarella", "Tomato Sauce"],
          calories: 290,
        },
        {
          id: 20,
          name: "Meat Lovers Pizza",
          price: 18.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Loaded with pepperoni, sausage, bacon, and ham",
          rating: 4.8,
          reviews: 167,
          ingredients: ["Pepperoni", "Sausage", "Bacon", "Ham", "Mozzarella"],
          calories: 380,
        },
        {
          id: 21,
          name: "Veggie Pizza",
          price: 13.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Bell peppers, mushrooms, onions, and olives",
          rating: 4.3,
          reviews: 98,
          ingredients: ["Bell Peppers", "Mushrooms", "Onions", "Olives", "Mozzarella"],
          calories: 250,
        },
        {
          id: 22,
          name: "BBQ Chicken Pizza",
          price: 16.99,
          image: "/Frame 14.png",
          popular: true,
          description: "BBQ chicken with red onions and cilantro",
          rating: 4.5,
          reviews: 145,
          ingredients: ["BBQ Chicken", "Red Onions", "Cilantro", "BBQ Sauce"],
          calories: 340,
        },
        {
          id: 23,
          name: "Buffalo Pizza",
          price: 15.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Spicy buffalo chicken with ranch drizzle",
          rating: 4.4,
          reviews: 87,
          ingredients: ["Buffalo Chicken", "Ranch", "Celery", "Blue Cheese"],
          calories: 350,
        },
        {
          id: 24,
          name: "Supreme Pizza",
          price: 17.99,
          image: "/Frame 14.png",
          popular: true,
          description: "The works - pepperoni, sausage, peppers, and more",
          rating: 4.6,
          reviews: 156,
          ingredients: ["Pepperoni", "Sausage", "Bell Peppers", "Mushrooms", "Onions"],
          calories: 360,
        },
        {
          id: 25,
          name: "White Pizza",
          price: 14.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Ricotta and mozzarella with garlic and herbs",
          rating: 4.3,
          reviews: 76,
          ingredients: ["Ricotta", "Mozzarella", "Garlic", "Italian Herbs"],
          calories: 300,
        },
        {
          id: 26,
          name: "Seafood Pizza",
          price: 19.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Shrimp, calamari, and mussels with garlic sauce",
          rating: 4.4,
          reviews: 54,
          ingredients: ["Shrimp", "Calamari", "Mussels", "Garlic Sauce"],
          calories: 320,
        },
        {
          id: 105,
          name: "Four Cheese Pizza",
          price: 15.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Mozzarella, parmesan, gorgonzola, and ricotta",
          rating: 4.5,
          reviews: 89,
          ingredients: ["Mozzarella", "Parmesan", "Gorgonzola", "Ricotta"],
          calories: 330,
        },
        {
          id: 106,
          name: "Pesto Pizza",
          price: 14.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Basil pesto with sun-dried tomatoes and pine nuts",
          rating: 4.2,
          reviews: 67,
          ingredients: ["Basil Pesto", "Sun-dried Tomatoes", "Pine Nuts", "Mozzarella"],
          calories: 310,
        },
        {
          id: 107,
          name: "Truffle Pizza",
          price: 22.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Premium truffle oil with wild mushrooms",
          rating: 4.7,
          reviews: 43,
          ingredients: ["Truffle Oil", "Wild Mushrooms", "Arugula", "Parmesan"],
          calories: 340,
        },
        {
          id: 108,
          name: "Breakfast Pizza",
          price: 16.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Eggs, bacon, sausage, and hash browns",
          rating: 4.3,
          reviews: 78,
          ingredients: ["Scrambled Eggs", "Bacon", "Sausage", "Hash Browns"],
          calories: 380,
        },
        {
          id: 109,
          name: "Mexican Pizza",
          price: 15.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Spicy ground beef with jalapeños and Mexican cheese",
          rating: 4.4,
          reviews: 92,
          ingredients: ["Ground Beef", "Jalapeños", "Mexican Cheese", "Salsa"],
          calories: 350,
        },
      ],
    },
    {
      id: 3,
      name: "Cupcake",
      icon: Cake,
      count: 10,
      items: [
        {
          id: 7,
          name: "Chocolate Cupcake",
          price: 3.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Rich chocolate cupcake with creamy chocolate frosting",
          rating: 4.6,
          reviews: 89,
          ingredients: ["Chocolate Cake", "Chocolate Frosting", "Cocoa Powder"],
          calories: 320,
        },
        {
          id: 8,
          name: "Vanilla Cupcake",
          price: 3.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Classic vanilla cupcake with buttercream frosting",
          rating: 4.3,
          reviews: 67,
          ingredients: ["Vanilla Cake", "Buttercream", "Vanilla Extract"],
          calories: 290,
        },
        {
          id: 27,
          name: "Red Velvet Cupcake",
          price: 4.49,
          image: "/Frame 14.png",
          popular: true,
          description: "Moist red velvet with cream cheese frosting",
          rating: 4.7,
          reviews: 134,
          ingredients: ["Red Velvet Cake", "Cream Cheese Frosting", "Cocoa"],
          calories: 340,
        },
        {
          id: 28,
          name: "Lemon Cupcake",
          price: 3.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Zesty lemon cupcake with lemon buttercream",
          rating: 4.4,
          reviews: 78,
          ingredients: ["Lemon Cake", "Lemon Buttercream", "Lemon Zest"],
          calories: 300,
        },
        {
          id: 29,
          name: "Strawberry Cupcake",
          price: 4.29,
          image: "/Frame 14.png",
          popular: true,
          description: "Fresh strawberry cupcake with strawberry frosting",
          rating: 4.5,
          reviews: 95,
          ingredients: ["Strawberry Cake", "Strawberry Frosting", "Fresh Strawberries"],
          calories: 310,
        },
        {
          id: 30,
          name: "Carrot Cupcake",
          price: 4.19,
          image: "/Frame 14.png",
          popular: false,
          description: "Spiced carrot cupcake with cream cheese frosting",
          rating: 4.2,
          reviews: 56,
          ingredients: ["Carrot Cake", "Cream Cheese Frosting", "Walnuts", "Cinnamon"],
          calories: 330,
        },
        {
          id: 110,
          name: "Funfetti Cupcake",
          price: 3.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Colorful sprinkle cupcake with vanilla frosting",
          rating: 4.4,
          reviews: 112,
          ingredients: ["Funfetti Cake", "Vanilla Frosting", "Rainbow Sprinkles"],
          calories: 300,
        },
        {
          id: 111,
          name: "Peanut Butter Cupcake",
          price: 4.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Rich peanut butter cupcake with PB frosting",
          rating: 4.3,
          reviews: 73,
          ingredients: ["Peanut Butter Cake", "PB Frosting", "Peanut Butter Chips"],
          calories: 360,
        },
        {
          id: 112,
          name: "Coconut Cupcake",
          price: 4.29,
          image: "/Frame 14.png",
          popular: false,
          description: "Tropical coconut cupcake with coconut flakes",
          rating: 4.1,
          reviews: 48,
          ingredients: ["Coconut Cake", "Coconut Frosting", "Coconut Flakes"],
          calories: 320,
        },
        {
          id: 113,
          name: "Cookies & Cream Cupcake",
          price: 4.49,
          image: "/Frame 14.png",
          popular: true,
          description: "Oreo-inspired cupcake with cookies and cream frosting",
          rating: 4.6,
          reviews: 87,
          ingredients: ["Chocolate Cake", "Oreo Frosting", "Crushed Oreos"],
          calories: 350,
        },
      ],
    },
    {
      id: 4,
      name: "Ramen",
      icon: Bowl,
      count: 8,
      items: [
        {
          id: 9,
          name: "Chicken Ramen",
          price: 12.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Authentic Japanese ramen with tender chicken and rich broth",
          rating: 4.8,
          reviews: 156,
          ingredients: ["Chicken", "Ramen Noodles", "Chicken Broth", "Green Onions"],
          calories: 480,
        },
        {
          id: 10,
          name: "Beef Ramen",
          price: 14.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Hearty beef ramen with slow-cooked beef and vegetables",
          rating: 4.7,
          reviews: 134,
          ingredients: ["Beef", "Ramen Noodles", "Beef Broth", "Vegetables"],
          calories: 520,
        },
        {
          id: 31,
          name: "Pork Ramen",
          price: 13.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Traditional tonkotsu ramen with pork belly",
          rating: 4.6,
          reviews: 98,
          ingredients: ["Pork Belly", "Ramen Noodles", "Tonkotsu Broth", "Bamboo Shoots"],
          calories: 500,
        },
        {
          id: 32,
          name: "Seafood Ramen",
          price: 15.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Mixed seafood ramen with shrimp, scallops, and fish",
          rating: 4.5,
          reviews: 87,
          ingredients: ["Mixed Seafood", "Ramen Noodles", "Seafood Broth", "Seaweed"],
          calories: 450,
        },
        {
          id: 33,
          name: "Vegetarian Ramen",
          price: 11.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Plant-based ramen with tofu and fresh vegetables",
          rating: 4.3,
          reviews: 76,
          ingredients: ["Tofu", "Ramen Noodles", "Vegetable Broth", "Mixed Vegetables"],
          calories: 380,
        },
        {
          id: 114,
          name: "Spicy Miso Ramen",
          price: 13.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Spicy miso broth with ground pork and corn",
          rating: 4.6,
          reviews: 112,
          ingredients: ["Ground Pork", "Miso Broth", "Corn", "Spicy Paste"],
          calories: 510,
        },
        {
          id: 115,
          name: "Shoyu Ramen",
          price: 12.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Light soy sauce based broth with chicken and egg",
          rating: 4.4,
          reviews: 89,
          ingredients: ["Chicken", "Shoyu Broth", "Soft Boiled Egg", "Nori"],
          calories: 460,
        },
        {
          id: 116,
          name: "Tantanmen Ramen",
          price: 14.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Japanese-style sesame and chili oil ramen",
          rating: 4.5,
          reviews: 67,
          ingredients: ["Ground Pork", "Sesame Broth", "Chili Oil", "Bok Choy"],
          calories: 530,
        },
      ],
    },
    {
      id: 5,
      name: "Ice Cream",
      icon: IceCream,
      count: 8,
      items: [
        {
          id: 11,
          name: "Vanilla Ice Cream",
          price: 4.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Classic vanilla ice cream made with real vanilla beans",
          rating: 4.2,
          reviews: 89,
          ingredients: ["Vanilla Beans", "Cream", "Sugar", "Milk"],
          calories: 200,
        },
        {
          id: 12,
          name: "Chocolate Ice Cream",
          price: 5.49,
          image: "/Frame 14.png",
          popular: true,
          description: "Rich chocolate ice cream with cocoa and chocolate chips",
          rating: 4.6,
          reviews: 134,
          ingredients: ["Cocoa", "Chocolate Chips", "Cream", "Sugar"],
          calories: 240,
        },
        {
          id: 34,
          name: "Strawberry Ice Cream",
          price: 5.29,
          image: "/Frame 14.png",
          popular: true,
          description: "Fresh strawberry ice cream with real fruit pieces",
          rating: 4.4,
          reviews: 98,
          ingredients: ["Fresh Strawberries", "Cream", "Sugar", "Strawberry Pieces"],
          calories: 210,
        },
        {
          id: 35,
          name: "Mint Chocolate Chip",
          price: 5.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Cool mint ice cream with dark chocolate chips",
          rating: 4.3,
          reviews: 76,
          ingredients: ["Mint Extract", "Dark Chocolate Chips", "Cream", "Sugar"],
          calories: 230,
        },
        {
          id: 117,
          name: "Cookies & Cream",
          price: 5.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Vanilla ice cream with crushed chocolate cookies",
          rating: 4.7,
          reviews: 145,
          ingredients: ["Vanilla Ice Cream", "Crushed Oreos", "Cream", "Cookie Pieces"],
          calories: 250,
        },
        {
          id: 118,
          name: "Rocky Road",
          price: 6.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Chocolate ice cream with marshmallows and nuts",
          rating: 4.4,
          reviews: 87,
          ingredients: ["Chocolate Ice Cream", "Marshmallows", "Almonds", "Fudge"],
          calories: 280,
        },
        {
          id: 119,
          name: "Pistachio Ice Cream",
          price: 6.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Premium pistachio ice cream with real nuts",
          rating: 4.2,
          reviews: 54,
          ingredients: ["Pistachios", "Cream", "Sugar", "Almond Extract"],
          calories: 260,
        },
        {
          id: 120,
          name: "Salted Caramel",
          price: 6.49,
          image: "/Frame 14.png",
          popular: true,
          description: "Sweet and salty caramel ice cream with caramel swirls",
          rating: 4.8,
          reviews: 167,
          ingredients: ["Caramel", "Sea Salt", "Cream", "Caramel Swirl"],
          calories: 270,
        },
      ],
    },
    {
      id: 6,
      name: "Sides",
      icon: Utensils,
      count: 10,
      items: [
        {
          id: 121,
          name: "French Fries",
          price: 4.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Crispy golden french fries with sea salt",
          rating: 4.5,
          reviews: 234,
          ingredients: ["Potatoes", "Sea Salt", "Vegetable Oil"],
          calories: 320,
        },
        {
          id: 122,
          name: "Onion Rings",
          price: 5.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Beer-battered onion rings with ranch dip",
          rating: 4.4,
          reviews: 156,
          ingredients: ["Onions", "Beer Batter", "Ranch Dip"],
          calories: 380,
        },
        {
          id: 123,
          name: "Mozzarella Sticks",
          price: 6.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Breaded mozzarella sticks with marinara sauce",
          rating: 4.6,
          reviews: 189,
          ingredients: ["Mozzarella", "Breadcrumbs", "Marinara Sauce"],
          calories: 420,
        },
        {
          id: 124,
          name: "Chicken Wings",
          price: 8.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Spicy buffalo wings with blue cheese dip",
          rating: 4.7,
          reviews: 198,
          ingredients: ["Chicken Wings", "Buffalo Sauce", "Blue Cheese Dip"],
          calories: 480,
        },
        {
          id: 125,
          name: "Garlic Bread",
          price: 4.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Toasted bread with garlic butter and herbs",
          rating: 4.3,
          reviews: 87,
          ingredients: ["Bread", "Garlic Butter", "Italian Herbs"],
          calories: 280,
        },
        {
          id: 126,
          name: "Sweet Potato Fries",
          price: 5.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Crispy sweet potato fries with cinnamon",
          rating: 4.2,
          reviews: 76,
          ingredients: ["Sweet Potatoes", "Cinnamon", "Sea Salt"],
          calories: 300,
        },
        {
          id: 127,
          name: "Loaded Nachos",
          price: 9.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Tortilla chips with cheese, jalapeños, and sour cream",
          rating: 4.5,
          reviews: 134,
          ingredients: ["Tortilla Chips", "Cheese Sauce", "Jalapeños", "Sour Cream"],
          calories: 520,
        },
        {
          id: 128,
          name: "Caesar Salad",
          price: 7.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Fresh romaine lettuce with caesar dressing and croutons",
          rating: 4.1,
          reviews: 65,
          ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan"],
          calories: 220,
        },
        {
          id: 129,
          name: "Coleslaw",
          price: 3.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Creamy coleslaw with cabbage and carrots",
          rating: 3.9,
          reviews: 43,
          ingredients: ["Cabbage", "Carrots", "Mayo", "Vinegar"],
          calories: 150,
        },
        {
          id: 130,
          name: "Mac & Cheese",
          price: 6.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Creamy macaroni and cheese with breadcrumb topping",
          rating: 4.4,
          reviews: 167,
          ingredients: ["Macaroni", "Cheese Sauce", "Breadcrumbs", "Butter"],
          calories: 380,
        },
      ],
    },
    {
      id: 7,
      name: "Drinks",
      icon: Coffee,
      count: 12,
      items: [
        {
          id: 131,
          name: "Coca Cola",
          price: 2.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Classic Coca Cola soft drink",
          rating: 4.3,
          reviews: 298,
          ingredients: ["Carbonated Water", "Sugar", "Caramel Color", "Caffeine"],
          calories: 140,
        },
        {
          id: 132,
          name: "Fresh Orange Juice",
          price: 3.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Freshly squeezed orange juice",
          rating: 4.5,
          reviews: 156,
          ingredients: ["Fresh Oranges", "Pulp"],
          calories: 110,
        },
        {
          id: 133,
          name: "Iced Coffee",
          price: 3.49,
          image: "/Frame 14.png",
          popular: true,
          description: "Cold brew coffee with ice and cream",
          rating: 4.4,
          reviews: 189,
          ingredients: ["Coffee Beans", "Ice", "Cream", "Sugar"],
          calories: 80,
        },
        {
          id: 134,
          name: "Lemonade",
          price: 2.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Fresh lemonade with real lemons",
          rating: 4.2,
          reviews: 87,
          ingredients: ["Fresh Lemons", "Sugar", "Water", "Ice"],
          calories: 120,
        },
        {
          id: 135,
          name: "Milkshake Vanilla",
          price: 4.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Thick vanilla milkshake with whipped cream",
          rating: 4.6,
          reviews: 134,
          ingredients: ["Vanilla Ice Cream", "Milk", "Whipped Cream", "Vanilla"],
          calories: 320,
        },
        {
          id: 136,
          name: "Milkshake Chocolate",
          price: 4.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Rich chocolate milkshake with chocolate syrup",
          rating: 4.7,
          reviews: 167,
          ingredients: ["Chocolate Ice Cream", "Milk", "Chocolate Syrup", "Whipped Cream"],
          calories: 350,
        },
        {
          id: 137,
          name: "Green Tea",
          price: 2.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Hot or iced green tea with honey",
          rating: 4.1,
          reviews: 76,
          ingredients: ["Green Tea Leaves", "Honey", "Water"],
          calories: 25,
        },
        {
          id: 138,
          name: "Smoothie Berry",
          price: 5.99,
          image: "/Frame 14.png",
          popular: true,
          description: "Mixed berry smoothie with yogurt",
          rating: 4.5,
          reviews: 123,
          ingredients: ["Mixed Berries", "Yogurt", "Honey", "Ice"],
          calories: 180,
        },
        {
          id: 139,
          name: "Sparkling Water",
          price: 2.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Refreshing sparkling water with lime",
          rating: 4.0,
          reviews: 54,
          ingredients: ["Sparkling Water", "Lime", "Natural Flavors"],
          calories: 0,
        },
        {
          id: 140,
          name: "Hot Chocolate",
          price: 3.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Rich hot chocolate with marshmallows",
          rating: 4.3,
          reviews: 98,
          ingredients: ["Cocoa", "Milk", "Sugar", "Marshmallows"],
          calories: 240,
        },
        {
          id: 141,
          name: "Energy Drink",
          price: 3.49,
          image: "/Frame 14.png",
          popular: false,
          description: "Energizing drink with vitamins and caffeine",
          rating: 3.8,
          reviews: 67,
          ingredients: ["Caffeine", "Taurine", "B-Vitamins", "Sugar"],
          calories: 110,
        },
        {
          id: 142,
          name: "Fruit Punch",
          price: 2.99,
          image: "/Frame 14.png",
          popular: false,
          description: "Tropical fruit punch with mixed fruits",
          rating: 4.1,
          reviews: 89,
          ingredients: ["Mixed Fruit Juices", "Sugar", "Natural Flavors"],
          calories: 130,
        },
      ],
    },
  ],
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(2) // Default to Pizza
  const [currentPage, setCurrentPage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const itemsPerPage = 2

  // Get current category items with filtering
  const currentCategoryItems = menuData.categories.find((cat) => cat.id === activeCategory)?.items || []

  // Apply search and popular filters
  const filteredItems = currentCategoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPopular = !showPopularOnly || item.popular
    return matchesSearch && matchesPopular
  })

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const displayedItems = filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setCurrentPage(0)
    setSearchTerm("")
    setShowPopularOnly(false)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  const handleOrderNow = (item) => {
    // Handle order functionality - integrate with your cart/order system
    console.log("Order item:", item)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(0)
    setIsSearching(e.target.value.length > 0)
  }

  const togglePopularFilter = () => {
    setShowPopularOnly(!showPopularOnly)
    setCurrentPage(0)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setShowPopularOnly(false)
    setCurrentPage(0)
  }

  return (
    <section className="relative py-16 lg:py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="inline-block bg-[#EB5757]/10 text-[#EB5757] px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Our Menu
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#333333] leading-tight max-w">
              Menu That Always <br />
              Makes You Fall In Love
            </h2>
          </div>
          {/* Navigation Arrows */}
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={totalPages <= 1}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={totalPages <= 1}
              className="w-12 h-12 bg-[#EB5757] rounded-full shadow-md flex items-center justify-center hover:bg-[#EB5757]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={togglePopularFilter}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    showPopularOnly
                      ? "bg-[#EB5757] text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-3 h-3" />
                  <span>Popular</span>
                </button>
                {(isSearching || showPopularOnly) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category List */}
              <div className="space-y-3">
                {menuData.categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? "bg-[#EB5757] text-white shadow-lg transform scale-105"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <IconComponent className="w-6 h-6" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs font-medium ${
                            activeCategory === category.id ? "text-red-100" : "text-gray-500"
                          }`}
                        >
                          {category.count} items
                        </span>
                        {activeCategory === category.id && <div className="w-2 h-2 bg-white rounded-full mt-1"></div>}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Results Summary */}
              {(isSearching || showPopularOnly) && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredItems.length} of {currentCategoryItems.length} items
                    {isSearching && ` for "${searchTerm}"`}
                    {showPopularOnly && " (Popular only)"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="lg:col-span-3">
            {displayedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.popular && (
                          <div className="absolute top-4 left-4 bg-[#EB5757] text-white px-3 py-1 rounded-full text-sm font-medium">
                            Popular
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">${item.price}</span>
                            <button
                              onClick={() => handleOrderNow(item)}
                              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-105"
                            >
                              <span className="font-medium">Order Now</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Info */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                      <span className="text-sm text-gray-600">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentPage ? "bg-[#EB5757]" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#EB5757] text-white px-6 py-3 rounded-full hover:bg-[#EB5757]/80 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="lg:hidden flex justify-center space-x-2 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={totalPages <= 1}
                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={totalPages <= 1}
                className="w-12 h-12 bg-[#EB5757] rounded-full shadow-md flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-8 w-4 h-4 bg-yellow-400 rounded-full"></div>
      <div className="absolute bottom-20 left-8 w-3 h-3 bg-[#EB5757] rounded-full"></div>
    </section>
  )
}

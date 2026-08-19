import { images } from "./images";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offer", label: "Offers" },
  { href: "/event", label: "Event" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;

export const categories = [
  { name: "Burger", image: images.catBurger },
  { name: "Pizza", image: images.catPizza },
  { name: "Fried Chicken", image: images.catChicken },
  { name: "French Fries", image: images.catFries },
  { name: "Sandwich", image: images.catSandwich },
  { name: "Pasta", image: images.catPasta },
  { name: "Salad", image: images.catSalad },
];

export const offers = [
  {
    save: "40%",
    tag: "Chef’s Selection",
    title: "Freshly Prepared Served at Its Best",
    image: images.offerChef,
  },
  {
    save: "50%",
    tag: "Oven Special",
    title: "Stone-Baked Melty & Flavorful",
    image: images.offerOven,
  },
  {
    save: "30%",
    tag: "Special Discount",
    title: "Signature Chicken Burgers Crisp. Juicy. Satisfying.",
    image: images.offerBurger,
  },
];

export const featuredMenu = [
  {
    name: "Signature Chicken Burger",
    price: 299,
    desc: "Crispy chicken patty with melted cheddar, fresh lettuce, and house-made sauce.",
    image: images.menuSignature,
  },
  {
    name: "Tuscan Tomato Pasta",
    price: 329,
    desc: "Rich tomato sauce with herbs, parmesan, and perfectly cooked pasta.",
    image: images.menuPasta,
  },
  {
    name: "Herb Roast Chicken",
    price: 319,
    desc: "Slow-roasted chicken with garden herbs, served with savory sides.",
    image: images.catChicken,
  },
];

export const stats = [
  { value: 15, suffix: "K", label: "Dishes Served Monthly" },
  { value: 8, suffix: "K", label: "Unique Recipes" },
  { value: 12, suffix: "K", label: "Returning Customers" },
  { value: 2, suffix: "K", label: "Events Catered" },
];

export const whyUs = [
  {
    title: "Delicious Food",
    desc: "Crafted with fresh ingredients and bold flavors you’ll love.",
    icon: images.iconFood,
  },
  {
    title: "Relaxing Ambience",
    desc: "Enjoy your meal in a cozy and welcoming atmosphere.",
    icon: images.iconAmbience,
  },
  {
    title: "Friendly Service",
    desc: "Our team is dedicated to fast seamless service.",
    icon: images.iconService,
  },
  {
    title: "Fresh Ingredients",
    desc: "We use freshest ingredients to ensure quality in dishes.",
    icon: images.iconFresh,
  },
];

export const cateringDishes = [
  {
    tag: "DISH 1",
    name: "Truffle Risotto",
    desc: "Creamy Arborio rice infused with truffle oil and finished with parmesan",
    image: images.cateringRisotto,
  },
  {
    tag: "DISH 2",
    name: "Gourmet Burger Platter",
    desc: "Juicy burgers stacked with fresh ingredients, perfect for sharing.",
    image: images.cateringPlatter,
  },
  {
    tag: "DISH 3",
    name: "Grilled Chicken Sandwich",
    desc: "Tender grilled chicken with fresh veggies and signature sauce.",
    image: images.cateringSandwich,
  },
];

export const testimonials = [
  {
    quote:
      "The food was absolutely amazing! Every bite was fresh, flavorful, and perfectly cooked. I’ll definitely be coming back with great satisfaction, happiness, and memorable experience.",
    name: "James Carter",
    role: "Food Blogger",
    avatar: images.testimonial1,
    decor: images.testimonialDecor1,
  },
  {
    quote:
      "Great service and even better food. The ambiance was perfect for a relaxing dinner with friends, family, great music, cozy atmosphere, and warm lighting.",
    name: "Olivia Brown",
    role: "Customer",
    avatar: images.testimonial2,
    decor: images.testimonialDecor2,
  },
  {
    quote:
      "I ordered for a small event, and everything was on point — delicious food and timely delivery, professional service, great packaging, and amazing customer satisfaction.",
    name: "Daniel Smith",
    role: "Event Organizer",
    avatar: images.testimonial3,
    decor: images.testimonialDecor3,
  },
  {
    quote:
      "One of the best dining experiences I’ve had. Highly recommended for anyone who loves quality food, excellent service, great ambiance, and unforgettable taste experience.",
    name: "Olivia Brown",
    role: "Customer",
    avatar: images.testimonial4,
    decor: images.testimonialDecor1,
  },
];

export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects take between two to six weeks depending on scope, research depth, and revision rounds. Clear timelines are shared before we begin.",
  },
  {
    q: "How long does delivery take usually?",
    a: "Delivery usually takes 30–45 minutes depending on your location and order size. We prepare every meal fresh, then send it out as soon as it’s ready.",
  },
  {
    q: "Do you offer catering services?",
    a: "Yes. From intimate gatherings to large celebrations, we deliver exceptional food and seamless service for corporate events, private parties, and weddings.",
  },
  {
    q: "Can I order from my table online?",
    a: "Yes — choose your table number on the Order from Table page, add dishes from the menu, and send comments to the kitchen. You can also call us at +91 820 257 6104.",
  },
  {
    q: "Are your ingredients fresh?",
    a: "Yes. Every dish is thoughtfully prepared using fresh, high-quality produce and crafted with care by our kitchen team.",
  },
];

export type MenuItem = {
  name: string;
  price: number;
  desc: string;
  image: string;
};

export const menuCategories: { id: string; label: string; items: MenuItem[] }[] = [
  {
    id: "burger",
    label: "Burger Items",
    items: [
      { name: "Classic Chicken Burger", price: 199, desc: "Classic Chicken Burger – Juicy grilled chicken with fresh veggies", image: images.dish5 },
      { name: "Double Cheese Chicken Burger", price: 229, desc: "Double Cheese Chicken Burger – Loaded with double cheese layers", image: images.heroBurgerAlt },
      { name: "BBQ Chicken Burger", price: 249, desc: "BBQ Chicken Burger – Smoky BBQ chicken with house sauce", image: images.menuBurgerBoard },
      { name: "Spicy Chicken Burger", price: 189, desc: "Spicy Chicken Burger – Crispy chicken with spicy sauce", image: images.catBurger },
      { name: "Crispy Zinger Burger", price: 169, desc: "Crispy Zinger Burger – Crunchy fried chicken delight", image: images.menuSignature },
      { name: "Veggie Supreme Burger", price: 319, desc: "Veggie Supreme Burger – Fresh veggie patty & greens", image: images.ctaFood },
    ],
  },
  {
    id: "pizza",
    label: "Pizza Items",
    items: [
      { name: "Margherita Pizza", price: 229, desc: "Margherita Pizza – Fresh mozzarella, basil, and tomato", image: images.heroPizza },
      { name: "Pepperoni Pizza", price: 269, desc: "Pepperoni Pizza – Loaded with spicy pepperoni slices", image: images.catPizza },
      { name: "BBQ Chicken Pizza", price: 279, desc: "BBQ Chicken Pizza – Smoky chicken with tangy BBQ sauce", image: images.dish15 },
      { name: "Veggie Garden Pizza", price: 249, desc: "Veggie Garden Pizza – Seasonal vegetables and herbs", image: images.dish16 },
      { name: "Four Cheese Pizza", price: 299, desc: "Four Cheese Pizza – Melty blend of premium cheeses", image: images.dish10 },
      { name: "Spicy Inferno Pizza", price: 269, desc: "Spicy Inferno Pizza – Chili, pepperoni, and hot sauce", image: images.dish12 },
    ],
  },
  {
    id: "pasta",
    label: "Pasta Items",
    items: [
      { name: "Tuscan Tomato Pasta", price: 329, desc: "Tuscan Tomato Pasta – Rich tomato sauce with herbs", image: images.menuPasta },
      { name: "Carbonara Pasta", price: 299, desc: "Carbonara Pasta – Creamy sauce with bacon and parmesan", image: images.catPasta },
      { name: "Alfredo Pasta", price: 279, desc: "Alfredo Pasta – Silky cream sauce and garlic", image: images.dish2 },
      { name: "Pesto Penne", price: 269, desc: "Pesto Penne – Fresh basil pesto and pine nuts", image: images.dish9 },
      { name: "Truffle Risotto", price: 349, desc: "Truffle Risotto – Creamy Arborio rice with truffle oil", image: images.cateringRisotto },
      { name: "Spicy Arrabbiata", price: 249, desc: "Spicy Arrabbiata – Bold chili tomato sauce", image: images.dish2 },
    ],
  },
  {
    id: "chicken",
    label: "Chicken Items",
    items: [
      { name: "Crispy Fried Chicken", price: 219, desc: "Crispy Fried Chicken – Golden crunch, juicy inside", image: images.catChicken },
      { name: "BBQ Chicken Wings", price: 199, desc: "BBQ Chicken Wings – Smoky, tangy, and saucy", image: images.dish8 },
      { name: "Spicy Chicken Burger", price: 189, desc: "Spicy Chicken Burger – Crispy chicken with spicy sauce", image: images.catBurger },
      { name: "Grilled Chicken Sandwich", price: 229, desc: "Grilled Chicken Sandwich – Fresh veggies and signature sauce", image: images.cateringSandwich },
      { name: "Crispy Zinger Burger", price: 169, desc: "Crispy Zinger Burger – Crunchy fried chicken delight", image: images.menuSignature },
      { name: "Herb Roast Chicken", price: 319, desc: "Herb Roast Chicken – Slow roasted with garden herbs", image: images.heroBowl },
    ],
  },
  {
    id: "salad",
    label: "Salad Items",
    items: [
      { name: "Caesar Salad", price: 199, desc: "Caesar Salad – Crisp romaine, parmesan, and dressing", image: images.catSalad },
      { name: "Garden Fresh Bowl", price: 219, desc: "Garden Fresh Bowl – Seasonal greens and veggies", image: images.catSalad },
      { name: "Tuna Poke Bowl", price: 269, desc: "Tuna Poke Bowl – Fresh tuna, avocado, and rice", image: images.catSalad },
      { name: "Grilled Chicken Salad", price: 249, desc: "Grilled Chicken Salad – Lean protein over greens", image: images.cateringSandwich },
      { name: "Mediterranean Salad", price: 229, desc: "Mediterranean Salad – Olives, feta, and tomatoes", image: images.catSalad },
      { name: "Avocado Crunch Salad", price: 219, desc: "Avocado Crunch Salad – Creamy avocado and seeds", image: images.catSalad },
    ],
  },
  {
    id: "sides",
    label: "Sides & Snacks",
    items: [
      { name: "French Fries", price: 99, desc: "French Fries – Golden, salted, and crispy", image: images.catFries },
      { name: "Loaded Nachos", price: 189, desc: "Loaded Nachos – Cheese, salsa, and toppings", image: images.dish1 },
      { name: "Onion Rings", price: 119, desc: "Onion Rings – Crispy coating, sweet onion", image: images.dish7 },
      { name: "Sweet Potato Fries", price: 129, desc: "Sweet Potato Fries – Lightly seasoned and crisp", image: images.dish6 },
      { name: "Garlic Bread", price: 99, desc: "Garlic Bread – Toasted with herbs and butter", image: images.catSandwich },
      { name: "Mozzarella Bites", price: 149, desc: "Mozzarella Bites – Gooey cheese, golden crunch", image: images.dish7 },
    ],
  },
  {
    id: "desserts",
    label: "Desserts & Drinks",
    items: [
      { name: "Chocolate Brownie", price: 129, desc: "Chocolate Brownie – Rich, fudgy, and warm", image: images.dessertBrownie },
      { name: "Classic Milkshake", price: 119, desc: "Classic Milkshake – Thick, creamy, and cold", image: images.drinkMilkshake },
      { name: "Fresh Lemonade", price: 79, desc: "Fresh Lemonade – Bright citrus refreshment", image: images.drinkLemonade },
      { name: "Tiramisu Cup", price: 149, desc: "Tiramisu Cup – Coffee, cocoa, and cream", image: images.dessertTiramisu },
      { name: "Iced Coffee", price: 99, desc: "Iced Coffee – Smooth brew over ice", image: images.drinkIcedCoffee },
      { name: "Berry Cheesecake", price: 169, desc: "Berry Cheesecake – Creamy with fresh berries", image: images.dessertCheesecake },
    ],
  },
];

export const blogPosts = [
  {
    slug: "the-secret-to-a-perfect-juicy-burger",
    title: "The Secret to a Perfect Juicy Burger",
    date: "Apr 24, 2026",
    readTime: "4 min",
    image: images.blogBurger,
    sections: [
      {
        heading: "Introduction",
        body: [
          "A great burger is more than just a quick meal — it’s a perfect balance of flavor, texture, and quality ingredients. From the softness of the bun to the richness of the patty, every detail matters.",
          "At Bite Maadi, we believe crafting a burger is an art. Each layer is carefully prepared to deliver a satisfying and memorable experience in every bite",
        ],
      },
      {
        heading: "Start with Quality Ingredients",
        body: [
          "The foundation of a great burger begins with fresh, high-quality ingredients for perfect taste, texture, and satisfaction every single bite guaranteed.",
        ],
        bullets: [
          "Juicy chicken patties ensure rich flavor",
          "Fresh vegetables add crunch and balance",
          "Soft, toasted buns complete the texture",
        ],
      },
      {
        heading: "The Importance of Cheese",
        body: [
          "Cheese plays a key role in enhancing the burger’s taste with rich creamy texture, delicious flavor balance, melt-in-mouth experience, and perfect harmony that makes every bite more satisfying, juicy, irresistible, and unforgettable for all burger lovers everywhere.",
        ],
        bullets: [
          "Adds creaminess",
          "Enhances overall flavor",
          "Melts perfectly over the patty",
        ],
      },
      {
        heading: "Perfect Cooking Technique",
        body: [
          "Cooking the patty properly is essential for achieving juicy flavor, perfect texture, rich aroma, balanced seasoning, and a satisfying bite that makes every burger experience truly delicious, memorable, and enjoyable for all food lovers everywhere.",
        ],
        bullets: [
          "Juicy on the inside",
          "Slightly crisp on the outside",
          "Even heat for balanced cooking",
        ],
      },
      {
        heading: "Fresh Toppings Make the Difference",
        body: [
          "Toppings bring freshness and contrast to every bite with vibrant colors, crisp textures, rich flavors, and balanced taste that enhance every burger experience, making it more exciting, delicious, satisfying, and unforgettable for all food lovers.",
        ],
        bullets: [
          "Lettuce adds crunch",
          "Tomatoes add juiciness",
          "Onions bring a sharp kick",
        ],
      },
      {
        heading: "The Final Assembly",
        body: [
          "A well-assembled burger makes all the difference with perfect balance, rich flavors, fresh ingredients, ideal texture, and satisfying layers that create an enjoyable, delicious, and unforgettable eating experience for every burger lover everywhere.",
        ],
        bullets: [
          "Balanced layering",
          "Sauce evenly spread",
          "Easy to hold and enjoy",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "The perfect burger is a combination of quality ingredients, proper technique, and attention to detail. When everything comes together, it creates more than just food — it creates an experience worth remembering.",
        ],
      },
    ],
  },
  {
    slug: "why-fresh-ingredients-make-all-the-difference",
    title: "Why Fresh Ingredients Make All the Difference",
    date: "Jun 15, 2026",
    readTime: "4 min",
    image: images.blogFresh,
    sections: [
      {
        heading: "Introduction",
        body: [
          "Fresh ingredients are the heart of every delicious meal, bringing natural flavor, vibrant color, and better texture to every dish. Quality ingredients not only improve taste but also create a healthier and more satisfying dining experience.",
          "At Bite Maadi, we carefully select fresh vegetables, premium meats, and flavorful seasonings to ensure every meal feels special, delicious, and unforgettable from the very first bite.",
        ],
      },
      {
        heading: "Fresh Ingredients Create Better Flavor",
        body: [
          "Using fresh ingredients enhances every dish with natural aroma, rich taste, balanced texture, and vibrant freshness that make meals more enjoyable, delicious, healthy, and satisfying for every customer.",
        ],
        bullets: [
          "Fresh vegetables improve texture",
          "Natural ingredients enhance flavor",
          "Quality products create better meals",
        ],
      },
      {
        heading: "Why Freshness Matters",
        body: [
          "Fresh ingredients help maintain authentic taste, nutritional value, delicious aroma, appealing appearance, and overall food quality that customers can truly enjoy and appreciate every single time they dine.",
        ],
        bullets: [
          "Better nutritional value",
          "Rich and natural taste",
          "More appealing presentation",
        ],
      },
      {
        heading: "The Role of Fresh Vegetables",
        body: [
          "Fresh vegetables add color, crunch, natural sweetness, balanced texture, refreshing flavor, and healthy goodness that elevate every meal, making dishes more delicious, exciting, satisfying, and memorable for all food lovers.",
        ],
        bullets: [
          "Lettuce adds crisp freshness",
          "Tomatoes provide juiciness",
          "Onions enhance flavor depth",
        ],
      },
      {
        heading: "Fresh Meat Makes the Difference",
        body: [
          "Premium fresh meat delivers rich flavor, juicy texture, delicious aroma, balanced tenderness, and satisfying quality that create an enjoyable dining experience for customers who appreciate great food and authentic taste.",
        ],
        bullets: [
          "Juicy and tender texture",
          "Rich natural flavor",
          "Better cooking results",
        ],
      },
      {
        heading: "Fresh Preparation Every Day",
        body: [
          "Preparing food fresh every day ensures better quality, improved taste, appealing presentation, rich aroma, and customer satisfaction that keeps every meal flavorful, enjoyable, memorable, and worth coming back for again.",
        ],
        bullets: [
          "Better flavor consistency",
          "Higher food quality",
          "More enjoyable dining experience",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Fresh ingredients are essential for creating flavorful, satisfying, and memorable meals. With quality products, careful preparation, and attention to freshness, every dish becomes a better dining experience worth enjoying and remembering.",
        ],
      },
    ],
  },
  {
    slug: "crispy-chicken-tips-for-the-perfect-crunch",
    title: "Crispy Chicken: Tips for the Perfect Crunch",
    date: "Jun 15, 2026",
    readTime: "4 min",
    image: images.blogChicken,
    sections: [
      {
        heading: "Introduction",
        body: [
          "Crispy chicken is loved for its crunchy coating, juicy inside, rich flavor, and satisfying texture that make every bite enjoyable and delicious. Perfect crispy chicken requires the right ingredients, seasoning, and cooking method.",
          "At Bite Maadi, we focus on quality preparation techniques to create crispy chicken that is flavorful, golden, crunchy, and unforgettable for every customer.",
        ],
      },
      {
        heading: "Choosing the Right Chicken",
        body: [
          "Fresh chicken provides better texture, rich flavor, juicy tenderness, balanced moisture, and excellent cooking results that help create perfectly crispy and delicious fried chicken every single time.",
        ],
        bullets: [
          "Fresh chicken improves texture",
          "Quality cuts cook evenly",
          "Proper seasoning enhances flavor",
        ],
      },
      {
        heading: "The Secret to Crispy Coating",
        body: [
          "A perfect coating creates crunchy texture, golden color, flavorful seasoning, balanced crispiness, and satisfying crunch that make crispy chicken more delicious, enjoyable, and irresistible for food lovers everywhere.",
        ],
        bullets: [
          "Use seasoned flour",
          "Double coating adds crunch",
          "Proper batter improves texture",
        ],
      },
      {
        heading: "Perfect Frying Technique",
        body: [
          "Correct frying temperature helps achieve crispy coating, juicy interior, rich flavor, even cooking, golden appearance, and satisfying texture that make every piece of chicken perfectly delicious and enjoyable.",
        ],
        bullets: [
          "Maintain proper oil temperature",
          "Fry evenly for balanced texture",
          "Avoid overcrowding the fryer",
        ],
      },
      {
        heading: "Seasoning Makes the Difference",
        body: [
          "Good seasoning enhances crispy chicken with rich aroma, balanced spices, delicious flavor, mouthwatering taste, and satisfying quality that create an unforgettable dining experience for every customer.",
        ],
        bullets: ["Salt improves flavor", "Spices add depth", "Herbs create aroma"],
      },
      {
        heading: "Serving Crispy Chicken Fresh",
        body: [
          "Serving crispy chicken fresh ensures crunchy texture, juicy flavor, rich aroma, satisfying quality, and better dining experience that customers can truly enjoy with every delicious bite.",
        ],
        bullets: [
          "Best served hot",
          "Crunch stays fresh longer",
          "Perfect with dipping sauces",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Perfect crispy chicken comes from quality ingredients, balanced seasoning, proper coating, and excellent cooking technique. When everything is prepared correctly, it creates a crunchy, juicy, and unforgettable meal everyone loves.",
        ],
      },
    ],
  },
  {
    slug: "pasta-perfection-simple-ingredients-big-flavor",
    title: "Pasta Perfection: Simple Ingredients, Big Flavor",
    date: "Apr 15, 2026",
    readTime: "5 min",
    image: images.blogPasta,
    sections: [
      {
        heading: "Introduction",
        body: [
          "Fresh ingredients are the heart of every delicious meal, bringing natural flavor, vibrant color, and better texture to every dish. Quality ingredients not only improve taste but also create a healthier and more satisfying dining experience.",
          "At Bite Maadi, we carefully select fresh vegetables, premium meats, and flavorful seasonings to ensure every meal feels special, delicious, and unforgettable from the very first bite.",
        ],
      },
      {
        heading: "Fresh Ingredients Create Better Flavor",
        body: [
          "Using fresh ingredients enhances every dish with natural aroma, rich taste, balanced texture, and vibrant freshness that make meals more enjoyable, delicious, healthy, and satisfying for every customer.",
        ],
        bullets: [
          "Fresh vegetables improve texture",
          "Natural ingredients enhance flavor",
          "Quality products create better meals",
        ],
      },
      {
        heading: "Why Freshness Matters",
        body: [
          "Fresh ingredients help maintain authentic taste, nutritional value, delicious aroma, appealing appearance, and overall food quality that customers can truly enjoy and appreciate every single time they dine.",
        ],
        bullets: [
          "Better nutritional value",
          "Rich and natural taste",
          "More appealing presentation",
        ],
      },
      {
        heading: "The Role of Fresh Vegetables",
        body: [
          "Fresh vegetables add color, crunch, natural sweetness, balanced texture, refreshing flavor, and healthy goodness that elevate every meal, making dishes more delicious, exciting, satisfying, and memorable for all food lovers.",
        ],
        bullets: [
          "Lettuce adds crisp freshness",
          "Tomatoes provide juiciness",
          "Onions enhance flavor depth",
        ],
      },
      {
        heading: "Fresh Meat Makes the Difference",
        body: [
          "Premium fresh meat delivers rich flavor, juicy texture, delicious aroma, balanced tenderness, and satisfying quality that create an enjoyable dining experience for customers who appreciate great food and authentic taste.",
        ],
        bullets: [
          "Juicy and tender texture",
          "Rich natural flavor",
          "Better cooking results",
        ],
      },
      {
        heading: "Fresh Preparation Every Day",
        body: [
          "Preparing food fresh every day ensures better quality, improved taste, appealing presentation, rich aroma, and customer satisfaction that keeps every meal flavorful, enjoyable, memorable, and worth coming back for again.",
        ],
        bullets: [
          "Better flavor consistency",
          "Higher food quality",
          "More enjoyable dining experience",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Fresh ingredients are essential for creating flavorful, satisfying, and memorable meals. With quality products, careful preparation, and attention to freshness, every dish becomes a better dining experience worth enjoying and remembering.",
        ],
      },
    ],
  },
  {
    slug: "loaded-nachos-a-crowd-favorite-explained",
    title: "Loaded Nachos: A Crowd Favorite Explained",
    date: "Jun 16, 2026",
    readTime: "4 min",
    image: images.blogNachos,
    sections: [
      {
        heading: "Introduction",
        body: [
          "Loaded nachos are a perfect combination of crunchy chips, melted cheese, flavorful toppings, and delicious sauces that create a fun and satisfying snack for every occasion. At Bite Maadi, we prepare loaded nachos with fresh ingredients and balanced flavors to deliver a tasty, exciting, and memorable experience in every bite.",
        ],
      },
      {
        heading: "Crispy Chips Are the Foundation",
        body: [
          "Crunchy tortilla chips provide the perfect base with balanced texture, delicious flavor, satisfying crispiness, and sturdy layers that make loaded nachos enjoyable and irresistible for customers everywhere.",
        ],
        bullets: [
          "Crispy texture improves taste",
          "Strong chips hold toppings well",
          "Fresh chips create better flavor",
        ],
      },
      {
        heading: "Cheese Brings Everything Together",
        body: [
          "Melted cheese adds creamy texture, rich flavor, balanced taste, delicious aroma, and satisfying quality that make loaded nachos more flavorful, enjoyable, and unforgettable for food lovers.",
        ],
        bullets: [
          "Adds creamy richness",
          "Improves overall flavor",
          "Melts perfectly over chips",
        ],
      },
      {
        heading: "Flavorful Toppings Make It Better",
        body: [
          "Fresh toppings enhance loaded nachos with vibrant color, balanced texture, rich flavor, delicious freshness, and exciting variety that create a more satisfying and enjoyable dining experience.",
        ],
        bullets: [
          "Jalapeños add spice",
          "Tomatoes add freshness",
          "Meat adds rich flavor",
        ],
      },
      {
        heading: "Sauces Add Extra Flavor",
        body: [
          "Delicious sauces improve loaded nachos with creamy texture, spicy flavor, rich taste, balanced seasoning, and satisfying finish that make every bite more exciting and enjoyable.",
        ],
        bullets: [
          "Cheese sauce adds richness",
          "Salsa brings freshness",
          "Sour cream balances spice",
        ],
      },
      {
        heading: "Perfect for Sharing",
        body: [
          "Loaded nachos are ideal for sharing because of their variety, balanced flavors, delicious toppings, exciting presentation, and satisfying portions that make gatherings more enjoyable and memorable for everyone.",
        ],
        bullets: [
          "Great for groups",
          "Fun and flavorful snack",
          "Perfect for parties and events",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Loaded nachos combine crispy chips, melted cheese, fresh toppings, and flavorful sauces into one exciting and delicious dish. With the right ingredients and preparation, they become a crowd favorite everyone loves to share and enjoy.",
        ],
      },
    ],
  },
  {
    slug: "why-onion-rings-are-the-perfect-side-dish",
    title: "Why Onion Rings Are the Perfect Side Dish",
    date: "Apr 15, 2026",
    readTime: "3 min",
    image: images.blogOnion,
    sections: [
      {
        heading: "Introduction",
        body: [
          "Onion rings are a popular side dish loved for their crispy coating, sweet onion flavor, satisfying crunch, and delicious texture that pair perfectly with burgers, sandwiches, and many other meals.",
          "At Bite Maadi, we prepare onion rings using fresh onions, flavorful batter, and proper frying techniques to create a crispy and memorable dining experience.",
        ],
      },
      {
        heading: "Fresh Onions Make the Difference",
        body: [
          "Fresh onions provide natural sweetness, balanced flavor, delicious texture, rich aroma, and satisfying quality that help create perfectly crispy and flavorful onion rings for every customer.",
        ],
        bullets: [
          "Fresh onions taste better",
          "Balanced sweetness improves flavor",
          "Quality onions cook evenly",
        ],
      },
      {
        heading: "Crispy Coating Creates Perfect Texture",
        body: [
          "A crunchy coating adds crispiness, golden color, rich flavor, satisfying texture, and delicious crunch that make onion rings more enjoyable and irresistible for food lovers everywhere.",
        ],
        bullets: [
          "Batter creates crunch",
          "Proper seasoning improves taste",
          "Golden coating looks appealing",
        ],
      },
      {
        heading: "Perfect Frying Technique",
        body: [
          "Correct frying methods ensure crispy texture, even cooking, rich flavor, balanced crunch, delicious aroma, and satisfying quality that make onion rings perfectly tasty and enjoyable.",
        ],
        bullets: [
          "Maintain hot oil temperature",
          "Fry until golden brown",
          "Avoid oily texture",
        ],
      },
      {
        heading: "The Best Pairing for Meals",
        body: [
          "Onion rings complement meals with crispy texture, rich flavor, balanced taste, satisfying crunch, and delicious freshness that make burgers, sandwiches, and snacks even more enjoyable.",
        ],
        bullets: [
          "Perfect with burgers",
          "Great with dipping sauces",
          "Adds extra crunch to meals",
        ],
      },
      {
        heading: "Serving Onion Rings Fresh",
        body: [
          "Freshly served onion rings deliver crispy texture, delicious flavor, rich aroma, balanced crunch, and enjoyable quality that create a better dining experience for every customer.",
        ],
        bullets: [
          "Best served hot",
          "Crunch stays fresh longer",
          "Perfect for sharing",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Onion rings are the perfect side dish because of their crispy texture, delicious flavor, and satisfying crunch. With fresh ingredients and proper cooking techniques, they become a tasty addition to any meal and a favorite for food lovers everywhere.",
        ],
      },
    ],
  },
];

export const eventServices = [
  {
    title: "Corporate Events",
    desc: "Professional catering designed for meetings, conferences, and office gatherings with fresh menus, timely service, and exceptional quality .",
    items: ["Business meetings", "Team lunches", "Corporate parties"],
    image: images.event1,
  },
  {
    title: "Private Events",
    desc: "Make your celebrations unforgettable with flavorful food and smooth service, creating the perfect experience every time.",
    items: ["Birthday parties", "Family gatherings", "Special occasions"],
    image: images.event2,
  },
  {
    title: "Wedding Catering",
    desc: "Elegant and customized catering to make your special day truly memorable with perfect taste, style, and seamless professional service.",
    items: ["Wedding receptions", "Engagement events", "Custom menus"],
    image: images.event3,
  },
];

export const packages = [
  {
    name: "Essential Package",
    price: "₹499 / person",
    desc: "Simple design with menu, prices, and easy ordering.",
    items: ["Choice of 2 main dishes", "1 side item", "Soft drinks"],
  },
  {
    name: "Deluxe Package",
    price: "₹799 / person",
    desc: "Enhanced design with categories, cart, and smooth ordering.",
    items: ["Choice of 3 main dishes", "2 side items", "Desserts & drinks"],
  },
  {
    name: "Premium Package",
    price: "₹1,199 / person",
    desc: "Advanced features, stylish design, ordering system included.",
    items: ["Choice of 5 dishes", "Full-course experience", "Premium desserts & beverages"],
  },
  {
    name: "Bronze Package",
    price: "₹1,499 / person",
    desc: "Basic features with simple design and easy navigation.",
    items: ["Full-course catering experience", "Custom menu options", "Premium desserts & drinks"],
  },
];

export const values = [
  {
    title: "Sustainability",
    desc: "We focus on responsible sourcing and eco-friendly practices to support future.",
    icon: images.iconFresh,
  },
  {
    title: "Quality First",
    desc: "Every dish is prepared with care using premium ingredients and standards.",
    icon: images.iconFood,
  },
  {
    title: "Community",
    desc: "We bring people together through food, creating moments worth sharing.",
    icon: images.iconService,
  },
  {
    title: "Excellence",
    desc: "We strive to deliver the best experience in every bite and every visit.",
    icon: images.iconAmbience,
  },
];

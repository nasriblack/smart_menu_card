export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle: string;
  backgroundImage: string;
  items: MenuItem[];
  with_img: boolean;
}

export const menuData: MenuCategory[] = [
  {
    with_img: true,
    id: "our-menu",
    name: "OUR MENU",
    subtitle: "See what we offer",
    backgroundImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070",
    items: [],
  },
  {
    with_img: false,
    id: "main-course",
    name: "MAIN COURSE",
    subtitle: "Qualities in each dish",
    backgroundImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2070",
    items: [
      {
        id: "zuppa-toscana",
        name: "Super-delicious zuppa toscana",
        description: "Chicken / Italian / Sausage / Spinach",
        price: 20,
      },
      {
        id: "grilled-chicken",
        name: "Thai style grilled chicken",
        description: "Chicken / Thai spices / Lime leaves",
        price: 35,
      },
      {
        id: "chicken-tikka",
        name: "Chicken tikka masala",
        description: "Chicken / Creamy tomato sauce / Spices",
        price: 28,
      },
      {
        id: "pork-sausage",
        name: "Pork sausage from the oven",
        description: "Pork / Herbs / Baked potatoes",
        price: 44,
      },
      {
        id: "beef-lasagna",
        name: "Classic Beef Lasagna",
        description: "Beef / Cheese / Tomato sauce / Pasta",
        price: 32,
      },
    ],
  },
  {
    with_img: true,
    id: "soups-salads",
    name: "SOUPS & SALADS",
    subtitle: "Clean vegetables",
    backgroundImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=2070",
    items: [
      {
        id: "noodle-soup",
        name: "Grandma's Noodle Soup",
        description: "Chicken / Carrots / Celery / Egg noodles",
        price: 26,
      },
      {
        id: "broccoli-salad",
        name: "Cran-Broccoli Salad",
        description: "Broccoli / Cranberries / Almonds",
        price: 28,
      },
      {
        id: "caesar-salad",
        name: "Classic Caesar Salad",
        description: "Romaine / Croutons / Parmesan / Caesar dressing",
        price: 24,
      },
    ],
  },
  {
    with_img: true,
    id: "desserts",
    name: "DESSERTS",
    subtitle: "Finish with something sweet",
    backgroundImage:
      "https://images.unsplash.com/photo-1505253210343-d4fd4e7845f9?auto=format&fit=crop&q=80&w=2070",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        description: "Mascarpone / Espresso / Ladyfingers",
        price: 18,
      },
      {
        id: "choco-cake",
        name: "Molten Chocolate Cake",
        description: "Chocolate / Lava center / Vanilla ice cream",
        price: 22,
      },
      {
        id: "cheesecake",
        name: "New York Cheesecake",
        description: "Cream cheese / Graham crust / Berries",
        price: 20,
      },
    ],
  },
  {
    with_img: true,
    id: "beverages",
    name: "BEVERAGES",
    subtitle: "Stay refreshed",
    backgroundImage:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=2070",
    items: [
      {
        id: "iced-tea",
        name: "Iced Tea",
        description: "Black tea / Lemon / Mint",
        price: 8,
      },
      {
        id: "sparkling-water",
        name: "Sparkling Water",
        description: "Chilled / Lemon slice",
        price: 6,
      },
      {
        id: "smoothie-bowl",
        name: "Berry Smoothie Bowl",
        description: "Mixed berries / Banana / Yogurt / Chia seeds",
        price: 14,
      },
    ],
  },
];

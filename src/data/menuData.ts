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
        description: "Chicken / Italian / Sausage / Spinach",
        price: 35,
      },
      {
        id: "chicken-tikka",
        name: "Chicken tikka masala",
        description: "Chicken / Italian / Sausage / Spinach",
        price: 28,
      },
      {
        id: "pork-sausage",
        name: "Pork sausage from the oven",
        description: "Chicken / Italian / Sausage / Spinach",
        price: 44,
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
        description: "Chicken / Italian / Sausage / Spinach",
        price: 26,
      },
      {
        id: "broccoli-salad",
        name: "Cran-Broccoli Salad",
        description: "Chicken / Italian / Sausage / Spinach",
        price: 28,
      },
    ],
  },
];

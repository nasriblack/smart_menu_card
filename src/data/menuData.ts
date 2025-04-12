export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: 'drinks',
    name: 'Signature Drinks',
    items: [
      {
        id: 'mojito',
        name: 'Classic Mojito',
        description: 'Fresh mint muddled with lime juice, premium rum, and a splash of soda water',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'soda',
        name: 'Artisanal Soda',
        description: 'House-crafted botanical soda with fresh herbs and natural citrus essence',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'lemonade',
        name: 'Provence Lemonade',
        description: 'Fresh-squeezed lemons with lavender honey and Mediterranean herbs',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=500'
      }
    ]
  },
  {
    id: 'coffee',
    name: 'Artisan Coffee',
    items: [
      {
        id: 'espresso',
        name: 'Single Origin Espresso',
        description: 'Carefully selected beans roasted to perfection for a rich and complex flavor',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'latte',
        name: 'Vanilla Bean Latte',
        description: 'Smooth espresso with steamed milk and Madagascar vanilla',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'cappuccino',
        name: 'Artisan Cappuccino',
        description: 'Perfect balance of espresso, silky steamed milk, and velvety foam',
        price: 6.49,
        image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Decadent Desserts',
    items: [
      {
        id: 'tiramisu',
        name: 'Classic Tiramisu',
        description: 'Layers of coffee-soaked ladyfingers and mascarpone cream dusted with cocoa',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=500'
      },
      {
        id: 'cheesecake',
        name: 'Golden Cheesecake',
        description: 'Creamy New York style cheesecake with a golden berry compote',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=500'
      }
    ]
  }
];
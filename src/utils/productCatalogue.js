// Central source of truth for all categories, brands, and product types
export const PRODUCT_CATALOGUE = {
    categories: {
        "phones-tablets": "Phones & Tablets",
        "electronics": "Electronics",
    },
    brands: {
        "iphone": { label: "iPhone", category: "phones-tablets" },
        "samsung": { label: "Samsung", category: "phones-tablets" },
        "tablets": { label: "Tablets", category: "phones-tablets" },
        "accessories": { label: "Accessories", category: "phones-tablets" },
        "dahua": { label: "Dahua", category: "electronics" },
        "hikvision": { label: "Hikvision", category: "electronics" },
        "solar": { label: "Solar Cameras", category: "electronics" },
    },
    productTypes: {
        // iPhone types
        "iPhone": "iPhone",
        // Samsung types
        "Samsung": "Samsung",
        // Tablets
        "iPad": "iPad",
        "Samsung Tab": "Samsung Tab",
        "Android Tablet": "Android Tablet",
        // Accessories
        "Charger": "Charger",
        "Power Bank": "Power Bank",
        "Phone Cords": "Phone Cords",
        "Earphones": "Earphones",
        "Smartwatch": "Smartwatch",
        "Bluetooth Speaker": "Bluetooth Speaker",
        "MicroSD Card": "MicroSD Card",
        "Hair Clipper": "Hair Clipper",
        // Electronics - Dahua
        "CCTV Camera": "CCTV Camera",
        "DVR": "DVR",
        "NVR": "NVR",
        "PTZ Camera": "PTZ Camera",
        "IP Camera": "IP Camera",
        // Solar
        "4G Solar Camera": "4G Solar Camera",
        "Solar PTZ Camera": "Solar PTZ Camera",
        "Solar Bullet Camera": "Solar Bullet Camera",
    },
};
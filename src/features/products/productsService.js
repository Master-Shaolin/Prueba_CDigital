import axios from 'axios';
import { categoryFilters } from '../../data/categoryFilters';

const API_URL = 'https://fakestoreapi.com/products';

// Get products by categories
const getProductsByCategory = async() => {
    const pArray = categoryFilters.map(async category => {
        const response = await fetch(`${API_URL}/category/${category.toLowerCase()}`);
        return response.json();
    });
    const data = await Promise.all(pArray);
    var finalData = [];
    data.forEach((item) => {
        finalData = finalData.concat(item);
    });
    return finalData;
}

// Get all products
const getProducts = async() => {
    const response = await axios.get(API_URL);
    return response.data;
}

const productsService = {
    getProductsByCategory,
    getProducts
}

export default productsService;
import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        image: null,
        name: "",
        price: "",
        discount: "",
        bgcolor: "",
        panelcolor: "",
        textcolor: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/products/create`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Product created successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Product</h2>
                <form onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                        <input
                            name="image"
                            type="file"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            name="name"
                            type="text"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            name="price"
                            type="text"
                            placeholder="Product Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            name="discount"
                            type="text"
                            placeholder="Discount Price"
                            value={formData.discount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                        <select
                            name="bgcolor"
                            value={formData.bgcolor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>
                                Select Background Color
                            </option>
                            <option value="#F4DDD2">Brown</option>
                            <option value="#F3F8FB">Blue</option>
                            <option value="#DED0BF">Khakhi-Brown</option>
                            <option value="#F4E0E1">Pink</option>
                            <option value="#DCE9DC">Green</option>
                            <option value="#FAEACD">Yellow</option>
                            <option value="#ECE7F1">Lavender</option>
                            <option value="#F7E5DD">Orange</option>
                            <option value="#D6E8E8">Teal</option>
                            <option value="#E7E4D7">Olive Green</option>
                            <option value="#E3DEF2">Deep Purple</option>
                            <option value="#F8E3DD">Rust Orange</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Panel Color</label>
                        <select
                            name="panelcolor"
                            value={formData.panelcolor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>
                                Select Panel Color
                            </option>
                            <option value="#DEBEAE">Brown</option>
                            <option value="#D3E4EE">Blue</option>
                            <option value="#C5B095">Khakhi-Brown</option>
                            <option value="#E3C4C6">Pink</option>
                            <option value="#A3C6A5">Green</option>
                            <option value="#F1D693">Yellow</option>
                            <option value="#CDC2D9">Lavender</option>
                            <option value="#E3B8A3">Orange</option>
                            <option value="#A1C6C6">Teal</option>
                            <option value="#E7E4D7">Olive Green</option>
                            <option value="#B4A5D6">Deep Purple</option>
                            <option value="#E2A290">Rust Orange</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                        <select
                            name="textcolor"
                            value={formData.textcolor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="" disabled>
                                Select Text Color
                            </option>
                            <option value="#774F3D">Brown</option>
                            <option value="#48606E">Blue</option>
                            <option value="#5F4A30">Khakhi-Brown</option>
                            <option value="#816264">Pink</option>
                            <option value="#2E4631">Green</option>
                            <option value="#8B6F28">Yellow</option>
                            <option value="#5A4E72">Lavender</option>
                            <option value="#A04B3E">Orange</option>
                            <option value="#355B5C">Teal</option>
                            <option value="#4A4D32">Olive Green</option>
                            <option value="#3F3068">Deep Purple</option>
                            <option value="#8A3B2E">Rust Orange</option>
                        </select>
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        type="submit"
                    >
                        Create New Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;

import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function MainPage() {
    // state for the date, source currency, target currency, and amount
    const [date, setDate] = useState('');
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState('');
    const [currencyNames, setCurrencyNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Format date to YYYY-MM-DD
    const formatDate = (dateString) => {
        if (!dateString) return new Date().toISOString().split('T')[0];
        return dateString;
    };

    // Handle submit method
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!sourceCurrency || !targetCurrency || !amount) {
            setError('Please fill all required fields');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const formattedDate = formatDate(date);
            const response = await axios.get('http://localhost:5000/getConversion', {
                params: {
                    date: formattedDate,
                    sourceCurrency,
                    targetCurrency,
                    amount: parseFloat(amount)
                }
            });
            
            setConversionResult(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to convert currency. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Swap currencies
    const handleSwapCurrencies = () => {
        const temp = sourceCurrency;
        setSourceCurrency(targetCurrency);
        setTargetCurrency(temp);
    };

    // Get all currencies from the API
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/getAllCurrencies'
                );
                setCurrencyNames(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load currencies');
            }
        };
        getCurrencyNames();
    }, []);

    // Set default date to today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 italic mb-4'>
                        MoniFlip
                    </h1>
                    <p className='text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed'>
                        Moniflip is your smart, lightning-fast currency converter designed to make global money conversions effortless. 
                        With real-time exchange rates and instant results, you can flip between currencies in seconds – whether you're traveling, 
                        shopping online, or managing international business.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                                    Date
                                </label>
                                <input 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)} 
                                    type="date" 
                                    id="date" 
                                    name="date" 
                                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-3" 
                                    required 
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                                    Amount
                                </label>
                                <input 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} 
                                    type="number" 
                                    id="amount" 
                                    name="amount" 
                                    className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-3" 
                                    placeholder="Enter amount..." 
                                    required 
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="sourceCurrency" className="block text-sm font-medium text-gray-300 mb-2">
                                        From Currency
                                    </label>
                                    <select 
                                        value={sourceCurrency}
                                        onChange={(e) => setSourceCurrency(e.target.value)} 
                                        className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-3" 
                                        name="sourceCurrency" 
                                        id="sourceCurrency" 
                                        required
                                    >
                                        <option value="">Select source currency</option>
                                        {currencyNames.map((currency) => (
                                            <option key={currency} value={currency}>{currency}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* <div className="flex items-end">
                                    <button 
                                        type="button"
                                        onClick={handleSwapCurrencies}
                                        className="w-full md:w-auto bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 rounded-lg p-3 flex items-center justify-center transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </button>
                                </div> */}
                                
                                <div>
                                    <label htmlFor="targetCurrency" className="block text-sm font-medium text-gray-300 mb-2">
                                        To Currency
                                    </label>
                                    <select 
                                        value={targetCurrency}
                                        onChange={(e) => setTargetCurrency(e.target.value)} 
                                        className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-3" 
                                        name="targetCurrency" 
                                        id="targetCurrency" 
                                        required
                                    >
                                        <option value="">Select target currency</option>
                                        {currencyNames.map((currency) => (
                                            <option key={currency} value={currency}>{currency}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium rounded-lg px-5 py-3 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Converting...
                                    </>
                                ) : (
                                    'Convert Currency'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                
                {conversionResult && (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl p-6 md:p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Conversion Result</h2>
                        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {amount} {sourceCurrency} = {conversionResult} {targetCurrency}
                        </div>
                        <p className="text-gray-400 mt-4">Exchange rate for {date || 'today'}</p>
                    </div>
                )}
                
                <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Moni Flip. All rights reserved.
                        </p>
                        <div className="mt-3 md:mt-0">
                            <p className="text-xs text-gray-600">
                                Created by ANJU.
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}
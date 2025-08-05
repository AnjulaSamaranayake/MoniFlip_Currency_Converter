import React, {useEffect, useState} from 'react'
import axios from 'axios';
export default function MainPage() {

    // state for the date, source currency, target currency, and amount
    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [amount, setAmount] = useState(0);
    const [conversionResult, setConversionResult] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);

    //handle submit method
    const handleSubmit = (e) => {
        e.preventDefault();
        
        try{
            const response = axios.post('http://localhost:5000/getConversion', {
                params: {
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amount
                },
            });

            // set the rest here
            setConversionResult(response.data);

            console.log(sourceCurrency, targetCurrency);
        }catch (err){
            console.error(err);
        }
    }



    //Get all currencies from the API
useEffect(() => {
    const getCurrencyNames = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5000/getAllCurrencies'
            );
            setCurrencyNames(response.data);
        }catch (err){
            console.error(err);
        }
    };
    getCurrencyNames();
} ,[]);

  return (
    <div>
        <h1 className='lg:mx-32 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 italic'>Moni Flip</h1>
        <p className='lg:mx-32 opacity-60 py-6 mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start'>Moniflip is your smart, lightning-fast currency converter designed to make global money conversions effortless. With real-time exchange rates and instant results, you can flip between currencies in seconds – whether you’re traveling, shopping online, or managing international business. Our sleek and intuitive interface ensures you get accurate conversions without the hassle, helping you make confident financial decisions anytime, anywhere. Experience the simplicity of global currency conversion, only with Monoflip, powered by <b>AstroCode</b>.</p>

        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                        <div className='mb-6'>
                            <div>
                                <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input onChange={(e) => setDate(e.target.value)} type="Date" id="date" name='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div>
                                <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
                                <select onChange={(e) => setSourceCurrency(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='sourceCurrency' id='sourceCurrency' >
                                    <option value="">Select your source currency</option>
                                    {Object.keys(currencyNames).map((currency) => (
                                        <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                                <select onChange={(e) => setTargetCurrency(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='targetCurrency' id='targetCurrency' >
                                    <option value="">Select your target currency</option>
                                    {Object.keys(currencyNames).map((currency) => (
                                        <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                                    ))}
                                </select>
                            </div>

                             <div>
                                <label htmlFor={amount} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
                                <input onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name='amount' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Amount in source currency .....' required />
                            </div>
                        </div>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Get the Conversion
                        </span>
                        </button>
                </form>
            </section>
        </div>
        <section className='mt-5 lg:mx-96 text-transparent  text-2xl italic font-semibold text-gray-900 dark:text-white'> {amount} {currencyNames[sourceCurrency]} is equal to {" "} <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'> {conversionResult} </span> in {currencyNames[targetCurrency]} {" "} </section>

    </div>
  )
}

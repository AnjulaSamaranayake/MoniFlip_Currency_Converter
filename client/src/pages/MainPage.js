import React from 'react'

export default function MainPage() {
  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-blue-500'>MoniFlip</h1>
        <p className='lg:mx-32 opacity-40 py-6'>Moniflip is your smart, lightning-fast currency converter designed to make global money conversions effortless. With real-time exchange rates and instant results, you can flip between currencies in seconds – whether you’re traveling, shopping online, or managing international business. Our sleek and intuitive interface ensures you get accurate conversions without the hassle, helping you make confident financial decisions anytime, anywhere. Experience the simplicity of global currency conversion, only with Monoflip, powered by <b>AstroCode</b>.</p>

        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form>
                        <div className='mb-6'>
                            <div>
                                <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input type="Date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <div>
                                <label for="sourceCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
                                <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='' id='' >
                                    <option value="">Select your source currency</option>
                                </select>
                            </div>

                            <div>
                                <label for="targetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                                <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name='' id='' >
                                    <option value="">Select your target currency</option>
                                </select>
                            </div>

                             <div>
                                <label for="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
                                <input type="text" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Amount in source currency .....' required />
                            </div>
                        </div>
                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Get the Conversion
                        </span>
                        </button>
                </form>
            </section>
        </div>
    </div>
  )
}

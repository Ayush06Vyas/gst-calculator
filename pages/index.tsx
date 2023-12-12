import { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {}

export default function Home() {
  const [gstType, setGstType] = useState<"exclusive" | "inclusive">(
    "exclusive"
  );
  const [amount, setAmount] = useState<string>("");
  const [gstPercentage, setGstPercentage] = useState<number>(5);
  const [totalGst, setTotalGst] = useState<number>(0);
  const [postGstAmount, setPostGstAmount] = useState<number>(0);

  useEffect(() => {
    calculateGst();
  }, []);

  const calculateGst = () => {
    const amountValue: number = parseFloat(amount);

    if (!isNaN(amountValue)) {
      if (gstType === "exclusive") {
        const calculatedGst: number = (amountValue * gstPercentage) / 100;
        setTotalGst(calculatedGst);
        setPostGstAmount(amountValue + calculatedGst);
      } else if (gstType === "inclusive") {
        const calculatedGst: number =
          (amountValue * gstPercentage) / (100 + gstPercentage);
        setTotalGst(calculatedGst);
        setPostGstAmount(amountValue - calculatedGst);
      }
    }
  };

  return (
    <main
      className={`flex flex-col min-h-screen bg-gray-950 justify-between md:p-12 p-6`}
    >
      <div className="flex flex-col md:flex-row md:w-full md:justify-between">
        <div className="header-container self-start mb-12 border-solid border-white border-4 p-4">
          <h2 className="leading-none">Ayush's GST Calculator App</h2>
        </div>
        <div className="flex rounded-lg shadow-2xl bg-gray-900 md:p-10 p-2 divide-x">
          <div className="flex flex-col max-w-sm p-4">
            <div>
              <h1 className="text-2xl font-bold">
                Free Simple GST Calculator: Calculate Your GST Amount Online for Free
              </h1>

              <h5 className="my-4">
                Use my online GST calculator to instantly compute pre-GST and
                post-GST values with specific GST rates.
              </h5>
            </div>
            <div className="flex flex-row my-2">
              <div className="flex radio-group-1 mr-6 items-center">
                <input
                  type="radio"
                  id="gstExclusive"
                  name="gstType"
                  className="form-checkbox rounded text-blue-500 mr-2"
                  checked={gstType === "exclusive"}
                  onChange={() => setGstType("exclusive")}
                />
                <label htmlFor="gstExclusive">GST Exclusive</label>
              </div>
              <div className="flex radio-group-2 items-center">
                <input
                  type="radio"
                  id="gstInclusive"
                  name="gstType"
                  className="form-checkbox rounded text-blue-500 mr-2"
                  checked={gstType === "inclusive"}
                  onChange={() => setGstType("inclusive")}
                />
                <label htmlFor="gstInclusive">GST Inclusive</label>
              </div>
            </div>
            <div className="my-2">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                name="amount"
                className="form-input w-full px-4 py-3 rounded text-black"
                placeholder="Please enter your amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label htmlFor="gst-percent">GST Percentage:</label>
              <select
                name="gst-percent"
                id="gstPercentage"
                className="px-4 py-3 rounded w-full text-black"
                value={gstPercentage.toString()}
                onChange={(e) => setGstPercentage(parseInt(e.target.value, 10))}
              >
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
            <button
              className="bg-emerald-900 p-4 rounded my-3"
              onClick={calculateGst}
            >
              Calculate
            </button>
            <div className="flex flex-row mt-16 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded my-2 justify-between text-lg antialiased  font-bold divide-x">
              <div className="flex flex-col">
                <div className="my-1 text-sm">Total GST:</div>
                <div className="my-1">
                  <h2 className="text-lg font-bold">
                    ₹{" "}
                    {totalGst.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col px-4">
                <div className="my-1 text-sm">Post-GST Amount:</div>
                <div className="my-1">
                  <h2 className="text-lg font-bold">
                    ₹{" "}
                    {postGstAmount.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </h2>
                </div>
              </div>
            </div>
            <div className="footer-container text-center text-blue mt-6">
              <a
                target="_blank"
                href="https://ayushvyas.com"
                className="seld-end text-sky-400"
              >
                ayushvyas.com
              </a>
            </div>
          </div>
        </div>
        <div className="mb-12 invisible md:visible mt-6 md:mt-0 md:self-start border-solid border-white shadow-3xl min-w-[244px] text-center border-4 md:p-4">
          <a
            target="_blank"
            href="https://ayushvyas.com"
            className="seld-end text-sky-400 underline"
          >
            ayushvyas.com
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-4 md:mt-10 md:w-6/12 self-center rounded-lg shadow-2xl bg-gray-900 md:p-10 p-8">
      <p className="mt-6 font-bold text-inherit">What is GST?</p>
      <p className="mt-6 text-gray-300">The Goods and Services Tax (GST) is a comprehensive indirect tax levied on the supply of goods and services in India. It has replaced a complex system of multiple indirect taxes and aims to simplify the taxation structure, promote transparency, and eliminate the cascading effect of taxes.</p><br />

      <p className="mt-6 font-bold text-inherit">Key Components of Indian GST:</p><br />

      <p className="mt-6 font-bold text-inherit">Central Goods and Services Tax (CGST):</p><br />
      <p className="mt-6 text-gray-300">CGST is the portion of GST that is collected by the Central Government on intra-state supplies of goods and services.</p><br />
      <p className="mt-6 text-gray-300">The revenue collected under CGST goes to the central government.</p><br />

      <p className="mt-6 font-bold text-inherit">State Goods and Services Tax (SGST):</p><br />
      <p className="mt-6 text-gray-300"> SGST is the state-level counterpart of CGST and is collected by the State Government.</p><br />
      <p className="mt-6 text-gray-300"> It is applicable on intra-state transactions, and the revenue generated is retained by the respective state.</p><br />

      <p className="mt-6 font-bold text-inherit">Integrated Goods and Services Tax (IGST):</p><br />
      <p className="mt-6 text-gray-300"> IGST is applicable on inter-state supplies of goods and services.</p><br />
      <p className="mt-6 text-gray-300">It is collected by the Central Government, and the revenue is apportioned between the center and the destination state.</p><br />

      <p className="mt-6 font-bold text-inherit">GST Calculation Formula:</p><br />
      <p className="mt-6 text-gray-300">The formula for calculating GST is straightforward and involves applying the GST rate on the taxable value of the goods or services. The formula is as follows:</p><br />

      <p className="mt-6 text-gray-300">GST Amount = (Taxable Value × GST Rate) / 100</p><br />​

      <p className="mt-6 text-gray-300">The total amount payable by the consumer is the sum of the taxable value and the GST amount.</p><br />

      <p className="mt-6 font-bold text-inherit">Frequently Asked Questions (FAQs):</p><br />

      <p className="mt-6 font-bold text-inherit">Q1: What is the GST Rate in India?</p><br />
      <p className="mt-6 text-gray-300">A1: The GST rates in India vary depending on the type of goods or services. There are four main GST rates: 5%, 12%, 18%, and 28%.</p><br />

      <p className="mt-6 font-bold text-inherit">Q2: How is IGST Calculated for Inter-State Transactions?</p><br />
      <p className="mt-6  text-gray-300">A2: For inter-state transactions, the IGST rate is applied to the taxable value. The total IGST collected is then divided between the Central and State Governments.</p><br />

      <p className="mt-6 font-bold text-inherit">Q3: Can I Claim Input Tax Credit (ITC) under GST?</p><br />
      <p className="mt-6 text-gray-300">A3: Yes, businesses can claim Input Tax Credit for the GST paid on purchases. This helps in avoiding the cascading effect of taxes.</p><br />

      <p className="mt-6 font-bold text-inherit">Q4: What is the Composition Scheme under GST?</p><br />
      <p className="mt-6 text-gray-300">A4: The Composition Scheme is designed for small businesses with a turnover below a specified limit. They can pay a fixed percentage of their turnover as GST and are subject to lower compliance requirements.</p><br />

      <p className="mt-6 font-bold text-inherit">Q5: Is GST Applicable on Exports?</p><br />
      <p className="mt-6 text-gray-300">A5: No, exports are considered as zero-rated supplies under GST. This means that the goods or services exported are not subject to GST, but businesses can claim a refund for the input taxes paid.</p><br />

      <p className="mt-6 font-bold text-inherit">Q6: How Often Should GST Returns be Filed?</p><br />
      <p className="mt-6 text-gray-300">A6: GST returns need to be filed monthly, quarterly, or annually, depending on the type of business and its turnover. Regular compliance is essential to avoid penalties.</p><br />

      <p className="mt-6 font-bold text-inherit">Conclusion:</p><br />
      <p className="mt-6 text-gray-300">Understanding the nuances of GST in India is crucial for businesses and consumers alike. The shift to GST has streamlined the taxation system, and staying informed about the various components and calculation methods ensures smooth compliance with the tax regulations. Businesses should regularly update themselves on any changes in the GST structure to adapt to the evolving regulatory landscape.</p><br />
      </div>
    </main>
  );
}

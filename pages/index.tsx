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
      className={`flex min-h-screen bg-gray-950 flex-col items-center justify-between md:p-12 p-6`}
    >
      <div className="flex columns-2 rounded-lg shadow-2xl bg-gray-900 md:p-10 p-2 divide-x">
        <div className="flex flex-col max-w-sm p-4">
          <div>
            <h1 className="text-2xl font-bold">
              Calculate Your GST Amount Online Free: Online GST Free Simple
              Calculator
            </h1>

            <h5 className="my-4">
              Use our online GST calculator to instantly compute pre-GST and
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
                <h2 className="text-2xl font-bold">
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
                <h2 className="text-2xl font-bold">
                  ₹{" "}
                  {postGstAmount.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

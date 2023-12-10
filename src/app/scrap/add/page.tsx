'use client'

import { ChangeEvent, useState } from "react";
import { addScrap, performPostcodeLookup } from "../actions";

function debounce(callback: () => void, delay: number) {
    let timeoutId: any;
  
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    }
  }

const AddScrap = () => {
    const [isValidPostcode, setValidPostcode] = useState(false);
    const [coordinate, setCoordinate] = useState('');

    const locationDidChange = async(evt: ChangeEvent<HTMLInputElement>) => {
        const text = evt.target.value;
        // TODO: (Debounce)

        // debounce(() => { console.log("ff")}, 200);

        const validator = /[0-z]{2,4}\s*[0-z]{3}/

        if (!validator.test(text)) {
            setValidPostcode(false);
            return
        }

        setValidPostcode(true);

        const { latitude, longitude }  = await performPostcodeLookup(text);

        setCoordinate(`${latitude},${longitude}`);
    }

    return (
        <form action={addScrap}>
            <h2 className="bold">Enter the details of your scrap</h2>
            <div className="mt-2">
                <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea 
                        className="block border w-96 p-1"
                        style={{
                            color: "black"
                        }}
                        name="description" 
                    />
                </div>
                <div className="mb-4">
                    <label className="form-label">Postcode</label>
                    <input 
                        className="block border w-96 p-1" 
                        name="location"
                        style={{
                            backgroundColor: isValidPostcode ? "white" : "red",
                            color: "black"
                        }}
                        placeholder="Postcode"
                        onChange={locationDidChange}
                    />
                </div>
                <input type="hidden" name="coordinate" value={coordinate} />
                <button className="border p-2 rounded-md bg-slate-600 text-white">Add Scrap</button>
            </div>
        </form>
    )
}

export default AddScrap;

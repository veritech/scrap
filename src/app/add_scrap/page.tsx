'use client'

import { ChangeEvent, useState } from "react";
import { addScrap, lookupPostcode } from "./actions";

function debounce(callback: () => void, delay: number) {
    let timeoutId: any;
  
    return function() {
        console.log("sdsd")
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

        const validator = /[0-z]{2,4}\s*[0-z]{3}/

        if (!validator.test(text)) {
            setValidPostcode(false);
            return
        }

        setValidPostcode(true);

        lookupPostcode(text);

        setCoordinate('-0,-0');
    }

    return (
        <form action={addScrap}>
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <label className="form-label">Description</label>
                    <textarea 
                        className="form-control"
                        style={{
                            color: "black"
                        }}
                        name="description" 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input 
                        className="form-control" 
                        name="location"
                        style={{
                            backgroundColor: isValidPostcode ? "white" : "red",
                            color: "black"
                        }}
                        placeholder="Location of the scrap"
                        onChange={locationDidChange}
                    />
                </div>
                <input type="hidden" name="coordinate" value={coordinate} />
                <button className="btn btn-primary">Add Scrap</button>
            </div>
        </form>
    )
}

export default AddScrap;

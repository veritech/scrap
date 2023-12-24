'use client'
import { useEffect, useState } from "react"
import { ScrapDto, getScrap } from "./scrap/actions"
import Link from "next/link";
import { DateTime } from "luxon";

export default function Home() {
  const [scrapItems, setScrapItems] = useState<ScrapDto[]>([]);
  
  useEffect(() => {
    getScrap().then(r => setScrapItems(r))
  }, [setScrapItems]);

  return (
    <main>
      <div className="grid grid-cols-1">
      {scrapItems.map((scrapItem, idx) => {
        return (
          <Link key={idx} href={`/scrap/${scrapItem.id}`}>
              <div className="rounded-md border border-slate-200 mb-2 w-full">
              <p className="p-4">{scrapItem.description}</p>
              <p className="p-4">{scrapItem.address}</p>
              <p className="p-4">Created {DateTime.fromISO(scrapItem.createdTime || "").toRelative()}</p>
              </div>
            </Link>
          )
        })}
        {scrapItems.length === 0 &&
        <div className="text-center">
          <p>No scrap is available</p>
        </div>
        }
      </div>
    </main>
  )
}

"use client";

import { useState } from "react";

export function Gallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <section className="gallery-section"><div className="container"><div className="gallery-grid">{images.map((image,index)=><button className="gallery-item" key={image} type="button" onClick={()=>setSelected(index)} aria-label={`Open dumpster photo ${index+1}`}><img src={image} alt={`Titan dumpster rental project ${index+1}`} loading="lazy" /></button>)}</div></div>{selected!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Dumpster photo viewer" onClick={()=>setSelected(null)}><button type="button" className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Close">×</button><button type="button" className="lightbox-prev" onClick={e=>{e.stopPropagation();setSelected((selected+images.length-1)%images.length)}} aria-label="Previous photo">‹</button><img src={images[selected]} alt={`Titan dumpster rental project ${selected+1}`} onClick={e=>e.stopPropagation()} /><button type="button" className="lightbox-next" onClick={e=>{e.stopPropagation();setSelected((selected+1)%images.length)}} aria-label="Next photo">›</button></div>}</section>;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { assets } from "../data";

type Fields = { name: string; email: string; phone: string; contactMethod: string; size: string; project: string; address: string; consent: boolean; website: string };
const initial: Fields = { name:"", email:"", phone:"", contactMethod:"", size:"", project:"", address:"", consent:false, website:"" };

export function QuoteForm() {
  const [fields,setFields] = useState<Fields>(initial);
  const [step,setStep] = useState(1);
  const [status,setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [error,setError] = useState("");
  const update = (name:keyof Fields,value:string|boolean)=>setFields(current=>({...current,[name]:value}));
  const canAdvance = fields.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) && fields.phone.trim() && fields.contactMethod;
  const canSubmit = fields.size && fields.project.trim() && fields.address.trim() && fields.consent;
  async function submit(event:React.FormEvent) {
    event.preventDefault();
    if(step===1){if(canAdvance)setStep(2);return;}
    if(!canSubmit)return;
    setStatus("sending");setError("");
    try{const response=await fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(fields)});if(!response.ok)throw new Error("We couldn't send your request. Please try again or call us.");setStatus("success");setFields(initial);}
    catch(e){setStatus("error");setError(e instanceof Error?e.message:"Please try again or call us.");}
  }
  return <section className="quote-section"><div className="quote-form-side"><div className="quote-panel">{status==="success"?<div className="quote-success" role="status"><h1>Thank you!</h1><p>Your quote request has been sent. We&apos;ll be in touch soon.</p><Link className="button" href="/">Back to Home</Link></div>:<form onSubmit={submit} noValidate><div className="quote-progress"><div className="quote-progress-track"><span style={{width:step===1?"50%":"100%"}} /></div><span>Step {step}/2</span></div>{step===1?<div className="quote-step"><h1>Let&apos;s start with some details about you</h1><label>What&apos;s your name?<input autoComplete="name" name="name" placeholder="John Smith" value={fields.name} onChange={e=>update("name",e.target.value)} required /></label><label>What is your email?<input autoComplete="email" type="email" name="email" placeholder="email@example.com" value={fields.email} onChange={e=>update("email",e.target.value)} required /></label><label>What is your phone number?<input autoComplete="tel" type="tel" name="phone" placeholder="480-123-1234" value={fields.phone} onChange={e=>update("phone",e.target.value)} required /></label><fieldset><legend>What is the best way to reach you?</legend><div className="choice-group">{["SMS","Call","Email"].map(method=><label className={fields.contactMethod===method?"selected":""} key={method}><input type="radio" name="contactMethod" value={method} checked={fields.contactMethod===method} onChange={()=>update("contactMethod",method)} />{method}</label>)}</div></fieldset><div className="quote-actions"><Link className="button outline" href="/">Cancel</Link><button className="button" type="button" disabled={!canAdvance} onClick={()=>setStep(2)}>Next</button></div></div>:<div className="quote-step"><h1>How &amp; When Can We Help?</h1><fieldset><legend>What size dumpster will you need?</legend><div className="choice-group sizes">{["8 Yards","14 Yards","20 Yards","24 Yards","30 Yards","40 Yards","Multiple Dumpsters"].map(size=><label className={fields.size===size?"selected":""} key={size}><input type="radio" name="size" value={size} checked={fields.size===size} onChange={()=>update("size",size)} />{size}</label>)}</div></fieldset><label>About the project<input name="project" placeholder="Project details and desired rental dates" value={fields.project} onChange={e=>update("project",e.target.value)} required /></label><label>Where would you want us to drop off the dumpster?<input name="address" autoComplete="street-address" placeholder="Delivery address" value={fields.address} onChange={e=>update("address",e.target.value)} required /></label><label className="consent"><input type="checkbox" checked={fields.consent} onChange={e=>update("consent",e.target.checked)} /> I agree to be contacted about my quote request and have read the <Link href="/privacy-policy">Privacy Policy</Link>.</label><input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={fields.website} onChange={e=>update("website",e.target.value)} /><div className="quote-actions"><button className="button outline" type="button" onClick={()=>setStep(1)}>Back</button><button className="button" type="submit" disabled={!canSubmit||status==="sending"}>{status==="sending"?"Sending…":"Get Quote"}</button></div>{status==="error"&&<p role="alert" className="quote-error">{error}</p>}</div>}</form>}</div></div><div className="quote-image" style={{backgroundImage:`url('${assets.pricing}')`}} role="img" aria-label="Dumpster at a residential cleanup project" /></section>;
}

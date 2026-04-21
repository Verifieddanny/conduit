import React from 'react'

function GettingStartedSection() {
  return (
    <section id="getting-started" className="mb-24 scroll-mt-28">
      <h3 className="text-2xl font-bold text-white mb-8">What is Conduit?</h3>
      <div className="text-[#00f2ad] text-[10px] font-bold uppercase tracking-widest mb-2">Getting Started</div>
          <p className="text-gray-300">
            Conduit is a source-agnostic webhook relay that receives events from external platforms, verifies their signatures, 
            stores delivery state, and reliably pushes signed payloads to your endpoint.
          </p>
          <p className="mt-4 text-gray-400">
            The product separates ingestion from delivery, so your downstream API can recover on its own timeline 
            while Conduit keeps retrying with backoff, jitter, and full inspection logs.
          </p>
    </section>
  )
}

export default GettingStartedSection
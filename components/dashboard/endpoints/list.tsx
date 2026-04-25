"use client";
import EndpointCard from "./endpoint-card";

export default function RegisteredEndpointsList() {
    const filters = ["All sources", "Active only", "Retrying callbacks", "Created this week"];

    const endpoints = [
        {
            id: "endpoint-1",
            url: "https://api.rivetpay.dev/hooks/billing",
            source: "Stripe",
            status: "active" as const,
            events: ["payment.failed", "invoice.paid", "charge.dispute.created"],
            delivered: "1,284",
            failed: "38",
            dead: "4"
        },
        {
            id: "endpoint-2",
            url: "https://ci.internal.dev/github/events",
            source: "GitHub",
            status: "active" as const,
            events: ["push", "pull_request", "repository.deleted"],
            delivered: "6,402",
            failed: "12",
            dead: "1"
        },
        {
            id: "endpoint-3",
            url: "https://chatops.service.dev/slack/webhooks/relay",
            source: "Slack",
            status: "degraded" as const,
            events: ["message.channels", "message.groups", "app.uninstalled", "url_verification"],
            delivered: "904",
            failed: "84",
            dead: "16"
        }
    ];

    return (
        <div className="bg-[#111113] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Registered endpoints</h3>
                    <button className="text-[10px] font-bold text-[#00f2ad] uppercase hover:underline">
                        View endpoint analytics
                    </button>
                </div>

                <p className="text-xs text-gray-500 mb-8 max-w-xl">
                    Each endpoint maps an inbound Conduit URL to a real destination. Toggle status optimistically, inspect deliveries, or edit subscribed events.
                </p>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {filters.map((f, i) => (
                        <button
                            key={f}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${i === 0
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Container */}
            <div className="p-8 space-y-4 bg-[#0d0d0f]/50">
                {endpoints.map((ep) => (
                    <EndpointCard key={ep.url} {...ep} />
                ))}
            </div>
        </div>
    );
}
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  adminSections,
  alerts,
  capacity,
  checkpoints,
  guides,
  overview,
  packages,
  partners,
  questFunnel,
  questMetrics,
  rangeMultipliers,
  rewards,
  travellerInsights,
  type DateRange,
} from "@/data/admin";

type AdminPage = "overview" | "passes" | "quests" | "checkpoints" | "rewards" | "guides" | "partners" | "travellers" | "capacity";

const pageTitles: Record<AdminPage, string> = {
  overview: "Overview",
  passes: "Pass Performance",
  quests: "Quest Monitoring",
  checkpoints: "Checkpoint Performance",
  rewards: "Reward Performance",
  guides: "Guide Quality",
  partners: "Partner Performance",
  travellers: "Traveller Insights",
  capacity: "Operational Capacity",
};

export function AdminDashboard({ page = "overview" }: { page?: AdminPage }) {
  const [range, setRange] = useState<DateRange>("Today");
  const [selected, setSelected] = useState("Quest+");
  const factor = rangeMultipliers[range];
  const scaledRevenue = useMemo(() => `RM${Math.round(12840 * factor).toLocaleString()}`, [factor]);

  return (
    <div className="min-h-screen bg-[#f7f0e8] text-[#171311]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <AdminSidebar active={page} />
        <div className="min-w-0">
          <AdminHeader page={pageTitles[page]} range={range} setRange={setRange} />
          <main className="mx-auto max-w-[1500px] space-y-6 px-5 py-6 md:px-8">
            {page === "overview" && <Overview range={range} scaledRevenue={scaledRevenue} selected={selected} setSelected={setSelected} />}
            {page === "passes" && <PassesDetail selected={selected} setSelected={setSelected} />}
            {page === "quests" && <QuestsDetail />}
            {page === "checkpoints" && <CheckpointsDetail />}
            {page === "rewards" && <RewardsDetail />}
            {page === "guides" && <GuidesDetail />}
            {page === "partners" && <PartnersDetail />}
            {page === "travellers" && <TravellersDetail />}
            {page === "capacity" && <CapacityDetail />}
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminSidebar({ active }: { active: AdminPage }) {
  const groups = [...new Set(adminSections.map((section) => section.group))];
  return (
    <aside className="border-r border-[#171311]/10 bg-[#fffdfb] p-5 lg:sticky lg:top-0 lg:h-screen">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f26d4f] font-black text-white">DI</span>
        <div>
          <p className="font-display text-2xl font-semibold leading-none">D&apos;IPOH</p>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d95336]">Admin</p>
        </div>
      </Link>
      <nav className="mt-8 space-y-7">
        {groups.map((group) => (
          <div key={group}>
            <p className="px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#8a7a70]">{group}</p>
            <div className="mt-2 space-y-1">
              {adminSections.filter((section) => section.group === group).map((section) => {
                const id = section.href === "/admin" ? "overview" : section.href.split("/").pop() as AdminPage;
                return (
                  <Link key={section.href} href={section.href} className={`block rounded-2xl px-3 py-3 text-sm font-bold transition ${active === id ? "bg-[#fff0f3] text-[#d95336]" : "text-[#5c5049] hover:bg-[#f7f0e8]"}`}>
                    {section.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function AdminHeader({ page, range, setRange }: { page: string; range: DateRange; setRange: (range: DateRange) => void }) {
  const ranges: DateRange[] = ["Today", "7 Days", "30 Days", "Custom"];
  return (
    <header className="border-b border-[#171311]/10 bg-[#f7f0e8]/90 px-5 py-5 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d95336]">D&apos;Ipoh Admin</p>
          <h1 className="mt-1 font-display text-4xl font-semibold">{page}</h1>
          <p className="mt-1 text-sm text-[#5c5049]">Last updated: {overview.updatedAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {ranges.map((item) => (
            <button key={item} onClick={() => setRange(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${range === item ? "bg-[#171311] text-white" : "bg-white text-[#5c5049] ring-1 ring-[#171311]/10"}`}>
              {item}
            </button>
          ))}
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#5c5049] ring-1 ring-[#171311]/10">Admin A</span>
        </div>
      </div>
    </header>
  );
}

function Overview({ range, scaledRevenue, selected, setSelected }: { range: DateRange; scaledRevenue: string; selected: string; setSelected: (name: string) => void }) {
  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overview.kpis.map((kpi, index) => <MetricCard key={kpi.label} {...kpi} value={index === 0 ? scaledRevenue : kpi.value} />)}
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <PackagePerformance selected={selected} setSelected={setSelected} />
        <RevenuePanel range={range} />
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <QuestFunnel />
        <SectionCard title="Top Checkpoints" action="QR health">
          <DataTable headers={["Checkpoint", "Scans", "Completion", "Status"]} rows={checkpoints.map((item) => [item.name, item.scans, `${item.completion}%`, <StatusBadge key={item.name} status={item.status} />])} />
        </SectionCard>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <PartnerPerformance compact />
        <RewardPerformance compact />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <CapacityPanel />
        <AlertPanel />
      </section>
    </>
  );
}

function MetricCard({ label, value, change, context }: { label: string; value: string; change: string; context: string }) {
  return (
    <article className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#171311]/10">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8a7a70]">{label}</p>
        <span className="rounded-full bg-[#e9fbd5] px-3 py-1 text-xs font-black text-[#4c8f62]">{change}</span>
      </div>
      <p className="mt-5 font-display text-5xl font-semibold leading-none">{value}</p>
      <p className="mt-3 text-sm font-bold text-[#d95336]">{context}</p>
    </article>
  );
}

function PackagePerformance({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  const active = packages.find((item) => item.name === selected) ?? packages[1];
  return (
    <SectionCard title="Package Performance" action="Validates pricing">
      <div className="space-y-3">
        {packages.map((item) => (
          <button key={item.name} onClick={() => setSelected(item.name)} className={`grid w-full grid-cols-[1fr_auto] gap-4 rounded-2xl p-4 text-left transition ${selected === item.name ? "bg-[#fff0f3] ring-1 ring-[#f26d4f]/30" : "bg-[#f7f0e8]"}`}>
            <div>
              <div className="flex items-center gap-2">
                <b>{item.name}</b>
                {item.name === "Quest+" && <span className="rounded-full bg-[#d9ff36] px-2 py-1 text-[10px] font-black">MOST POPULAR</span>}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#f26d4f]" style={{ width: `${item.share}%` }} />
              </div>
            </div>
            <div className="text-right text-sm">
              <b>{item.share}%</b>
              <p className="text-[#5c5049]">RM{item.revenue.toLocaleString()}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-[1.25rem] bg-[#171311] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ffb39f]">{active.name === "Quest+" ? "Most Popular" : "Selected Package"}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold">{active.name}</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-bold">
          <span>{active.share}% bookings</span>
          <span>RM{active.revenue.toLocaleString()} revenue</span>
          <span>{active.completion}% completion</span>
          <span>{active.rating} avg rating</span>
        </div>
      </div>
    </SectionCard>
  );
}

function RevenuePanel({ range }: { range: DateRange }) {
  const max = Math.max(...overview.revenueTrend);
  return (
    <SectionCard title="Revenue" action={range}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold text-[#5c5049]">Total Revenue</p>
          <p className="mt-2 font-display text-5xl font-semibold">RM38,420</p>
          <div className="mt-5 space-y-3">
            {overview.revenueBreakdown.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm font-bold"><span>{item.label}</span><span>RM{item.value.toLocaleString()}</span></div>
                <div className="mt-2 h-2 rounded-full bg-[#f7f0e8]"><div className="h-full rounded-full bg-[#f26d4f]" style={{ width: `${(item.value / 28400) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-72 items-end gap-3 rounded-[1.25rem] bg-[#f7f0e8] p-5">
          {overview.revenueTrend.map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-2xl bg-[#171311]" style={{ height: `${(value / max) * 210}px` }} title={`RM${value.toLocaleString()}`} />
              <span className="text-xs font-bold text-[#8a7a70]">D{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function QuestFunnel() {
  return (
    <SectionCard title="Quest Funnel" action="Drop-off monitor">
      <div className="space-y-3">
        {questFunnel.map((item) => (
          <div key={item.label} className="rounded-2xl bg-[#f7f0e8] p-4">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>{item.label}</span>
              <span>{item.value} · {item.rate}%</span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-white">
              <div className="h-full rounded-full bg-[#f26d4f]" style={{ width: `${item.rate}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {questMetrics.map((item) => <MiniMetric key={item.label} label={item.label} value={item.value} />)}
      </div>
    </SectionCard>
  );
}

function PartnerPerformance({ compact }: { compact?: boolean }) {
  return (
    <SectionCard title="Partner Performance" action="Merchant value">
      <DataTable headers={compact ? ["Partner", "Scans", "Redemptions", "Conv."] : ["Partner", "Category", "Visits", "QR Scans", "Redemptions", "Conversion", "Status"]} rows={partners.map((item) => compact ? [item.name, item.scans, item.redemptions, `${item.conversion}%`] : [item.name, item.category, item.visits, item.scans, item.redemptions, `${item.conversion}%`, <StatusBadge key={item.name} status={item.status} />])} />
    </SectionCard>
  );
}

function RewardPerformance({ compact }: { compact?: boolean }) {
  return (
    <SectionCard title="Reward Performance" action="Inventory">
      {!compact && <div className="mb-4 grid gap-3 md:grid-cols-3">{rewards.summary.map((item) => <MiniMetric key={item.label} label={item.label} value={item.value} />)}</div>}
      <DataTable headers={compact ? ["Reward", "Redeemed", "Stock", "Status"] : ["Reward", "Cost", "Redeemed", "Stock", "Popularity", "Status"]} rows={rewards.items.map((item) => compact ? [item.name, item.redeemed, item.stock, <StatusBadge key={item.name} status={item.status} />] : [item.name, `${item.cost} pts`, item.redeemed, item.stock, `${item.popularity}%`, <StatusBadge key={item.name} status={item.status} />])} />
    </SectionCard>
  );
}

function CapacityPanel() {
  return (
    <SectionCard title="Operational Capacity" action="Scale readiness">
      <div className="grid gap-4 md:grid-cols-2">
        {capacity.map((item) => <CapacityBar key={item.label} {...item} />)}
      </div>
    </SectionCard>
  );
}

function AlertPanel() {
  const [open, setOpen] = useState(alerts[0].title);
  return (
    <SectionCard title="Needs Attention" action={`${alerts.length} issues`}>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <button key={alert.title} onClick={() => setOpen(alert.title)} className="w-full rounded-2xl bg-[#fff0f3] p-4 text-left ring-1 ring-[#f26d4f]/15">
            <div className="flex items-center justify-between gap-4">
              <b>{alert.title}</b>
              <StatusBadge status={alert.severity} />
            </div>
            {open === alert.title && <p className="mt-2 text-sm leading-6 text-[#5c5049]">{alert.detail}</p>}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

function PassesDetail({ selected, setSelected }: { selected: string; setSelected: (name: string) => void }) {
  return (
    <>
      <PackagePerformance selected={selected} setSelected={setSelected} />
      <SectionCard title="Package Detail Metrics" action="Demand vs effort">
        <DataTable headers={["Package", "Sold", "Revenue", "Share", "Quest Completion", "Avg Rating", "Avg Points", "Reward Redemption", "Ops Effort"]} rows={packages.map((item) => [item.name, item.sold, `RM${item.revenue.toLocaleString()}`, `${item.share}%`, `${item.completion}%`, item.rating, item.points, `${item.redemption}%`, item.effort])} />
      </SectionCard>
    </>
  );
}

function QuestsDetail() {
  return <><QuestFunnel /><SectionCard title="Quest List" action="Customer journey events"><DataTable headers={["Quest", "Started", "Completed", "Completion", "Average Time", "Average Points"]} rows={[["Ipoh Heritage Quest", 104, 75, "72%", "5h 18m", 420], ["Coffee Trail", 76, 61, "80%", "3h 05m", 310], ["Nature Discovery", 54, 37, "69%", "4h 40m", 360], ["Local Rewards", 48, 29, "60%", "2h 15m", 240]]} /></SectionCard></>;
}

function CheckpointsDetail() {
  return <SectionCard title="Checkpoint Performance" action="Route and QR issues"><DataTable headers={["Checkpoint", "Quest", "Visits", "Scans", "Completion", "Points Issued", "Status"]} rows={checkpoints.map((item) => [item.name, item.quest, item.visits, item.scans, `${item.completion}%`, item.points, <StatusBadge key={item.name} status={item.status} />])} /></SectionCard>;
}

function RewardsDetail() {
  return <RewardPerformance />;
}

function GuidesDetail() {
  return <SectionCard title="Guide Performance" action="Volume plus quality"><DataTable headers={["Guide", "Groups", "Travellers", "Completion", "Rating", "Complaints", "Quality Score", "Status"]} rows={guides.map((item) => [item.name, item.groups, item.travellers, `${item.completion}%`, item.rating, item.complaints, item.quality, <StatusBadge key={item.name} status={item.status} />])} /></SectionCard>;
}

function PartnersDetail() {
  return <><PartnerPerformance /><SectionCard title="Platform Coffee Preview" action="Partner proof"><div className="grid gap-4 md:grid-cols-5">{["1,284 Views", "5,821 Impressions", "328 Visits", "282 QR Scans", "91 Redemptions"].map((item) => { const [value, ...label] = item.split(" "); return <MiniMetric key={item} value={value} label={label.join(" ")} />; })}</div></SectionCard></>;
}

function TravellersDetail() {
  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <InsightCard title="Top Interests" data={travellerInsights.interests} />
      <InsightCard title="Traveller Type" data={travellerInsights.types} />
      <InsightCard title="Budget Preference" data={travellerInsights.budgets} />
      <SectionCard title="Popular Combinations" action="Itinerary design">
        <div className="flex flex-wrap gap-3">{travellerInsights.combinations.map((item) => <span key={item} className="rounded-full bg-[#fff0f3] px-4 py-3 text-sm font-bold text-[#d95336]">{item}</span>)}</div>
      </SectionCard>
    </section>
  );
}

function CapacityDetail() {
  return <><CapacityPanel /><AlertPanel /></>;
}

function InsightCard({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  return (
    <SectionCard title={title} action="Preference data">
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm font-bold"><span>{item.label}</span><span>{item.value}%</span></div>
            <div className="mt-2 h-3 rounded-full bg-[#f7f0e8]"><div className="h-full rounded-full bg-[#f26d4f]" style={{ width: `${item.value}%` }} /></div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function CapacityBar({ label, value, total, status }: { label: string; value: number; total: number; status: string }) {
  const percentage = Math.round((value / total) * 100);
  return (
    <div className="rounded-2xl bg-[#f7f0e8] p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <b>{label}</b>
          <p className="text-sm text-[#5c5049]">{value} / {total} · {percentage}%</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-4 h-3 rounded-full bg-white"><div className="h-full rounded-full bg-[#f26d4f]" style={{ width: `${percentage}%` }} /></div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl bg-[#f7f0e8] p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a7a70]">{label}</p><p className="mt-2 font-display text-3xl font-semibold">{value}</p></div>;
}

function SectionCard({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#171311]/10">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        {action && <span className="rounded-full bg-[#f7f0e8] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#8a7a70]">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#171311]/10 text-xs font-black uppercase tracking-[0.14em] text-[#8a7a70]">
            {headers.map((header) => <th key={header} className="px-3 py-3">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-[#171311]/6 last:border-0">
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-3 py-4 font-semibold text-[#332a26]">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = status === "Problem" || status === "Coach" || status === "Quality" || status === "Low Stock" ? "bg-[#fff0f3] text-[#d95336]" : status === "Watch" || status === "Moderate" || status === "Capacity" || status === "Inventory" ? "bg-[#fff7d6] text-[#9a6b00]" : "bg-[#e9fbd5] text-[#4c8f62]";
  return <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-black ${color}`}>{status}</span>;
}

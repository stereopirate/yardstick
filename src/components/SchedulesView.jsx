import React, { useState, useMemo } from 'react';
import { ACTIVITY_COLORS } from '../constants.js';

const FREQ_OPTIONS = [
    { label: 'Every 3 days',   days: 3   },
    { label: 'Weekly',         days: 7   },
    { label: 'Every 2 weeks',  days: 14  },
    { label: 'Monthly',        days: 30  },
    { label: 'Every 6 weeks',  days: 42  },
    { label: 'Every 3 months', days: 90  },
    { label: 'Yearly',         days: 365 },
];

const TYPE_META = {
    mowing:      { label: 'Mowing',      icon: '🚜' },
    fertilizer:  { label: 'Fertilizer',  icon: '🌾' },
    watering:    { label: 'Watering',     icon: '💧' },
    seeding:     { label: 'Seeding',      icon: '🌱' },
    aeration:    { label: 'Aeration',     icon: '🔧' },
    trimming:    { label: 'Trimming',     icon: '&#9986;' },
    treatment:   { label: 'Treatment',    icon: '🧪' },
    maintenance: { label: 'Maintenance',  icon: '🛠️' },
};

const nextDueDate = (sched) => {
    const ref = new Date(sched.lastDone || sched.createdAt);
    ref.setHours(0, 0, 0, 0);
    const d = new Date(ref);
    d.setDate(d.getDate() + sched.frequencyDays);
    return d;
};

const daysUntil = (sched) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((nextDueDate(sched) - today) / (1000 * 60 * 60 * 24));
};

const BLANK_FORM = { name: '', type: 'mowing', frequencyDays: 7 };

// Sub-components defined at module level so they get stable references
const DueChip = ({ sched }) => {
    const d = daysUntil(sched);
    if (d < 0)   return <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{Math.abs(d)}d overdue</span>;
    if (d === 0) return <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Due today</span>;
    return <span className="text-xs font-semibold text-gray-400">in {d}d</span>;
};

const ScheduleRow = ({ sched, onLog, onDelete }) => {
    const meta       = TYPE_META[sched.type] || { label: sched.type, icon: '📋' };
    const color      = ACTIVITY_COLORS[sched.type] || ACTIVITY_COLORS.mowing;
    const d          = daysUntil(sched);
    const freq       = FREQ_OPTIONS.find(f => f.days === sched.frequencyDays);
    const freqLabel  = freq ? freq.label : ('Every ' + sched.frequencyDays + ' days');
    const nextDue    = nextDueDate(sched);
    const nextDueStr = nextDue.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return (
        <div className={'bg-white rounded-xl shadow-sm border-l-4 ' + (d <= 0 ? 'border-red-400' : color.border) + ' p-3 flex items-center gap-3'}>
            <div className="text-xl flex-shrink-0">{meta.icon}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{sched.name}</span>
                    <DueChip sched={sched} />
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                    {freqLabel} &nbsp;&middot;&nbsp; due {nextDueStr}
                    {sched.lastDone && <span> &nbsp;&middot;&nbsp; last done {new Date(sched.lastDone).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => onLog(sched)} className="px-3 py-1.5 bg-[#367C2B] text-white rounded-lg text-xs font-bold btn-press">Log It</button>
                <button onClick={() => onDelete(sched.id)} className="text-gray-300 hover:text-red-400 text-lg font-bold leading-none btn-press" aria-label="Delete">&#215;</button>
            </div>
        </div>
    );
};

const Section = ({ title, items, onLog, onDelete, emptyMsg }) => {
    if (items.length === 0 && !emptyMsg) return null;
    return (
        <div className="mb-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{title}</div>
            {items.length === 0
                ? <p className="text-xs text-gray-400 italic pl-1">{emptyMsg}</p>
                : <div className="space-y-2">{items.map(function(s) { return <ScheduleRow key={s.id} sched={s} onLog={onLog} onDelete={onDelete} />; })}</div>
            }
        </div>
    );
};

export default function SchedulesView({ schedules, onAdd, onDelete, onLog }) {
    const [showForm, setShowForm]     = useState(false);
    const [form, setForm]             = useState(BLANK_FORM);
    const [customDays, setCustomDays] = useState('');
    const [useCustom, setUseCustom]   = useState(false);

    const sorted = useMemo(function() {
        return [...schedules].sort(function(a, b) { return daysUntil(a) - daysUntil(b); });
    }, [schedules]);

    const overdue  = sorted.filter(function(s) { return daysUntil(s) < 0; });
    const dueToday = sorted.filter(function(s) { return daysUntil(s) === 0; });
    const upcoming = sorted.filter(function(s) { return daysUntil(s) > 0 && daysUntil(s) <= 14; });
    const later    = sorted.filter(function(s) { return daysUntil(s) > 14; });

    const handleAdd = () => {
        const days = useCustom ? parseInt(customDays, 10) : form.frequencyDays;
        if (!form.name.trim() || !days || days < 1) return;
        onAdd({ name: form.name.trim(), type: form.type, frequencyDays: days });
        setForm(BLANK_FORM);
        setCustomDays('');
        setUseCustom(false);
        setShowForm(false);
    };

    const allDue   = overdue.length + dueToday.length;
    const noUrgent = overdue.length === 0 && dueToday.length === 0 && upcoming.length === 0;

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">&#128467; My Tasks</h2>
                <button onClick={() => setShowForm(v => !v)} className="px-4 py-2 bg-[#367C2B] text-white rounded-lg text-sm font-bold btn-press">
                    {showForm ? 'Cancel' : '+ Add'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-5">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Task name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="e.g. Weekly Mow, Front Lawn Fertilizer"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#367C2B]/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Activity type</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(TYPE_META).map(([key, meta]) => (
                                    <button key={key} onClick={() => setForm(f => ({ ...f, type: key }))}
                                        className={'px-3 py-1.5 rounded-full text-xs font-semibold border transition ' + (form.type === key ? 'bg-[#367C2B] text-white border-[#367C2B]' : 'bg-gray-50 text-gray-600 border-gray-200')}>
                                        {meta.icon} {meta.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Repeat every</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {FREQ_OPTIONS.map(opt => (
                                    <button key={opt.days} onClick={() => { setUseCustom(false); setForm(f => ({ ...f, frequencyDays: opt.days })); }}
                                        className={'px-3 py-1.5 rounded-full text-xs font-semibold border transition ' + (!useCustom && form.frequencyDays === opt.days ? 'bg-[#367C2B] text-white border-[#367C2B]' : 'bg-gray-50 text-gray-600 border-gray-200')}>
                                        {opt.label}
                                    </button>
                                ))}
                                <button onClick={() => setUseCustom(true)}
                                    className={'px-3 py-1.5 rounded-full text-xs font-semibold border transition ' + (useCustom ? 'bg-[#367C2B] text-white border-[#367C2B]' : 'bg-gray-50 text-gray-600 border-gray-200')}>
                                    Custom
                                </button>
                            </div>
                            {useCustom && (
                                <div className="flex items-center gap-2">
                                    <input type="number" min="1" max="999" value={customDays} onChange={e => setCustomDays(e.target.value)} placeholder="days"
                                        className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#367C2B]/30" />
                                    <span className="text-sm text-gray-500">days</span>
                                </div>
                            )}
                        </div>
                        <button onClick={handleAdd}
                            disabled={!form.name.trim() || (useCustom && (!customDays || parseInt(customDays) < 1))}
                            className="w-full py-2.5 bg-[#367C2B] text-white rounded-xl font-bold text-sm btn-press disabled:opacity-40 disabled:cursor-not-allowed">
                            Save Schedule
                        </button>
                    </div>
                </div>
            )}

            {schedules.length === 0 && !showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-8 text-center">
                    <div className="text-4xl mb-3">&#128467;</div>
                    <div className="font-semibold text-gray-700 mb-1">No schedules yet</div>
                    <div className="text-sm text-gray-400 mb-4">Create recurring tasks to track when things are due — mowing, fertilizing, aerating, and more.</div>
                    <button onClick={() => setShowForm(true)} className="px-5 py-2 bg-[#367C2B] text-white rounded-xl text-sm font-bold btn-press">Add Your First Schedule</button>
                </div>
            )}

            {schedules.length > 0 && (
                <div>
                    <Section title="Overdue" items={overdue} onLog={onLog} onDelete={onDelete} />
                    <Section title="Due Today" items={dueToday} onLog={onLog} onDelete={onDelete} />
                    <Section title="Coming Up — Next 2 Weeks" items={upcoming} onLog={onLog} onDelete={onDelete} />
                    <Section title="Later" items={later} onLog={onLog} onDelete={onDelete} emptyMsg={noUrgent ? 'All tasks are up to date.' : null} />
                </div>
            )}
        </div>
    );
}

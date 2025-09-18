'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Filter } from 'lucide-react';

interface RaceEvent {
  date: string;
  series: string;
  event: string;
  location: string;
}

interface SeriesConfig {
  name: string;
  color: string;
  textColor: string;
}

interface SeriesSelection {
  [key: string]: boolean;
}

const RacingCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 8, 18)); // September 18, 2025
  const [selectedSeries, setSelectedSeries] = useState<SeriesSelection>({
    f1: true,
    gtwc: true,
    indycar: true,
    wec: true,
    dtm: true,
    imsa: true,
    btcc: true,
    wtcr: true
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const racingSeries: Record<string, SeriesConfig> = {
    f1: { name: 'Formula 1', color: 'bg-red-500', textColor: 'text-white' },
    gtwc: { name: 'GT World Challenge', color: 'bg-blue-500', textColor: 'text-white' },
    indycar: { name: 'IndyCar', color: 'bg-yellow-500', textColor: 'text-black' },
    wec: { name: 'WEC', color: 'bg-green-500', textColor: 'text-white' },
    dtm: { name: 'DTM', color: 'bg-purple-500', textColor: 'text-white' },
    imsa: { name: 'IMSA', color: 'bg-orange-500', textColor: 'text-white' },
    btcc: { name: 'BTCC', color: 'bg-pink-500', textColor: 'text-white' },
    wtcr: { name: 'WTCR', color: 'bg-indigo-500', textColor: 'text-white' }
  };

  // Sample racing events data
  const raceEvents: RaceEvent[] = [
    // September 2025
    { date: '2025-09-21', series: 'f1', event: 'Singapore GP', location: 'Marina Bay' },
    { date: '2025-09-28', series: 'gtwc', event: 'Endurance Cup', location: 'Indianapolis' },
    
    // October 2025
    { date: '2025-10-05', series: 'f1', event: 'Japanese GP', location: 'Suzuka' },
    { date: '2025-10-12', series: 'wec', event: '6 Hours of Fuji', location: 'Fuji Speedway' },
    { date: '2025-10-19', series: 'f1', event: 'United States GP', location: 'Austin' },
    { date: '2025-10-26', series: 'dtm', event: 'Hockenheim Finale', location: 'Hockenheim' },
    
    // November 2025
    { date: '2025-11-02', series: 'f1', event: 'Brazil GP', location: 'Interlagos' },
    { date: '2025-11-09', series: 'imsa', event: 'Petit Le Mans', location: 'Road Atlanta' },
    { date: '2025-11-16', series: 'wec', event: '8 Hours of Bahrain', location: 'Bahrain' },
    { date: '2025-11-23', series: 'f1', event: 'Las Vegas GP', location: 'Las Vegas' },
    
    // December 2025
    { date: '2025-12-07', series: 'f1', event: 'Qatar GP', location: 'Losail' },
    { date: '2025-12-14', series: 'f1', event: 'Abu Dhabi GP', location: 'Yas Marina' },
    
    // 2026 Events
    { date: '2026-03-15', series: 'f1', event: 'Bahrain GP', location: 'Sakhir' },
    { date: '2026-03-22', series: 'f1', event: 'Saudi Arabian GP', location: 'Jeddah' },
    { date: '2026-04-05', series: 'f1', event: 'Australian GP', location: 'Melbourne' },
    { date: '2026-04-12', series: 'gtwc', event: 'Sprint Cup', location: 'Brands Hatch' },
    { date: '2026-05-03', series: 'f1', event: 'Miami GP', location: 'Miami' },
    { date: '2026-05-17', series: 'f1', event: 'Emilia Romagna GP', location: 'Imola' },
    { date: '2026-05-24', series: 'f1', event: 'Monaco GP', location: 'Monaco' },
    { date: '2026-05-31', series: 'indycar', event: 'Indianapolis 500', location: 'Indianapolis' },
    { date: '2026-06-07', series: 'f1', event: 'Canadian GP', location: 'Montreal' },
    { date: '2026-06-14', series: 'wec', event: '24 Hours of Le Mans', location: 'Le Mans' }
  ];

  const getDaysInMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateStr: string): RaceEvent[] => {
    return raceEvents.filter(event => 
      event.date === dateStr && selectedSeries[event.series]
    );
  };

  const navigateMonth = (direction: number): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const toggleSeries = (seriesKey: string): void => {
    setSelectedSeries(prev => ({
      ...prev,
      [seriesKey]: !prev[seriesKey]
    }));
  };

  const renderCalendar = (): JSX.Element => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days: JSX.Element[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(year, month, day);
      const events = getEventsForDate(dateStr);
      const today = new Date(2025, 8, 18); // September 18, 2025
      const isToday = dateStr === formatDate(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 overflow-hidden ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}>
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {events.map((event, index) => (
              <div
                key={`${event.series}-${index}`}
                className={`text-xs px-1 py-0.5 rounded truncate ${racingSeries[event.series]?.color || 'bg-gray-500'} ${racingSeries[event.series]?.textColor || 'text-white'}`}
                title={`${event.event} - ${event.location}`}
              >
                {event.event}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 rounded-lg overflow-hidden shadow">
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center font-medium border-b">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto p-4 min-h-screen top-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-8 w-8" />
          Racing Series Calendar
        </h1>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Series Filter */}
        {showFilters && (
          <div className="p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-medium mb-3">Racing Series</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(racingSeries).map(([key, series]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedSeries[key]}
                    onChange={() => toggleSeries(key)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <div className={`w-4 h-4 rounded ${series.color}`}></div>
                  <span className="text-sm text-gray-700">{series.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className=" p-4 rounded-lg shadow mb-4">
          <h3 className="text-sm font-medium mb-2">Series Legend</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(racingSeries)
              .filter(([key]) => selectedSeries[key])
              .map(([key, series]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${series.color}`}></div>
                  <span className="text-sm">{series.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      {renderCalendar()}
    </div>
  );
};

export default RacingCalendar;
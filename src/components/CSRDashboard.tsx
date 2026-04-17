import React, { useState, useEffect } from 'react';
import { SlideContent, extractPPTXContent } from '../utils/extractPPTX';
import { Users, TrendingUp, Clock, Award } from 'lucide-react';

const CSRDashboard: React.FC = () => {
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await extractPPTXContent('');
        setSlides(content);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load content:', error);
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const renderChart = (chart: any) => {
    switch (chart.type) {
      case 'pie':
        return <PieChartComponent data={chart.data} title={chart.title} />;
      case 'bar':
        return <BarChartComponent data={chart.data} title={chart.title} />;
      case 'doughnut':
        return <DoughnutChartComponent data={chart.data} title={chart.title} />;
      case 'gantt':
        return <GanttChartComponent data={chart.data} title={chart.title} />;
      default:
        return <div className="text-gray-500">Chart type not supported</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center fade-in">
          <div className="loading-spinner mx-auto mb-6"></div>
          <p className="text-lg font-medium text-gray-700">Loading DMEPOS CSR Research Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-lg">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DMEPOS CSR Research Dashboard
                </h1>
                <p className="text-gray-600 font-medium">UX Research Findings & Insights</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-primary px-6 py-3">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto py-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`nav-tab whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentSlide === index
                    ? 'active bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="main-container p-8 fade-in">
          {/* Slide Title */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {slides[currentSlide]?.title}
            </h2>
            
            {/* Slide Content */}
            <div className="prose max-w-none">
              {slides[currentSlide]?.content.map((point, index) => (
                <div key={index} className="content-block slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <p className="text-gray-800 font-medium">{point}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            {(() => {
              const currentCharts = slides[currentSlide]?.charts;
              return currentCharts && currentCharts.length > 0 ? (
                <div className="mt-8 space-y-8">
                  {currentCharts.map((chart, index) => (
                    <div key={index} className="chart-container slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                      {renderChart(chart)}
                    </div>
                  ))}
                </div>
              ) : null;
            })()}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="btn btn-secondary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {currentSlide + 1} of {slides.length}
            </div>
            
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="btn btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="stat-card fade-in" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total CSRs Interviewed</p>
                <p className="stat-value">25</p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl">
                <Users className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <div className="stat-card fade-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Avg Call Time</p>
                <p className="stat-value">12.5<span className="text-lg font-normal text-gray-600"> min</span></p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <div className="stat-card fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Satisfaction Score</p>
                <p className="stat-value">3.2<span className="text-lg font-normal text-gray-600">/5</span></p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-3 rounded-xl">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <div className="stat-card fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Improvement Potential</p>
                <p className="stat-value">30<span className="text-lg font-normal text-gray-600">%</span></p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Chart Components
const PieChartComponent: React.FC<{ data: any; title: string }> = ({ data, title }) => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  const total = data.values.reduce((sum: number, val: number) => sum + val, 0);

  return (
    <div>
      <h3 className="chart-title">{title}</h3>
      <div className="flex items-center space-x-8">
        <div className="relative w-56 h-56">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.values.map((value: number, index: number) => {
              const percentage = (value / total) * 100;
              const radius = 35;
              const circumference = 2 * Math.PI * radius;
              const offset = index > 0 ? 
                data.values.slice(0, index).reduce((sum: number, val: number) => sum + (val / total) * circumference, 0) : 0;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="12"
                  strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                  strokeDashoffset={`-${offset}`}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div 
                className="w-5 h-5 rounded-full shadow-sm" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-600">
                  {data.values[index]} ({Math.round((data.values[index] / total) * 100)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BarChartComponent: React.FC<{ data: any; title: string }> = ({ data, title }) => {
  const maxValue = Math.max(...data.values);
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  return (
    <div>
      <h3 className="chart-title">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label: string, index: number) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-40 text-sm font-medium text-gray-700">{label}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-10 relative overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ 
                  width: `${(data.values[index] / maxValue) * 100}%`,
                  backgroundColor: colors[index % colors.length]
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20"></div>
              </div>
            </div>
            <div className="w-16 text-sm font-bold text-gray-900 text-right">
              {data.values[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DoughnutChartComponent: React.FC<{ data: any; title: string }> = ({ data, title }) => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];
  const total = data.values.reduce((sum: number, val: number) => sum + val, 0);

  return (
    <div>
      <h3 className="chart-title">{title}</h3>
      <div className="flex items-center space-x-8">
        <div className="relative w-56 h-56">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.values.map((value: number, index: number) => {
              const percentage = (value / total) * 100;
              const radius = 30;
              const circumference = 2 * Math.PI * radius;
              const offset = index > 0 ? 
                data.values.slice(0, index).reduce((sum: number, val: number) => sum + (val / total) * circumference, 0) : 0;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="10"
                  strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
                  strokeDashoffset={`-${offset}`}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{total}%</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div 
                className="w-5 h-5 rounded-full shadow-sm" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-600">{data.values[index]}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GanttChartComponent: React.FC<{ data: any; title: string }> = ({ data, title }) => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B'];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  return (
    <div>
      <h3 className="chart-title">{title}</h3>
      <div className="space-y-4">
        {data.phases.map((phase: string, index: number) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-40 text-sm font-medium text-gray-700">{phase}</div>
            <div className="flex-1 flex space-x-2">
              {quarters.map((quarter, qIndex) => (
                <div 
                  key={qIndex}
                  className={`h-10 rounded-lg flex-1 transition-all duration-300 ${
                    qIndex === index ? `${colors[index % colors.length]} shadow-lg transform scale-105` : 'bg-gray-100'
                  }`}
                >
                  {qIndex === index && (
                    <div className="h-full rounded-lg bg-gradient-to-r from-transparent to-white opacity-20"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="w-16 text-sm font-bold text-gray-900 text-right">
              {data.durations[index]}mo
            </div>
          </div>
        ))}
        <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-200">
          <div className="w-40"></div>
          <div className="flex-1 flex space-x-2">
            {quarters.map((quarter, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-600 flex-1 p-2 bg-gray-50 rounded">
                {quarter} 2025
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRDashboard;

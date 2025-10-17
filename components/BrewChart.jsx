'use client';

import { motion } from 'framer-motion';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Scatter, Line, ReferenceArea } from 'recharts';
import { fadeIn } from '../utils/motion';

// Brewing control chart inspired plot
// x-axis: Extraction Yield (%) ~ 14 - 26
// y-axis: TDS (%) ~ 0.85 - 1.75
// Diagonal iso-strength lines roughly representing brew ratios 1:12 .. 1:26

const RATIO_LINES = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

// Generate simple diagonal guides that visually resemble the template
function buildRatioGuideLines() {
  // We approximate diagonal guides by connecting two points within the chart domain.
  // These are visual guides only; not exact brewing math.
  // For each ratio r, we create a line that slants upward across the plot.
  const lines = [];
  for (const r of RATIO_LINES) {
    lines.push({
      ratio: `1:${r}`,
      points: [
        { extraction: 14, tds: 14 / r },
        { extraction: 26, tds: 26 / r },
      ],
    });
  }
  return lines;
}

const ratioGuideLines = buildRatioGuideLines();

const DEFAULT_TARGET = {
  // Gray target box similar to SCA classic: ~18-22% extraction, ~1.15-1.35% TDS
  x1: 18,
  x2: 22,
  y1: 1.15,
  y2: 1.35,
};

const BrewChart = ({ data = [], target = DEFAULT_TARGET, selectedBrewId = null }) => {
  const scatterData = (data || []).map((d) => ({
    extraction: Number(d.EY ?? d.extraction ?? d.extraction_yield ?? d.ey ?? d.x) || 0,
    tds: Number(d.TDS ?? d.tds ?? d.y) || 0,
    notes: d.notes || 'Not identified',
    id: d.id,
  }));

  const hasData = scatterData.length > 0;

  return (
    <motion.div variants={fadeIn('up', 'spring', 0.2, 0.75)} className="w-full h-full min-h-[200px] sm:min-h-[300px]">
      <h3 className="text-white text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Brew Chart (TDS vs Extraction)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          margin={{ top: 4, right: 8, bottom: 4, left: 8 }}
          syncId="brewChart"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#9CA3AF55" />
          <XAxis
            type="number"
            dataKey="extraction"
            domain={[14, 26]}
            allowDataOverflow={false}
            tick={{ fill: '#FFFFFF', fontSize: 8 }}
            stroke="#FFFFFF"
            tickLine={{ stroke: '#FFFFFF' }}
            label={{ value: 'Extraction (%)', position: 'insideBottom', offset: -2, fill: '#FFFFFF', style: { fontSize: 8 } }}
          />
          <YAxis
            type="number"
            dataKey="tds"
            domain={[0.85, 1.75]}
            allowDataOverflow={false}
            tick={{ fill: '#FFFFFF', fontSize: 8 }}
            stroke="#FFFFFF"
            tickLine={{ stroke: '#FFFFFF' }}
            label={{ value: 'TDS (%)', angle: -90, position: 'insideLeft', fill: '#FFFFFF', style: { fontSize: 8 } }}
            tickFormatter={(value) => `${(value).toFixed(1)}%`}
          />

          {/* Target box */}
          <ReferenceArea x1={target.x1} x2={target.x2} y1={target.y1} y2={target.y2} fill="#9CA3AF" fillOpacity={0.5} />

          {/* Ratio guide lines */}
          {ratioGuideLines.map((l, idx) => (
            <Line
              key={l.ratio}
              data={l.points}
              type="linear"
              dataKey="tds"
              xAxisId={0}
              yAxisId={0}
              stroke={idx % 2 === 0 ? '#6B7280' : '#A1A1AA'}
              dot={false}
              strokeWidth={1}
              isAnimationActive={false}
              hide={true}
            />
          ))}

          {/* Brew points */}
          {hasData && <Scatter data={scatterData} fill="#60A5FA" />}

          <Tooltip
            cursor={{ stroke: '#FFFFFF33', strokeWidth: 1 }}
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const data = payload[0].payload;
              const extraction = data.extraction || 0;
              const tds = data.tds || 0;
              const ratio = extraction && tds ? (extraction / tds).toFixed(0) : 'N/A';
              const notes = data.notes || 'No notes';
              return (
                <div style={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  color: 'white',
                  borderRadius: 8,
                  fontSize: 12,
                  padding: 12,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}>
                  <div style={{ marginBottom: 4 }}>TDS: {tds.toFixed(1)}%</div>
                  <div style={{ marginBottom: 4 }}>Extraction: {extraction.toFixed(1)}%</div>
                  <div style={{ marginBottom: 4 }}>Brew Ratio: 1:{ratio}</div>
                  <div>Notes: {notes}</div>
                </div>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      {!hasData && (
        <div className="text-gray-300 text-xs mt-2 text-center">
          {selectedBrewId ? `No brew points for brew ID: ${selectedBrewId}. Add rows in \`brew_chart\` with \`TDS\`, \`EY\`, and \`id\`.` : 'No brew points yet. Add rows in `brew_chart` with `TDS`, `EY`, and `id`.'}
        </div>
      )}
    </motion.div>
  );
};

export default BrewChart;



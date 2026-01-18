'use client';
import { useState } from 'react';

export function ResultsScreen({ results }) {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const sections = ['Стратегия', 'Лидген', 'Продажи'];
  
  let totalGreen = 0;
  let totalRed = 0;
  sections.forEach(s => {
    totalGreen += results.sections[s].totalGreen;
    totalRed += results.sections[s].totalRed;
  });
  const totalPercent = Math.round((totalGreen / (totalGreen + totalRed)) * 100);

  const getColor = (pct) => pct >= 70 ? '#22c55e' : pct >= 40 ? '#eab308' : '#ef4444';

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ padding: '20px 24px', background: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', letterSpacing: '1px', marginBottom: '4px' }}>
          РЕЗУЛЬТАТЫ АУДИТА
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#333', margin: 0 }}>
          Маркетинг-Аудит · Method Dobrusin
        </h1>
      </header>

      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: getColor(totalPercent), marginBottom: '8px' }}>
            {totalPercent}%
          </div>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Общий результат диагностики</p>
          <p style={{ color: '#888', fontSize: '13px', marginTop: '8px' }}>
            ✅ {totalGreen} в зелёной зоне • ❌ {totalRed} требуют внимания
          </p>
        </div>

        {sections.map(sectionName => {
          const section = results.sections[sectionName];
          const sectionPercent = Math.round((section.totalGreen / section.blocks.length) * 100);
          
          return (
            <div key={sectionName} style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: 0 }}>{sectionName}</h3>
                <span style={{ fontSize: '14px', fontWeight: 600, color: getColor(sectionPercent) }}>{sectionPercent}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {section.blocks.map(block => (
                  <div key={block.id}>
                    <div
                      onClick={() => setSelectedBlock(selectedBlock?.id === block.id ? null : block)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: block.status === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: block.status === 'success' ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', flexShrink: 0 }}>
                        {block.status === 'success' ? '✓' : '✗'}
                      </div>
                      <span style={{ flex: 1, fontSize: '14px', color: '#333' }}>{block.title}</span>
                    </div>
                    {selectedBlock?.id === block.id && (
                      <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '0 0 8px 8px', marginTop: '-4px', fontSize: '14px', color: '#555', lineHeight: 1.6 }}>
                        {block.status === 'success' ? block.yes_rec : block.no_rec}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

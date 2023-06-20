import React from 'react';
import { REPORT_MAP } from '../../constants/Report';
import { ReportType } from '../../types/report';

const TagColor: { [K in ReportType]: string } = {
  SLANG: 'bg-red-500',
  POLITICAL: 'bg-lime-900',
  AD: 'bg-sky-900',
  INSULT: 'bg-orange-600',
  LUSTFUL: 'bg-fuchsia-700',
  OUT_OF_TOPIC: 'bg-emerald-700',
  OUT_OF_FORMAT: 'bg-emerald-700',
  ETC: 'bg-zinc-500',
};

function ReportTag({ category }: { category: ReportType }) {
  return (
    <div
      className={`rounded-lg ${TagColor[category]} text-sm text-white px-2 py-1`}
    >
      {REPORT_MAP[category]}
    </div>
  );
}

export default ReportTag;

import React from 'react';
import type { StatusHistoryEntry } from '@/shared/types';

interface StatusHistoryProps {
  history: StatusHistoryEntry[];
  statuses: { id: string; name: string }[];
}

const getStatusName = (statusId: string | null, statuses: { id: string; name: string }[]) => {
  if (!statusId) return 'Створено';
  return statuses.find((s) => s.id === statusId)?.name || statusId;
};

export const StatusHistory: React.FC<StatusHistoryProps> = ({ history, statuses }) => {
  if (history.length === 0) {
    return <p className="text-gray-500 text-sm">Історія статусів порожня</p>;
  }

  return (
    <div className="space-y-2">
      {history.map((entry) => (
        <div key={entry.id} className="flex items-center gap-3 text-sm">
          <span className="text-gray-500">{new Date(entry.updatedAt).toLocaleString('uk-UA')}</span>
          <span className="text-gray-600">{entry.updatedBy}</span>
          <span className="text-gray-400">→</span>
          <span className="font-medium text-gray-800">{getStatusName(entry.newStatusId, statuses)}</span>
          {entry.oldStatusId && (
            <>
              <span className="text-gray-400">(з {getStatusName(entry.oldStatusId, statuses)})</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
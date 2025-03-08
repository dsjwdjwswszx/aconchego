
import React from "react";

interface HistoryEvent {
  data: string;
  status: string;
  local: string;
}

interface TrackingHistoryProps {
  historico: HistoryEvent[];
}

export const TrackingHistory = ({ historico }: TrackingHistoryProps) => {
  return (
    <div>
      <h3 className="font-medium mt-6 mb-3">Histórico</h3>
      <ol className="space-y-4">
        {historico.map((evento, index) => (
          <li key={index} className="relative pl-6 pb-4 border-l border-primary/30 last:border-0">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary"></div>
            <p className="font-medium">{evento.status}</p>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{evento.local}</span>
              <span>{evento.data}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

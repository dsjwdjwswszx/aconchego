
import React from "react";
import { CheckCircle2, Truck, Package } from "lucide-react";

interface TrackingStatusProps {
  status: string;
}

export const TrackingStatus = ({ status }: TrackingStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "entregue":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "em_transito":
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "entregue":
        return "Entregue";
      case "em_transito":
        return "A caminho";
      default:
        return "Postado";
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
      {getStatusIcon(status)}
      <span className="font-medium text-sm">{getStatusText(status)}</span>
    </div>
  );
};


import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrackingStatus } from "./TrackingStatus";
import { TrackingDetails } from "./TrackingDetails";
import { TrackingHistory } from "./TrackingHistory";

interface TrackingResultProps {
  trackingNumber: string;
  trackingResult: {
    status: string;
    produto: string;
    destinatario: string;
    origem: string;
    destino: string;
    historico: Array<{
      data: string;
      status: string;
      local: string;
    }>;
    imagem: string;
  };
}

export const TrackingResult = ({ trackingNumber, trackingResult }: TrackingResultProps) => {
  // Fallback image if the provided image is not valid or not available
  const fallbackImage = "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070";
  
  // Check if image exists or use fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
    e.currentTarget.alt = "Imagem de doação genérica";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl">
            Informações da Doação
          </CardTitle>
          <CardDescription>
            Código: {trackingNumber}
          </CardDescription>
        </div>
        <TrackingStatus status={trackingResult.status} />
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <TrackingDetails 
              produto={trackingResult.produto}
              destinatario={trackingResult.destinatario}
              origem={trackingResult.origem}
              destino={trackingResult.destino}
            />
            
            <TrackingHistory historico={trackingResult.historico} />
          </div>
          
          <div className="bg-accent/30 rounded-lg p-4 flex items-center justify-center">
            <div className="aspect-video w-full max-w-sm overflow-hidden rounded-md">
              <img 
                src={trackingResult.imagem} 
                alt={`Imagem de ${trackingResult.produto}`}
                className="w-full h-full object-cover transition-all hover:scale-105"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

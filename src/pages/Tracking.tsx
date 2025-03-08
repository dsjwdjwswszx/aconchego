
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { TrackingForm } from "@/components/tracking/TrackingForm";
import { TrackingResult } from "@/components/tracking/TrackingResult";
import { TrackingHelp } from "@/components/tracking/TrackingHelp";
import { handleTrackingSearch } from "@/utils/trackingUtils";

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const location = useLocation();

  // Extract tracking code from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code) {
      setTrackingNumber(code);
      // Auto-search if code is provided
      setTimeout(() => {
        handleTracking(code);
      }, 500);
    }
  }, [location.search]);

  const handleTracking = (code: string = trackingNumber) => {
    setLoading(true);
    setError("");
    
    handleTrackingSearch(code)
      .then((result) => {
        setTrackingResult(result);
        toast({
          title: "Rastreamento encontrado",
          description: `Informações de rastreio para ${code} carregadas com sucesso.`,
        });
      })
      .catch((errorMsg) => {
        setTrackingResult(null);
        setError(errorMsg);
        toast({
          variant: "destructive",
          title: "Erro no rastreamento",
          description: "Código não encontrado em nossa base de dados.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Rastreamento de Doações</h1>
      
      <TrackingForm
        trackingNumber={trackingNumber}
        setTrackingNumber={setTrackingNumber}
        loading={loading}
        error={error}
        handleTracking={() => handleTracking()}
      />
      
      {trackingResult && (
        <TrackingResult
          trackingNumber={trackingNumber}
          trackingResult={trackingResult}
        />
      )}
      
      <TrackingHelp />
    </div>
  );
};

export default Tracking;

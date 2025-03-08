
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TrackingFormProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  loading: boolean;
  error: string;
  handleTracking: () => void;
}

export const TrackingForm = ({
  trackingNumber,
  setTrackingNumber,
  loading,
  error,
  handleTracking
}: TrackingFormProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Rastrear Doação</CardTitle>
        <CardDescription>
          Digite o código de rastreio fornecido no momento da solicitação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Ex: DOA1234BR" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-grow"
          />
          <Button 
            onClick={handleTracking}
            disabled={loading || !trackingNumber}
            className="whitespace-nowrap"
          >
            {loading ? "Buscando..." : "Rastrear Doação"}
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};


import React from "react";

interface TrackingDetailsProps {
  produto: string;
  destinatario: string;
  origem: string;
  destino: string;
}

export const TrackingDetails = ({
  produto,
  destinatario,
  origem,
  destino
}: TrackingDetailsProps) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Detalhes da Doação</h3>
      <dl className="space-y-2">
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Produto:</dt>
          <dd>{produto || "Não especificado"}</dd>
        </div>
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Destinatário:</dt>
          <dd>{destinatario}</dd>
        </div>
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Origem:</dt>
          <dd>{origem}</dd>
        </div>
        <div className="flex justify-between border-b pb-2">
          <dt className="text-muted-foreground">Destino:</dt>
          <dd>{destino}</dd>
        </div>
      </dl>
    </div>
  );
};

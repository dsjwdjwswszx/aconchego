
import React from "react";

export const TrackingHelp = () => {
  return (
    <div className="mt-8 p-4 bg-muted rounded-lg">
      <h3 className="font-medium mb-2">Rastreamento de Pedidos</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Você pode rastrear todos os seus pedidos usando o código fornecido no momento da compra, que começa com "DOA" e termina com "BR".
      </p>
      <p className="text-sm text-muted-foreground">
        Por exemplo: DOA1234BR
      </p>
    </div>
  );
};

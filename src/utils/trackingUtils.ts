
// Store for dynamic tracking data
export const trackingData: Record<string, any> = {};

export const handleTrackingSearch = (code: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if it's a real-time generated tracking number starting with DOA and ending with BR
      if (code.match(/^DOA\d{4}BR$/)) {
        // Extract session storage data if available
        let storedTrackingInfo = null;
        try {
          storedTrackingInfo = JSON.parse(sessionStorage.getItem(`tracking_${code}`) || "null");
        } catch (err) {
          console.error("Error parsing stored tracking data:", err);
        }
        
        // If we have stored tracking info, use it. Otherwise, generate default data
        if (storedTrackingInfo) {
          // Use tracking info with the correct product image
          resolve(storedTrackingInfo);
        } else {
          // Generate tracking result for real orders with default data
          const orderNumber = code.substring(3, 7); // Extract the 4 digits
          
          // Generate tracking result for real orders
          const result = {
            status: "em_transito",
            historico: [
              { data: new Date().toLocaleDateString("pt-BR"), status: "Pedido recebido", local: "Central" },
              { data: new Date().toLocaleDateString("pt-BR"), status: "Em processamento", local: "Central" }
            ],
            destinatario: "Cliente Padrão",
            origem: "Lar Aconchegante",
            destino: "Endereço não especificado",
            produto: "Produto não especificado",
            imagem: "/sede-terceira/img-1.png" // Fallback image if no data found
          };
          
          resolve(result);
        }
      } else {
        // Attempt to find in pre-defined example data
        const result = trackingData[code];
        
        if (result) {
          resolve(result);
        } else {
          reject("Código de rastreio não encontrado. Verifique e tente novamente.");
        }
      }
    }, 1500);
  });
};

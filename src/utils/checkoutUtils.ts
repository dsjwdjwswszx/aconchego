
import { Attendant } from "@/components/checkout/AttendantSelector";

export const ATTENDANTS: Attendant[] = [
  { id: "1", name: "Atendente 1", phone: "5551995704650" },
  { id: "2", name: "Atendente 2", phone: "5551996200024" },
  { id: "3", name: "Atendente 3", phone: "555121831180" },
];

export const generateWhatsAppMessage = (
  orderNumber: string,
  formData: {
    name: string;
    phone: string;
    address: string;
    additionalInfo: string;
  },
  user: any,
  items: any[],
  deliveryMethod: 'retirada' | 'entrega' | null,
  total: number
) => {
  const itemsList = items.map(item => 
    `${item.product.name} (${item.quantity}x)`
  ).join('\n- ');
  
  let message = 
    `Olá! Acabei de fazer um pedido (#${orderNumber}) no Lar Aconchegante.\n\n` +
    `*Dados do pedido:*\n` +
    `Nome: ${formData.name}\n` +
    `Telefone: ${formData.phone}\n` +
    `Método: ${deliveryMethod === 'retirada' ? 'Retirada' : 'Entrega'}\n`;
    
  if (deliveryMethod === 'entrega') {
    message += `Endereço: ${formData.address}\n`;
  }
  
  message += 
    `Sede: ${user?.sede || "Não informada"}\n\n` +
    `*Itens:*\n- ${itemsList}\n\n`;
    
  if (deliveryMethod === 'entrega') {
    message += `*Total da Entrega:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
  }
  
  message +=
    `*Código de Rastreio:* DOA${orderNumber}BR\n\n` +
    `${formData.additionalInfo ? `*Informações adicionais:* ${formData.additionalInfo}\n\n` : ''}` +
    `Aguardo o contato para finalizar meu pedido. Obrigado!`;
  
  return encodeURIComponent(message);
};

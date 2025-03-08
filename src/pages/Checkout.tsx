
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { ATTENDANTS, generateWhatsAppMessage } from "@/utils/checkoutUtils";
import { Attendant } from "@/components/checkout/AttendantSelector";

const Checkout = () => {
  const navigate = useNavigate();
  const { state, calculateTotal, clearCart } = useCart();
  const { user, isAuthenticated, sendToDiscordWebhook } = useAuth();
  const { toast } = useToast();
  const total = calculateTotal();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    additionalInfo: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedAttendant, setSelectedAttendant] = useState<Attendant | null>(null);
  const [showSelectAttendant, setShowSelectAttendant] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state.deliveryMethod === null) {
      navigate("/cart");
      toast({
        title: "Método de recebimento não selecionado",
        description: "Por favor, selecione entre entrega ou retirada antes de prosseguir.",
        variant: "destructive"
      });
    }
  }, [state.deliveryMethod, navigate, toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const redirectToWhatsApp = (orderNumber: string, attendant: Attendant) => {
    const message = generateWhatsAppMessage(
      orderNumber,
      formData,
      user,
      state.items,
      state.deliveryMethod,
      total
    );
    
    window.open(`https://wa.me/${attendant.phone}?text=${message}`, '_blank');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = state.deliveryMethod === 'entrega' 
      ? { name: formData.name, phone: formData.phone, address: formData.address }
      : { name: formData.name, phone: formData.phone };
    
    if (Object.values(requiredFields).some(value => !value)) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newOrderNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      setOrderNumber(newOrderNumber);
      
      const trackingCode = `DOA${newOrderNumber}BR`;
      
      const productsList = state.items.map(item => `${item.product.name} (${item.quantity}x)`).join(', ');
      
      const mainProductImage = state.items.length > 0 ? state.items[0].product.image : "/sede-terceira/img-1.png";
      
      const orderData = {
        cliente: formData.name,
        telefone: formData.phone,
        método_recebimento: state.deliveryMethod === 'retirada' ? 'Retirada' : 'Entrega',
        endereco: state.deliveryMethod === 'entrega' ? formData.address : 'Retirada na loja',
        sede: user?.sede || "Não informada",
        produtos: productsList,
        total_entrega: state.deliveryMethod === 'entrega' ? `R$ ${total.toFixed(2).replace('.', ',')}` : 'N/A (Retirada)',
        data: new Date().toLocaleString('pt-BR'),
        numero_pedido: newOrderNumber,
        codigo_rastreio: trackingCode,
        status_pedido: "em_transito",
        informacoes_adicionais: formData.additionalInfo || 'Nenhuma'
      };
      
      await sendToDiscordWebhook('pedido', orderData);
      
      const trackingInfo = {
        status: "em_transito",
        historico: [
          { 
            data: new Date().toLocaleDateString("pt-BR"), 
            status: "Pedido recebido", 
            local: "Central" 
          },
          { 
            data: new Date().toLocaleDateString("pt-BR"), 
            status: "Em processamento", 
            local: "Central" 
          }
        ],
        destinatario: formData.name,
        origem: "Lar Aconchegante",
        destino: state.deliveryMethod === 'entrega' ? formData.address : 'Retirada na loja',
        produto: productsList,
        imagem: mainProductImage
      };
      
      sessionStorage.setItem(`tracking_${trackingCode}`, JSON.stringify(trackingInfo));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      setShowSelectAttendant(true);
      
      toast({
        title: "Pedido realizado com sucesso!",
        description: "Por favor, selecione um atendente para finalizar seu pedido pelo WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Erro ao finalizar pedido",
        description: "Não foi possível processar seu pedido. Tente novamente.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  const handleSelectAttendant = (attendant: Attendant) => {
    setSelectedAttendant(attendant);
    toast({
      title: `Atendente ${attendant.name} selecionado`,
      description: "Você será redirecionado para o WhatsApp em instantes.",
    });
    
    setTimeout(() => {
      redirectToWhatsApp(orderNumber, attendant);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <OrderSuccess
        orderNumber={orderNumber}
        showSelectAttendant={showSelectAttendant}
        selectedAttendant={selectedAttendant}
        handleSelectAttendant={handleSelectAttendant}
        attendants={ATTENDANTS}
      />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Finalizar Pedido</h1>
          
          <CheckoutForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

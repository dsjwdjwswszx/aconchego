
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export type Attendant = {
  id: string;
  name: string;
  phone: string;
};

interface AttendantSelectorProps {
  attendants: Attendant[];
  selectedAttendant: Attendant | null;
  onSelect: (attendant: Attendant) => void;
}

export const AttendantSelector = ({ 
  attendants, 
  selectedAttendant, 
  onSelect 
}: AttendantSelectorProps) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Selecione um atendente:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {attendants.map((attendant) => (
          <Button
            key={attendant.id}
            variant="outline"
            className={`flex flex-col items-center p-4 h-auto ${
              selectedAttendant?.id === attendant.id 
                ? "border-green-500 bg-green-500/10" 
                : ""
            }`}
            onClick={() => onSelect(attendant)}
            disabled={!!selectedAttendant}
          >
            <User className="h-6 w-6 mb-2 text-purple-light" />
            <span className="font-medium">{attendant.name}</span>
            <span className="text-xs text-muted-foreground mt-1">
              {attendant.phone.replace(/(\d{2})(\d{2})(\d{4,5})(\d{4})/, '+$1 $2 $3-$4')}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

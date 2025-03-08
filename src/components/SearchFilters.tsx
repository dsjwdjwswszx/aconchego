
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSede: string;
  onSedeChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  resetFilters: () => void;
  availableSedes: string[];
  availableCategories: string[];
}

const SearchFilters = ({
  searchQuery,
  onSearchChange,
  selectedSede,
  onSedeChange,
  selectedCategory,
  onCategoryChange,
  resetFilters,
  availableSedes,
  availableCategories
}: SearchFiltersProps) => {
  return (
    <Card className="mb-6 bg-card">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="mb-2 block">
                Buscar Produto
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Digite o nome do produto..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Filtros</Label>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Sede
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filtrar por Sede</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedSede === "all"}
                      onCheckedChange={() => onSedeChange("all")}
                    >
                      Todas as Sedes
                    </DropdownMenuCheckboxItem>
                    {availableSedes.map((sede) => (
                      <DropdownMenuCheckboxItem
                        key={sede}
                        checked={selectedSede === sede}
                        onCheckedChange={() => onSedeChange(sede)}
                      >
                        {sede}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Categoria
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filtrar por Categoria</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={selectedCategory === "all"}
                      onCheckedChange={() => onCategoryChange("all")}
                    >
                      Todas as Categorias
                    </DropdownMenuCheckboxItem>
                    {availableCategories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => onCategoryChange(category)}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="ghost" onClick={resetFilters}>
                  Limpar
                </Button>
              </div>
            </div>
          </div>
          
          {selectedSede !== "all" && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              Sede: {selectedSede}
              <button
                onClick={() => onSedeChange("all")}
                className="ml-1 hover:text-purple-900 dark:hover:text-purple-100"
              >
                ×
              </button>
            </div>
          )}
          
          {selectedCategory !== "all" && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Categoria: {selectedCategory}
              <button
                onClick={() => onCategoryChange("all")}
                className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;

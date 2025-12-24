"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContact, getPipelines } from "@/lib/actions/crm";
import { Plus, MapPin, Kanban } from "lucide-react";

interface Pipeline {
  id: number;
  name: string;
  stages: Array<{ id: number; name: string; order: number }>;
}

export function CreateContactDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pipeline state
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [addToPipeline, setAddToPipeline] = useState(false);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>("");
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const [dealValue, setDealValue] = useState("");

  // Load pipelines when dialog opens
  useEffect(() => {
    if (open) {
      getPipelines().then((data) => {
        setPipelines(data as Pipeline[]);
        // Auto-select first pipeline and first stage
        if (data.length > 0) {
          setSelectedPipelineId(data[0].id.toString());
          if (data[0].stages.length > 0) {
            const sortedStages = [...data[0].stages].sort((a, b) => a.order - b.order);
            setSelectedStageId(sortedStages[0].id.toString());
          }
        }
      });
    }
  }, [open]);

  // Update stage when pipeline changes
  const selectedPipeline = pipelines.find(p => p.id.toString() === selectedPipelineId);
  const sortedStages = selectedPipeline
    ? [...selectedPipeline.stages].sort((a, b) => a.order - b.order)
    : [];

  const handlePipelineChange = (pipelineId: string) => {
    setSelectedPipelineId(pipelineId);
    const pipeline = pipelines.find(p => p.id.toString() === pipelineId);
    if (pipeline && pipeline.stages.length > 0) {
      const sorted = [...pipeline.stages].sort((a, b) => a.order - b.order);
      setSelectedStageId(sorted[0].id.toString());
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createContact({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        position: formData.get("position") as string,
        street: formData.get("street") as string || undefined,
        houseNumber: formData.get("houseNumber") as string || undefined,
        houseNumberAddition: formData.get("houseNumberAddition") as string || undefined,
        postalCode: formData.get("postalCode") as string || undefined,
        city: formData.get("city") as string || undefined,
        province: formData.get("province") as string || undefined,
        country: formData.get("country") as string || undefined,
        // Pipeline data
        pipelineId: addToPipeline && selectedPipelineId ? parseInt(selectedPipelineId) : undefined,
        stageId: addToPipeline && selectedStageId ? parseInt(selectedStageId) : undefined,
        dealValue: addToPipeline && dealValue ? dealValue : undefined,
      });

      // Reset form
      setOpen(false);
      setAddToPipeline(false);
      setDealValue("");
      router.refresh();
    } catch (error) {
      console.error("Failed to create contact:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nieuw contact
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nieuw contact toevoegen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Voornaam</Label>
              <Input id="firstName" name="firstName" placeholder="Jan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Achternaam</Label>
              <Input id="lastName" name="lastName" placeholder="Jansen" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jan@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefoon</Label>
            <Input id="phone" name="phone" placeholder="+31 6 12345678" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Bedrijf</Label>
            <Input id="company" name="company" placeholder="Acme BV" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Functie</Label>
            <Input id="position" name="position" placeholder="Directeur" />
          </div>

          {/* Pipeline Section */}
          {pipelines.length > 0 && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="addToPipeline"
                  className="flex items-center gap-2 text-sm font-medium leading-none cursor-pointer"
                >
                  <Kanban className="h-4 w-4 text-violet-500" />
                  Toevoegen aan pipeline
                </label>
                <Switch
                  id="addToPipeline"
                  checked={addToPipeline}
                  onCheckedChange={setAddToPipeline}
                />
              </div>

              {addToPipeline && (
                <div className="space-y-3 pl-6 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Pipeline</Label>
                      <Select value={selectedPipelineId} onValueChange={handlePipelineChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer pipeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {pipelines.map((pipeline) => (
                            <SelectItem key={pipeline.id} value={pipeline.id.toString()}>
                              {pipeline.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stage</Label>
                      <Select value={selectedStageId} onValueChange={setSelectedStageId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortedStages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.id.toString()}>
                              {stage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealValue">Deal waarde (optioneel)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">€</span>
                      <Input
                        id="dealValue"
                        type="number"
                        step="0.01"
                        min="0"
                        value={dealValue}
                        onChange={(e) => setDealValue(e.target.value)}
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Address Section */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <MapPin className="h-4 w-4" />
              Adresgegevens
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="street">Straat</Label>
                <Input id="street" name="street" placeholder="Hoofdstraat" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseNumber">Nr.</Label>
                <div className="flex gap-1">
                  <Input id="houseNumber" name="houseNumber" placeholder="123" className="w-16" />
                  <Input name="houseNumberAddition" placeholder="A" className="w-12" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postcode</Label>
                <Input id="postalCode" name="postalCode" placeholder="1234 AB" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Stad</Label>
                <Input id="city" name="city" placeholder="Amsterdam" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="province">Provincie</Label>
                <Input id="province" name="province" placeholder="Noord-Holland" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Land</Label>
                <Input id="country" name="country" placeholder="Nederland" defaultValue="Nederland" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Toevoegen..." : "Toevoegen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

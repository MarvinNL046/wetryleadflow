"use client";

import { useState, useEffect, useTransition } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/invoicing";

type Product = {
  id: number;
  name: string;
  description: string | null;
  sku: string | null;
  unitPrice: string;
  unit: string;
  taxRate: string;
  isActive: boolean;
};

function formatCurrency(amount: string | number) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    unitPrice: "",
    unit: "stuk",
    taxRate: "21.00",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      sku: "",
      unitPrice: "",
      unit: "stuk",
      taxRate: "21.00",
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description ?? "",
      sku: product.sku ?? "",
      unitPrice: product.unitPrice,
      unit: product.unit,
      taxRate: product.taxRate,
    });
    setIsDialogOpen(true);
  }

  function openDeleteDialog(product: Product) {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      try {
        if (editingProduct) {
          await updateProduct(editingProduct.id, formData);
        } else {
          await createProduct(formData);
        }
        setIsDialogOpen(false);
        await loadProducts();
      } catch (error) {
        console.error("Failed to save product:", error);
      }
    });
  }

  async function handleDelete() {
    if (!deletingProduct) return;

    startTransition(async () => {
      try {
        await deleteProduct(deletingProduct.id);
        setIsDeleteOpen(false);
        setDeletingProduct(null);
        await loadProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Producten & Diensten</h2>
          <p className="text-sm text-zinc-500">
            Beheer je productcatalogus voor offertes en facturen
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Nieuw Product
        </Button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-12 dark:border-zinc-700">
          <Package className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <p className="mb-2 text-lg font-medium">Geen producten</p>
          <p className="mb-4 text-sm text-zinc-500">
            Voeg producten toe om ze te gebruiken in offertes en facturen
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Eerste product toevoegen
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Eenheid</TableHead>
                <TableHead className="text-right">Prijs</TableHead>
                <TableHead className="text-right">BTW</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-zinc-500 line-clamp-1">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {product.sku || "-"}
                  </TableCell>
                  <TableCell>{product.unit}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(product.unitPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.taxRate}%
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Product bewerken" : "Nieuw product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Wijzig de productgegevens"
                : "Voeg een nieuw product toe aan je catalogus"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Naam *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Bijv. Website ontwerp"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschrijving</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optionele beschrijving van het product"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU / Artikelnummer</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="Bijv. WEB-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Eenheid</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  placeholder="stuk, uur, maand, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Prijs (excl. BTW) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unitPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, unitPrice: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxRate">BTW percentage</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.taxRate}
                  onChange={(e) =>
                    setFormData({ ...formData, taxRate: e.target.value })
                  }
                  placeholder="21.00"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Annuleren
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Opslaan..." : editingProduct ? "Opslaan" : "Toevoegen"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Product verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je &quot;{deletingProduct?.name}&quot; wilt
              verwijderen? Het product wordt gedeactiveerd en is niet meer
              beschikbaar voor nieuwe offertes en facturen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Verwijderen..." : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts } from "@/lib/actions/invoicing";

export type LineItem = {
  id?: number;
  productId?: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
  discountPercent: number;
  // Calculated
  subtotal: number;
  taxAmount: number;
  total: number;
};

type Product = {
  id: number;
  name: string;
  description: string | null;
  unitPrice: string;
  unit: string;
  taxRate: string;
};

type LineItemsEditorProps = {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency?: string;
};

function calculateLineItem(item: Omit<LineItem, "subtotal" | "taxAmount" | "total">): LineItem {
  const subtotal = item.quantity * item.unitPrice;
  const discountAmount = subtotal * (item.discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (item.taxRate / 100);
  const total = afterDiscount + taxAmount;

  return {
    ...item,
    subtotal,
    taxAmount,
    total,
  };
}

function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
  }).format(amount);
}

export function LineItemsEditor({
  items,
  onChange,
  currency = "EUR",
}: LineItemsEditorProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  function addItem() {
    const newItem = calculateLineItem({
      description: "",
      quantity: 1,
      unit: "stuk",
      unitPrice: 0,
      taxRate: 21,
      discountPercent: 0,
    });
    onChange([...items, newItem]);
  }

  function updateItem(index: number, updates: Partial<LineItem>) {
    const newItems = [...items];
    const updatedItem = { ...newItems[index], ...updates };
    newItems[index] = calculateLineItem(updatedItem);
    onChange(newItems);
  }

  function removeItem(index: number) {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  }

  function selectProduct(index: number, productId: string) {
    const product = products.find((p) => p.id.toString() === productId);
    if (product) {
      updateItem(index, {
        productId: product.id,
        description: product.name + (product.description ? ` - ${product.description}` : ""),
        unitPrice: parseFloat(product.unitPrice),
        unit: product.unit,
        taxRate: parseFloat(product.taxRate),
      });
    }
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const taxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Regelitems</Label>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus className="mr-2 h-4 w-4" />
          Regel toevoegen
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">
            Geen regelitems. Klik op &quot;Regel toevoegen&quot; om te beginnen.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="flex-1">
                  {products.length > 0 && (
                    <div className="mb-2">
                      <Select
                        value={item.productId?.toString() ?? ""}
                        onValueChange={(value) => selectProduct(index, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecteer product (optioneel)" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem
                              key={product.id}
                              value={product.id.toString()}
                            >
                              {product.name} - {formatCurrency(parseFloat(product.unitPrice))}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, { description: e.target.value })
                    }
                    placeholder="Omschrijving"
                    className="mb-2"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                <div>
                  <Label className="text-xs text-zinc-500">Aantal</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, {
                        quantity: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="text-xs text-zinc-500">Eenheid</Label>
                  <Input
                    value={item.unit}
                    onChange={(e) => updateItem(index, { unit: e.target.value })}
                    placeholder="stuk"
                  />
                </div>

                <div>
                  <Label className="text-xs text-zinc-500">Prijs</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(index, {
                        unitPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="text-xs text-zinc-500">BTW %</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={item.taxRate}
                    onChange={(e) =>
                      updateItem(index, {
                        taxRate: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label className="text-xs text-zinc-500">Totaal</Label>
                  <div className="flex h-10 items-center font-medium">
                    {formatCurrency(item.total, currency)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      {items.length > 0 && (
        <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Subtotaal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">BTW</span>
            <span>{formatCurrency(taxAmount, currency)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Totaal</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function calculateTotals(items: LineItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const taxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return { subtotal, taxAmount, total };
}

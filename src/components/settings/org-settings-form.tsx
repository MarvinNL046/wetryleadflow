"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateOrganization } from "@/lib/actions/settings";
import { Loader2, Check } from "lucide-react";

interface OrgSettingsFormProps {
  org: {
    name: string;
    slug: string;
  };
  canEdit: boolean;
}

export function OrgSettingsForm({ org, canEdit }: OrgSettingsFormProps) {
  const [name, setName] = useState(org.name);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    startTransition(async () => {
      try {
        await updateOrganization({ name });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update organization");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="org-name">Organization Name</Label>
        <Input
          id="org-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Organization name"
          disabled={isPending || !canEdit}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="org-slug">Slug</Label>
        <Input
          id="org-slug"
          type="text"
          value={org.slug}
          disabled
          className="bg-zinc-50 font-mono dark:bg-zinc-900"
        />
        <p className="text-xs text-zinc-500">
          Organization slug cannot be changed.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {canEdit ? (
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isPending || name === org.name}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          Only organization owners and admins can edit these settings.
        </p>
      )}
    </form>
  );
}

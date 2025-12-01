import { CreateNewPlanDialog } from '@/features/plans/components/create-new-plan-dialog';

export default function PlansPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold uppercase">Plans</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Here you can manage the current plans available in your site.
          </p>
        </div>
        <CreateNewPlanDialog />
      </div>
    </div>
  );
}

import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Loader2, ToggleLeft } from 'lucide-react';

export const ToggleButtonMenuItem = ({ onClickFn, title }: { onClickFn: () => void; title: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClickFn();
    });
  };
  return (
    <DropdownMenuItem
      variant="default"
      className="cursor-pointer"
      onClick={handleClick}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ToggleLeft className="size-4" />}
      {title}
    </DropdownMenuItem>
  );
};

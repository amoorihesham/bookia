import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Loader2, Trash } from 'lucide-react';

export const DeleteButtonMenuItem = ({ onClickFn, title }: { onClickFn: () => void; title: string }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onClickFn();
    });
  };

  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={onClick}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash />}
      {title}
    </DropdownMenuItem>
  );
};

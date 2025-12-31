import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Clipboard, Loader2 } from 'lucide-react';

export const CopyToClipboardButtonMenuItem = ({ onClickFn, title }: { onClickFn: () => void; title: string }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await onClickFn();
    });
  };

  return (
    <DropdownMenuItem
      variant="default"
      className="cursor-pointer"
      onClick={onClick}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clipboard className="h-4 w-4" />}
      {title}
    </DropdownMenuItem>
  );
};

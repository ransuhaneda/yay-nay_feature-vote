import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { Button } from './ui/button';

export function ActionDropdown () {
  return (
  <>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button
                  variant="ghost"
                  size='bare'
      
              >
                  <Ellipsis size={16} />
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                      Copy Link
                  </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <span className="flex items-center gap-2">
                      Report Abuse
                  </span>
              </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

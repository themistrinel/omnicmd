import { useEffect } from 'react';
import { CommandPalette } from '@/features/command-palette/CommandPalette';
import { StorageService } from '@/lib/storage';
import { applyAppearanceSettings } from '@/lib/theme';

function App() {
  useEffect(() => {
    StorageService.getSettings().then((s) => {
      if (s.appearance) {
        applyAppearanceSettings(s.appearance);
      }
    });
  }, []);

  return (
    <main className="w-full h-full bg-transparent overflow-hidden flex flex-col font-hud">
      <CommandPalette />
    </main>
  );
}

export default App;

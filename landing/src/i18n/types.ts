export type SupportedLanguage = 'en' | 'pt' | 'es';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
}

export interface DirectiveItem {
  id: string;
  command: string;
  name: string;
  category: string;
  shortcut: string;
  description: string;
  exampleContext: string;
  outputSummary: string;
}

export interface SystemItem {
  handle: string;
  name: string;
  shortcut: string;
  specialty: string;
  detail: string;
}

export interface Translations {
  nav: {
    cockpit: string;
    features: string;
    benchmarks: string;
    commands: string;
    changelog: string;
    downloadBtn: string;
    downloadFor: string;
    systemDirectory: string;
  };
  hero: {
    badgeRuntime: string;
    badgeZeroCloud: string;
    headline: string;
    subtitle: string;
    globalHotkey: string;
    hotkeyComment: string;
    downloadBtn: string;
    downloadDetails: string;
    githubRepo: string;
    copied: string;
    copy: string;
    paletteImage: string;
    paletteAlt: string;
    otherPlatforms?: string;
  };
  features: {
    pill: string;
    headline: string;
    subtitle: string;
    card1: {
      tag: string;
      badge: string;
      title: string;
      description: string;
      matrixHeader: string;
      directives: Array<{
        cmd: string;
        key: string;
        desc: string;
      }>;
      footerConfig: string;
      footerCount: string;
    };
    card2: {
      tag: string;
      badge: string;
      title: string;
      description: string;
      matrixHeader: string;
      meta: {
        hotkey: { label: string; value: string };
        provider: { label: string; value: string };
        latency: { label: string; value: string };
        compat: { label: string; value: string };
      };
      footerCompositor: string;
      footerSwitching: string;
    };
    statusBar: {
      title: string;
      model: string;
    };
  };
  workflow: {
    pill: string;
    headline: string;
    subtitle: string;
    stage1: {
      label: string;
      time: string;
      title: string;
      description: string;
      badge: string;
    };
    stage2: {
      label: string;
      time: string;
      title: string;
      description: string;
      badge: string;
    };
    stage3: {
      label: string;
      time: string;
      title: string;
      description: string;
      badge: string;
    };
    matrixTitle: string;
    matrixSubtitle: string;
    matrixItems: {
      summon: string;
      traverse: string;
      action: string;
      persona: string;
      provider: string;
      history: string;
      copy: string;
      dismiss: string;
    };
  };
  benchmarks: {
    pill: string;
    headline: string;
    subtitle: string;
    profilerTitle: string;
    profilerSub: string;
    ram: {
      title: string;
      diff: string;
      omniDesc: string;
      electronDesc: string;
    };
    latency: {
      title: string;
      diff: string;
      omniDesc: string;
      electronDesc: string;
    };
    binary: {
      title: string;
      tag: string;
      omniTitle: string;
      omniSize: string;
      omniDesc: string;
      electronTitle: string;
      electronSize: string;
      electronDesc: string;
    };
    pillars: {
      p1: {
        title: string;
        badge: string;
        description: string;
        detail: string;
      };
      p2: {
        title: string;
        badge: string;
        description: string;
        detail: string;
      };
      p3: {
        title: string;
        badge: string;
        description: string;
        detail: string;
      };
    };
  };
  commands: {
    pill: string;
    headline: string;
    subtitle: string;
    directivePurpose: string;
    sampleInput: string;
    generatedOutput: string;
    officialShortcut: string;
    customizable: string;
    count: string;
    systemTitle: string;
    systemSub: string;
    items: DirectiveItem[];
    systemItems: SystemItem[];
  };
  downloads: {
    pill: string;
    headline: string;
    subtitle: string;
    tabs: {
      linux: string;
      mac: string;
      windows: string;
      source: string;
      detected: string;
    };
    linux: {
      title: string;
      desc: string;
      btnDeb: string;
      btnAppImage: string;
      quickInstall: string;
      hyprlandTitle: string;
    };
    mac: {
      title: string;
      desc: string;
      btnDmg: string;
      permTitle: string;
      permDesc: string;
      localTitle: string;
      localDesc: string;
    };
    windows: {
      title: string;
      desc: string;
      btnMsi: string;
      btnZip: string;
      trayTitle: string;
      trayDesc: string;
    };
    source: {
      title: string;
      desc: string;
      pipeline: string;
    };
    checksum: string;
    viewAll: string;
  };
  devlogs: {
    pill: string;
    headline: string;
    subtitle: string;
    allReleases: string;
    verified: string;
    changes: Array<{
      title: string;
      desc: string;
    }>;
    license: string;
    viewCommits: string;
  };
  cta: {
    badge: string;
    headline: string;
    subtitle: string;
    downloadFor: string;
    githubRepo: string;
  };
  footer: {
    links: {
      cockpit: string;
      features: string;
      cadence: string;
      architecture: string;
      commands: string;
      github: string;
      releases: string;
      mit: string;
      top: string;
    };
  };
  langSelector: {
    selectLanguage: string;
    autoDetected: string;
  };
}

export const APP_STORAGE_KEYS = {
  theme: 'bigfoot-theme',
  zoom: 'bigfoot:zoom-level',
  viewMode: 'bigfoot-view-mode',
  tagColors: 'bigfoot:tag-color-overrides',
  statusColors: 'bigfoot:status-color-overrides',
  propertyModes: 'bigfoot:display-mode-overrides',
  configMigrationFlag: 'bigfoot:config-migrated-to-vault',
  legacyMigrationFlag: 'bigfoot:legacy-storage-migrated',
  sortPreferences: 'bigfoot-sort-preferences',
  sidebarCollapsed: 'bigfoot:sidebar-collapsed',
  layoutPanels: 'bigfoot:layout-panels',
  welcomeDismissed: 'bigfoot_welcome_dismissed',
} as const

export const LEGACY_APP_STORAGE_KEYS = {
  theme: 'bigfoot-theme',
  zoom: 'bigfoot:zoom-level',
  viewMode: 'bigfoot-view-mode',
  tagColors: 'bigfoot:tag-color-overrides',
  statusColors: 'bigfoot:status-color-overrides',
  propertyModes: 'bigfoot:display-mode-overrides',
  configMigrationFlag: 'bigfoot:config-migrated-to-vault',
  sortPreferences: 'bigfoot-sort-preferences',
  sidebarCollapsed: 'bigfoot:sidebar-collapsed',
  layoutPanels: 'bigfoot:layout-panels',
  welcomeDismissed: 'bigfoot_welcome_dismissed',
} as const

type MigratableStorageKey = keyof typeof LEGACY_APP_STORAGE_KEYS

const MIGRATABLE_STORAGE_KEYS: MigratableStorageKey[] = [
  'theme',
  'zoom',
  'viewMode',
  'tagColors',
  'statusColors',
  'propertyModes',
  'configMigrationFlag',
  'sortPreferences',
  'sidebarCollapsed',
  'layoutPanels',
  'welcomeDismissed',
]

export function copyLegacyAppStorageKeys(): void {
  try {
    if (localStorage.getItem(APP_STORAGE_KEYS.legacyMigrationFlag) === '1') return

    for (const key of MIGRATABLE_STORAGE_KEYS) {
      const storageKey = Reflect.get(APP_STORAGE_KEYS, key) as string
      const legacyStorageKey = Reflect.get(LEGACY_APP_STORAGE_KEYS, key) as string
      if (localStorage.getItem(storageKey) !== null) continue

      const legacyValue = localStorage.getItem(legacyStorageKey)
      if (legacyValue !== null) {
        localStorage.setItem(storageKey, legacyValue)
      }
    }

    localStorage.setItem(APP_STORAGE_KEYS.legacyMigrationFlag, '1')
  } catch {
    // Ignore unavailable or restricted localStorage implementations.
  }
}

export function getAppStorageItem(key: MigratableStorageKey): string | null {
  try {
    const storageKey = Reflect.get(APP_STORAGE_KEYS, key) as string
    const legacyStorageKey = Reflect.get(LEGACY_APP_STORAGE_KEYS, key) as string
    return localStorage.getItem(storageKey) ?? localStorage.getItem(legacyStorageKey)
  } catch {
    return null
  }
}

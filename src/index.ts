// ichiba/src/index.ts
// SUPER COMMENTS — IMPLEMENTATION ROADMAP
import { ipcMain } from 'electron';
const NS = 'ichiba' as const;
export function activate() {
  ipcMain.handle(`${NS}:ping`, () => ({ ok: true, purpose: "Single‑terminal POS: barcode scan, Excel import, thermal print, sales insights." }));
}
export function deactivate() {
  ipcMain.removeHandler(`${NS}:ping`);
}
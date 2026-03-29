# Modular Repo Resortment Plan (Q1/Q2/Q3)

This plan decomposes TaskBari into modular units that can be merged into an existing repository cleanly, with no runtime coupling surprises.

## Goals

- Keep current VS Code extension stable while preparing modular extraction.
- Ship an MVP path quickly with a PWA-aligned architecture plan.
- Scaffold a Chrome Extension as the primary MCP gateway surface.
- Make merge into an existing repo deterministic (puzzle-piece fit).

## Proposed Module Boundaries

1. **`vscode-extension` module (current codebase)**
   - Owns VS Code task statusbar integration.
   - Maintains current release/publish workflows.

2. **`chrome-extension-gateway` module (new scaffold)**
   - Owns browser-side gateway for MCP interactions.
   - Isolated manifest + assets + background service worker.

3. **`shared-skill-library` module (planned extraction)**
   - Framework-agnostic skill registry/contracts for MCP usage.
   - Consumed by VS Code extension and browser gateway.

4. **`pwa-shell` module (planned)**
   - Lightweight web shell for MVP/PWA delivery.
   - Uses same shared skill contracts.

## Q1 (Immediate: Stabilize + Scaffold)

- Lock current extension behavior and compile stability.
- Add modular roadmap and explicit migration checkpoints.
- Scaffold `chrome-extension-gateway` with complete Manifest V3.
- Define MCP gateway constraints and permission model.

## Q2 (Extraction + MVP Integration)

- Extract shared contracts into `shared-skill-library`.
- Wire gateway to shared skill interfaces.
- Implement MVP PWA shell using the same contract surface.
- Add compatibility layer for existing repo integration.

## Q3 (Merge + Scale)

- Move modules into target existing repo structure (monorepo/workspaces).
- Preserve independent build/release boundaries per module.
- Add integration tests around cross-module contracts.
- Finalize phased deprecation/migration notes for legacy paths.

## Flawless Merge-Into-Existing-Repo Strategy

1. **Pre-merge contract freeze**
   - Freeze public interfaces for each module before moving directories.
2. **Directory-preserving move**
   - Move modules as top-level folders first (`/vscode-extension`, `/chrome-extension-gateway`, etc.).
3. **Adapter-first integration**
   - Add adapters in destination repo rather than rewriting module internals immediately.
4. **Dual-run validation window**
   - Validate source and destination builds in parallel until parity is confirmed.
5. **Cutover by gateway**
   - Promote chrome extension gateway as MCP front door after parity checks pass.

## PWA + MVP Adaptation Notes

- Design all new MCP interactions through shared request/response contracts.
- Keep gateway transport abstraction-neutral (message passing now, optional network transport later).
- Prioritize MVP flows:
  1. Skill discovery
  2. Skill invocation routing
  3. Basic result rendering/notification

## Definition of Done for This Planning Stage

- Roadmap documented with Q1/Q2/Q3 milestones.
- Chrome extension scaffold committed with valid MV3 manifest.
- Clear gateway role defined as primary MCP entrypoint.
- No breaking changes introduced to existing VS Code extension runtime.

# @oasisomniverse/angular — OASIS Angular UI Component Library

The Angular UI component library for the [OASIS Platform](https://oasisomniverse.one). 126 standalone Angular 17 components covering avatar SSO, karma, NFTs, quests, map, seeds, messaging, OApps, providers and more.

[![npm](https://img.shields.io/npm/v/@oasisomniverse/angular)](https://www.npmjs.com/package/@oasisomniverse/angular)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://oportal.oasisomniverse.one)

## Install

```bash
npm install @oasisomniverse/angular
```

## Basic Usage

All components are standalone — import them directly into whichever component needs them:

```ts
import { LoginComponent, AvatarConnectComponent, KarmaToastComponent } from '@oasisomniverse/angular';

@Component({
  standalone: true,
  imports: [LoginComponent, AvatarConnectComponent, KarmaToastComponent],
  template: `
    <oasis-avatar-connect></oasis-avatar-connect>
    <oasis-karma-toast></oasis-karma-toast>
  `
})
export class MyComponent {}
```

API configuration and session state are managed by `OasisService`, which is provided at the root level — no `forRoot()` call needed.

---

## Component Reference

### Auth & Identity

#### `<oasis-login>`

Avatar login form. Emits navigation events so you can switch to signup or forgot-password within your own auth flow.

```html
<oasis-login
  (switchTo)="view = $event"
  (loggedIn)="onLoggedIn()">
</oasis-login>
```

| Output | Payload | Description |
|---|---|---|
| `switchTo` | `'signup' \| 'forgot'` | Emitted when the user clicks Sign Up or Forgot Password |
| `loggedIn` | `void` | Emitted on successful login |

---

#### `<oasis-signup>`

New avatar registration form.

```html
<oasis-signup (switchTo)="view = $event"></oasis-signup>
```

| Output | Payload | Description |
|---|---|---|
| `switchTo` | `'login'` | Emitted when the user clicks Sign In |

---

#### `<oasis-avatar-connect>`

Login/logout toggle chip — fully self-contained. Manages session via `OasisService`. No inputs or outputs required.

```html
<oasis-avatar-connect></oasis-avatar-connect>
```

---

#### `<oasis-forgot-password>`

Password reset request form.

```html
<oasis-forgot-password></oasis-forgot-password>
```

---

#### `<oasis-reset-password>`

Password reset form. Emits `switchTo` when done so you can navigate back to login.

```html
<oasis-reset-password (switchTo)="view = $event"></oasis-reset-password>
```

| Output | Payload | Description |
|---|---|---|
| `switchTo` | `'login'` | Emitted on successful reset |

---

#### `<oasis-verify-email>`

Email verification confirmation.

```html
<oasis-verify-email></oasis-verify-email>
```

---

#### `<oasis-search-avatars>`

Search the OASIS avatar directory. Controlled visibility via `[show]`.

```html
<oasis-search-avatars [show]="showSearch" (close)="showSearch = false"></oasis-search-avatars>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `show` | `boolean` | `false` | Controls visibility |

| Output | Description |
|---|---|
| `close` | Emitted when the panel should be hidden |

---

### Avatar

Most avatar popups use the `[show]` / `(close)` controlled-visibility pattern:

```html
<oasis-view-avatar [show]="showAvatar" (close)="showAvatar = false"></oasis-view-avatar>
<oasis-edit-avatar [show]="showEdit" (close)="showEdit = false"></oasis-edit-avatar>
<oasis-avatar-wallet [show]="showWallet" (close)="showWallet = false"></oasis-avatar-wallet>
```

---

### Karma

#### `<oasis-karma-toast>`

Singleton floating toast. Render once — `OasisService` triggers it automatically when karma changes.

```html
<oasis-karma-toast></oasis-karma-toast>
```

No inputs or outputs. Driven entirely by `OasisService`.

---

#### `<oasis-karma-panel>`

Full karma dashboard panel.

```html
<oasis-karma-panel [show]="showKarma" (close)="showKarma = false"></oasis-karma-panel>
```

---

### Common UI

#### `<oasis-modal>`

Reusable modal wrapper — controlled via `[open]`.

```html
<oasis-modal [open]="isOpen" accentColor="rgba(0,200,255,.25)" (close)="isOpen = false">
  <p>Modal content goes here.</p>
</oasis-modal>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Controls whether the modal is visible |
| `accentColor` | `string` | `'rgba(232,121,249,.25)'` | Border/accent colour |

| Output | Description |
|---|---|
| `close` | Emitted when the backdrop or close button is clicked |

---

#### `<oasis-coming-soon>`

Placeholder for features not yet live.

```html
<oasis-coming-soon title="Quests" message="Coming in the next release."></oasis-coming-soon>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Feature Coming Soon'` | Heading text |
| `message` | `string` | `'This feature is currently under development...'` | Body text |

---

#### `<oasis-confirmation>`

Confirmation dialog.

```html
<oasis-confirmation
  title="Delete Avatar?"
  message="This cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  (confirm)="doDelete()"
  (cancel)="showConfirm = false">
</oasis-confirmation>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Are you sure?'` | Dialog heading |
| `message` | `string` | `'This action cannot be undone.'` | Body text |
| `icon` | `string` | `'⚠️'` | Leading icon |
| `confirmLabel` | `string` | `'Confirm'` | Confirm button label |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button label |

| Output | Description |
|---|---|
| `confirm` | Emitted when the confirm button is clicked |
| `cancel` | Emitted when cancelled |

---

## Full Component List

| Group | Components |
|---|---|
| **Auth & Identity** | AcceptInvite, AvatarConnect, ForgotPassword, Login, ResetPassword, SearchAvatar, SearchAvatars, SendInvite, Signup, VerifyEmail |
| **Avatar** | AvatarProfile, AvatarWallet, EditAvatar, SearchProfiles, ViewAchievements, ViewAvatar, ViewAvatarKarma, ViewLeagues, ViewOrganizations, ViewTournaments |
| **Data Screen** | ActivityPub, AddData, EOSIO, Ethereum, Holochain, IPFS, LoadData, ManageData, MongoDB, Neo4j, OffChainManagement, SearchData, Solana, Solid, SQLite, ThreeFold |
| **Eggs** | Eggs, ManageEggs, SearchEggs, ViewEggs |
| **Game** | Game |
| **Karma** | KarmaPanel, KarmaToast, SearchKarma, ViewKarma, VoteKarma |
| **Map** | Add2DObjectToMap, Add3DObjectToMap, AddQuestToMap, DownloadMap, ManageMap, Map, PlotRouteOnMap, SearchMap, ViewGlobal3DMap, ViewHalonsOnMap, ViewOAppOnMap, ViewQuestOnMap |
| **Messages** | MenuMessage, Message, MessageContacts, Messaging |
| **Mission** | ManageMission, Mission, SearchMission, ViewMission |
| **NFT** | ContactPopupNFT, ManageNFT, NFT, PurchaseNFT, PurchaseVirtualLandNFT, SearchNFT, ViewNFT |
| **OApp** | CreateOApp, DeployOApp, DownloadOApp, EditOApp, InstallOApp, LaunchOApp, ManageOApp, OApp, SearchOApp |
| **Providers** | CompareProviderSpeeds, CrossChainManagement, ManageAutoFailover, ManageAutoReplication, ManageLoadBalancing, ManageProviders, ProviderDropdown, Providers, SearchProviders, SeedsProvider, ViewProviderStats, ViewProviders |
| **Quest** | ManageQuest, Quest, SearchQuest, ViewQuest |
| **Seeds** | DonateSeeds, ManageSeeds, PayWithSeeds, RewardSeeds, SearchSeeds, Seeds, ViewSeeds |
| **Common UI** | ComingSoon, Confirmation, Contact, HyperDrive, NavBar, ONET, ONODE, OasisModal, Settings, SideNav, StarField, Wallet |

---

## Dark Space Design System

The OASIS component library ships with the **Dark Space** design system:

- **Background**: near-black (`#0a0d14`) with subtle nebula gradients
- **Primary accent**: electric cyan (`#00c8ff`)
- **Typography**: [Orbitron](https://fonts.google.com/specimen/Orbitron) for headings, [Rajdhani](https://fonts.google.com/specimen/Rajdhani) for body text
- **Text**: always bright (`#e0f0ff` / `#fff`) — never dim or faded
- **Borders**: translucent cyan (`rgba(0,200,255,0.2)`)
- **Cards**: glassy dark panels with `backdrop-filter: blur`

Override the CSS custom properties to theme components for your own OAPP:

```css
:root {
  --oasis-bg: #0a0d14;
  --oasis-accent: #00c8ff;
  --oasis-text: #e0f0ff;
  --oasis-border: rgba(0, 200, 255, 0.2);
}
```

---

## Live Demo

The Angular components are showcased in the **[Global Healing Network](https://github.com/NextGenSoftwareUK/Global-Healing-Network-Angular)** — a real-world OAPP built on this library.

See the full component matrix at **[oportal.oasisomniverse.one](https://oportal.oasisomniverse.one)**.

## Links

- [GitHub](https://github.com/NextGenSoftwareUK/OASIS-Angular-UI-Component-Library)
- [npm](https://www.npmjs.com/package/@oasisomniverse/angular)
- [OASIS API Docs](https://oasis-web4.gitbook.io/oasis-web4-docs/)
- [Developer Portal](https://oportal.oasisomniverse.one)
- [OASIS Platform](https://oasisomniverse.one)

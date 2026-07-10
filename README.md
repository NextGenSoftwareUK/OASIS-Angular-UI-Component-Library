# @oasisomniverse/angular — OASIS Angular UI Component Library

The Angular UI component library for the [OASIS Platform](https://oasisomniverse.one). 126 components covering avatar SSO, karma, NFTs, quests, map, seeds, messaging, OApps, providers and more — ready to import into any Angular project.

[![npm](https://img.shields.io/npm/v/@oasisomniverse/angular)](https://www.npmjs.com/package/@oasisomniverse/angular)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://oportal.oasisomniverse.one)

## Install

```bash
npm install @oasisomniverse/angular
```

## Basic Usage

Import the module in your `AppModule`:

```ts
import { OasisAngularModule } from '@oasisomniverse/angular';

@NgModule({
  imports: [
    OasisAngularModule.forRoot({ apiUrl: 'https://api.web4.oasisomniverse.one' })
  ]
})
export class AppModule {}
```

Use components in your templates:

```html
<oasis-login (onSuccess)="handleLogin($event)"></oasis-login>
<oasis-avatar-connect></oasis-avatar-connect>
<oasis-karma-toast message="Quest completed" [amount]="150"></oasis-karma-toast>
```

All components inherit `apiUrl` from `OasisAngularModule.forRoot()`. You can override it per-component with `[apiUrl]="'https://custom.api'".`

---

## Component Reference

### Auth & Identity

#### `<oasis-login>`

Avatar login popup/form.

```html
<oasis-login
  (onSuccess)="handleLogin($event)"
  (onClose)="onClose()">
</oasis-login>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `apiUrl` | `string` | from `forRoot()` | OASIS API base URL override |

| Output | Payload | Description |
|---|---|---|
| `onSuccess` | `{ avatarId, username, karma }` | Emitted on successful login |
| `onClose` | `void` | Emitted when the popup is dismissed |

---

#### `<oasis-signup>`

New avatar registration form.

```html
<oasis-signup (onSuccess)="onSignup($event)" (onClose)="onClose()"></oasis-signup>
```

| Output | Payload | Description |
|---|---|---|
| `onSuccess` | avatar data object | Emitted on successful registration |
| `onClose` | `void` | Emitted when dismissed |

---

#### `<oasis-avatar-connect>`

Login/logout toggle chip — manages session state automatically.

```html
<oasis-avatar-connect
  sessionKey="oasis_session"
  (onLogin)="onLogin($event)"
  (onLogout)="onLogout()">
</oasis-avatar-connect>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `sessionKey` | `string` | `'oasis_session'` | sessionStorage key for login state persistence |

| Output | Payload | Description |
|---|---|---|
| `onLogin` | `{ avatarId, username, karma }` | Emitted after login |
| `onLogout` | `void` | Emitted after logout |

---

#### `<oasis-forgot-password>`

Password reset request form.

```html
<oasis-forgot-password (onClose)="onClose()"></oasis-forgot-password>
```

---

#### `<oasis-reset-password>`

Password reset form — use with the token from the reset email link.

```html
<oasis-reset-password [token]="tokenFromRoute" (onSuccess)="onSuccess()"></oasis-reset-password>
```

| Input | Type | Description |
|---|---|---|
| `token` | `string` | **Required.** Reset token from the email link |

---

#### `<oasis-verify-email>`

Email verification confirmation.

```html
<oasis-verify-email [token]="tokenFromRoute" (onSuccess)="onSuccess()"></oasis-verify-email>
```

---

#### `<oasis-search-avatars>`

Search the OASIS avatar directory.

```html
<oasis-search-avatars (onSelect)="handleSelect($event)"></oasis-search-avatars>
```

| Output | Payload | Description |
|---|---|---|
| `onSelect` | avatar object | Emitted when the user picks an avatar |

---

#### `<oasis-send-invite>` / `<oasis-accept-invite>`

```html
<oasis-send-invite (onSuccess)="onSuccess()"></oasis-send-invite>
<oasis-accept-invite [inviteCode]="code" (onSuccess)="onSuccess()"></oasis-accept-invite>
```

---

### Avatar

#### `<oasis-avatar-profile>`

```html
<oasis-avatar-profile [avatarId]="avatarId" (onClose)="onClose()"></oasis-avatar-profile>
```

| Input | Type | Description |
|---|---|---|
| `avatarId` | `string` | Avatar to display — defaults to logged-in user |

---

#### `<oasis-view-avatar>`

Read-only avatar card.

```html
<oasis-view-avatar [avatarId]="avatarId"></oasis-view-avatar>
```

---

#### `<oasis-edit-avatar>`

Edit the logged-in avatar's profile fields.

```html
<oasis-edit-avatar (onSuccess)="onSuccess()" (onClose)="onClose()"></oasis-edit-avatar>
```

---

#### `<oasis-view-avatar-karma>`

Karma breakdown panel.

```html
<oasis-view-avatar-karma [avatarId]="avatarId"></oasis-view-avatar-karma>
```

---

### Karma

#### `<oasis-karma-toast>`

Floating karma notification.

```html
<oasis-karma-toast message="Quest completed" [amount]="150"></oasis-karma-toast>
```

| Input | Type | Description |
|---|---|---|
| `message` | `string` | Reason text shown below the karma amount |
| `amount` | `number` | Karma delta — positive shown in cyan, negative in red |

---

#### `<oasis-karma-panel>`

Full karma dashboard.

```html
<oasis-karma-panel (onClose)="onClose()"></oasis-karma-panel>
```

---

### Map

#### `<oasis-map>`

Interactive 3D globe with holon and quest overlays.

```html
<oasis-map (onClose)="onClose()"></oasis-map>
```

---

### NFT

```html
<oasis-nft [nftId]="nftId" (onClose)="onClose()"></oasis-nft>
<oasis-purchase-nft [nftId]="nftId" (onSuccess)="onSuccess()" (onClose)="onClose()"></oasis-purchase-nft>
```

---

### OApp

```html
<oasis-create-oapp (onSuccess)="onCreated($event)" (onClose)="onClose()"></oasis-create-oapp>
<oasis-launch-oapp [oappId]="oappId" (onClose)="onClose()"></oasis-launch-oapp>
```

---

### Seeds

```html
<oasis-seeds (onClose)="onClose()"></oasis-seeds>
<oasis-pay-with-seeds [amount]="50" [recipientId]="recipientId" (onSuccess)="onSuccess()" (onClose)="onClose()"></oasis-pay-with-seeds>
```

---

### Common UI

#### `<oasis-modal>`

Reusable modal wrapper.

```html
<oasis-modal title="My Modal" accentColor="#00c8ff" (onClose)="onClose()">
  <p>Modal content goes here.</p>
</oasis-modal>
```

| Input | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `''` | Modal header title |
| `accentColor` | `string` | `'#00c8ff'` | Header accent colour |

| Output | Description |
|---|---|
| `onClose` | Emitted when dismissed |

---

#### `<oasis-nav-bar>`

```html
<oasis-nav-bar [links]="[{ label: 'Map', href: '/map' }]"></oasis-nav-bar>
```

---

#### `<oasis-settings>`

```html
<oasis-settings (onClose)="onClose()"></oasis-settings>
```

---

#### `<oasis-wallet>`

```html
<oasis-wallet (onClose)="onClose()"></oasis-wallet>
```

---

#### `<oasis-star-field>`

```html
<oasis-star-field></oasis-star-field>
```

---

#### `<oasis-coming-soon>`

```html
<oasis-coming-soon label="Quests"></oasis-coming-soon>
```

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

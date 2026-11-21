import { Routes } from '@angular/router';
import { CampaignListComponent } from './pages/campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './pages/campaign-detail/campaign-detail.component';
import { CampaignPlayersComponent } from './pages/campaign-players/campaign-players.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

export const routes: Routes = [
  { path: '', component: CampaignListComponent },
  { path: 'campanha/:id', component: CampaignDetailComponent },
  { path: 'campanha/:id/jogadores', component: CampaignPlayersComponent },
  { path: 'campanha/:id/jogadores/:charSlug', component: CharacterDetailComponent },
];

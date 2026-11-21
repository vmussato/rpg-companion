import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { NewCampaignDialogComponent } from '../../dialogs/new-campaign/new-campaign-dialog.component';

export interface Campaign {
  id: number;
  name: string;
  tier: string;
  tierLevel: number;
  bannerImage: string;
  chapter: string;
  progress: number;
  nextSession: string;
  nextSessionTime: string;
  players: { initials: string; color: string }[];
  extraPlayers: number;
}

@Component({
  selector: 'app-campaign-list',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Sombra do Trono de Ferro',
      tier: 'MORTAL',
      tierLevel: 3,
      bannerImage: 'images/campaigns/iron-throne.svg',
      chapter: 'Capítulo 3: A Cidadela Sem Sol',
      progress: 60,
      nextSession: 'Sex, 24 Out',
      nextSessionTime: '19:00',
      players: [
        { initials: 'AR', color: '#8b5e3c' },
        { initials: 'KM', color: '#5c6b73' },
        { initials: 'TL', color: '#6b4c3b' },
      ],
      extraPlayers: 2,
    },
    {
      id: 2,
      name: 'As Ilhas Submersas',
      tier: 'EXPLORATÓRIO',
      tierLevel: 1,
      bannerImage: 'images/campaigns/sunken-isles.svg',
      chapter: 'Capítulo 1: O Chamado das Profundezas',
      progress: 15,
      nextSession: 'Dom, 26 Out',
      nextSessionTime: '15:30',
      players: [
        { initials: 'JR', color: '#7c6650' },
        { initials: 'SV', color: '#5a5a6e' },
        { initials: 'DW', color: '#8b6914' },
        { initials: 'LP', color: '#4a6741' },
      ],
      extraPlayers: 1,
    },
    {
      id: 3,
      name: 'Ecos do Vazio',
      tier: 'MÍTICO',
      tierLevel: 4,
      bannerImage: 'images/campaigns/void-echoes.svg',
      chapter: 'Capítulo 5: O Limiar Final',
      progress: 92,
      nextSession: 'Qua, 29 Out',
      nextSessionTime: '20:00',
      players: [
        { initials: 'MK', color: '#6b4c3b' },
        { initials: 'RN', color: '#5c6b73' },
        { initials: 'AS', color: '#8b5e3c' },
      ],
      extraPlayers: 0,
    },
  ];

  private aestheticBanners: Record<string, string> = {
    medieval: 'images/campaigns/iron-throne.svg',
    space: 'images/campaigns/sunken-isles.svg',
    horror: 'images/campaigns/void-echoes.svg',
    cyberpunk: 'images/campaigns/new-saga.svg',
  };

  private aestheticTiers: Record<string, string> = {
    medieval: 'ÉPICO',
    space: 'EXPLORATÓRIO',
    horror: 'SOMBRIO',
    cyberpunk: 'NEON',
  };

  openNewCampaign(): void {
    const dialogRef = this.dialog.open(NewCampaignDialogComponent, {
      panelClass: 'dark-dialog',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      const newId = Math.max(...this.campaigns.map(c => c.id)) + 1;
      const newCampaign: Campaign = {
        id: newId,
        name: result.title,
        tier: this.aestheticTiers[result.aesthetic] ?? 'ÉPICO',
        tierLevel: 1,
        bannerImage: this.aestheticBanners[result.aesthetic] ?? 'images/campaigns/new-saga.svg',
        chapter: 'Capítulo 1: O Início',
        progress: 0,
        nextSession: 'A definir',
        nextSessionTime: '--:--',
        players: [],
        extraPlayers: 0,
      };

      this.campaigns.unshift(newCampaign);
      this.router.navigate(['/campanha', newId], {
        state: { campaignName: result.title, system: result.system },
      });
    });
  }

  enterCampaign(id: number): void {
    this.router.navigate(['/campanha', id]);
  }

  getTierColor(tier: string): string {
    switch (tier) {
      case 'MORTAL': return '#c4a35a';
      case 'EXPLORATÓRIO': return '#c4a35a';
      case 'MÍTICO': return '#c4a35a';
      default: return '#c4a35a';
    }
  }
}

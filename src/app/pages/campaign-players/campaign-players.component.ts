import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';

interface PlayerCharacter {
  characterName: string;
  playerName: string;
  class: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  online: boolean;
  avatarIcon: string;
  avatarColor: string;
}

interface CampaignPlayersData {
  campaignName: string;
  players: PlayerCharacter[];
}

@Component({
  selector: 'app-campaign-players',
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    UpperCasePipe,
  ],
  templateUrl: './campaign-players.component.html',
  styleUrl: './campaign-players.component.scss'
})
export class CampaignPlayersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private appComponent = inject(AppComponent);
  private campaignId = '';

  campaignName = '';
  players: PlayerCharacter[] = [];
  filteredPlayers: PlayerCharacter[] = [];
  searchQuery = '';
  filterMode: 'all' | 'online' = 'all';
  classFilter = '';

  private campaignsData: Record<number, CampaignPlayersData> = {
    1: {
      campaignName: 'Sombra do Trono de Ferro',
      players: [
        { characterName: 'Thalric Ferro-Ligado', playerName: 'James R.', class: 'Paladino', level: 12, hp: 84, maxHp: 84, ac: 19, online: true, avatarIcon: 'shield', avatarColor: '#5c4a3a' },
        { characterName: 'Elara Sombra-Veloz', playerName: 'Sarah K.', class: 'Ladina', level: 11, hp: 58, maxHp: 64, ac: 16, online: true, avatarIcon: 'visibility', avatarColor: '#4a5a6a' },
        { characterName: 'Korg, o Inquebrantável', playerName: 'Marcus V.', class: 'Bárbaro', level: 12, hp: 98, maxHp: 98, ac: 17, online: false, avatarIcon: 'fitness_center', avatarColor: '#6a4a3a' },
        { characterName: 'Zek do Vazio', playerName: 'Elena P.', class: 'Bruxo', level: 10, hp: 45, maxHp: 52, ac: 14, online: true, avatarIcon: 'auto_fix_high', avatarColor: '#3a4a5a' },
        { characterName: 'Bruna Canto-Sagrado', playerName: 'Ana L.', class: 'Clérigo', level: 11, hp: 62, maxHp: 62, ac: 18, online: false, avatarIcon: 'favorite', avatarColor: '#5a4a5a' },
      ],
    },
    2: {
      campaignName: 'As Ilhas Submersas',
      players: [
        { characterName: 'Marina Ondas-Bravas', playerName: 'Julia R.', class: 'Druida', level: 8, hp: 52, maxHp: 56, ac: 15, online: true, avatarIcon: 'eco', avatarColor: '#3a6a5a' },
        { characterName: 'Capitão Raio Negro', playerName: 'Samuel V.', class: 'Guerreiro', level: 9, hp: 82, maxHp: 82, ac: 19, online: true, avatarIcon: 'bolt', avatarColor: '#5a5a6e' },
        { characterName: 'Duna Whisperwind', playerName: 'Diego W.', class: 'Ranger', level: 7, hp: 48, maxHp: 48, ac: 16, online: true, avatarIcon: 'park', avatarColor: '#6a6a4a' },
        { characterName: 'Lira das Profundezas', playerName: 'Luana P.', class: 'Feiticeira', level: 8, hp: 38, maxHp: 44, ac: 13, online: false, avatarIcon: 'water_drop', avatarColor: '#4a5a7a' },
        { characterName: 'Finnegan Maré-Alta', playerName: 'Rafael M.', class: 'Bardo', level: 8, hp: 52, maxHp: 52, ac: 15, online: true, avatarIcon: 'music_note', avatarColor: '#6a5a4a' },
        { characterName: 'Padre Tomás', playerName: 'Kevin L.', class: 'Clérigo', level: 7, hp: 58, maxHp: 58, ac: 18, online: false, avatarIcon: 'star', avatarColor: '#5a5a5a' },
      ],
    },
    3: {
      campaignName: 'Ecos do Vazio',
      players: [
        { characterName: 'Morghul, o Cinzento', playerName: 'Marcos K.', class: 'Mago', level: 14, hp: 64, maxHp: 64, ac: 16, online: true, avatarIcon: 'local_fire_department', avatarColor: '#5a5a5a' },
        { characterName: 'Ravena Nocturna', playerName: 'Renata N.', class: 'Clérigo', level: 13, hp: 59, maxHp: 61, ac: 17, online: true, avatarIcon: 'nights_stay', avatarColor: '#4a3a5a' },
        { characterName: 'Ashur Lâmina-Sombria', playerName: 'André S.', class: 'Assassino', level: 12, hp: 55, maxHp: 58, ac: 15, online: false, avatarIcon: 'content_cut', avatarColor: '#3a3a4a' },
      ],
    },
  };

  get availableClasses(): string[] {
    const classes = new Set(this.players.map(p => p.class));
    return Array.from(classes).sort();
  }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id') ?? '1';
    const id = Number(this.campaignId);
    const data = this.campaignsData[id] ?? this.campaignsData[1];
    this.campaignName = data.campaignName;
    this.players = data.players;
    this.appComponent.setActiveCampaignName(this.campaignName);
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.players;

    if (this.filterMode === 'online') {
      result = result.filter(p => p.online);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.characterName.toLowerCase().includes(q) ||
        p.playerName.toLowerCase().includes(q)
      );
    }

    if (this.classFilter) {
      result = result.filter(p => p.class === this.classFilter);
    }

    this.filteredPlayers = result;
  }

  setFilterMode(mode: 'all' | 'online'): void {
    this.filterMode = mode;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onClassFilterChange(): void {
    this.applyFilters();
  }

  openCharacter(player: PlayerCharacter): void {
    const slug = player.characterName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    this.router.navigate(['/campanha', this.campaignId, 'jogadores', slug]);
  }

  getHpPercent(player: PlayerCharacter): number {
    return (player.hp / player.maxHp) * 100;
  }

  getHpColor(player: PlayerCharacter): string {
    const pct = this.getHpPercent(player);
    if (pct >= 75) return '#4a8a4a';
    if (pct >= 40) return '#c4a35a';
    return '#a83030';
  }
}

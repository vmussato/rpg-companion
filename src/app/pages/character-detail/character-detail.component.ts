import { Component, inject, OnInit } from '@angular/core';
import { UpperCasePipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';

interface AbilityScore {
  name: string;
  value: number;
  modifier: number;
  isPrimary?: boolean;
}

interface Attack {
  name: string;
  icon: string;
  details: string;
  hitDc: string;
  damageDice?: string;
}

interface Skill {
  name: string;
  bonus: number;
  proficient: boolean;
}

interface CharacterData {
  characterName: string;
  race: string;
  class: string;
  level: number;
  avatarIcon: string;
  avatarColor: string;
  abilities: AbilityScore[];
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number;
  spellSlots: string;
  spellSlotLevel: string;
  attacks: Attack[];
  skills: Skill[];
  patron: string;
  patronDescription: string;
  background: string;
  backgroundDescription: string;
  personalGoals: string[];
  scribeNotes: string;
  campaignName: string;
}

@Component({
  selector: 'app-character-detail',
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    UpperCasePipe,
    NgIf,
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private appComponent = inject(AppComponent);

  character!: CharacterData;
  activeTab: 'combat' | 'inventory' = 'combat';
  scribeNotes = '';

  private characters: Record<string, CharacterData> = {
    'thalric-ferro-ligado': {
      characterName: 'Thalric Ferro-Ligado',
      race: 'Humano',
      class: 'Paladino',
      level: 12,
      avatarIcon: 'shield',
      avatarColor: '#5c4a3a',
      abilities: [
        { name: 'Força', value: 18, modifier: 4 },
        { name: 'Destreza', value: 10, modifier: 0 },
        { name: 'Constituição', value: 16, modifier: 3 },
        { name: 'Inteligência', value: 12, modifier: 1 },
        { name: 'Sabedoria', value: 14, modifier: 2 },
        { name: 'Carisma', value: 18, modifier: 4, isPrimary: true },
      ],
      hp: 84, maxHp: 84, ac: 19, initiative: 0,
      spellSlots: '3 Espaços', spellSlotLevel: '3º Nível',
      attacks: [
        { name: 'Espada Longa Sagrada', icon: 'swords', details: 'Corpo a corpo • Versátil • Radiante', hitDc: '+9', damageDice: '1d8+5' },
        { name: 'Destruição Divina', icon: 'flash_on', details: '2º Nível • Bônus • Radiante', hitDc: '—', damageDice: '3d8' },
        { name: 'Golpe Punitivo', icon: 'gavel', details: 'Corpo a corpo • Concentração', hitDc: '+9', damageDice: '1d8+5' },
      ],
      skills: [
        { name: 'Atletismo', bonus: 8, proficient: true },
        { name: 'Persuasão', bonus: 8, proficient: true },
        { name: 'Religião', bonus: 5, proficient: true },
        { name: 'Percepção', bonus: 6, proficient: true },
        { name: 'Intimidação', bonus: 4, proficient: false },
        { name: 'Medicina', bonus: 6, proficient: true },
      ],
      patron: 'Juramento de Devoção',
      patronDescription: 'Ligado por um juramento sagrado aos ideais de justiça e virtude, Thalric busca purificar as terras sombrias e proteger os inocentes de todo mal.',
      background: 'Nobre',
      backgroundDescription: 'Nascido em uma família de cavaleiros renomados, carrega o peso da honra familiar e o dever de manter o legado de seus antepassados.',
      personalGoals: ['Destruir o trono corrompido', 'Redimir a alma de seu irmão caído', 'Reconstruir a Ordem da Aurora'],
      scribeNotes: '',
      campaignName: 'Sombra do Trono de Ferro',
    },
    'elara-sombra-veloz': {
      characterName: 'Elara Sombra-Veloz',
      race: 'Elfa',
      class: 'Ladina',
      level: 11,
      avatarIcon: 'visibility',
      avatarColor: '#4a5a6a',
      abilities: [
        { name: 'Força', value: 8, modifier: -1 },
        { name: 'Destreza', value: 20, modifier: 5, isPrimary: true },
        { name: 'Constituição', value: 14, modifier: 2 },
        { name: 'Inteligência', value: 16, modifier: 3 },
        { name: 'Sabedoria', value: 12, modifier: 1 },
        { name: 'Carisma', value: 14, modifier: 2 },
      ],
      hp: 58, maxHp: 64, ac: 16, initiative: 5,
      spellSlots: '—', spellSlotLevel: '—',
      attacks: [
        { name: 'Adaga Sombria', icon: 'content_cut', details: 'Corpo a corpo • Acuidade • Leve', hitDc: '+10', damageDice: '1d4+5' },
        { name: 'Arco Curto', icon: 'north_east', details: 'Distância • 80/320 pés', hitDc: '+10', damageDice: '1d6+5' },
        { name: 'Ataque Furtivo', icon: 'visibility_off', details: 'Bônus • 1x por turno', hitDc: '—', damageDice: '6d6' },
      ],
      skills: [
        { name: 'Furtividade', bonus: 11, proficient: true },
        { name: 'Prestidigitação', bonus: 11, proficient: true },
        { name: 'Acrobacia', bonus: 9, proficient: true },
        { name: 'Investigação', bonus: 7, proficient: true },
        { name: 'Percepção', bonus: 5, proficient: true },
        { name: 'Enganação', bonus: 6, proficient: true },
      ],
      patron: 'Arquétipo: Ladrão Arcano',
      patronDescription: 'Elara rouba não apenas ouro, mas segredos mágicos. Sua habilidade de usar pergaminhos e itens mágicos a torna imprevisível em combate.',
      background: 'Criminoso',
      backgroundDescription: 'Cresceu nas ruas da cidade baixa, aprendendo a sobreviver pela astúcia e agilidade. Possui contatos no submundo.',
      personalGoals: ['Encontrar o assassino de seus pais', 'Roubar a Coroa de Sombras', 'Limpar seu nome das acusações falsas'],
      scribeNotes: '',
      campaignName: 'Sombra do Trono de Ferro',
    },
    'korg-o-inquebravel': {
      characterName: 'Korg, o Inquebrantável',
      race: 'Meio-Orc',
      class: 'Bárbaro',
      level: 12,
      avatarIcon: 'fitness_center',
      avatarColor: '#6a4a3a',
      abilities: [
        { name: 'Força', value: 20, modifier: 5, isPrimary: true },
        { name: 'Destreza', value: 14, modifier: 2 },
        { name: 'Constituição', value: 18, modifier: 4 },
        { name: 'Inteligência', value: 8, modifier: -1 },
        { name: 'Sabedoria', value: 12, modifier: 1 },
        { name: 'Carisma', value: 10, modifier: 0 },
      ],
      hp: 98, maxHp: 98, ac: 17, initiative: 2,
      spellSlots: '—', spellSlotLevel: '—',
      attacks: [
        { name: 'Machado Grande', icon: 'carpenter', details: 'Corpo a corpo • Pesado • Duas mãos', hitDc: '+10', damageDice: '1d12+5' },
        { name: 'Ataque Furioso', icon: 'local_fire_department', details: 'Fúria ativa • Bônus de dano', hitDc: '+10', damageDice: '1d12+8' },
        { name: 'Arremesso de Javali', icon: 'north_east', details: 'Distância • 30/120 pés', hitDc: '+10', damageDice: '1d6+5' },
      ],
      skills: [
        { name: 'Atletismo', bonus: 9, proficient: true },
        { name: 'Intimidação', bonus: 4, proficient: true },
        { name: 'Sobrevivência', bonus: 5, proficient: true },
        { name: 'Percepção', bonus: 5, proficient: true },
      ],
      patron: 'Caminho do Berserker',
      patronDescription: 'A fúria de Korg é lendária. Quando entra em seu frenesi, nenhuma criatura é páreo para sua força bruta devastadora.',
      background: 'Forasteiro',
      backgroundDescription: 'Criado entre as tribos selvagens das montanhas, Korg conhece a natureza como poucos e prefere a honestidade bruta à diplomacia.',
      personalGoals: ['Vingar sua tribo massacrada', 'Derrotar o gigante de gelo Thrymm', 'Encontrar um lar para chamar de seu'],
      scribeNotes: '',
      campaignName: 'Sombra do Trono de Ferro',
    },
    'zek-do-vazio': {
      characterName: 'Zek do Vazio',
      race: 'Tiefling',
      class: 'Bruxo',
      level: 10,
      avatarIcon: 'auto_fix_high',
      avatarColor: '#3a4a5a',
      abilities: [
        { name: 'Força', value: 10, modifier: 0 },
        { name: 'Destreza', value: 14, modifier: 2 },
        { name: 'Constituição', value: 16, modifier: 3 },
        { name: 'Inteligência', value: 12, modifier: 1 },
        { name: 'Sabedoria', value: 14, modifier: 2 },
        { name: 'Carisma', value: 20, modifier: 5, isPrimary: true },
      ],
      hp: 45, maxHp: 52, ac: 14, initiative: 2,
      spellSlots: '2 Espaços', spellSlotLevel: '5º Nível',
      attacks: [
        { name: 'Rajada Eldritch', icon: 'auto_fix_high', details: 'Truque • 120 pés • 3 Raios', hitDc: '+9', damageDice: '1d10+5' },
        { name: 'Fome de Hadar', icon: 'dark_mode', details: '3º Nível • 150 pés • Concentração', hitDc: 'CD 17', damageDice: '2d6' },
        { name: 'Lâmina do Pacto (Rapieira)', icon: 'swords', details: 'Corpo a corpo • Acuidade • Prateada', hitDc: '+9', damageDice: '1d8+5' },
      ],
      skills: [
        { name: 'Enganação', bonus: 9, proficient: true },
        { name: 'Arcanismo', bonus: 5, proficient: true },
        { name: 'Intimidação', bonus: 9, proficient: true },
        { name: 'Persuasão', bonus: 9, proficient: true },
      ],
      patron: 'Patrono: O Corruptor',
      patronDescription: 'Ligado por um pacto infernal assinado em sangue sob a lua de sangue, Zek busca os pergaminhos proibidos do arquivo abissal para resgatar sua alma.',
      background: 'Sábio',
      backgroundDescription: 'Dedicou sua vida ao serviço do conhecimento. Esqueceu mais do que a maioria das pessoas jamais aprenderá.',
      personalGoals: ['Recuperar o Coração de Malphas', 'Infiltrar a Cidadela de Ônix', 'Romper o vínculo com o Patrono'],
      scribeNotes: '',
      campaignName: 'Sombra do Trono de Ferro',
    },
    'bruna-canto-sagrado': {
      characterName: 'Bruna Canto-Sagrado',
      race: 'Anã',
      class: 'Clérigo',
      level: 11,
      avatarIcon: 'favorite',
      avatarColor: '#5a4a5a',
      abilities: [
        { name: 'Força', value: 14, modifier: 2 },
        { name: 'Destreza', value: 10, modifier: 0 },
        { name: 'Constituição', value: 16, modifier: 3 },
        { name: 'Inteligência', value: 12, modifier: 1 },
        { name: 'Sabedoria', value: 20, modifier: 5, isPrimary: true },
        { name: 'Carisma', value: 14, modifier: 2 },
      ],
      hp: 62, maxHp: 62, ac: 18, initiative: 0,
      spellSlots: '4/3/3/3/2/1', spellSlotLevel: '1º–6º Nível',
      attacks: [
        { name: 'Maça Sagrada', icon: 'gavel', details: 'Corpo a corpo • Radiante', hitDc: '+7', damageDice: '1d6+3' },
        { name: 'Chama Sagrada', icon: 'local_fire_department', details: 'Truque • 60 pés • TR Destreza', hitDc: 'CD 17', damageDice: '3d8' },
        { name: 'Palavra Curativa', icon: 'favorite', details: '1º Nível • Ação bônus • 60 pés', hitDc: '—', damageDice: '1d4+5' },
      ],
      skills: [
        { name: 'Medicina', bonus: 9, proficient: true },
        { name: 'Religião', bonus: 5, proficient: true },
        { name: 'Intuição', bonus: 9, proficient: true },
        { name: 'História', bonus: 5, proficient: true },
      ],
      patron: 'Domínio da Vida',
      patronDescription: 'Serva devota da deusa da cura, Bruna canaliza energia divina para restaurar os feridos e proteger os fracos.',
      background: 'Acólito',
      backgroundDescription: 'Criada em um templo desde a infância, conhece os rituais sagrados e possui abrigo em qualquer templo aliado.',
      personalGoals: ['Curar a praga que assola as terras do norte', 'Encontrar a relíquia perdida de sua deusa', 'Converter os hereges da Sombra'],
      scribeNotes: '',
      campaignName: 'Sombra do Trono de Ferro',
    },
  };

  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id') ?? '1';
    const charSlug = this.route.snapshot.paramMap.get('charSlug') ?? '';
    this.character = this.characters[charSlug] ?? Object.values(this.characters)[0];
    this.scribeNotes = this.character.scribeNotes;
    this.appComponent.setActiveCampaignName(this.character.campaignName);
  }

  getModifierStr(mod: number): string {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }

  getHpPercent(): number {
    return (this.character.hp / this.character.maxHp) * 100;
  }

  getHpColor(): string {
    const pct = this.getHpPercent();
    if (pct >= 75) return '#4a8a4a';
    if (pct >= 40) return '#c4a35a';
    return '#a83030';
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';

interface PartyMember {
  characterName: string;
  playerName: string;
  class: string;
  level: number;
  avatarColor: string;
  initials: string;
}

interface PastChronicle {
  day: string;
  month: string;
  title: string;
  summary: string;
  fullContent: string;
}

interface CampaignData {
  id: number;
  name: string;
  currentSessionTitle: string;
  party: PartyMember[];
  pastChronicles: PastChronicle[];
  partyMorale: string;
  moralePercent: number;
  loomingThreat: string;
  threatPercent: number;
}

@Component({
  selector: 'app-campaign-detail',
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.scss'
})
export class CampaignDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private appComponent = inject(AppComponent);

  campaign!: CampaignData;
  sessionContent = '';
  expandedChronicle: number | null = null;
  viewingChronicle: PastChronicle | null = null;

  private campaigns: Record<number, CampaignData> = {
    1: {
      id: 1,
      name: 'Sombra do Trono de Ferro',
      currentSessionTitle: 'Os Sussurros do Bosque de Ferro',
      party: [
        { characterName: 'Thalric Ferro-Ligado', playerName: 'James R.', class: 'Paladino', level: 12, avatarColor: '#5c4a3a', initials: 'TF' },
        { characterName: 'Elara Sombra-Veloz', playerName: 'Sarah K.', class: 'Ladina', level: 11, avatarColor: '#4a5a6a', initials: 'ES' },
        { characterName: 'Korg, o Inquebrantável', playerName: 'Marcus V.', class: 'Bárbaro', level: 12, avatarColor: '#6a4a3a', initials: 'KI' },
        { characterName: 'Zek do Vazio', playerName: 'Elena P.', class: 'Bruxo', level: 10, avatarColor: '#3a4a5a', initials: 'ZV' },
      ],
      pastChronicles: [
        { day: '14', month: 'OUT', title: 'A Descida em Malakor', summary: 'O grupo finalmente alcançou os portões da fortaleza de obsidiana apenas para encontrá-la infestada de mortos-vivos...', fullContent: 'Após três dias de marcha pelas montanhas cinzentas, o grupo finalmente avistou a fortaleza de Malakor erguendo-se contra o céu tempestuoso. Os portões estavam entreabertos — um mau sinal.\n\nThalric foi o primeiro a entrar, seu escudo erguido e uma prece nos lábios. O interior estava tomado por uma escuridão antinatural. Elara detectou armadilhas no corredor principal, desarmando-as com precisão cirúrgica.\n\nNo grande salão, encontraram dezenas de mortos-vivos — soldados que outrora guardavam a fortaleza, agora servos de uma força sombria. Korg rugiu e avançou, seu machado cortando o ar. Zek invocou rajadas de energia eldritch que iluminaram as trevas.\n\nA batalha foi intensa. Bruna canalizou energia divina para curar os feridos enquanto Elara flanqueava os inimigos pelas sombras. No fim, uma figura encapuzada observava do balcão superior — e desapareceu antes que pudessem alcançá-la.\n\nO grupo acampou no salão limpo, ferido mas determinado. Quem controla os mortos desta fortaleza?' },
        { day: '07', month: 'OUT', title: 'Luar Sobre o Riacho Sanguíneo', summary: 'Uma noite tranquila se tornou mortal quando a fumaça da fogueira atraiu um bando de lobisomens famintos...', fullContent: 'O acampamento foi montado às margens do Riacho Sanguíneo, assim chamado pela cor avermelhada de suas águas ao pôr do sol. Elara caçou coelhos enquanto Korg pescava com as mãos — sua técnica favorita.\n\nA noite estava serena até que Thalric percebeu os olhos brilhando na escuridão da floresta. Lobisomens — pelo menos seis — cercavam o acampamento, atraídos pelo cheiro de carne assada.\n\nO combate sob o luar foi caótico. Zek descobriu que suas magias comuns eram menos eficazes contra as criaturas, mas sua lâmina prateada do pacto fez a diferença. Korg lutou corpo a corpo com o alfa, uma criatura massiva que deixou cicatrizes profundas em seu peito.\n\nBruna usou magia de proteção para criar uma barreira temporária, dando tempo ao grupo para se reagrupar. Elara acertou uma flecha certeira no olho do alfa, permitindo que Thalric desferisse o golpe final com energia radiante.\n\nTrês lobisomens fugiram para a floresta. O grupo tratou os ferimentos e decidiu montar guarda reforçada pelo resto da noite.' },
        { day: '30', month: 'SET', title: 'O Mercador de Segredos', summary: 'Na taverna do Dragão Cego, o grupo encontrou um misterioso mercador que ofereceu informações sobre o trono...', fullContent: 'A taverna do Dragão Cego ficava em um beco escuro da cidade de Porto Cinza. Fumaça de cachimbo e o som de dados rolando enchiam o ambiente. O grupo veio em busca de informações sobre a localização do Trono de Ferro.\n\nUm homem encapuzado os abordou — Silas, o Mercador de Segredos. Seus olhos eram de cores diferentes e ele falava em sussurros calculados.\n\n"Eu sei o que vocês procuram," disse ele. "O Trono não está onde pensam. Foi movido para Malakor há três luas. Mas essa informação tem um preço."\n\nZek negociou habilmente, usando sua lábia sobrenatural. O preço final: um favor futuro, a ser cobrado quando Silas decidisse. Thalric protestou — pactos vagos eram perigosos — mas o grupo votou e a maioria aceitou.\n\nSilas desenhou um mapa no guardanapo e desapareceu na multidão antes que pudessem perguntar mais. O mapa indicava uma passagem secreta nas montanhas. A jornada para Malakor começaria ao amanhecer.' },
      ],
      partyMorale: 'Alta',
      moralePercent: 78,
      loomingThreat: 'O Rei Corvo',
      threatPercent: 45,
    },
    2: {
      id: 2,
      name: 'As Ilhas Submersas',
      currentSessionTitle: 'Marés de Escuridão',
      party: [
        { characterName: 'Marina Ondas-Bravas', playerName: 'Julia R.', class: 'Druida', level: 8, avatarColor: '#3a6a5a', initials: 'MO' },
        { characterName: 'Capitão Raio Negro', playerName: 'Samuel V.', class: 'Guerreiro', level: 9, avatarColor: '#5a5a6e', initials: 'CR' },
        { characterName: 'Duna Whisperwind', playerName: 'Diego W.', class: 'Ranger', level: 7, avatarColor: '#6a6a4a', initials: 'DW' },
        { characterName: 'Lira das Profundezas', playerName: 'Luana P.', class: 'Feiticeira', level: 8, avatarColor: '#4a5a7a', initials: 'LP' },
      ],
      pastChronicles: [
        { day: '12', month: 'OUT', title: 'O Naufrágio do Pérola Negra', summary: 'Uma tempestade sobrenatural afundou o navio do grupo, forçando-os a nadar até uma ilha desconhecida...', fullContent: 'O Pérola Negra navegava sob céus claros quando nuvens escuras surgiram do nada. O Capitão Raio Negro ordenou que recolhessem as velas, mas era tarde demais.\n\nA tempestade não era natural — relâmpagos verdes cortavam o céu e ondas impossíveis se erguiam como montanhas líquidas. Marina tentou acalmar os mares com sua magia druídica, mas a força era antiga demais.\n\nO navio partiu-se ao meio. O grupo nadou por horas até alcançar uma ilha que não constava em nenhum mapa. Lira sentiu uma presença mágica emanando do interior da selva — algo antigo e poderoso os havia trazido até ali de propósito.' },
        { day: '05', month: 'OUT', title: 'O Templo Submerso', summary: 'Nas profundezas do oceano, o grupo descobriu um templo antigo dedicado a uma divindade esquecida...', fullContent: 'Seguindo as correntes mágicas que Lira detectou, o grupo mergulhou nas águas cristalinas ao redor da ilha. Marina conjurou uma bolha de ar que os envolveu enquanto desciam cada vez mais fundo.\n\nO templo era magnífico — colunas de coral sustentavam um domo de cristal intacto após milênios. Inscrições em uma língua perdida cobriam as paredes. Duna conseguiu decifrar fragmentos: falavam de um deus do mar adormecido, traído por seus próprios devotos.\n\nNo altar central, encontraram um tridente dourado pulsando com energia. Quando o Capitão Raio Negro o tocou, visões inundaram sua mente — cidades submersas, exércitos de tritões e um olho gigantesco se abrindo nas profundezas.' },
      ],
      partyMorale: 'Moderada',
      moralePercent: 55,
      loomingThreat: 'O Kraken Adormecido',
      threatPercent: 60,
    },
    3: {
      id: 3,
      name: 'Ecos do Vazio',
      currentSessionTitle: 'O Portal Que Não Deveria Existir',
      party: [
        { characterName: 'Morghul, o Cinzento', playerName: 'Marcos K.', class: 'Mago', level: 14, avatarColor: '#5a5a5a', initials: 'MC' },
        { characterName: 'Ravena Nocturna', playerName: 'Renata N.', class: 'Clérigo', level: 13, avatarColor: '#4a3a5a', initials: 'RN' },
        { characterName: 'Ashur Lâmina-Sombria', playerName: 'André S.', class: 'Assassino', level: 12, avatarColor: '#3a3a4a', initials: 'AL' },
      ],
      pastChronicles: [
        { day: '20', month: 'OUT', title: 'A Biblioteca dos Sussurros', summary: 'No coração da torre arruinada, livros falavam com vozes dos mortos, revelando segredos proibidos...', fullContent: 'A torre se erguia como um dedo ósseo apontando para o céu roxo do Vazio. Morghul sentiu a magia antes mesmo de entrar — conhecimento proibido, denso como névoa.\n\nLá dentro, os livros sussurravam. Literalmente. Vozes de magos mortos há eras emanavam das páginas, oferecendo sabedoria em troca de atenção. Ravena rezou para manter a sanidade do grupo enquanto Ashur verificava armadilhas em cada corredor.\n\nMorghul encontrou o que procurava: o Codex do Observador, um tomo encadernado em couro de algo que nunca foi um animal. As páginas descreviam rituais para fechar portais entre planos — exatamente o que precisavam. Mas o preço de ler o livro completo era alto: cada capítulo consumia uma memória do leitor.\n\nMorghul leu três capítulos. Esqueceu o rosto de sua mãe, o nome de seu primeiro mestre e o sabor de seu prato favorito. Disse que valeu a pena. Ravena não tinha tanta certeza.' },
        { day: '13', month: 'OUT', title: 'Fragmentos de Realidade', summary: 'O tecido da realidade se rasgou e o grupo teve que navegar entre planos para sobreviver...', fullContent: 'Aconteceu sem aviso. Uma fissura no ar, como vidro rachando, abriu-se diante do grupo enquanto caminhavam pela planície desolada. Através dela, viram outro mundo — ou talvez o mesmo mundo em outro tempo.\n\nAntes que pudessem reagir, a fissura se expandiu e os engoliu. O grupo foi separado entre fragmentos de realidade: Morghul em uma versão da torre onde nunca havia sido destruída, Ravena em um templo dedicado a um deus que não reconhecia, e Ashur em uma versão sombria da cidade onde cresceu.\n\nCada um teve que encontrar seu caminho de volta. Ashur usou suas habilidades de navegação urbana, Ravena seguiu a luz de sua fé, e Morghul decifrou os padrões arcanos que conectavam os fragmentos.\n\nQuando se reuniram, perceberam que o Devorador de Mundos estava testando suas defesas — fragmentando a realidade para estudar suas fraquezas.' },
        { day: '06', month: 'OUT', title: 'O Pacto do Observador', summary: 'Uma entidade cósmica propôs um pacto: poder em troca de memórias. Nem todos recusaram...', fullContent: 'Ele apareceu durante a meditação noturna de Morghul — um olho imenso flutuando em um vazio sem estrelas. O Observador. Não era malévolo nem benévolo — era algo além dessas categorias.\n\n"Vocês buscam fechar o portal," disse a voz que não era voz. "Eu posso dar o poder necessário. Mas em troca, quero ver através de seus olhos. Quero experimentar o que vocês chamam de existência."\n\nO grupo debateu por horas. Morghul, já acostumado a trocar memórias por conhecimento, aceitou primeiro. Ashur, pragmático como sempre, também concordou — poder era poder, independente da fonte.\n\nRavena recusou firmemente. Sua fé não permitia pactos com entidades além da compreensão mortal. Isso criou uma tensão no grupo que ainda não foi resolvida.\n\nOs que aceitaram sentem, às vezes, que não estão sozinhos em suas próprias mentes. Uma presença observa. Sempre observa.' },
      ],
      partyMorale: 'Baixa',
      moralePercent: 30,
      loomingThreat: 'O Devorador de Mundos',
      threatPercent: 85,
    },
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const navState = history.state as { campaignName?: string } | undefined;
    this.campaign = this.campaigns[id] ?? this.buildNewCampaign(id, navState?.campaignName);
    this.appComponent.setActiveCampaignName(this.campaign.name);
  }

  private buildNewCampaign(id: number, name?: string): CampaignData {
    return {
      id,
      name: name ?? 'Nova Campanha',
      currentSessionTitle: 'Sessão 1: O Começo da Jornada',
      party: [],
      pastChronicles: [],
      partyMorale: 'Neutra',
      moralePercent: 50,
      loomingThreat: 'Desconhecida',
      threatPercent: 10,
    };
  }

  toggleChronicle(index: number): void {
    this.expandedChronicle = this.expandedChronicle === index ? null : index;
  }

  openChronicle(chronicle: PastChronicle): void {
    this.viewingChronicle = chronicle;
  }

  backToCurrentSession(): void {
    this.viewingChronicle = null;
  }

  getMoraleColor(): string {
    if (this.campaign.moralePercent >= 60) return '#c4a35a';
    if (this.campaign.moralePercent >= 35) return '#c48a3a';
    return '#a83030';
  }

  getThreatColor(): string {
    if (this.campaign.threatPercent >= 70) return '#a83030';
    if (this.campaign.threatPercent >= 40) return '#c48a3a';
    return '#3a6a5a';
  }
}

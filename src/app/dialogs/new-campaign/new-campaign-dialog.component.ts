import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Aesthetic {
  id: string;
  label: string;
  icon: string;
  image: string;
}

@Component({
  selector: 'app-new-campaign-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './new-campaign-dialog.component.html',
  styleUrl: './new-campaign-dialog.component.scss'
})
export class NewCampaignDialogComponent {
  sagaTitle = '';
  rpgSystem = '';
  selectedAesthetic = 'medieval';

  systems = ['D&D 5e', 'Tormenta 20', 'Call of Cthulhu', 'Pathfinder 2e', 'Star Wars RPG', 'Vampiro: A Máscara', 'Cyberpunk RED', 'Outro'];

  aesthetics: Aesthetic[] = [
    { id: 'medieval', label: 'MEDIEVAL', icon: 'castle', image: 'images/aesthetics/medieval.svg' },
    { id: 'space', label: 'ESPACIAL', icon: 'rocket_launch', image: 'images/aesthetics/space.svg' },
    { id: 'horror', label: 'HORROR', icon: 'visibility', image: 'images/aesthetics/horror.svg' },
    { id: 'cyberpunk', label: 'CYBERPUNK', icon: 'memory', image: 'images/aesthetics/cyberpunk.svg' },
  ];

  constructor(private dialogRef: MatDialogRef<NewCampaignDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    if (!this.sagaTitle.trim()) return;
    this.dialogRef.close({
      title: this.sagaTitle,
      system: this.rpgSystem,
      aesthetic: this.selectedAesthetic,
    });
  }
}

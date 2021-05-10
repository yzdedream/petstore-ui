import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PetService} from '../pet.service';
import {Pet, PetUpdateForm, Tag} from '../../../core/apina/apina';

export interface PetDetailDialogData {
  petId: number;
}

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  pet: Pet = {
    id: -1,
    name: '',
    category: {
      id: -1,
      name: ''
    },
    photoUrls: [],
    status: '',
    tags: []
  };
  tags: Tag[];
  selectedTags: number[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: PetDetailDialogData,
              private petService: PetService,
              private dialogRef: MatDialogRef<PetDetailComponent>) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.petService.getPets().subscribe(
      (pets) => {
        this.pet = pets.find(pet => pet.id === this.data.petId);
        this.selectedTags = this.pet.tags.map(tag => tag.id);
      },
      error => {
        // show error message
      });

    this.petService.getTags().subscribe(
      tags => this.tags = tags,
      error => {
        // show error message
      });
  }

  onSave() {
    const form: PetUpdateForm = {
      categoryId: this.pet.category.id,
      name: this.pet.name,
      status: this.pet.status,
      tagIDs: this.selectedTags
    };
    this.petService.updatePet(this.pet.id, form).subscribe(
      () => this.dialogRef.close(),
      error => {
        // show error
      }
    );
  }

  onDelete() {
    if (confirm('Are you sure to delete ' + this.pet.name)) {
      this.petService.deletePet(this.pet.id).subscribe(
        () => this.dialogRef.close(),
        error => {
          // show error
        });
    }
  }

}

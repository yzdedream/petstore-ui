import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreatePetComponent} from './create/create-pet.component';
import {CategoryComponent} from './category/category.component';
import {PetService} from './pet.service';
import {Pet} from '../../core/apina/apina';
import {TagsComponent} from './tags/tags.component';
import {PetDetailComponent} from './detail/pet-detail.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pets: Pet[];

  constructor(private dialog: MatDialog,
              private petService: PetService) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.petService.getPets().subscribe(
      pets => this.pets = pets,
      error => {
        // show error message
      }
    );
  }

  onCreatePet() {
    const dialogRef = this.dialog.open(CreatePetComponent);
    dialogRef.afterClosed().subscribe(
      () => this.loadData()
    );
  }

  onCategory() {
    this.dialog.open(CategoryComponent);
  }

  onTags() {
    this.dialog.open(TagsComponent);
  }

  onEdit(petId: number) {
    const dialogRef = this.dialog.open(PetDetailComponent, {data: {petId: petId}});
    dialogRef.afterClosed().subscribe(
      () => this.loadData()
    );
  }
}
